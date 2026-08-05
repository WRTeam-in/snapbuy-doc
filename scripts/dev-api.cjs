// Local dev server for api/ask.js — lets you test the widget without Vercel.
// Usage:
//   GEMINI_API_KEY=AIza... GROQ_API_KEY=gsk_... node scripts/dev-api.cjs
// Then start docs with:
//   AI_API_URL=http://localhost:8787/api/ask npm start
const http = require("http");
const handler = require("../api/ask.js");

const PORT = process.env.PORT || 8787;

http
  .createServer((req, res) => {
    if (req.url !== "/api/ask") {
      res.statusCode = 404;
      return res.end("not found");
    }
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      // shim Vercel-style req/res
      req.body = raw ? JSON.parse(raw) : {};
      res.status = (c) => ((res.statusCode = c), res);
      res.json = (o) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(o));
        return res;
      };
      handler(req, res);
    });
  })
  .listen(PORT, () => console.log(`dev api on http://localhost:${PORT}/api/ask`));
