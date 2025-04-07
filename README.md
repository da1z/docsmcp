# DocsMCP

A Model Context Protocol (MCP) server that provides documentation access to LLMs.

## Overview

DocsMCP enables Large Language Models (LLMs) to access and query documentation from specified sources, whether from local files or remote URLs. It uses the Model Context Protocol (MCP) to facilitate communication between the LLM and documentation sources.

## Installation

```bash
npm install -g docsmcp
# or
pnpm add -g docsmcp
```

## Usage

### Cursor MCP Configuration

You can also configure DocsMCP in your Cursor project by creating a `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "docs-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "docsmcp",
        "'--source=Model Context Protocol (MCP)|https://modelcontextprotocol.io/llms-full.txt'"
      ]
    }
  }
}
```

This configuration allows Cursor AI to use the documentation MCP server automatically when you open your project.

## Available Tools

The MCP server provides two main tools:

### getDocumentationSources

Lists all available documentation sources that have been configured.

### getDocumentation

Fetches and parses documentation from a given URL or local file path.

Parameters:

- `url`: The URL or file path to fetch the documentation from

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm run dev
```

## License

[MIT](LICENSE)
