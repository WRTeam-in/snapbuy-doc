// Vercel serverless function: POST /api/ask
// Body: { "query": "How do I add a payment gateway?" }
// Returns: { "answer": "...", "sources": [{ title, heading, url }] }
//
// Lightweight RAG: loads the prebuilt embeddings.json, embeds the user query,
// ranks chunks by cosine similarity in memory, and asks the chat model to
// answer strictly from the retrieved context.

const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const EMBED_MODEL = "gemini-embedding-001"; // Gemini (free tier)
const CHAT_MODEL = "llama-3.3-70b-versatile"; // Groq (free tier)
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const TOP_K = 5;
const MIN_SCORE = 0.2; // drop weak matches

// CORS: allow the docs site (and localhost dev). Tighten if you like.
const ALLOWED_ORIGINS = [
  "https://wrteam-in.github.io",
  "http://localhost:3000",
];

// Load index once per cold start.
let INDEX = null;
function loadIndex() {
  if (INDEX) return INDEX;
  const file = path.join(__dirname, "_data", "embeddings.json");
  INDEX = JSON.parse(fs.readFileSync(file, "utf-8"));
  return INDEX;
}

function cosine(a, b) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function setCors(req, res) {
  const origin = req.headers.origin;
  const isLocalhost = /^https?:\/\/localhost(:\d+)?$/.test(origin || "");
  if (ALLOWED_ORIGINS.includes(origin) || isLocalhost) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async (req, res) => {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const query = (body.query || "").toString().trim();
    if (!query) return res.status(400).json({ error: "Missing 'query'." });
    if (query.length > 1000)
      return res.status(400).json({ error: "Query too long." });

    if (!process.env.GEMINI_API_KEY)
      return res.status(500).json({ error: "Server missing GEMINI_API_KEY." });
    if (!process.env.GROQ_API_KEY)
      return res.status(500).json({ error: "Server missing GROQ_API_KEY." });

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const index = loadIndex();

    // 1. Embed the query
    const emb = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: query,
      config: { taskType: "RETRIEVAL_QUERY" },
    });
    const qv = emb.embeddings[0].values;

    // 2. Rank chunks
    const ranked = index.chunks
      .map((c) => ({ c, score: cosine(qv, c.embedding) }))
      .sort((a, b) => b.score - a.score)
      .filter((r) => r.score >= MIN_SCORE)
      .slice(0, TOP_K);

    if (ranked.length === 0) {
      return res.status(200).json({
        answer:
          "I couldn't find anything about that in the eStay documentation. Try rephrasing, or browse the docs from the menu.",
        sources: [],
      });
    }

    // 3. Build context + de-duplicated sources
    const context = ranked
      .map(
        (r, i) =>
          `[${i + 1}] ${r.c.title} — ${r.c.heading}\n${r.c.content}`
      )
      .join("\n\n---\n\n");

    // De-dupe by page (ignore #anchor). Keep the best-scoring section per page.
    const seen = new Set();
    const sources = [];
    for (const r of ranked) {
      const page = r.c.url.split("#")[0];
      if (seen.has(page)) continue;
      seen.add(page);
      sources.push({ title: r.c.title, heading: r.c.heading, url: r.c.url });
    }

    // 4. Ask the model (Groq, OpenAI-compatible chat API)
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are the eStay Documentation Assistant. Answer ONLY using the " +
              "provided context from the eStay docs. If the answer is not in the " +
              "context, say you don't have that information and suggest browsing " +
              "the docs. Be concise, use steps/bullets when helpful, and never " +
              "invent features, menu names, or settings.",
          },
          { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
        ],
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      console.error("Groq error", groqRes.status, detail);
      return res.status(502).json({ error: "LLM request failed." });
    }

    const completion = await groqRes.json();
    const answer =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate an answer.";

    return res.status(200).json({ answer, sources });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error. Please try again." });
  }
};
