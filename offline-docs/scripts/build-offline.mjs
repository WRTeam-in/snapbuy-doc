/**
 * One-command offline documentation build.
 *
 *   node offline-docs/scripts/build-offline.mjs
 *
 * Steps:
 *   1. Generate offline.css (remote webfont imports stripped).
 *   2. Run `docusaurus build` with the offline config into offline-docs/build.
 *   3. Rewrite every absolute URL to a relative one so file:// works.
 *   4. Drop a launcher index.html at the top of the folder.
 *
 * Nothing outside offline-docs/ is written to, so the online site and its
 * normal `npm run build` output are unaffected.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OFFLINE_DIR = path.resolve(HERE, "..");
const ROOT = path.resolve(OFFLINE_DIR, "..", "snapbuy-doc");
const BUILD = path.join(OFFLINE_DIR, "build");

function run(label, command, args, opts = {}) {
  console.log(`\n[offline] ${label}`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (result.status !== 0) {
    console.error(`[offline] Step failed: ${label}`);
    process.exit(result.status ?? 1);
  }
}

// ── 1. Stylesheet ──────────────────────────────────────────────────────
run("Preparing offline stylesheet…", process.execPath, [
  path.join(OFFLINE_DIR, "scripts", "prepare-offline-css.mjs"),
]);

// ── 2. Build ───────────────────────────────────────────────────────────
if (fs.existsSync(BUILD)) fs.rmSync(BUILD, { recursive: true, force: true });

const docusaurusBin = path.join(ROOT, "node_modules", ".bin", "docusaurus");
run(
  "Building documentation (this takes a few minutes)…",
  fs.existsSync(docusaurusBin) ? docusaurusBin : "npx",
  [
    ...(fs.existsSync(docusaurusBin) ? [] : ["docusaurus"]),
    "build",
    "--config",
    path.join(OFFLINE_DIR, "docusaurus.config.offline.js"),
    "--out-dir",
    BUILD,
  ],
  { env: { ...process.env, NODE_ENV: "production" } }
);

// ── 3. Relative URLs ───────────────────────────────────────────────────
run("Converting absolute URLs to relative paths…", process.execPath, [
  path.join(OFFLINE_DIR, "scripts", "make-relative.mjs"),
]);

// ── 4. Launcher ────────────────────────────────────────────────────────
const launcher = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>SnapBuy Documentation — Offline</title>
<meta http-equiv="refresh" content="0; url=build/index.html" />
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: #eaeaea;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    text-align: center;
  }
  a { color: #0E9623; font-weight: 600; }
</style>
</head>
<body>
  <div>
    <h1>SnapBuy Documentation</h1>
    <p>Opening the offline documentation…</p>
    <p>If nothing happens, <a href="build/index.html">click here</a>.</p>
  </div>
</body>
</html>
`;
fs.writeFileSync(path.join(OFFLINE_DIR, "index.html"), launcher, "utf8");

console.log(`
[offline] Done.
[offline] Output: ${BUILD}
[offline] Open offline-docs/index.html in any browser — no server, no internet.
`);
