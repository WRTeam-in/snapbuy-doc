// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "category",
      label: "Admin Panel",
      items: [
        "admin/overview",
      ],
    },
    {
      type: "category",
      label: "Customer App",
      items: [
        "app-customer/prerequisites",
        "app-customer/firebase-setup",
        "app-customer/firebase-billing",
        "app-customer/panel-url-deeplink",
        "app-customer/change-package-name",
        "app-customer/change-app-name",
        "app-customer/change-app-logo",
        "app-customer/change-theme-color",
        "app-customer/change-app-font",
        "app-customer/onboarding",
        "app-customer/home-screen-settings",
        "app-customer/notification-settings",
        "app-customer/map-api-key",
        "app-customer/auth-methods",
        "app-customer/payment-gateway",
        "app-customer/manage-languages",
        "app-customer/contact-us",
        "app-customer/maintenance-mode",
        "app-customer/change-app-version",
        "app-customer/store-urls-force-update",
        "app-customer/run-the-app",
        "app-customer/deployment",
      ],
    },
    {
      type: "category",
      label: "Delivery Boy App",
      items: [
        "app-delivery/prerequisites",
        "app-delivery/firebase-setup",
        "app-delivery/firebase-billing",
        "app-delivery/change-package-name",
        "app-delivery/change-app-name",
        "app-delivery/change-app-logo",
        "app-delivery/change-theme-color",
        "app-delivery/change-app-font",
        "app-delivery/notification-settings",
        "app-delivery/map-api-key",
        "app-delivery/manage-languages",
        "app-delivery/contact-us",
        "app-delivery/maintenance-mode",
        "app-delivery/change-app-version",
        "app-delivery/store-urls-force-update",
        "app-delivery/run-the-app",
        "app-delivery/deployment",
      ],
    },
    {
      type: "category",
      label: "Web Portal",
      link: {
        type: "doc",
        id: "web/index",
      },
      items: [
        "web/overview",
        "web/installation-steps",
        "web/firebase-setup",
        "web/file-structure",
        "web/configuration",
        "web/deployment",
      ],
    },
    "changelog",
    "support",
    "faqs",
    "feedback",
    "contact",
  ],
};

module.exports = sidebars;
