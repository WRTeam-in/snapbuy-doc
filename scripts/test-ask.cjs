// Local smoke test for api/ask.js — no Vercel needed.
// Usage: GEMINI_API_KEY=... node scripts/test-ask.cjs "your question"
const handler = require("../api/ask.js");

const query = process.argv[2] || "How do I add a payment gateway?";

const req = {
  method: "POST",
  headers: { origin: "http://localhost:3000" },
  body: { query },
};

const res = {
  _status: 200,
  setHeader() {},
  status(c) {
    this._status = c;
    return this;
  },
  json(obj) {
    console.log("STATUS", this._status);
    console.log("ANSWER:\n" + (obj.answer || obj.error));
    if (obj.sources) {
      console.log("\nSOURCES:");
      obj.sources.forEach((s) => console.log(" -", s.title, "→", s.url));
    }
    return this;
  },
  end() {
    console.log("STATUS", this._status, "(no body)");
  },
};

handler(req, res);
