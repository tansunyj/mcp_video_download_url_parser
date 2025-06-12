# MCP Video Download URL Parser

An MCP server (stdio transport) that provides video download URL parsing capabilities. This service allows you to extract download URLs for both video and audio streams from various video platforms. It can be integrated with LLM apps like Claude Desktop, Cursor or any other MCP compatible client.

<img width="1032" alt="image" src="https://github.com/tansunyj/mcp_video_download_url_parser/raw/main/docs/preview.png" />

## Features

- Exposes `parse_video_url` tool
- Extracts direct download URLs for:
  - Video streams
  - Audio streams
  - Combined formats
- Supports multiple video platforms
- Returns detailed metadata including:
  - Available quality options
  - Format information
  - File sizes
  - Video duration

## Installation and Execution

### Installing via Smithery

To install MCP Video Download URL Parser for Claude Desktop automatically via Smithery:

```bash
npx -y @smithery/cli install @tansunyj/mcp_video_download_url_parser --client claude
```

### Installing Manually
1. Clone the repo: `git clone https://github.com/tansunyj/mcp_video_download_url_parser.git`
2. Change directory: `cd mcp_video_download_url_parser`
3. Start the server: `python main.py`

## Configuring Claude Desktop

1. Add the following configuration:

```json
{
    "mcpServers": {
        "video-url-parser": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/mcp_video_download_url_parser",
                "run",
                "main.py"
            ]
        }
    }
}
```

## Example Usage

Once configured, you can use prompts like:

- "Get download links for this video: [video_url]"
- "What quality options are available for: [video_url]"
- "Extract audio download URL from: [video_url]"

## Development

To contribute to development:

```bash
git clone https://github.com/tansunyj/mcp_video_download_url_parser.git
cd mcp_video_download_url_parser
python -m pytest tests/
```

## Security

This MCP server runs locally on your machine. While it doesn't execute arbitrary code, please be careful when parsing URLs from untrusted sources.

## License

MIT License

---

[![GitHub repo](https://img.shields.io/badge/github-mcp__video__download__url__parser-blue?logo=github)](https://github.com/tansunyj/mcp_video_download_url_parser)
