import express from 'express';
import { streamText } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

const router = express.Router();

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

router.post('/', async (req, res) => {
  const { messages } = req.body;
  console.log('[POST /api/chat] 收到消息:', messages);

  try {
    const result = await streamText({
      model: deepseek('deepseek-chat'),
      messages,
      system: "You are a chatbot for an e-commerce platform. Your answer must be within 150 words.",
    });

    let fullText = '';
    for await (const chunk of result.textStream) {
      fullText += chunk;
    }

    res.json({
      id: Date.now().toString(),
      role: 'assistant',
      parts: [{ type: 'text', text: fullText }],
    });
  } catch (err) {
    console.error('❌ 调用 deepseek 失败:', err);
    res.status(500).json({ error: '调用 deepseek 失败' });
  }
});

export default router;
