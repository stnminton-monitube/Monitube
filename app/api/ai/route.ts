import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(req: NextRequest) {
  const { message, context } = await req.json();
  if (!message) return NextResponse.json({ error: "No message" }, { status: 400 });

  if (!ANTHROPIC_KEY) {
    return NextResponse.json({
      reply: "AI chat requires an Anthropic API key. Add ANTHROPIC_API_KEY to your .env.local file to enable live AI responses.",
    });
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_KEY });

  const systemPrompt = `You are the Monitube AI assistant — a team performance analyst for a YouTube channel owner.

You have access to the following data about the channel and team:

${context}

Your job:
- Answer questions about team performance in plain, friendly English
- Compare team members fairly using data
- Suggest bonuses when asked, backed by numbers
- Flag concerns (someone underperforming, not getting enough videos, etc.)
- Be concise — 2-4 sentences unless asked for detail
- Use specific numbers from the data
- Never make up data — only use what's provided above
- Be encouraging but honest

The channel owner is not technical. Avoid jargon. Explain stats in context ("48% retention means people watch almost half of each video on average — that's solid").`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const textBlock = response.content.find(b => b.type === "text");
    return NextResponse.json({ reply: textBlock?.text ?? "I couldn't generate a response." });
  } catch (e) {
    console.error("AI error:", e);
    return NextResponse.json({ reply: "Something went wrong with the AI. Try again." });
  }
}
