import * as dotenv from 'dotenv';
import express from 'express';
import { type ChatConfig, Ling } from "@bearbobo/ling";
import { pipeline } from 'node:stream/promises';

dotenv.config({
    path: ['.env.local', '.env']
});

const apiKey: string = process.env.VITE_DEEPSEEK_API_KEY as string;
const endpoint: string = process.env.VITE_DEEPSEEK_ENDPOINT as string;
const modelName: string = process.env.VITE_DEEPSEEK_MODEL_NAME as string;

const app = express();
const port: number = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});