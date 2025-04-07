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

### Using with Cursor

You can use DocsMCP directly with Cursor IDE using npx without installation:

```bash
npx -y docsmcp '--source=Model Context Protocol (MCP)|https://modelcontextprotocol.io/llms-full.txt'
```

This example loads the MCP documentation for use by LLMs within Cursor.

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
