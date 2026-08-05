# eStay Docs — AI Assistant Setup

Lightweight RAG assistant on the docs landing page. No vector DB, no always-on
server. Markdown → embeddings JSON → Vercel serverless function → Gemini (embeddings) + Groq (chat).

```
docs/*.md  →  npm run rag:index  →  api/_data/embeddings.json
                                          │
landing page widget (GitHub Pages) ──fetch──► Vercel /api/ask ──► Gemini embed + Groq chat
```

## Pieces

| File | Role |
|------|------|
| `scripts/build-embeddings.mjs` | Chunks docs, embeds, writes `api/_data/embeddings.json` |
| `api/ask.js` | Vercel function: embeds query, cosine top-k, calls LLM, returns answer + sources |
| `api/_data/embeddings.json` | Prebuilt index (committed) |
| `src/components/ask-ai/` | "Ask AI" floating widget |
| `vercel.json` | Function config (timeout + bundles the index) |

## One-time setup

### 1. Build the index (local)

```bash
export GEMINI_API_KEY=...
npm run rag:index
```

Writes `api/_data/embeddings.json`. **Commit it** — Vercel ships it with the function.

### 2. Deploy the backend to Vercel

- Import this repo at https://vercel.com/new
- Project Settings → Environment Variables → add `GEMINI_API_KEY` and `GROQ_API_KEY`
- Deploy. Your endpoint is `https://YOUR-PROJECT.vercel.app/api/ask`

Test:

```bash
curl -X POST https://YOUR-PROJECT.vercel.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query":"How do I add a payment gateway?"}'
```

### 3. Point the widget at the endpoint

Two options:

- **Build env (preferred):** set `AI_API_URL` when building the docs site
  (in GitHub Actions / locally), e.g. `AI_API_URL=https://YOUR-PROJECT.vercel.app/api/ask npm run build`
- **Hardcode:** edit the fallback in `docusaurus.config.js` → `customFields.aiApiUrl`

Also add your Vercel domain isn't needed in CORS — but if you serve docs from a
new origin, add it to `ALLOWED_ORIGINS` in `api/ask.js`.

## Feature docs (PDF / DOCX / TXT)

Drop files into `static/feature-docs/`, then reindex. They get chunked, embedded,
and become answerable — and are served as downloadable links (answer "Sources"
point to them). README.* in that folder is ignored.

```bash
cp "Booking Flow.pdf" static/feature-docs/
npm run rag:index
```

## When docs change

```bash
npm run rag:index   # regenerate index (re-reads docs/ + static/feature-docs/)
git commit -am "reindex docs"
git push            # Vercel redeploys with fresh index
```

## Models / cost

- Embeddings: `gemini-embedding-001` (Gemini, free)
- Answers: `llama-3.3-70b-versatile` via Groq (swap in `api/ask.js` → `CHAT_MODEL`)
- Gemini free tier covers embeddings; Groq free tier covers chat. No billing needed.

## Notes

- Widget shows only on the landing page (`src/pages/index.js`). To show site-wide,
  swizzle the `Root` theme component and render `<AskAi />` there.
- Tighten CORS in `api/ask.js` (`ALLOWED_ORIGINS`) for production.
