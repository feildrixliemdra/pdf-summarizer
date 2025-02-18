import { handleAPIError } from '@/lib/error';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: text is required' },
        { status: 400 }
      );
    }
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Please summarize this document in clear, concise bullet points. Focus on key findings, main arguments, and critical data. Document content: ${text}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('error: ', error);

      throw new Error(error.error.message || 'failed to summarize document');
    }

    const data = await response.json();

    return NextResponse.json({
      summary: data.choices[0].message.content,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}
