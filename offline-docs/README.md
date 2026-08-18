# SnapBuy Documentation

This folder produces a **fully self-contained copy of the SnapBuy documentation**
that opens directly from your hard drive. No web server, no internet connection,
and no external services are required.

It is meant to be shipped inside the product package (as required for CodeCanyon
listings), alongside the source code.

---

## For buyers — just read the docs

1. Open the `offline-docs` folder.
2. Double-click **`index.html`**.

That's it. The documentation opens in your default browser and works completely
offline — every page, image and sidebar included.

> Tip: any modern browser works (Chrome, Edge, Firefox, Safari). You do not need
> Node.js, PHP, XAMPP or any other tool to read the documentation.

---

## For the author — regenerating the offline copy

Run this once from the **project root** after changing any file in `docs/`:

```bash
node offline-docs/scripts/build-offline.mjs
```

The build takes a few minutes and writes the finished site to
`offline-docs/build/`.

If you prefer an npm script, add this line to the `scripts` block of the root
`package.json`:

```json
"build:offline": "node offline-docs/scripts/build-offline.mjs"
```

then run `npm run build:offline`.

---

## What this folder contains

| Path | Purpose |
|---|---|
| `index.html` | Launcher — the file buyers open. Redirects into `build/`. |
| `build/` | The generated offline site (created by the build script). |
| `docusaurus.config.offline.js` | Offline-only Docusaurus config. Reuses the same `docs/`, `sidebars.js`, `src/` and `static/` as the live site. |
| `offline.css` | Auto-generated stylesheet with the remote webfont imports stripped. |
| `scripts/build-offline.mjs` | Runs the whole pipeline in one command. |
| `scripts/prepare-offline-css.mjs` | Generates `offline.css` from `src/css/custom.css`. |
| `scripts/make-relative.mjs` | Rewrites absolute URLs to relative ones so `file://` works. |

---

## How offline mode is achieved

The live site is built for a web server, so a plain copy of its `build/` folder
does not work from disk. Four things are handled here:

1. **Root-absolute URLs.** Docusaurus emits paths like `/assets/css/styles.css`.
   Under `file://`, `/` means the filesystem root, so every asset fails to load.
   After the build, `make-relative.mjs` rewrites each one to a path relative to
   the HTML file containing it, and appends `index.html` to internal page links
   that would otherwise resolve to a directory.

2. **Remote webfonts.** The live stylesheet imports Plus Jakarta Sans and
   JetBrains Mono from `fonts.googleapis.com`. Offline, those requests hang and
   delay rendering. `prepare-offline-css.mjs` strips every remote `@import` and
   pins the font variables to a system font stack instead.

3. **The Ask-AI endpoint.** The live config points `aiApiUrl` at a hosted API.
   The offline config blanks it and sets `offlineBuild: true`, so nothing tries
   to reach a server.

4. **Outbound navbar links and canonical tags.** The marketplace link is dropped
   from the navbar, and `canonical` / `hreflang` / `og:url` tags — which would
   otherwise advertise a URL that does not exist locally — are removed.

---

## Guarantees

* **Nothing outside this folder is modified.** The offline config imports the
  root `docusaurus.config.js` and overrides only what it must. `docs/`,
  `sidebars.js`, `src/` and `static/` are read, never written.
* **The live site is unaffected.** `npm run start`, `npm run build` and the
  deployment workflow behave exactly as before.
* **No network calls at runtime.** External links written inside the
  documentation text still point to the web (that is intentional — they are
  reference links), but no page requires the network to render.

---

## Verifying an offline copy

Disconnect from the internet, then open `index.html` and check that:

- the homepage renders with the SnapBuy green theme,
- the left sidebar expands and navigates,
- screenshots load on a docs page.
