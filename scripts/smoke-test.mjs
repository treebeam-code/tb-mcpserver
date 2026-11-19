// Starts the server over stdio, performs the MCP handshake, and checks the tool list.
// No TreeBeam sign-in or network access is needed. Exits non-zero on failure.
// Usage: node scripts/smoke-test.mjs
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const TIMEOUT_MS = 20000;

const server = spawn(process.execPath, ['src/index.js'], { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] });
let stderr = '';
server.stderr.on('data', (chunk) => { stderr += chunk; });

const pending = new Map();
createInterface({ input: server.stdout }).on('line', (line) => {
    let message;
    try {
        message = JSON.parse(line);
    } catch {
        fail(`Non-JSON output on stdout (stdout must carry only MCP messages): ${line.slice(0, 200)}`);
    }
    pending.get(message.id)?.(message);
});

server.on('exit', (code) => fail(`Server exited early with code ${code}`));
const timer = setTimeout(() => fail(`Timed out after ${TIMEOUT_MS}ms`), TIMEOUT_MS);

function fail(reason) {
    console.error(`FAIL: ${reason}`);
    if (stderr) console.error(`--- server stderr ---\n${stderr}`);
    server.kill();
    process.exit(1);
}

function request(id, method, params) {
    return new Promise((resolve) => {
        pending.set(id, resolve);
        server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    });
}

const init = await request(1, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'smoke-test', version: '0' }
});
if (init.error) fail(`initialize returned an error: ${JSON.stringify(init.error)}`);
const { name, version } = init.result.serverInfo;
if (name !== pkg.name) fail(`serverInfo name is ${name}, expected ${pkg.name}`);
server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

const list = await request(2, 'tools/list', {});
if (list.error) fail(`tools/list returned an error: ${JSON.stringify(list.error)}`);
const tools = list.result.tools;
if (!Array.isArray(tools) || tools.length === 0) fail('tools/list returned no tools');
const invalid = tools.filter((t) => !t.name || t.inputSchema?.type !== 'object');
if (invalid.length) fail(`Tools missing a name or an object inputSchema: ${invalid.map((t) => t.name).join(', ')}`);
const names = tools.map((t) => t.name);
const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
if (duplicates.length) fail(`Duplicate tool names: ${[...new Set(duplicates)].join(', ')}`);

clearTimeout(timer);
server.removeAllListeners('exit');
server.kill();
console.log(`PASS: ${name}@${version} initialized on Node ${process.versions.node} with ${tools.length} tools`);
