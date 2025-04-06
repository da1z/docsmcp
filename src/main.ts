#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const honoDocsList = 'Hono js Documentation:https://hono.dev/llms.txt';

const server = new McpServer({
  name: 'Documentation Service',
  version: '1.0.0',
});

server.tool(
  'getDocumentationSources',
  'Provides a list of available documentation sources',
  {},
  async ({}) => {
    const [name, url] = honoDocsList.split(/:(.+)/);
    const sources = [
      {
        name,
        url,
      },
    ];

    return {
      content: [
        {
          type: 'text',
          text: sources
            .map(({ name, url }) => `${name}: URL:${url}`)
            .join('\n'),
        },
      ],
    };
  }
);

server.tool(
  'getDocumentation',
  `Fetch and parse documentation from a given URL.
  `,
  {
    url: z.string().url().describe('The URL to fetch the documentation from'),
  },
  async ({ url }) => {
    const response = await fetch(url);
    const text = await response.text();

    return {
      content: [
        {
          type: 'text',
          text,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
