/**
 * 从文本中提取视频URL
 * @param {string} text - 包含视频URL的文本
 * @returns {string|null} - 提取到的URL或null
 */
export function extractUrlFromText(text) {
    // 支持的视频平台域名
    const videoPlatforms = [
        'youtube.com',
        'douyin.com',
        'tiktok.com',
        'instagram.com',
        'facebook.com',
        'x.com', 
        'bilibili.com',
        'vimeo.com'
    ];

    // URL正则表达式模式
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    
    // 从文本中匹配所有URL
    const matches = text.match(urlPattern);
    
    if (!matches) {
        return null;
    }

    // 遍历找到的URL，返回第一个匹配支持平台的URL
    for (const url of matches) {
        if (videoPlatforms.some(platform => url.includes(platform))) {
            return url;
        }
    }

    return null;
}