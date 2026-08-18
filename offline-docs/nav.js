/**
 * SnapBuy Offline Documentation — Sidebar Navigation
 * Plain vanilla JS. No build step, no dependencies, no network calls.
 * Renders the sidebar into <nav id="sidebar-nav"></nav> using a relative
 * base path so links work identically from any page depth under file://.
 *
 * Each page sets two globals BEFORE loading this script:
 *   window.SB_BASE  = "../"  (relative path back to offline-docs/ root)
 *   window.SB_PAGE   = "admin/overview.html" (this page's path, relative to root)
 */
(function () {
  var BASE = window.SB_BASE || "";
  var CURRENT = window.SB_PAGE || "";

  // Mirrors sidebars.js exactly: label, href (relative to offline-docs root),
  // and optional nested "items" for collapsible categories.
  var NAV = [
    { label: "Introduction", href: "index.html" },
    {
      label: "Admin Panel",
      href: "admin/overview.html",
      groups: [
        {
          label: "Getting Started",
          items: [
            ["Demo Instructions", "admin/demo-instructions.html"],
            ["Third-Party Service Costs", "admin/third-party-costs.html"],
          ],
        },
        {
          label: "Installation",
          items: [
            ["Installation Overview", "installation/overview.html"],
            ["Server Requirements", "admin/server-requirements.html"],
            ["Server Setup", "installation/server-preparation.html"],
            ["Domain, DNS & SSL", "admin/create-subdomain.html"],
            ["PHP INI Settings", "admin/php-ini-settings.html"],
            ["Panel Installation", "admin/server-setup.html"],
            ["Environment Configuration", "installation/environment-configuration.html"],
            ["Database & Migrations", "installation/database-migration.html"],
            ["Cron Job Setup", "admin/cron-jobs.html"],
            ["Setup Guide", "admin/setup-guide.html"],
            ["Localhost Setup", "admin/localhost-setup.html"],
          ],
        },
        {
          label: "Core Setup",
          items: [
            ["Countries & Currency", "admin/countries.html"],
            ["Delivery Zones", "admin/zones.html"],
            ["Stores", "admin/stores.html"],
            ["Home Builder", "admin/home-builder.html"],
            ["SMTP / Email Settings", "admin/smtp-settings.html"],
            ["Firebase Settings", "admin/firebase-settings.html"],
            ["Map & API Keys", "admin/map-api-keys.html"],
            ["Chat Settings", "admin/chat-settings.html"],
          ],
        },
        {
          label: "Settings",
          items: [
            ["General Settings", "admin/general-settings.html"],
            ["App Settings", "admin/app-settings.html"],
            ["Website Settings", "admin/website-settings.html"],
            ["Login Settings", "admin/login-settings.html"],
            ["Payment Gateways", "admin/payment-gateway.html"],
            ["Cart Settings", "admin/cart-settings.html"],
            ["SMS Settings", "admin/sms-settings.html"],
            ["Notification Settings", "admin/notification-settings.html"],
            ["Notification, Email & SMS Templates", "admin/notification-templates.html"],
            ["SEO Settings", "admin/seo-settings.html"],
            ["Social Media Links", "admin/social-media.html"],
            ["Manage Languages", "admin/languages.html"],
            ["Maintenance Mode", "admin/maintenance-mode.html"],
            ["Deeplink Settings", "admin/deeplink-settings.html"],
            ["Contact Us & About Us Pages", "admin/contact-about.html"],
            ["System Updater", "admin/system-updater.html"],
            ["Activity Logs", "admin/activity-logs.html"],
          ],
        },
        {
          label: "Modules",
          items: [
            ["Roles & Permissions", "admin/roles-permissions.html"],
            ["Orders Workflow", "admin/orders.html"],
            ["Return Requests", "admin/return-requests.html"],
            ["Wallet, Withdrawals & Settlements", "admin/wallet-withdrawals.html"],
            ["Delivery Boys & Their Portal", "admin/delivery-boy-portal.html"],
            ["Bulk Upload & Update", "admin/bulk-upload.html"],
            ["Reports", "admin/reports.html"],
            ["Send Notifications & Emails", "admin/send-notifications.html"],
          ],
        },
      ],
    },
    {
      label: "Customer App",
      items: [
        ["Prerequisites", "app-customer/prerequisites.html"],
        ["Basic Setup", "app-customer/basic-setup.html"],
        ["Firebase Setup", "app-customer/firebase-setup.html"],
        ["Firebase Billing Setup", "app-customer/firebase-billing.html"],
        ["Notification Settings", "app-customer/notification-settings.html"],
        ["App Icon", "app-customer/app-icon.html"],
        ["Change Package Name", "app-customer/change-package-name.html"],
        ["Assets Management", "app-customer/assets-management.html"],
        ["Panel URL & Deeplink", "app-customer/panel-url-deeplink.html"],
        ["Change App Name", "app-customer/change-app-name.html"],
        ["Change App Logo", "app-customer/change-app-logo.html"],
        ["Change App Theme Color", "app-customer/change-theme-color.html"],
        ["Change App Font", "app-customer/change-app-font.html"],
        ["Change Onboarding Images & Text", "app-customer/onboarding.html"],
        ["Configure Home Screen", "app-customer/home-screen-settings.html"],
        ["Add Map API Key for Address", "app-customer/map-api-key.html"],
        ["Configure Auth Methods & Default Country", "app-customer/auth-methods.html"],
        ["Payment Gateway", "app-customer/payment-gateway.html"],
        ["Manage Languages", "app-customer/manage-languages.html"],
        ["Contact Us Page", "app-customer/contact-us.html"],
        ["About Us Page", "app-customer/about-us.html"],
        ["Privacy Policy / Terms", "app-customer/policy.html"],
        ["Maintenance Mode", "app-customer/maintenance-mode.html"],
        ["Change the App Version", "app-customer/change-app-version.html"],
        ["Store URLs & Force Update", "app-customer/store-urls-force-update.html"],
        ["Run the App", "app-customer/run-the-app.html"],
        ["Deployment", "app-customer/deployment.html"],
      ],
    },
    {
      label: "Delivery Boy App",
      items: [
        ["Prerequisites", "app-delivery/prerequisites.html"],
        ["Basic Setup", "app-delivery/basic-setup.html"],
        ["Firebase Setup", "app-delivery/firebase-setup.html"],
        ["Firebase Billing Setup", "app-delivery/firebase-billing.html"],
        ["Notification Settings", "app-delivery/notification-settings.html"],
        ["App Icon", "app-delivery/app-icon.html"],
        ["Change Package Name", "app-delivery/change-package-name.html"],
        ["Assets Management", "app-delivery/assets-management.html"],
        ["Change App Name", "app-delivery/change-app-name.html"],
        ["Change App Logo", "app-delivery/change-app-logo.html"],
        ["Change App Theme Color", "app-delivery/change-theme-color.html"],
        ["Change App Font", "app-delivery/change-app-font.html"],
        ["Add Map API Key", "app-delivery/map-api-key.html"],
        ["Manage Languages", "app-delivery/manage-languages.html"],
        ["Privacy Policy / Terms", "app-delivery/policy.html"],
        ["Maintenance Mode", "app-delivery/maintenance-mode.html"],
        ["Change the App Version", "app-delivery/change-app-version.html"],
        ["Store URLs & Force Update", "app-delivery/store-urls-force-update.html"],
        ["Run the App", "app-delivery/run-the-app.html"],
        ["Deployment", "app-delivery/deployment.html"],
      ],
    },
    {
      label: "Web Portal",
      href: "web/index.html",
      items: [
        ["Overview", "web/overview.html"],
        ["Installation Steps", "web/installation-steps.html"],
        ["Firebase Setup", "web/firebase-setup.html"],
        ["File Structure", "web/file-structure.html"],
        ["Configuration & Theming", "web/configuration.html"],
        ["Deployment Guide (VPS)", "web/deployment.html"],
      ],
    },
    { label: "Changelog", href: "changelog.html" },
    { label: "Support", href: "support.html" },
    { label: "FAQs", href: "faqs.html" },
    { label: "Feedback", href: "feedback.html" },
    { label: "Contact", href: "contact.html" },
  ];

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === "class") e.className = attrs[k];
        else e.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (c) {
      if (typeof c === "string") e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function isActive(href) {
    return href === CURRENT;
  }

  function containsActive(items) {
    return items.some(function (it) {
      return isActive(Array.isArray(it) ? it[1] : it.href);
    });
  }

  function buildFlatLink(label, href) {
    var a = el("a", { href: BASE + href, class: "nav-top-link" + (isActive(href) ? " active" : "") }, [label]);
    return a;
  }

  function buildGroup(entry) {
    // Top-level category with either .groups (nested subcategories) or .items (flat list)
    var hasActive =
      (entry.href && isActive(entry.href)) ||
      (entry.groups && entry.groups.some(function (g) { return containsActive(g.items); })) ||
      (entry.items && containsActive(entry.items));

    var wrap = el("div", { class: "nav-group" + (hasActive ? " is-open" : "") });

    var labelInner = entry.href
      ? el("a", { href: BASE + entry.href, class: "nav-group__link" }, [entry.label])
      : document.createTextNode(entry.label);

    var labelBtn = el("button", { type: "button", class: "nav-group__label" }, [
      labelInner,
      el("span", { class: "chev" }, ["▸"]),
    ]);
    labelBtn.addEventListener("click", function (evt) {
      if (evt.target.closest(".nav-group__link")) return; // let the link navigate
      wrap.classList.toggle("is-open");
    });

    wrap.appendChild(labelBtn);

    var list = el("ul", { class: "nav-list" });

    if (entry.groups) {
      entry.groups.forEach(function (g) {
        var subLi = el("li", null, []);
        var subWrap = buildGroup({ label: g.label, items: g.items });
        subLi.appendChild(subWrap);
        list.appendChild(subLi);
      });
    } else if (entry.items) {
      entry.items.forEach(function (it) {
        var label = it[0], href = it[1];
        var li = el("li", null, [
          el("a", { href: BASE + href, class: isActive(href) ? "active" : "" }, [label]),
        ]);
        list.appendChild(li);
      });
    }

    wrap.appendChild(list);
    return wrap;
  }

  function render() {
    var mount = document.getElementById("sidebar-nav");
    if (!mount) return;
    NAV.forEach(function (entry) {
      if (!entry.groups && !entry.items) {
        mount.appendChild(buildFlatLink(entry.label, entry.href));
      } else {
        mount.appendChild(buildGroup(entry));
      }
    });
  }

  document.addEventListener("DOMContentLoaded", render);

  // Mobile sidebar toggle
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("sidebar-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.toggle("sidebar-open");
      });
    }
  });
})();
