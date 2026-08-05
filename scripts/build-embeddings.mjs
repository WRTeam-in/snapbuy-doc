#!/usr/bin/env node
/**
 * Build the RAG index for the eStay docs AI assistant.
 *
 * Reads every markdown file under docs/, splits it into heading-based chunks,
 * generates a Gemini embedding for each chunk, and writes the result to
 * api/_data/embeddings.json. That JSON file is committed and shipped with the
 * Vercel serverless function (api/ask.js), which loads it at runtime.
 *
 * Usage:
 *   GEMINI_API_KEY=... npm run rag:index
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createRequire } from "node:module";
import matter from "gray-matter";
import { GoogleGenAI } from "@google/genai";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // v1.x: module.exports = fn
const mammoth = require("mammoth");

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "docs");
const FEATURE_DIR = join(ROOT, "static", "feature-docs"); // drop PDF/DOCX/TXT here
const OUT_DIR = join(ROOT, "api", "_data");
const OUT_FILE = join(OUT_DIR, "embeddings.json");

// Public site config — keep in sync with docusaurus.config.js (url + baseUrl).
const SITE_URL = "https://wrteam-in.github.io";
const BASE_URL = "/estay-doc/";

const EMBED_MODEL = "gemini-embedding-001";
const MAX_CHUNK_CHARS = 1500; // ~375 tokens; safe, keeps sections intact

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("✗ GEMINI_API_KEY env var is required. Aborting.");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

/* ── Helpers ────────────────────────────────────────────────────────────── */

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(name)) out.push(full);
  }
  return out;
}

// All files, any extension (used for feature-docs).
function walkAll(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walkAll(full));
    else out.push(full);
  }
  return out;
}

// docs/app/payment-gateway.md -> /estay-doc/docs/app/payment-gateway
function fileToDocUrl(file) {
  const rel = relative(DOCS_DIR, file).replace(/\\/g, "/").replace(/\.mdx?$/, "");
  const path = `docs/${rel}`.replace(/\/index$/, "");
  return SITE_URL + (BASE_URL + path).replace(/\/{2,}/g, "/");
}

// static/feature-docs/Booking Flow.pdf -> downloadable static URL
function featureFileToUrl(file) {
  const rel = relative(FEATURE_DIR, file).replace(/\\/g, "/");
  const path = `feature-docs/${rel}`;
  return SITE_URL + (BASE_URL + path).split("/").map(encodeURIComponent).join("/").replace(/%2F/g, "/").replace(/\/{2,}/g, "/");
}

// "Booking-Flow_v2.pdf" -> "Booking Flow v2"
function prettyTitle(file) {
  return basename(file, extname(file)).replace(/[_-]+/g, " ").trim();
}

// Extract plain text from a feature doc by extension.
async function extractText(file) {
  const ext = extname(file).toLowerCase();
  if (ext === ".pdf") return (await pdfParse(readFileSync(file))).text;
  if (ext === ".docx") return (await mammoth.extractRawText({ buffer: readFileSync(file) })).value;
  if (ext === ".txt" || ext === ".md") return readFileSync(file, "utf-8");
  return null; // unsupported
}

const CHUNK_OVERLAP = 150;

// Plain text has no headings — split on blank lines into overlapping chunks.
function chunkPlain(text) {
  const clean = text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const paras = clean.split(/\n{2,}/);
  const chunks = [];
  let buf = "";
  for (const p of paras) {
    if ((buf + "\n\n" + p).length > MAX_CHUNK_CHARS && buf) {
      chunks.push(buf);
      buf = (buf.slice(-CHUNK_OVERLAP) + "\n\n" + p).trim();
    } else {
      buf = buf ? buf + "\n\n" + p : p;
    }
  }
  if (buf.trim()) chunks.push(buf.trim());
  return chunks;
}

// GitHub-style heading slug for anchor links
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Split a markdown body into chunks grouped by ## headings. Each chunk keeps
 * the document title + section heading as context. Oversized sections are
 * hard-split on character count.
 */
