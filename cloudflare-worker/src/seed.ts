// ── Seed Script ──
// Run this once to embed your knowledge chunks and store them in Vectorize.
// Run again whenever you update the knowledge base.
//
// Usage: npx wrangler d1 execute ... (see README)
// Actually run via: npx ts-node seed.ts (with env vars set)
//
// Or deploy as a temporary Worker endpoint and hit it once — see README.

import { chunks } from "./knowledge";

export interface Env {
  AI: Ai;
  VECTORIZE: VectorizeIndex;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const results: string[] = [];

    for (const chunk of chunks) {
      // Embed the chunk text
      const embedResponse = await env.AI.run("@cf/baai/bge-small-en-v1.5", {
        text: [chunk.text],
      }) as { data: number[][] };

      const vector = embedResponse.data[0];

      // Upsert into Vectorize with the text as metadata
      await env.VECTORIZE.upsert([{
        id: chunk.id,
        values: vector,
        metadata: { text: chunk.text },
      }]);

      results.push(`✅ Seeded: ${chunk.id}`);
    }

    return Response.json({
      success: true,
      seeded: chunks.length,
      results,
    });
  },
};