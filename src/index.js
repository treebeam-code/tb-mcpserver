#!/usr/bin/env node
// treebeam-mcp/src/index.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { getToken, getAuthStatus, login, logout, startDeviceLogin } from './auth.js';
import { tools } from './tool.js';
import { SERVER_NAME, SERVER_VERSION, TREEBEAM_API, TOOL_NAME_TO_ENDPOINT_MAP, LOG_PREFIX } from './const.js';

// Handle CLI commands (login, logout, status)
const command = process.argv[2];
if (command === 'login') {
    await login();
    process.exit(0);
} else if (command === 'logout') {
    await logout();
    process.exit(0);
} else if (command === 'status') {
    const status = await getAuthStatus();
    if (status.authenticated) {
        console.log(`Authenticated. Token expires at ${status.expiresAt.toISOString()}.`);
    } else {
        console.log('Not authenticated. Use the login command to sign in.');
    }
    process.exit(0);
}

// Fetch helpers

async function fetchGet(url, token) {
    console.error(`${LOG_PREFIX} API GET ${url}`);
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}

async function fetchPost(url, token, body, merge = false) {
    if (merge) {
        const getResponse = await fetchGet(url, token);
        if (!getResponse.ok) {
            const errorBody = await getResponse.text().catch(() => '');
            throw new Error(`Failed to fetch current state before update: ${getResponse.status} - ${errorBody}`);
        }
        const current = await getResponse.json();
        body = { ...current, ...body };
    }
    console.error(`${LOG_PREFIX} API POST ${url}`);
    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

async function fetchDelete(url, token, etag) {
    console.error(`${LOG_PREFIX} API DELETE ${url}`);
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'If-Match': etag
        }
    });
}

// Start MCP server
const server = new Server({ name: SERVER_NAME, version: SERVER_VERSION }, { capabilities: { tools: {} } });

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    console.error(`${LOG_PREFIX} Tool call: ${name}`, args ? JSON.stringify(args) : '');

    try {
        // Auth tools — handle before requiring a token
        if (name === 'treebeam_login') {
            const info = await startDeviceLogin();
            return {
                content: [{
                    type: 'text',
                    text: [
                        'TreeBeam device flow authentication started.',
                        '',
                        `Open this URL: ${info.verificationUriComplete}`,
                        '',
                        `Or go to ${info.verificationUri} and enter code: ${info.userCode}`,
                        '',
                        'A browser window should have opened automatically.',
                        `The code expires in ${info.expiresIn} seconds.`,
                        'The server is polling for completion in the background.',
                        'Once you complete authentication in the browser, subsequent tool calls will be authenticated.'
                    ].join('\n')
                }]
            };
        }

        if (name === 'treebeam_logout') {
            await logout();
            return { content: [{ type: 'text', text: 'Logged out of TreeBeam. Stored credentials removed.' }] };
        }

        if (name === 'treebeam_auth_status') {
            const status = await getAuthStatus();
            if (status.authenticated) {
                return { content: [{ type: 'text', text: `Authenticated. Token expires at ${status.expiresAt.toISOString()}.` }] };
            }
            return { content: [{ type: 'text', text: 'Not authenticated. Use the treebeam_login tool to sign in.' }] };
        }

        // API tools — require a token
        const token = await getToken();

        // Resolve routing config
        const config = TOOL_NAME_TO_ENDPOINT_MAP[name] ?? {};
        const method = config.method ?? 'GET';
        const pathParams = config.pathParams ?? [];
        const queryParams = config.queryParams ?? [];
        const payloadFields = config.payload ?? [];
        let endpoint = config.endpoint ?? '';

        // Substitute path params into endpoint template
        for (const param of pathParams) {
            if (args?.[param]) {
                endpoint = endpoint.replace(`{${param}}`, encodeURIComponent(args[param]));
            }
        }

        // Build query string
        const params = new URLSearchParams();
        for (const param of queryParams) {
            if (args?.[param] !== undefined && args?.[param] !== null) {
                params.append(param, args[param]);
            }
        }
        const queryString = params.toString() ? '?' + params.toString() : '';
        const apiUrl = `${TREEBEAM_API}/api/v1/${endpoint}${queryString}`;

        // Dispatch to appropriate fetch helper
        let response;
        if (method === 'POST') {
            const body = {};
            for (const field of payloadFields) {
                if (args?.[field] !== undefined) {
                    body[field] = args[field];
                }
            }
            response = await fetchPost(apiUrl, token, body, config.merge ?? false);
        } else if (method === 'DELETE') {
            response = await fetchDelete(apiUrl, token, args?.etag);
        } else {
            response = await fetchGet(apiUrl, token);
        }

        console.error(`${LOG_PREFIX} API response: ${response.status} ${response.statusText}`);

        // Handle auth errors
        if (response.status === 401) {
            const info = await startDeviceLogin();
            return {
                content: [{
                    type: 'text',
                    text: [
                        'Authentication expired. Device flow started automatically.',
                        '',
                        `Open this URL: ${info.verificationUriComplete}`,
                        '',
                        `Or go to ${info.verificationUri} and enter code: ${info.userCode}`,
                        '',
                        'Complete authentication in the browser, then retry your request.'
                    ].join('\n')
                }],
                isError: true
            };
        }

        if (!response.ok) {
            const errorBody = await response.text().catch(() => '');
            let errorMessage = `API error: ${response.status}`;
            if (errorBody) {
                try {
                    const error = JSON.parse(errorBody);
                    errorMessage = error.errorMessage || error.message || error.title || error.detail || `API error: ${response.status} - ${errorBody}`;
                } catch {
                    errorMessage = `API error: ${response.status} - ${errorBody}`;
                }
            }
            throw new Error(errorMessage);
        }

        // 204 No Content (e.g. DELETE)
        if (response.status === 204) {
            return { content: [{ type: 'text', text: 'Success.' }] };
        }

        const result = await response.json();
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const causeMessage = error?.cause?.message;
        console.error(`${LOG_PREFIX} Tool ${name} error: ${message}`, causeMessage ? `| Cause: ${causeMessage}` : '');
        const displayMessage = causeMessage ? `Error: ${message} (cause: ${causeMessage})` : `Error: ${message}`;
        return {
            content: [{ type: 'text', text: displayMessage }],
            isError: true
        };
    }
});

// Start the server
console.error(`${LOG_PREFIX} Server starting...`);
const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`${LOG_PREFIX} Server connected and ready`);
