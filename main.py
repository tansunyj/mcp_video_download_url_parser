#!/usr/bin/env python3

import logging
import requests
from bs4 import BeautifulSoup
import base64
from mcp.server.fastmcp import FastMCP

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize MCP server
mcp = FastMCP("video-downloader")


def get_token():
    """Get token from snapvideo.co homepage"""
    try:
        response = requests.get('https://snapvideo.co/')
        soup = BeautifulSoup(response.text, 'html.parser')
        token_input = soup.find('input', {'id': 'token'})
        if token_input:
            return token_input.get('value')
        raise ValueError("Token not found")
    except Exception as e:
        raise Exception(f"Error getting token: {str(e)}")


def calculate_hash(url):
    """Calculate hash value using the same logic as JavaScript btoa"""
    try:
        url_b64 = base64.b64encode(url.encode()).decode()
        aio_dl_b64 = base64.b64encode("aio-dl".encode()).decode()
        hash_value = f"{url_b64}L{len(url) + 1000}L{aio_dl_b64}"
        return hash_value
    except Exception as e:
        raise Exception(f"Error calculating hash: {str(e)}")


def get_video_data(url, token, hash_value):
    """Make POST request to get video data"""
    try:
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        data = {
            'url': url,
            'token': token,
            'hash': hash_value
        }
        response = requests.post(
            'https://snapvideo.co/wp-json/aio-dl/video-data/',
            headers=headers,
            data=data
        )
        return response.json()
    except Exception as e:
        raise Exception(f"Error getting video data: {str(e)}")


@mcp.tool()
async def parser_url(url: str) -> dict:
    """Parse video URL and return video data

    Args:
        url: The video URL to parse

    Returns:
        Video information dictionary
    """
    try:
        logger.info(f"Parsing URL: {url}")
        token = get_token()
        hash_value = calculate_hash(url)
        result = get_video_data(url, token, hash_value)
        logger.info(f"Successfully parsed URL: {url}")
        return result
    except Exception as e:
        logger.error(f"Error parsing URL: {str(e)}")
        return {'error': str(e)}


if __name__ == '__main__':
    logger.info("Starting MCP server for video downloader")
    # Run the MCP server with stdio transport
    mcp.run(transport='stdio')
