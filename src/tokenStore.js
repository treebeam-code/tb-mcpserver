// OS credential storage for OAuth tokens. Tokens are never written to disk in plain text.
//
// Windows: Credential Manager. macOS: Keychain.
// Linux: Secret Service (gnome-keyring, KWallet, KeePassXC) when available; otherwise the
// kernel keyring, which is in memory only and cleared on reboot or WSL restart.
import { AsyncEntry } from '@napi-rs/keyring';
import { SERVICE_NAME, ACCOUNT_NAME, LOG_PREFIX } from './const.js';

let store;

function getStore() {
    if (store) return store;

    if (process.platform !== 'linux') {
        store = { entry: new AsyncEntry(SERVICE_NAME, ACCOUNT_NAME), persistent: true, name: 'os-keychain' };
        return store;
    }

    // Choose the Linux store explicitly rather than relying on the library's silent fallback,
    // so we can tell the user when tokens will not survive a restart.
    try {
        store = {
            entry: new AsyncEntry(SERVICE_NAME, ACCOUNT_NAME, { linux: { store: 'secret-service' } }),
            persistent: true,
            name: 'secret-service'
        };
    } catch {
        store = {
            entry: new AsyncEntry(SERVICE_NAME, ACCOUNT_NAME, { linux: { store: 'keyutils' } }),
            persistent: false,
            name: 'kernel-keyring'
        };
        console.error(`${LOG_PREFIX} No Secret Service found; using the kernel keyring. Tokens are kept in memory only and you will need to sign in again after a reboot or WSL restart.`);
    }
    return store;
}

// Stored as UTF-8 bytes. setPassword stores UTF-16 on Windows, which halves the
// usable size of Credential Manager's 2560-byte limit.
export async function saveTokens(tokens) {
    const bytes = new TextEncoder().encode(JSON.stringify(tokens));
    await getStore().entry.setSecret(bytes);
}

export async function loadTokens() {
    const secret = await getStore().entry.getSecret();
    return secret ? JSON.parse(Buffer.from(secret).toString('utf8')) : null;
}

export async function deleteTokens() {
    await getStore().entry.deleteCredential();
}

export function storageInfo() {
    const { name, persistent } = getStore();
    return { storage: name, persistent };
}
