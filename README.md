# MCP Service

This project is an MCP service that allows users to extract video URLs and download video or audio content from the provided links.

## Features

- Extracts video URLs from user input.
- Fetches a token from the SnapVideo website.
- Computes a hash value for the video URL.
- Calls the SnapVideo API to retrieve video and audio data for download.

## Project Structure

```
mcp-service
├── src
│   ├── index.js          # Entry point of the application
│   ├── services
│   │   ├── videoService.js  # Service for fetching video data
│   │   └── hashService.js    # Service for calculating hash values
│   ├── utils
│   │   └── httpClient.js      # Utility functions for HTTP requests
│   └── config
│       └── constants.js        # Configuration constants
├── package.json          # NPM configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd mcp-service
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   node src/index.js
   ```

## Usage

- Input a video URL and any additional text when prompted.
- The service will process the input and provide options for downloading the video or audio.

## License

This project is licensed under the MIT License.