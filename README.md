# @treebeam/mcp

MCP (Model Context Protocol) server for [TreeBeam](https://www.treebeam.com) — a financial management and accounting platform. This server lets AI assistants interact with your TreeBeam organizations and projects through any MCP-compatible client.

## Prerequisites

- **Node.js** 18 or later
- A **TreeBeam account** — sign up at [treebeam.com](https://www.treebeam.com)

## Installation

### npm (recommended)

```bash
npm install -g @treebeam/mcp
```

### From source

```bash
git clone https://github.com/treebeam-code/tb-mcpserver.git
cd tb-mcpserver
npm install
```

## Authentication

The server uses OAuth 2.0 device flow for authentication. Tokens are stored securely in your OS keychain (macOS Keychain, Windows Credential Vault, or Linux Secret Service). Once authenticated, tokens are cached and refreshed automatically.

### In your AI assistant (recommended)

The easiest way to authenticate is directly inside your AI conversation. Just ask the assistant to log in to TreeBeam — it will use the `treebeam_login` tool to start the device flow, provide you with a link, and handle the rest automatically. No terminal commands needed.

You can also ask the assistant to check your auth status or log out at any time using the `treebeam_auth_status` and `treebeam_logout` tools.

### Command line (alternative)

If you prefer to authenticate outside of your AI client, you can use the CLI directly:

```bash
treebeam-mcp login       # Opens browser to complete sign-in
treebeam-mcp status      # Check current auth status
treebeam-mcp logout      # Remove stored credentials
```

> If running from source, replace `treebeam-mcp` with `npm run` in the commands above.

## Client Configuration

Add the TreeBeam MCP server to your client's config file. The JSON structure is the same across clients — only the file location differs.

**Config file locations:**

| Client | Path |
|--------|------|
| **Claude Desktop (macOS)** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Claude Desktop (Windows)** | `%APPDATA%\Claude\claude_desktop_config.json` |
| **Claude Code** | `~/.claude/settings.json` or project `.mcp.json` |

#### If installed globally via npm:

```json
{
  "mcpServers": {
    "treebeam": {
      "command": "treebeam-mcp"
    }
  }
}
```

#### If running from source:

```json
{
  "mcpServers": {
    "treebeam": {
      "command": "node",
      "args": ["/absolute/path/to/tb-mcpserver/src/index.js"]
    }
  }
}
```

### Other MCP Clients

Any MCP-compatible client can use this server. Configure it as a **stdio** transport — the client launches the process and communicates over stdin/stdout.

## Available Tools

Once connected, the following tools are available to your AI assistant:

| Tool | Description |
|------|-------------|
| `treebeam_login` | Authenticate via device flow (opens browser) |
| `treebeam_logout` | Remove stored credentials from OS keychain |
| `treebeam_auth_status` | Check whether a valid token exists and when it expires |
| `list_organizations` | List all accounting organizations you have access to |
| `list_projects` | List all projects, optionally filtered by organization ID |

Authentication is handled automatically — if your token expires during a session, the server initiates re-authentication via device flow.

## Troubleshooting

### "Not authenticated" errors

Run `treebeam-mcp login` (or `npm run login` from source) to re-authenticate. If the problem persists, run `treebeam-mcp logout` first to clear stale credentials, then log in again.

### Keychain access issues

The server uses [keytar](https://github.com/nicktasso/keytar) for OS keychain storage. On Linux, ensure `libsecret` is installed:

```bash
# Debian/Ubuntu
sudo apt install libsecret-1-dev

# Fedora
sudo dnf install libsecret-devel
```

### Node.js version

Verify you're running Node.js 18+:

```bash
node --version
```

## License

[Apache License 2.0](LICENSE) — Copyright 2026 TNS Solutions, Inc.
