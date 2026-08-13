---
id: website-settings
title: Website Settings
sidebar_position: 19
---

# Website Settings

Menu path: **Settings → Website Settings**

Configures the customer-facing **web portal** — its address, theme, app-download banners and cookie consent.

![Website settings page](/images/panel/website-settings-page.png)

## Website URL

| Field | What it does |
| --- | --- |
| **Website URL** | The public address of your storefront |

This is used to build links in emails, notifications, shared product URLs and SEO tags.

:::danger Enter the exact production URL, with scheme
Include `https://` and get the `www` prefix right. A mismatch produces broken links in every order email and every shared product URL, and it breaks canonical tags for SEO.

Right: `https://www.yourstore.com`
Wrong: `yourstore.com`, `http://yourstore.com` on an HTTPS site
:::

:::info This is the storefront, not the panel
The panel's own address is `APP_URL` in `.env`, set during installation. This field points at the customer-facing site, which may be a different domain entirely.
:::

## Theme colours

| Field | Applies to |
| --- | --- |
| **Light Mode Color** | Web portal accent in light mode |
| **Dark Mode Color** | Web portal accent in dark mode |

These are independent of the app colours in [App Settings](/docs/admin/app-settings) and of the panel colour in [General Settings](/docs/admin/general-settings).

:::tip Keep all three in the same family
The panel, the apps and the website each have their own colour setting. Using the same brand colour across them keeps the experience coherent for customers who move between web and app.
:::

## App download banners

| Field | What it does |
| --- | --- |
| **Is Android App** | Show the Android download banner |
| **Android App URL** | Play Store link |
| **Is iOS App** | Show the iOS download banner |
| **iOS App URL** | App Store link |

![App download banner settings](/images/panel/website-app-banners.png)

:::warning Do not advertise an app that is not published yet
Turning the banner on before the store listing is live sends customers to a 404 and makes the store look broken. Enable each platform only once its listing is public.
:::

## Cookie consent

**Cookie Consent Enabled** shows a consent banner to visitors.

:::danger Required in some regions
If you serve customers in the EU or UK, cookie consent is a legal requirement under GDPR/PECR, not a preference. Enable it, and make sure your [privacy policy](/docs/admin/countries#policies) describes what you collect.
:::

## Related pages

The rest of the storefront is configured elsewhere:

| What | Where |
| --- | --- |
| Home page content | [Home Builder](/docs/admin/home-builder) |
| Meta titles, descriptions, OG images | [SEO Settings](/docs/admin/seo-settings) |
| Social profile links | [Social Media](/docs/admin/social-media) |
| Legal policies | [Countries](/docs/admin/countries#policies) |
| Blogs and FAQs | Blogs, FAQs menus |
| Taking the site offline | [Maintenance Mode](/docs/admin/maintenance-mode) |

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Email links point to the wrong domain | Website URL wrong or missing scheme | Enter the full `https://` URL |
| Shared product links 404 | Website URL points at the panel | Point it at the storefront |
| Download banner leads to a dead page | App not published, or wrong URL | Disable the banner or correct the URL |
| Colour change not visible | Browser cache | Hard-refresh; visit `/clear` |
| Consent banner missing | Setting disabled | Enable cookie consent |
