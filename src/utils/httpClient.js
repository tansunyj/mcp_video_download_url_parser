import axios from 'axios';
import FormData from 'form-data';

export const post = async (url, data) => {
    console.log('HTTP Client - Making POST request:', {
        url,
        data,
    });
    
    try {
        let requestData;
        let headers;
        
        if (url.includes('wp-json/aio-dl/video-data')) {
            // 对于视频数据API，使用form-data格式
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            requestData = formData;
            headers = formData.getHeaders();
        } else {
            // 对于其他请求，使用默认的x-www-form-urlencoded格式
            requestData = data;
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
        }

        const response = await axios.post(url, requestData, { headers });
        
        console.log('HTTP Client - Response received:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            responseSize: response.data ? JSON.stringify(response.data).length : 0
        });
        
        return response;
    } catch (error) {
        console.error('HTTP Client - Request failed:', {
            url,
            error: {
                name: error.name,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText
            }
        });
        throw error;
    }
};