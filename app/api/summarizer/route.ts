import { handleAPIError } from '@/lib/error';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: `${process.env.DEEPSEEK_API_KEY}`,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: text is required' },
        { status: 400 }
      );
    }
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that summarizes text in clear and concise bullet points.`,
        },
        {
          role: 'user',
          content: `Please summarize this document in clear, concise bullet points. Focus on key findings, main arguments, and critical data. Document content: ${text}`,
        },
      ],
      model: 'deepseek-chat',
      temperature: 1,
    });
    if (!response.choices[0].message.content) {
      throw new Error('Failed to summarize document: No content returned');
    }

    const data = response;

    return NextResponse.json({
      summary: data.choices[0].message.content,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}
