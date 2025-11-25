import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GOOGLE_API_KEY) {
            return res.status(503).json({
                error: 'Gemini API key not configured',
                message: 'I am currently in demo mode. Please configure my API key to unlock my full potential!'
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: "You are Code Sage, a friendly and encouraging coding mentor superhero. You help students learn to code with patience and clear explanations. Keep answers concise and helpful." }],
                },
                {
                    role: 'model',
                    parts: [{ text: "I am ready to help! I'm Code Sage, your coding superhero mentor. Ask me anything about code!" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('Error chatting with AI:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
};
