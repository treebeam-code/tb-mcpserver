# Installing Claude Code

## What is Claude Code?

**Claude Code** is an AI assistant made by Anthropic that you interact with through a chat-like interface — but instead of just answering questions, it can also take actions on your computer, like reading files, running the TreeBeam MCP server, and managing your financial data.

Think of it like having a very smart assistant sitting next to you who can both talk to you *and* actually do things on your computer when you ask.

> **Before you begin:** Claude Code requires **Node.js** to be installed first. If you haven't done that yet, see the [Node.js installation guide](./Install-Node.md). 
You only need Git if you're installing the TreeBeam MCP server **from source** (i.e., directly from the code repository). If you installed it using `npm install -g @treebeam/mcp`, you can skip this entirely.


---

## Step-by-Step Installation

### Windows & Mac (same steps)

1. Open **Command Prompt** (Windows) or **Terminal** (Mac)
   - **Windows:** Press the Windows key, type `cmd`, open **Command Prompt**
   - **Mac:** Press `Cmd + Space`, type `Terminal`, open it

2. Type the following command exactly and press **Enter**:
   ```
   npm install -g @anthropic-ai/claude-code
   ```

3. Wait for the installation to finish — you'll see some text scrolling by. This is normal and usually takes less than a minute.

4. Once it's done, type the following and press **Enter** to confirm it worked:
   ```
   claude --version
   ```
   You should see a version number like `1.x.x`.

---

## Starting Claude Code

After installation, you can launch Claude Code any time by opening your terminal and typing:

```
claude
```

The first time you run it, Claude will ask you to log in with your Anthropic account. If you don't have one, you can sign up at **[claude.ai](https://claude.ai)**.

---

## Connecting TreeBeam to Claude Code

Once Claude Code is running, you can connect it to TreeBeam by adding the MCP server configuration. See the [Client Configuration](../README.md#client-configuration) section in the main README for the exact steps.

After that, just ask Claude things like:

- *"Log me in to TreeBeam"*
- *"List my organizations"*
- *"Show me the projects in my organization"*

Claude will handle everything from there.

---

## Need Help?

- Official Claude Code documentation: **[docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview)**
- If Claude Code won't start, make sure Node.js 22 or later is installed (see the [Node.js guide](./Install-Node.md))
- For other issues, contact your team or visit the Anthropic support page
