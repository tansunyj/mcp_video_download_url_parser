// src/index.js

import express from 'express';
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