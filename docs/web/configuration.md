---
id: configuration
title: Configuration & Theming
sidebar_position: 5
description: Change colours, home page sections, channels, zones, and languages for the Web Portal — all from the Admin Panel, with no code changes.
---

# Configuration & Theming

The SnapBuy Web Portal is a **white-label storefront**. Almost everything a visitor sees — brand colours, header artwork, the home page layout, delivery zones, channels, and languages — is controlled from the Admin Panel, not built into the site.

That means you can rebrand the storefront, reorder the home page, or launch a new zone without a developer and without redeploying.

:::info What needs a developer

Only the values in the site's `.env` file (the API address, the SEO flag, Firebase and Maps keys) are set at deploy time. Changing one of those requires a rebuild — see [Installation Steps](/docs/web/installation-steps). Everything on this page is a live setting: save it in the Admin Panel and reload the storefront.

:::

## Where each setting lives

| What you want to change | Admin panel path | Takes effect |
|---|---|---|
| Brand colours, logo, store name | Settings → **Web Settings** | On reload |
| Home page layout and sections | **Home Builder** | On publish |
| Header background and text colour | **Home Builder** → Header Settings | On publish |
| Delivery zones | **Zones** | On reload |
| Languages and translations | **Languages** | On reload |
| Payment gateways | Settings → **Payment Gateway** | On reload |

## Theming

The storefront reads its entire colour scheme from the Admin Panel. There is no brand colour written into the site itself, which is why the same build can serve any store.

Set colours under **Settings → Web Settings**:

| Setting | Controls |
|---|---|
| Primary colour | Buttons, links, prices, active states |
| Light primary colour | Tinted backgrounds and highlighted surfaces |
| Text colour | Default body text |
| Secondary / sub text colour | Muted captions and helper text |
| Page background | The page backdrop |
| Card background | Product and category card surfaces |
| Border colour | Dividers and hairlines |

**Dark mode is automatic.** Each colour has a dark-mode counterpart, so you do not configure a separate dark theme — set your colours once and both modes follow.

Illustrations (empty carts, 404 pages, loading animations) are also recoloured to your primary colour automatically. You do not need to supply branded artwork for these.

### Header appearance

The header is configured per home layout, under **Home Builder → Header Settings**:

- **Background** — either a solid **colour** or an **image**.
- **Text colour** — the header title, address, and icons.
- **Category icon** — shown on the home category tab (Category Wise layouts only).

:::note

When you pick a solid colour, the storefront expands it into a soft vertical gradient automatically, so a single brand colour still looks finished.

When you pick an image, the header and the category strip beneath it together display one continuous picture — so choose artwork that reads well across the full height, not just the top band.

:::

See [Configure Home Screen](/docs/app-customer/home-screen-settings) for the full Home Builder walkthrough — the same layouts drive both the app and the Web Portal.

## Home page composition

The home page is assembled from the sections you add in **Home Builder**. Nothing on it is fixed; you control what appears and in what order.

Available section types:

| Section type | Shows |
|---|---|
| Banner Slider | Horizontal promotional banner carousel |
| Category Section | Grid or row of categories |
| Product Slider | Horizontal scrollable product list |
| Top Brands | Brand logos row |
| Grid Banner | Grid of promotional banner tiles |
| Title Image | Single banner image with a title |
| Heading / Text | Plain heading or text block |

Drag sections to reorder them, toggle one off without deleting it, or use **Use Template** to add a pre-built set.

### Section appearance

Each section can be plain or given its own backdrop. Pick a **variant**:

| Variant | Shows a title | Shows a background |
|---|---|---|
| Default | No | No |
| With title | Yes | No |
| With background | Yes | Your chosen image |
| With colour | Yes | Your chosen colour |

:::warning Settings apply per variant

If you set a background colour and later switch the section back to **Default**, the colour stays saved but stops showing. This is expected — the storefront applies only the fields belonging to the variant you selected. To make a saved colour appear again, switch the variant back to **With colour**.

