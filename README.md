# <div align="center">Video Downloader MCP</div>

<div align="center">

![](https://img.shields.io/badge/node.js-blue.svg?logo=node.js&logoColor=white&labelColor=339933&color=339933&style=flat-square)
![](https://img.shields.io/badge/mcp-blue.svg?logo=server&labelColor=192c3b&color=192c3b&style=flat-square)
![](https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square)
</div>

A video download service based on the Model Context Protocol (MCP). The service provides a simple API interface that allows users to extract and download video/audio content from various platforms.

基于 Model Context Protocol (MCP) 的视频下载服务。提供了简单的API接口，允许从各种视频平台提取和下载视频/音频内容。

## <div align="center">🚩Features</div>
<div align="center">

| 功能描述 | 状态 |
|---------|------|
| 视频信息提取 | ✅ 已完成 |
| 视频下载链接获取 | ✅ 已完成 |
| 多清晰度支持 | ✅ 已完成 |
| 音频提取 | ✅ 已完成 |

</div>

## <div align="center">⚙️Installation</div>

```bash
git clone https://github.com/your-username/video-downloader-mcp.git
cd video-downloader-mcp
npm install
```

## <div align="center">▶️Quick Start</div>

### CLI
```bash
npm run build
npm run start:dist
```

### MCP Server Configuration
```json
{
  "mcpServers": {
    "video-downloader-mcp": {
      "command": "cmd.exe",
      "args": [
        "/c",
        "node",
        "dist/index.js"
      ]
    }
  }
}
```

## <div align="center">📚Documentation</div>

### Project Structure
```
mcp-service
├── src
│   ├── index.js          # Entry point
│   ├── services
│   │   └── videoService.js  # Video processing service
│   ├── utils
│   │   └── httpClient.js    # HTTP utilities
│   └── config
│       └── constants.js     # Configuration constants
├── package.json
└── README.md
```

### Handler Usage
The service provides a handler `video-download-url-parser` that accepts a video URL and returns download information:

Input:
```json
{
  "videoUrl": "https://www.youtube.com/watch?v=0fPC8zfgIZw&t=1s"
}
```

Output:
```json


{
    "url": "https://www.youtube.com/watch?v=0fPC8zfgIZw&t=1s",
    "title": "魂哭：被杀少女附身女护士复仇",
    "thumbnail": "https://i.ytimg.com/vi/0fPC8zfgIZw/maxresdefault.jpg",
    "duration": "13:51",
    "source": "youtube",
    "medias": [
        {
            "url": "https://ytdl.snapapi.space/download/?id=0fPC8zfgIZw&itaga=140&time=1749639912&token=45ee0fed9377d9ce9db7608bee051f84",
            "quality": "128kbps",
            "extension": "mp3",
            "size": 13445076,
            "formattedSize": "12.82 MB",
            "videoAvailable": true,
            "audioAvailable": false,
            "chunked": false,
            "cached": false
        },
        {
            "url": "https://ytdl.snapapi.space/download/?id=0fPC8zfgIZw&itaga=251&time=1749639912&token=45ee0fed9377d9ce9db7608bee051f84",
            "quality": "160kbps",
            "extension": "mp3",
            "size": 11027137,
            "formattedSize": "10.52 MB",
            "videoAvailable": true,
            "audioAvailable": false,
            "chunked": false,
            "cached": false
        },
        {
            "url": "https://snapvideo.snapapi.space/y-download.php?url=https%3A%2F%2Frr1---sn-8pxuuxa-i5o6d.googlevideo.com%2Fvideoplayback%3Fexpire%3D1749661515%26ei%3D62JJaOS9NKW12roPyfnFkAM%26ip%3D27.76.168.250%26id%3Do-AEhhCt1NnD3aEzvXcTEuJlfzRDCkyvmF4DTbZ7EujlsI%26itag%3D18%26source%3Dyoutube%26requiressl%3Dyes%26xpc%3DEgVo2aDSNQ%253D%253D%26met%3D1749639915%252C%26mh%3DU1%26mm%3D31%252C26%26mn%3Dsn-8pxuuxa-i5o6d%252Csn-ogul7n7k%26ms%3Dau%252Conr%26mv%3Dm%26mvi%3D1%26pl%3D23%26rms%3Dau%252Cau%26initcwndbps%3D1893750%26bui%3DAY1jyLPp-I2z5K8tIBOduTuVqs0IHHCnnjqFEpvq2FgkXu2JL6fUWxyQNAXrlE5jj6kdGp0Nn_kw-s-e%26vprv%3D1%26svpuc%3D1%26mime%3Dvideo%252Fmp4%26ns%3DcVI-VqnHbOcjTQbC_0MPib4Q%26rqh%3D1%26cnr%3D14%26ratebypass%3Dyes%26dur%3D830.717%26lmt%3D1734280795918221%26mt%3D1749639415%26fvip%3D2%26lmw%3D1%26c%3DTVHTML5%26sefc%3D1%26txp%3D6208224%26n%3DCmkUMkRHoGykLw%26sparams%3Dexpire%252Cei%252Cip%252Cid%252Citag%252Csource%252Crequiressl%252Cxpc%252Cbui%252Cvprv%252Csvpuc%252Cmime%252Cns%252Crqh%252Ccnr%252Cratebypass%252Cdur%252Clmt%26sig%3DAJfQdSswRAIgKdv2u9bqMT5w5OF20R00hZHHnh4dqASuLYphN1qGxbkCIHTArV25HhNS42ryqL-PuYfC1B8Z4ayl3PcXjy4NYY4I%26lsparams%3Dmet%252Cmh%252Cmm%252Cmn%252Cms%252Cmv%252Cmvi%252Cpl%252Crms%252Cinitcwndbps%26lsig%3DAPaTxxMwRAIgKlWjySYcJc7lqFDnw5dmD9abLTXRuoQ10_zncyAgG8YCIEC3lxcnu4GSR3j8GVN7vFFh5mNZ9qseKfyxsLO8yMYg&title=snapvideo.co--%E9%AD%82%E5%93%AD%EF%BC%9A%E8%A2%AB%E6%9D%80%E5%B0%91%E5%A5%B3%E9%99%84%E8%BA%AB%E5%A5%B3%E6%8A%A4%E5%A3%AB%E5%A4%8D%E4%BB%87.mp4",
            "quality": "360p",
            "extension": "mp4",
            "size": "0",
            "formattedSize": "",
            "videoAvailable": true,
            "audioAvailable": true,
            "chunked": false,
            "cached": false
        },
        {
            "url": "https://ytdl.snapapi.space/download?id=0fPC8zfgIZw&itagv=136&itaga=140&time=1749639912&token=45ee0fed9377d9ce9db7608bee051f84",
            "quality": "720p",
            "extension": "mp4",
            "size": 37294661,
            "formattedSize": "35.57 MB",
            "videoAvailable": true,
            "audioAvailable": true,
            "chunked": false,
            "cached": false
        },
        {
            "url": "https://ytdl.snapapi.space/download?id=0fPC8zfgIZw&itagv=137&itaga=140&time=1749639912&token=45ee0fed9377d9ce9db7608bee051f84",
            "quality": "1080p",
            "extension": "mp4",
            "size": 54733834,
            "formattedSize": "52.2 MB",
            "videoAvailable": true,
            "audioAvailable": true,
            "chunked": false,
            "cached": false
        }
    ],
    "sid": null
}


```

## <div align="center">👉️Reference</div>
- [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## <div align="center">License</div>
This project is licensed under the MIT License.