function chunkMarkdown(body, docTitle) {
  const lines = body.split("\n");
  const sections = [];
  let current = { heading: docTitle, slug: "", lines: [] };

  for (const line of lines) {
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      if (current.lines.join("").trim()) sections.push(current);
      const heading = h[2].replace(/[#*`]/g, "").trim();
      current = { heading, slug: slugify(heading), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.join("").trim()) sections.push(current);

  const chunks = [];
  for (const s of sections) {
    const text = s.lines.join("\n").trim();
    if (!text) continue;
    // hard-split long sections
    const parts = [];
    let buf = "";
    for (const para of text.split(/\n{2,}/)) {
      if ((buf + "\n\n" + para).length > MAX_CHUNK_CHARS && buf) {
        parts.push(buf);
        buf = para;
      } else {
        buf = buf ? buf + "\n\n" + para : para;
      }
    }
    if (buf) parts.push(buf);

    parts.forEach((part) => {
      chunks.push({
        heading: s.heading,
        slug: s.slug,
        content: part,
      });
    });
  }
  return chunks;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Free tier = 100 embed requests/min. Throttle to stay under, retry on 429.
const THROTTLE_MS = 700;

async function embedOne(text, attempt = 0) {
  try {
    const res = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: text,
      config: { taskType: "RETRIEVAL_DOCUMENT" },
    });
    return res.embeddings[0].values;
  } catch (err) {
    if (err?.status === 429 && attempt < 6) {
      const m = /retry in ([\d.]+)s/i.exec(err?.message || "");
      const wait = (m ? parseFloat(m[1]) : 30) * 1000 + 1000;
      console.log(`  rate limited, waiting ${Math.round(wait / 1000)}s...`);
      await sleep(wait);
      return embedOne(text, attempt + 1);
    }
    throw err;
  }
}

/* ── Main ───────────────────────────────────────────────────────────────── */

async function main() {
  const files = walk(DOCS_DIR);
  console.log(`Found ${files.length} markdown files.`);

  const records = [];
  for (const file of files) {
    const raw = readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    const docTitle =
      data.title ||
      (content.match(/^#\s+(.*)$/m)?.[1] ?? relative(DOCS_DIR, file));
    const url = fileToDocUrl(file);

    for (const c of chunkMarkdown(content, docTitle)) {
      records.push({
        title: docTitle,
        heading: c.heading,
        url: c.slug ? `${url}#${c.slug}` : url,
        file: relative(ROOT, file).split(sep).join("/"),
        // text fed to the embedding model — prepend titles for better recall
        text: `${docTitle} — ${c.heading}\n\n${c.content}`,
        content: c.content,
      });
    }
  }
  console.log(`Created ${records.length} chunks from ${files.length} markdown files.`);

  // Feature docs (PDF / DOCX / TXT) dropped in static/feature-docs/
  if (existsSync(FEATURE_DIR)) {
    const featureFiles = walkAll(FEATURE_DIR).filter(
      (f) => /\.(pdf|docx|txt|md)$/i.test(f) && !/^readme\./i.test(basename(f))
    );
    let added = 0;
    for (const file of featureFiles) {
      let text;
      try {
        text = await extractText(file);
      } catch (e) {
        console.warn(`  ⚠ skip ${basename(file)} (parse failed: ${e.message})`);
        continue;
      }
      if (!text || !text.trim()) {
        console.warn(`  ⚠ skip ${basename(file)} (no extractable text)`);
        continue;
      }
      const title = prettyTitle(file);
      const url = featureFileToUrl(file);
      for (const chunk of chunkPlain(text)) {
        records.push({
          title,
          heading: "",
          url,
          file: relative(ROOT, file).split(sep).join("/"),
          text: `${title}\n\n${chunk}`,
          content: chunk,
        });
        added++;
      }
    }
    if (featureFiles.length)
      console.log(`Added ${added} chunks from ${featureFiles.length} feature doc(s).`);
  }

  console.log(`Total ${records.length} chunks. Embedding...`);

  for (let i = 0; i < records.length; i++) {
    records[i].embedding = await embedOne(records[i].text);
    if ((i + 1) % 20 === 0 || i + 1 === records.length)
      console.log(`  embedded ${i + 1}/${records.length}`);
    await sleep(THROTTLE_MS);
  }

  // drop the redundant `text` field from the shipped file (keep content)
  const out = {
    model: EMBED_MODEL,
    builtAt: new Date().toISOString(),
    count: records.length,
    chunks: records.map(({ text, ...rest }) => rest),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(out));
  const mb = (Buffer.byteLength(JSON.stringify(out)) / 1e6).toFixed(2);
  console.log(`✓ Wrote ${OUT_FILE} (${out.count} chunks, ${mb} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
