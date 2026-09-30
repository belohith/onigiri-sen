import { NextRequest, NextResponse } from "next/server";
import { knowledge, KnowledgeChunk } from "../../lib/knowledge";

type ScoredChunk = KnowledgeChunk & { score: number };

function retrieve(query: string, topK = 4): ScoredChunk[] {
  const words = query.toLowerCase().split(/\W+/).filter((w: string) => w.length > 2);
  return knowledge
    .map((chunk: KnowledgeChunk): ScoredChunk => {
      const text = (chunk.tags.join(" ") + " " + chunk.content).toLowerCase();
      const score = words.reduce((s: number, w: string) => s + (text.includes(w) ? 1 : 0), 0);
      return { ...chunk, score };
    })
    .sort((a: ScoredChunk, b: ScoredChunk) => b.score - a.score)
    .slice(0, topK)
    .filter((c: ScoredChunk) => c.score > 0);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m: { role: string; content: string }) => m.role === "user");
    const query = lastUser?.content || "";

    const chunks = retrieve(query);
    const context = chunks.length > 0
      ? chunks.map((c: ScoredChunk) => c.content).join("\n\n")
      : "No specific information found — answer generally about Onigiri Sen.";

    const systemPrompt = `You are the friendly AI assistant for Onigiri Sen, a Japanese onigiri company based in Seattle. Answer questions about the company, products, locations, and anything else in the context below. Be warm, concise, and helpful. If you don't know something, say so honestly and suggest visiting onigirisen.com.

Respond in the same language the user writes in. If they write in Japanese, respond in Japanese.

KNOWLEDGE BASE:
${context}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.content?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Ask API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}