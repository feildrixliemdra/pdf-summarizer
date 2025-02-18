import { handleAPIError } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "failed to summarize document");
    }

    const data = await response.json();

    return NextResponse.json({
      summary: data.choices[0].message.content,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}
