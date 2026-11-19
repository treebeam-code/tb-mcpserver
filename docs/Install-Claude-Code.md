# Installing Claude Code

## What is Claude Code?

**Claude Code** is an AI assistant made by Anthropic that you interact with through a chat-like interface — but instead of just answering questions, it can also take actions on your computer, like reading files, running the TreeBeam MCP server, and managing your financial data.

Think of it like having a very smart assistant sitting next to you who can both talk to you *and* actually do things on your computer when you ask.

> **Before you begin:** Claude Code itself doesn't need Node.js, but the TreeBeam MCP server does. If you haven't installed Node.js yet, see the [Node.js installation guide](./Install-Node.md).


---

## Step-by-Step Installation

### Windows

1. Open **PowerShell**: press the Windows key, type `PowerShell`, and open **Windows PowerShell**

2. Type the following command exactly and press **Enter**:
   ```
   irm https://claude.ai/install.ps1 | iex
   ```

3. Wait for the installation to finish. It may not show progress while it downloads; this is normal.

### Mac (and Linux or WSL)

1. Open **Terminal**: press `Cmd + Space`, type `Terminal`, and open it

2. Type the following command exactly and press **Enter**:
   ```
   curl -fsSL https://claude.ai/install.sh | bash
   ```

3. Wait for the installation to finish.

### Check it worked

Close the terminal window, open a new one, then type the following and press **Enter**:
```
claude --version
```
You should see a version number. If you get "command not found" or "not recognized", see the [installation troubleshooting guide](https://code.claude.com/docs/en/troubleshoot-install).

Claude Code keeps itself up to date automatically.

---

## Starting Claude Code

After installation, you can launch Claude Code any time by opening your terminal and typing:

```
claude
```

The first time you run it, Claude will ask you to log in with your Anthropic account. Claude Code needs a paid Claude plan (such as Pro or Max) or a Claude Console account; the free plan doesn't include it. You can sign up at **[claude.ai](https://claude.ai)**.

---

## Connecting TreeBeam to Claude Code

First install the TreeBeam MCP server (`npm install -g @treebeam/mcp`), then run this once in your terminal:

```
claude mcp add --scope user treebeam -- treebeam-mcp
```

See [Client Configuration](../README.md#client-configuration) in the main README for other options.

After that, just ask Claude things like:

- *"Log me in to TreeBeam"*
- *"List my organizations"*
- *"Show me the projects in my organization"*

Claude will handle everything from there.

---

## Need Help?

- Official Claude Code documentation: **[code.claude.com/docs](https://code.claude.com/docs)**
- If the TreeBeam tools don't appear in Claude Code, make sure Node.js 22 or later is installed (see the [Node.js guide](./Install-Node.md)) and run `claude mcp list` to check the connection
- For other issues, contact your team or visit the Anthropic support page
