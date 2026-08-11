// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SnapBuy Documentation",
  tagline: "Complete guide for the SnapBuy delivery & shopping platform",
  favicon: "images/favicon.png",

  url: "https://snapbuy.github.io",
  baseUrl: "/snapbuy-doc/",
  trailingSlash: true,
  organizationName: "snapbuy",
  projectName: "snapbuy-doc",
  deploymentBranch: "gh-pages",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownImages: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    aiApiUrl:
      process.env.AI_API_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:8787/api/ask"
        : "https://YOUR-PROJECT.vercel.app/api/ask"),
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    [
      "@docusaurus/plugin-client-redirects",
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        redirects: [
          {
            from: "/docs/app/prerequisites",
            to: "/docs/app-customer/prerequisites",
          },
          {
            from: "/docs/app/firebase-setup",
            to: "/docs/app-customer/firebase-setup",
          },
          {
            from: "/docs/app/firebase-billing",
            to: "/docs/app-customer/firebase-billing",
          },
          {
            from: "/docs/app/panel-url-deeplink",
            to: "/docs/app-customer/panel-url-deeplink",
          },
          {
            from: "/docs/app/change-package-name",
            to: "/docs/app-customer/change-package-name",
          },
          {
            from: "/docs/app/change-app-name",
            to: "/docs/app-customer/change-app-name",
          },
          {
            from: "/docs/app/change-app-logo",
            to: "/docs/app-customer/change-app-logo",
          },
          {
            from: "/docs/app/change-theme-color",
            to: "/docs/app-customer/change-theme-color",
          },
          {
            from: "/docs/app/change-app-font",
            to: "/docs/app-customer/change-app-font",
          },
          {
            from: "/docs/app/onboarding",
            to: "/docs/app-customer/onboarding",
          },
          {
            from: "/docs/app/home-screen-settings",
            to: "/docs/app-customer/home-screen-settings",
          },
          {
            from: "/docs/app/notification-settings",
            to: "/docs/app-customer/notification-settings",
          },
          {
            from: "/docs/app/map-api-key",
            to: "/docs/app-customer/map-api-key",
          },
          {
            from: "/docs/app/auth-methods",
            to: "/docs/app-customer/auth-methods",
          },
          {
            from: "/docs/app/payment-gateway",
            to: "/docs/app-customer/payment-gateway",
          },
          {
            from: "/docs/app/manage-languages",
            to: "/docs/app-customer/manage-languages",
          },
          {
            from: "/docs/app/contact-us",
            to: "/docs/app-customer/contact-us",
          },
          {
            from: "/docs/app/maintenance-mode",
            to: "/docs/app-customer/maintenance-mode",
          },
          {
            from: "/docs/app/change-app-version",
            to: "/docs/app-customer/change-app-version",
          },
          {
            from: "/docs/app/store-urls-force-update",
            to: "/docs/app-customer/store-urls-force-update",
          },
          {
            from: "/docs/app/run-the-app",
            to: "/docs/app-customer/run-the-app",
          },
          {
            from: "/docs/app/deployment",
            to: "/docs/app-customer/deployment",
          },
        ],
      }),
    ],
    "docusaurus-plugin-image-zoom",
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "images/logo.png",
      zoom: {
        selector: ".markdown img",
        background: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(30, 30, 30)",
        },
        config: {},
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: "SnapBuy Logo",
          src: "images/favicon.png",
        },
        items: [
          {
            to: "/docs/admin/overview",
            label: "Admin Panel",
            position: "left",
          },
          {
            to: "/docs/app-customer/prerequisites",
            label: "Customer App",
            position: "left",
          },
          {
            to: "/docs/app-delivery/prerequisites",
            label: "Delivery Boy App",
            position: "left",
          },
          {
            to: "/docs/web/",
            label: "Web Portal",
            position: "left",
          },
          {
            to: "/docs/support",
            label: "Support",
            position: "left",
          },
          {
            to: "/docs/faqs",
            label: "FAQs",
            position: "left",
          },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://www.marketplace.wrteam.in/products/snapbuy-hyperlocal-quick-commerce-ecommerce-platform",
            label: "SnapBuy",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} SnapBuy Documentation`,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
      },
    }),
};

module.exports = config;
