export interface Env {
  AI: Ai;
  VECTORIZE: VectorizeIndex;
}

// CORS headers — allows your Next.js site to call this Worker
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { messages } = await request.json() as { messages: { role: string; content: string }[] };
      if (!messages || !Array.isArray(messages)) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
      }

      // ── STEP 1: Get the latest user question ──
      const lastUser = [...messages].reverse().find(m => m.role === "user");
      const query = lastUser?.content ?? "";

      // ── STEP 2: Embed the query ──
      const embedResponse = await env.AI.run("@cf/baai/bge-small-en-v1.5", {
        text: [query],
      }) as { data: number[][] };

      const queryVector = embedResponse.data[0];

      // ── STEP 3: Search Vectorize for similar chunks ──
      const searchResult = await env.VECTORIZE.query(queryVector, {
        topK: 4,
        returnMetadata: "all",
      });

      // ── STEP 4: Build context from retrieved chunks ──
      const context = searchResult.matches
        .filter(m => m.score > 0.3)
        .map(m => m.metadata?.text as string)
        .filter(Boolean)
        .join("\n\n");

      // Lower threshold to get more chunks — we rely on the prompt to filter
      const systemPrompt = context
        ? `Here is the only information you have about Onigiri Sen:\n\n${context}\n\nUsing ONLY the information above, answer the user's question in a warm and friendly tone. Do not add any information that is not in the text above. If the answer is not in the text, say "I don't have that information — please visit onigirisen.com." Respond in the same language the user uses.`
        : `You are a helpful assistant for Onigiri Sen, a Japanese onigiri company in Seattle. You don't have specific information to answer this question. Please direct the user to onigirisen.com for help.`;

      // ── STEP 5: Generate answer with Llama ──
      const llmMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];

      const llmResponse = await env.AI.run("@cf/mistralai/mistral-small-3.1-24b-instruct", {
        messages: llmMessages,
        max_tokens: 512,
      }) as { response?: string; result?: { response: string } };

      const answer = llmResponse.response || (llmResponse.result as any)?.response || "I don't have that information — please visit onigirisen.com for help.";

      return Response.json(
        { answer },
        { headers: corsHeaders }
      );

    } catch (err) {
      console.error("Worker error:", err);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500, headers: corsHeaders }
      );
    }
  },
};