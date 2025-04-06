#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Define the type for documentation sources
interface DocSource {
  name: string;
  url: string;
  description: string;
}

const args = process.argv;
const docSources: DocSource[] = [];
args.forEach((arg) => {
  if (arg.startsWith('--source=')) {
    const sourceValue = arg.replace('--source=', '');

    const [name, url, description = ''] = sourceValue.split('|');
    if (!name || !url) {
      throw new Error('Invalid source format ' + sourceValue);
    }
    docSources.push({ name, url, description });
  }
});

const server = new McpServer({
  name: 'Documentation Service',
  version: '1.0.0',
});

server.tool(
  'getDocumentationSources',
  'Provides a list of available documentation sources',
  {},
  async ({}) => {
    const sources = docSources.map(({ name, url, description }) => ({
      name,
      url,
      description,
    }));

    return {
      content: [
        {
          type: 'text',
          text: sources
            .map(
              ({ name, url, description }) =>
                `${name}: URL:${url}${description ? ` - ${description}` : ''}`
            )
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
