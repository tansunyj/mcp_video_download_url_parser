// src/index.js

import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchVideoData } from './services/videoService.js';

const app = express();
app.use(express.json());

app.post('/api/videoDownload', async (req, res) => {
    try {
        const { videoUrl } = req.body;
        const data = await fetchVideoData(videoUrl);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const VERSION = "1.0.0";

async function startServer() {
  try {
    // Create MCP server instance
    const server = new McpServer({
      name: 'video-downloader-mcp',
      version: VERSION
    });

    // Register video download tool
    server.tool({
      name: 'video-download-url-parser',
      description: 'Extract video download information from URL',
      parameters: {
        type: 'object',
        properties: {
          videoUrl: {
            type: 'string',
            description: 'URL of the video to process'
          }
        },
        required: ['videoUrl']
      },
      handler: async (context) => {
        try {
          const { videoUrl } = context.parameters;
          const result = await fetchVideoData(videoUrl);
          return {
            success: true,
            data: result
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    });

    // Connect using stdio transport
    await server.connect(new StdioServerTransport());
    console.log('MCP Server started successfully');
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

// Start the server
startServer().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});