import { post } from '../utils/httpClient.js';
import * as constants from '../config/constants.js';
import { JSDOM } from 'jsdom';

export const fetchVideoData = async (videoUrl) => {
    try {
        console.log('Starting fetchVideoData with URL:', videoUrl);
        
        // Step 1: Fetch the HTML document from snapvideo.co
        console.log('Sending POST request to:', constants.API_SNAPVIDEO);
        const htmlResponse = await post(constants.API_SNAPVIDEO, { videoUrl });
        console.log('Raw HTML Response:', htmlResponse.data);
        
        // Check if response is HTML
        if (typeof htmlResponse.data === 'string' && htmlResponse.data.trim().startsWith('<!doctype')) {
            console.log('Received HTML response as expected');
        } else {
            console.warn('Unexpected response format:', typeof htmlResponse.data);
        }

        // Create a new DOM using jsdom
        const dom = new JSDOM(htmlResponse.data);
        const document = dom.window.document;

        // Step 2: Extract the token from the HTML document
        const tokenInput = document.querySelector('input[id="token"]');
        console.log('Token element found:', tokenInput);
        const token = tokenInput ? tokenInput.getAttribute('value') : null;
        console.log('Extracted token:', token);

        // Step 3: Calculate the hash value
        const hash = calculateHash(videoUrl);
        console.log('Calculated hash:', hash);

        // Step 4: Call the video data API
        console.log('Sending request to video data API with params:', {
            url: videoUrl,
            token,
            hash
        });
        
        const videoDataResponse = await post(constants.API_VIDEO_DATA, {
            url: videoUrl,  // 将 videoUrl 改为 url
            token,
            hash
        });
        
        console.log('Video data API response:', videoDataResponse.data);
        return videoDataResponse.data;
    } catch (error) {
        console.error('Detailed error information:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            response: error.response ? {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            } : 'No response data'
        });
        throw error;
    }
};

const calculateHash = (url) => {
    const hash = btoa(url) + "L" + (url.length + 1000) + "L" + btoa("aio-dl");
    console.log('Hash calculation:', {
        input: url,
        output: hash
    });
    return hash;
};