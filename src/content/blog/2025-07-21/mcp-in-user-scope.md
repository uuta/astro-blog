---
title: Install MCP servers with User Scope
author: uuta
pubDatetime: 2025-07-21T23:11:06.130Z
featured: false
draft: false
tags:
  - Tech
  - AI
description: Modify ~/.mcp.json to install MCP servers with User Scope
---

## Problem
I understand the following command is introduced in Anthropic.

> Add a user server
> claude mcp add my-user-server -s user /path/to/server
-[Model Context Protocol (MCP) - Anthropic](https://docs.anthropic.com/en/docs/claude-code/mcp)

However, I wasn't sure how to register MCP servers with complicated configurations. The above command means adding a simple MCP server, but even if we need to improve it more, the solution doesn't seem to be written in Anthropic document, so we should get to know it.

## Conclusion
Check `~/.mcp.json`. Let's take an example, suppose I executed the following command that registers a MCP server in User scope (I'm presenting [BeehiveInnovations/zen-mcp-server](https://github.com/BeehiveInnovations/zen-mcp-server) as an example, but no need to use Zen MCP server, use MCP servers whatever you need)

```sh
claude mcp add zen -s user ~/zen-mcp-server/.zen_venv/bin/python
```

Take a look at `~/.mcp.json`, yes we can confirm Zen MCP server is registered in `~/.mcp.json`. By configuring this setting, Claude Code would recognize Zen MCP server with User Scope.

```json
{
  ...
  "mcpServers": {
    "zen": {
      "type": "stdio",
      "command": "/Users/{username}/zen-mcp-server/.zen_venv/bin/python",
      "args": [],
      "env": {}
    }
  }
}
```

Based on the example in [BeehiveInnovations/zen-mcp-server](https://github.com/BeehiveInnovations/zen-mcp-server), update the above configuration like the following one.

```json
{
  ...
  "mcpServers": {
    "zen": {
      "type": "stdio",
      "command": "/Users/{username}/zen-mcp-server/.zen_venv/bin/python",
      "args": ["/Users/{username}/zen-mcp-server/server.py"],
      "env": {
		"PYTHONPATH": "/Users/{username}/zen-mcp-server"
      }
    }
  }
}
```

For test, make a directory and execute `claude`.

```sh
mkdir mcp-test
cd mcp-test
claude --dangerously-skip-permissions
```

We can see suggestions when `/zen` command is entered.
![zen](assets/images/2025-07-21/mcp-in-user-scope/zen.png)

Confirm `/zen` command works well. So yes we can add MCP servers in local scope by updating `~/.mcp.json` whatever we want.
![thinking](assets/images/2025-07-21/mcp-in-user-scope/thinking.png)
