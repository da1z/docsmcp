#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

interface DocSource {
  name: string;
  location: string;
  description: string;
}

const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return str.startsWith('http://') || str.startsWith('https://');
  } catch {
    return false;
  }
};

const args = process.argv;
const docSources: DocSource[] = [];
args.forEach((arg) => {
  if (arg.startsWith('--source=')) {
    const sourceValue = arg.replace('--source=', '');

    const [name, location, description = ''] = sourceValue.split('|');
    if (!name || !location) {
      throw new Error('Invalid source format ' + sourceValue);
    }

    docSources.push({
      name,
      location,
      description,
    });
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
    const sources = docSources.map(({ name, location, description }) => ({
      name,
      location,
      description,
    }));

    return {
      content: [
        {
          type: 'text',
          text: sources
            .map(
              ({ name, location, description }) =>
                `${name}: ${isUrl(location) ? 'URL - ' : 'File - '}${location}${
                  description ? ` - ${description}` : ''
                }`
            )
            .join('\n'),
        },
      ],
    };
  }
);

server.tool(
  'getDocumentation',
  `Fetch and parse documentation from a given URL or local file path.
  `,
  {
    url: z
      .string()
      .describe('The URL or file path to fetch the documentation from'),
  },
  async ({ url }) => {
    let text;

    if (isUrl(url)) {
      const response = await fetch(url);
      text = await response.text();
    } else {
      try {
        const filePath = path.resolve(url);
        text = await fs.readFile(filePath, 'utf-8');
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error reading local file: ${error.message}`,
            },
          ],
        };
      }
    }

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
