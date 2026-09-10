/**
 * Quick check that the Vercel AI Gateway is reachable and the model slug works.
 *
 *   1. Put AI_GATEWAY_API_KEY (and optionally AI_MODEL) in a local .env.local file.
 *      That file is gitignored — never commit real keys.
 *   2. Run:  npm run ai:demo      (Node 20.6+, uses --env-file=.env.local)
 *
 * In production the same key is set in Vercel → Settings → Environment Variables,
 * and the AI is used by api/contact.js, not by this script.
 */
import { generateText } from "ai";

const model = process.env.AI_MODEL || "openai/gpt-4o-mini";

if (!process.env.AI_GATEWAY_API_KEY) {
  console.error("Missing AI_GATEWAY_API_KEY. Add it to .env.local (gitignored) and retry.");
  process.exit(1);
}

const { text } = await generateText({
  model,
  prompt: "Invent a new holiday and describe its traditions."
});

console.log(text);
