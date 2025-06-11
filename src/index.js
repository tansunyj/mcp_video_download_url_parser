// src/index.js

import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchVideoData } from './services/videoService.js';
import { z } from 'zod';
import { extractUrlFromText } from './utils/textParser.js';

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
    server.tool(
      'video-download-url-parser',
      '从文本中提取视频URL并获取下载信息，支持多种清晰度和音频提取。',
      {
        videoUrl: z.string().describe('包含视频URL的文本。可以是一段话中包含视频链接，例如："我看到一个很好的视频 https://www.youtube.com/watch?v=example 希望下载下来"')
      },
      async ({ videoUrl }) => {
        try {
          // Extract URL from input text
          const extractedUrl = extractUrlFromText(videoUrl);
          if (!extractedUrl) {
            return {
              content: [
                {
                  type: 'json',
                  data: {
                    success: false,
                    error: '未能从输入文本中找到有效的视频URL'
                  }
                }
              ]
            };
          }

          const result = await fetchVideoData(extractedUrl);
          return {
            content: [
              {
                type: 'json',
                data: {
                  success: true,
                  originalText: videoUrl,
                  extractedUrl: extractedUrl,
                  data: result
                }
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'json',
                data: {
                  success: false,
                  error: error.message
                }
              }
            ]
          };
        }
      }
    );

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