import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3008;

// ✅ 允许跨域请求
app.use(cors());

// ✅ 解析 JSON 请求体
app.use(express.json());

// ✅ 注册路由
app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
