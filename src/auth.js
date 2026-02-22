// treebeam-mcp/src/auth.ts
import keytar from 'keytar'; // OS keychain access
import open from 'open'; // Open browser
import {
    SERVICE_NAME, ACCOUNT_NAME, IDENTITY_URL, CLIENT_ID, OAUTH_SCOPE,
    DEVICE_AUTH_ENDPOINT, TOKEN_ENDPOINT, GRANT_TYPE_DEVICE_CODE,
    GRANT_TYPE_REFRESH_TOKEN, TOKEN_EXPIRY_BUFFER_MS,
    DEFAULT_DEVICE_CODE_EXPIRY_S, DEFAULT_POLL_INTERVAL_S,
    SLOW_DOWN_INCREMENT_S, LOG_PREFIX
} from './const.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Interactive login for CLI usage (node src/index.js login)
export async function login() {
    const { deviceCode, verificationUri, verificationUriComplete, userCode } = await requestDeviceCode();

    console.error('\n┌─────────────────────────────────────────────────────────┐');
    console.error('│                 TreeBeam Authentication                 │');
    console.error('├─────────────────────────────────────────────────────────┤');
    console.error(`│       Visit: ${verificationUri.padEnd(42)} │`);
    console.error(`│  Enter code: ${userCode.padEnd(42)} │`);
    console.error('└─────────────────────────────────────────────────────────┘\n');

    try {
        await open(verificationUriComplete);
        console.error('Browser opened automatically. If not, use the link above.\n');
    } catch {
        // Browser open failed, user can manually navigate
    }

    console.error('Waiting for authentication...');
    const token = await pollForToken(deviceCode);
    console.error('\n✓ Authenticated successfully!\n');
    return token;
}

// MCP tool login — returns device code info immediately, polls in background
export async function startDeviceLogin() {
    const info = await requestDeviceCode();

    // Open browser automatically
    try {
        await open(info.verificationUriComplete);
    } catch {
        // Browser open failed
    }

    // Start background polling
    pollForToken(info.deviceCode, info.expiresIn, info.interval).catch(() => {
        // Polling failed or timed out — user can retry
    });

    return info;
}

async function requestDeviceCode() {
    const url = `${IDENTITY_URL}${DEVICE_AUTH_ENDPOINT}`;
    console.error(`${LOG_PREFIX} POST ${url}`);

    let codeResponse;
    try {
        codeResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                scope: OAUTH_SCOPE
            })
        });
    } catch (error) {
        console.error(`${LOG_PREFIX} requestDeviceCode fetch failed: ${error.message}`, error.cause ? `| Cause: ${error.cause.message}` : '');
        throw error;
    }

    if (!codeResponse.ok) {
        console.error(`${LOG_PREFIX} requestDeviceCode failed: ${codeResponse.status} ${codeResponse.statusText}`);
        throw new Error(`Failed to request device code: ${codeResponse.statusText}`);
    }

    console.error(`${LOG_PREFIX} requestDeviceCode success: ${codeResponse.status}`);
    const data = await codeResponse.json();
    return {
        deviceCode: data.device_code,
        userCode: data.user_code,
        verificationUri: data.verification_uri,
        verificationUriComplete: data.verification_uri_complete,
        expiresIn: data.expires_in,
        interval: data.interval
    };
}

async function pollForToken(deviceCode, expiresIn = DEFAULT_DEVICE_CODE_EXPIRY_S, interval = DEFAULT_POLL_INTERVAL_S) {
    const url = `${IDENTITY_URL}${TOKEN_ENDPOINT}`;
    const expiresAt = Date.now() + expiresIn * 1000;
    console.error(`${LOG_PREFIX} pollForToken started, expires in ${expiresIn}s`);

    while (Date.now() < expiresAt) {
        await sleep(interval * 1000);

        let tokenResponse;
        try {
            tokenResponse = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    grant_type: GRANT_TYPE_DEVICE_CODE,
                    device_code: deviceCode,
                    client_id: CLIENT_ID
                })
            });
        } catch (error) {
            console.error(`${LOG_PREFIX} pollForToken fetch failed: ${error.message}`, error.cause ? `| Cause: ${error.cause.message}` : '');
            throw error;
        }

        const result = await tokenResponse.json();

        if (result.error === 'authorization_pending') {
            continue;
        }

        if (result.error === 'slow_down') {
            interval += SLOW_DOWN_INCREMENT_S;
            continue;
        }

        if (result.error) {
            console.error(`${LOG_PREFIX} pollForToken auth error: ${result.error}`);
            throw new Error(`Authentication failed: ${result.error}`);
        }

        // Success — store tokens
        console.error(`${LOG_PREFIX} pollForToken success, token received`);
        const tokens = {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expires_at: Date.now() + result.expires_in * 1000
        };

        await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, JSON.stringify(tokens));
        return result.access_token;
    }

    console.error(`${LOG_PREFIX} pollForToken timed out`);
    throw new Error('Authentication timed out. Please try again.');
}

export async function logout() {
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
    console.error('Logged out successfully.');
}

export async function getToken() {
    const stored = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);

    if (!stored) {
        console.error(`${LOG_PREFIX} getToken: no stored token, triggering login`);
        return await login();
    }

    const tokens = JSON.parse(stored);

    // Check if expired (with 5 minute buffer)
    if (Date.now() > tokens.expires_at - TOKEN_EXPIRY_BUFFER_MS) {
        console.error(`${LOG_PREFIX} getToken: token expired/expiring, attempting refresh`);
        try {
            return await refreshToken(tokens.refresh_token);
        } catch (error) {
            console.error(`${LOG_PREFIX} getToken: refresh failed (${error.message}), triggering re-login`);
            return await login();
        }
    }

    console.error(`${LOG_PREFIX} getToken: using cached token (expires ${new Date(tokens.expires_at).toISOString()})`);
    return tokens.access_token;
}

async function refreshToken(refreshTokenValue) {
    const url = `${IDENTITY_URL}${TOKEN_ENDPOINT}`;
    console.error(`${LOG_PREFIX} refreshToken: POST ${url}`);

    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: GRANT_TYPE_REFRESH_TOKEN,
                refresh_token: refreshTokenValue,
                client_id: CLIENT_ID
            })
        });
    } catch (error) {
        console.error(`${LOG_PREFIX} refreshToken fetch failed: ${error.message}`, error.cause ? `| Cause: ${error.cause.message}` : '');
        throw error;
    }

    if (!response.ok) {
        console.error(`${LOG_PREFIX} refreshToken failed: ${response.status} ${response.statusText}`);
        throw new Error('Failed to refresh token');
    }

    console.error(`${LOG_PREFIX} refreshToken success: ${response.status}`);
    const result = await response.json();

    // Store new tokens
    const tokens = {
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_at: Date.now() + result.expires_in * 1000
    };

    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, JSON.stringify(tokens));

    return result.access_token;
}

export async function getAuthStatus() {
    const stored = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);

    if (!stored) {
        return { authenticated: false };
    }

    const tokens = JSON.parse(stored);

    return {
        authenticated: Date.now() < tokens.expires_at,
        expiresAt: new Date(tokens.expires_at)
    };
}
