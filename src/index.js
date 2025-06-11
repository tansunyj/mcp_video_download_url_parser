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

async function startServer() {
  try {
    const server = new McpServer({
      name: 'video-downloader-mcp',
      version: '1.0.0',
      handlers: {
        'video-download-url-parser': async (context) => {
          try {
            const { videoUrl } = context.request.body;
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
      }
    });

    await server.connect(new StdioServerTransport());
    console.log('MCP Server started successfully');
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

startServer();