:::

When a section has a backdrop, you can set two text colours separately:

- **Heading colour** — the section title, which sits *on* the backdrop.
- **Caption colour** — the labels under category or brand chips, which sit *below* it.

They are separate because one colour rarely stays readable in both places.

You can also set a **background aspect ratio** (for example 3:1). This is a *minimum* height — if the section's contents need more room, the panel grows rather than cropping them, so chips are never cut off on narrow phone screens.

### Layout options

**Product Slider** — display as a carousel, a list, or a grid. You can set the number of columns, the gap between products, the card corner rounding, and the section heading.

**Category and Brand sections** — display as a horizontal row, circular chips, or a grid. You can set the column count, spacing, and corner rounding. Brand sections can additionally hide their captions.

### "View More"

Product sections can be sourced from a category, a brand, a manually chosen list of products, or an automatic list such as most-favourited.

The **View More** button appears only when there are more products than the section displays. If a section shows everything it has, no button is shown — this is expected, not a fault.

## Channels

The store can run two channels side by side:

- **Quick** — fast local delivery from nearby stock.
- **Ecommerce** — a wider catalogue with standard delivery.

Configure them in **Home Builder**:

| Setting | Effect |
|---|---|
| Available modes | Show both channels with a toggle, or run only one |
| Default mode | Which channel customers land on |
| Channel labels | The names shown on the toggle |
| Delivery time | The ETA label, e.g. "22 mins" |
| Store closed | Keeps the catalogue browsable but disables ordering |

:::note

Each channel has its own **separate cart**. A customer switching between Quick and Ecommerce sees a different basket — items do not merge. Currency is also read per channel.

:::

## Zones

A zone is a delivery area with its own catalogue, pricing, and home layout. Each zone gets its own web address:

```
yourstore.com/bhuj-quick              → that zone's home page
yourstore.com/bhuj-quick/products     → that zone's product listing
yourstore.com/ur/bhuj-quick/products  → the same, in Urdu
```

These are real, shareable links. A customer who opens a zone link lands directly in that zone with the right catalogue and pricing — no need to select a location first.

:::warning Zone URLs need the server build

Zone and language web addresses only work when the storefront runs as a server build (`NEXT_PUBLIC_SEO=true`). On a static export every zone link returns a 404. See [Overview](/docs/web/overview#two-decisions-that-shape-everything).

:::

## Languages

Add languages and edit translations under **Languages** in the Admin Panel. The storefront picks them up on reload — translations are not built into the site.

Right-to-left languages such as Arabic and Urdu are supported; the layout mirrors automatically when an RTL language is selected.

Each language also gets its own URL prefix (`/ur/...`), so localised pages can be shared and indexed by search engines.

## SEO

Per-page titles, descriptions, and share images come from the Admin Panel, so you can tune how each category or product appears in search results and on social media.

Where the Admin Panel supplies nothing, the storefront falls back to the default title, description, and keywords set in its `.env` file at deploy time.

Two settings are fixed at deploy time and need a developer:

| Setting | Why it matters |
|---|---|
| SEO mode | Must be enabled, or search engines see an empty page and zone URLs break |
| Site address | Generates every link in the sitemap and all canonical tags |

See the [Deployment Guide](/docs/web/deployment) for confirming SEO works on a live site.

## Payments

Enable and configure gateways under **Settings → Payment Gateway**. Supported: Razorpay, Stripe, PayPal, Paystack, Cashfree, Midtrans, PhonePe, PayTabs, and cash on delivery.

:::info

All gateway keys are stored in the Admin Panel, never in the storefront. Enabling or switching a gateway is a live change — no redeploy needed.

:::

## Related pages

- [Configure Home Screen](/docs/app-customer/home-screen-settings) — the full Home Builder guide
- [Overview](/docs/web/overview) — what the Web Portal includes
- [Installation Steps](/docs/web/installation-steps) — the deploy-time settings
- [Deployment Guide](/docs/web/deployment) — putting the storefront live
