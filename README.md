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

Launch the MCP server with documentation sources specified as arguments:

```bash
docsmcp --source="Name|Location|Description"
```

Where:

- `Name`: The identifier for the documentation source
- `Location`: A file path or URL where the documentation is located
- `Description`: (Optional) A brief description of the documentation

Example:

```bash
docsmcp --source="Express|https://expressjs.com/en/api.html|Express.js API documentation" --source="LocalDocs|./docs/api.md|Project API documentation"
```

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
