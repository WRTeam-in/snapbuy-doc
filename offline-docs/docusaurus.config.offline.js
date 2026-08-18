// @ts-check
/**
 * SnapBuy Documentation — OFFLINE build config
 *
 * This file DOES NOT modify the online site. It reuses the same docs/,
 * sidebars.js, src/ and static/ from the project root, but overrides the
 * settings that prevent the built site from working when opened directly
 * from disk (file://) with no internet connection.
 *
 * Run from the project root:
 *   npm run docs:offline        (see offline-docs/README.md)
 */

const path = require("path");

// Reuse the live site config as the base so content/theme stay identical.
const ROOT = path.resolve(__dirname, "..");
const baseConfig = require(path.join(ROOT, "docusaurus.config.js"));

// Plugins live in snapbuy-doc/node_modules, not offline-docs/, so resolve
// them explicitly from there instead of relying on Node's default lookup.
/** @param {string} id */
const resolveFromRoot = (id) => require.resolve(id, { paths: [ROOT] });

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...baseConfig,

  // ── Offline overrides ────────────────────────────────────────────────
  // baseUrl must be "/" so the post-build rewriter can convert every
  // absolute URL into a relative one. See scripts/make-relative.mjs.
  url: "https://localhost",
  baseUrl: "/",
  trailingSlash: false,

  // Never fail the offline build on a link that only resolves online.
  onBrokenLinks: "warn",
  onBrokenAnchors: "warn",
  onBrokenMarkdownLinks: "warn",

  // The default browser (History API) router matches routes against
  // location.pathname, which only works when a real server maps clean URLs
  // to files. Under file:// there is no server, so make-relative.mjs must
  // rewrite every internal link to a real relative "*.html" path — but that
  // then no longer matches the router's clean-path routes, so client-side
  // navigation quietly renders "Page Not Found" instead of the real page.
  // The hash router keeps all routing state in the URL fragment instead, so
  // it never needs to match location.pathname at all — the correct fix for
  // a site that must run from disk. (Docusaurus 3.9+.)
  future: {
    ...(baseConfig.future || {}),
    experimental_router: "hash",
  },

  // Resolve every path relative to the project root, not this folder.
  presets: [
    [
      resolveFromRoot("@docusaurus/preset-classic"),
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: path.join(ROOT, "docs"),
          sidebarPath: path.join(ROOT, "sidebars.js"),
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: path.join(__dirname, "offline.css"),
        },
        sitemap: false,
      }),
    ],
  ],

  plugins: [
    // Search removed: under file:// Chrome blocks the fetch/dynamic-import
    // the search-local plugin needs for its index chunk, so it never works
    // for buyers double-clicking index.html.
    resolveFromRoot("docusaurus-plugin-image-zoom"),

    // Webpack's default publicPath is "/" (root-absolute). Under file://
    // that resolves to the filesystem root, so every lazily-loaded route
    // chunk 404s — the shell hydrates but per-page interactivity (sidebar
    // collapse toggle included) silently stops working. "auto" derives the
    // chunk base from the loaded <script> tag's own (relative) src instead.
    function offlinePublicPathPlugin() {
      return {
        name: "offline-public-path",
        configureWebpack(_config, isServer) {
          // "auto" needs document.currentScript, which only exists in the
          // browser — the SSG step renders through a Node/vm sandbox, so
          // the server bundle must keep the default publicPath.
          if (isServer) {
            return {};
          }
          return {
            output: {
              publicPath: "auto",
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    ...baseConfig.themeConfig,
    // Dark/light toggle removed for the same file:// reliability reason.
    colorMode: {
      ...baseConfig.themeConfig.colorMode,
      disableSwitch: true,
    },
    navbar: {
      ...baseConfig.themeConfig.navbar,
      // Drop outbound marketplace link — dead weight in an offline copy.
      items: (baseConfig.themeConfig.navbar.items || []).filter(
        /** @param {{ href?: string }} item */
        (item) => !item.href || !/^https?:/i.test(item.href)
      ),
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} SnapBuy Documentation`,
    },
  },

  staticDirectories: [path.join(ROOT, "static")],
};

module.exports = config;
