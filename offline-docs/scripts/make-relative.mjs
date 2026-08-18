/**
 * Post-processes the offline build so it can be opened straight from disk.
 *
 * Docusaurus emits root-absolute URLs ("/assets/css/styles.css"). Under the
 * file:// protocol "/" is the filesystem root, so every asset 404s. This script
 * rewrites each absolute URL to a path relative to the HTML file that contains
 * it, and appends "index.html" to internal page links that would otherwise
 * resolve to a directory.
 *
 * It only touches offline-docs/build — the online build is untouched.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.resolve(HERE, "..", "build");

/** Attributes whose value is a single URL. */
const URL_ATTRS = ["href", "src", "action", "data-src", "poster"];

let htmlCount = 0;
let assetCount = 0;
let rewriteCount = 0;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** "/docs/admin/overview" -> "../admin/overview/index.html" for a given page. */
function toRelative(absUrl, fromFile) {
  // Split off ?query and #hash so they survive the rewrite untouched.
  const match = absUrl.match(/^([^?#]*)([?#].*)?$/);
  const rawPath = match[1];
  const suffix = match[2] || "";

  const fromDir = path.dirname(fromFile);
  const targetOnDisk = path.join(BUILD, rawPath);

  let target = targetOnDisk;

  // A link to a page directory needs an explicit index.html under file://.
  if (!path.extname(rawPath) || rawPath.endsWith("/")) {
    const asDir = path.join(BUILD, rawPath, "index.html");
    const asHtml = path.join(BUILD, `${rawPath.replace(/\/$/, "")}.html`);
    if (fs.existsSync(asDir)) target = asDir;
    else if (fs.existsSync(asHtml)) target = asHtml;
    else target = path.join(BUILD, rawPath, "index.html");
  }

  let rel = path.relative(fromDir, target).split(path.sep).join("/");
  if (rel === "") rel = ".";
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel + suffix;
}

/** True for URLs that must be left exactly as they are. */
function isExternal(url) {
  return (
    !url ||
    url.startsWith("//") ||
    /^[a-z][a-z0-9+.-]*:/i.test(url) || // http:, https:, mailto:, data:, tel:
    url.startsWith("#")
  );
}

function rewriteHtml(file) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  // 1. Plain attributes: href="/x", src='/x'
  for (const attr of URL_ATTRS) {
    const re = new RegExp(`(\\s${attr}=)(["'])(\\/[^"']*)\\2`, "gi");
    html = html.replace(re, (full, lead, quote, url) => {
      if (isExternal(url)) return full;
      return `${lead}${quote}${toRelative(url, file)}${quote}`;
    });
  }

  // 2. srcset="/a.png 1x, /b.png 2x"
  html = html.replace(
    /(\ssrcset=)(["'])([^"']*)\2/gi,
    (full, lead, quote, value) => {
      const rewritten = value
        .split(",")
        .map((part) => {
          const trimmed = part.trim();
          if (!trimmed) return trimmed;
          const [url, ...rest] = trimmed.split(/\s+/);
          if (isExternal(url) || !url.startsWith("/")) return trimmed;
          return [toRelative(url, file), ...rest].join(" ");
        })
        .join(", ");
      return `${lead}${quote}${rewritten}${quote}`;
    }
  );

  // 3. Inline url(/x) inside <style> blocks and style="" attributes.
  html = html.replace(/url\((\s*['"]?)(\/[^)'"]+)(['"]?\s*)\)/g, (full, a, url, b) => {
    if (isExternal(url)) return full;
    return `url(${a}${toRelative(url, file)}${b})`;
  });

  // 4. Docusaurus writes its baseUrl into the bootstrap script; keeping "/"
  //    there makes the client router try to navigate to the filesystem root.
  html = html.replace(/"baseUrl":"\/"/g, '"baseUrl":"./"');

  // 5. SEO metadata points at the placeholder domain used by the offline
  //    config. None of it is fetched by the browser, but it advertises a URL
  //    that does not exist in a local copy, so strip it.
  html = html
    .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, "")
    .replace(
      /<meta\b[^>]*(?:property|name)=["'](?:og:url|og:image|twitter:url|twitter:image)["'][^>]*>\s*/gi,
      ""
    )
    // JSON-LD breadcrumbs embed the same placeholder domain.
    .replace(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
      ""
    );

  if (html !== before) rewriteCount++;
  fs.writeFileSync(file, html, "utf8");
  htmlCount++;
}

/** CSS files reference fonts/images with root-absolute url(). */
function rewriteCss(file) {
  let css = fs.readFileSync(file, "utf8");
  const before = css;

  css = css.replace(/url\((\s*['"]?)(\/[^)'"]+)(['"]?\s*)\)/g, (full, a, url, b) => {
    if (isExternal(url)) return full;
    return `url(${a}${toRelative(url, file)}${b})`;
  });

  if (css !== before) {
    fs.writeFileSync(file, css, "utf8");
    rewriteCount++;
  }
  assetCount++;
}

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error(
      `[offline] Build folder not found: ${BUILD}\n` +
        `[offline] Run the offline build first.`
    );
    process.exit(1);
  }

  for (const file of walk(BUILD)) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".html") rewriteHtml(file);
    else if (ext === ".css") rewriteCss(file);
  }

  console.log(
    `[offline] Rewrote absolute URLs in ${htmlCount} HTML and ${assetCount} CSS file(s); ` +
      `${rewriteCount} file(s) changed.`
  );
}

main();
