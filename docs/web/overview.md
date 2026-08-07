---
id: overview
title: Overview
sidebar_position: 1
description: What the Snapbuy Web Portal includes, its tech stack, how it fits together, and where to start.
---

# Overview

The Snapbuy Web Portal is the customer-facing storefront — customers browse products, place orders, and track deliveries from any browser.

It is a **white-label template**: one codebase, configured per client. Branding, home page composition, delivery zones, channels, and languages all arrive from the Admin Panel API at runtime, so launching a new store means changing configuration, not code.

## What's included

| | Feature | Notes |
| --- | --- | --- |
| 🛍️ | **Product browsing** | Categories, brands, sellers, search, filters, variants |
| 🛒 | **Cart & checkout** | Guest and logged-in carts, coupons, multiple payment gateways |
| 📦 | **Order tracking** | Live order and delivery status, order history, returns |
| 👤 | **Customer accounts** | OTP login, profile, addresses, wishlist, wallet |
| 📍 | **Delivery zones** | Zone-aware catalogues, pricing, and serviceability |
| ⚡ | **Dual channels** | Quick local delivery and a wider all-shop catalogue |
| 🔔 | **Push notifications** | Firebase Cloud Messaging, foreground and background |
| 💬 | **Chat** | Customer support and delivery-agent chat |
| 🌍 | **Multi-language** | Server-driven translations with full RTL support |
| 🔎 | **SEO** | Server-side rendering, dynamic sitemap, per-page metadata |
| 📱 | **PWA** | Installable via `public/manifest.json` |

Also supported: prescription uploads, refer-and-earn, shop-by-country, maintenance windows, and store-closed handling.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 — **Pages Router** |
| UI | React 19 |
| Styling | Tailwind CSS + CSS custom properties |
| Global state | Redux Toolkit + redux-persist |
| Server state | TanStack Query |
| HTTP | Axios |
| Components | shadcn/ui (Radix) |
| Auth | Firebase phone auth (OTP) + backend JWT |
| Push | Firebase Cloud Messaging |
| Maps | Google Maps, with OpenStreetMap fallback |
| Payments | Razorpay, Stripe, PayPal, Paystack, Cashfree, Midtrans, PhonePe, PayTabs, COD |

:::note

The project uses the **Pages Router** (`src/pages/**`). There is no `app/` directory — App Router conventions do not apply here.

:::

## Two decisions that shape everything

**1. `NEXT_PUBLIC_SEO` must be `true`.**

It selects the build mode: `true` produces a server build (SSR, live `sitemap.xml`, per-page meta); `false` makes `next.config.mjs` switch to `output: "export"` and emit a static site into `out/`.

**Only the server build is supported.** The static export drops three things the Web Portal depends on:

| Feature | Why it breaks under `false` |
| --- | --- |
| Zone URLs (`/bhuj-quick/...`) | `src/middleware.js` rewrites them onto the real routes. **Middleware does not run in a static export** — Next.js ignores it, so every zone-prefixed URL 404s. |
| Language URLs (`/ur/...`) | Same middleware, same outcome. |
| Per-page SEO + `sitemap.xml` | The ~16 pages with `getServerSideProps` guard it behind this flag (`if (process.env.NEXT_PUBLIC_SEO == "true")`) so the export can build at all. With it off they export `null`, meta/JSON-LD fall back to the env defaults, and `sitemap.xml` is never generated. |

A static build still *compiles* and the Web Portal still loads — the failure is silent, which is what makes it dangerous. Zone routing is core to this app, so `false` is effectively a legacy path from before zones existed.

This means a long-lived Node process, so **shared hosting is not supported**. See the [Deployment Guide](/docs/web/deployment).

**2. Nothing brand-specific is hardcoded.**

Colours come from CSS variables set at runtime; image hosts are derived from `NEXT_PUBLIC_API_URL`. Hardcoding either breaks the next client's build. See [Configuration & Theming](/docs/web/configuration).

## Getting started

Work through these in order:

1. **[Installation Steps](/docs/web/installation-steps)** — prerequisites, `.env`, first build
2. **[Firebase Setup](/docs/web/firebase-setup)** — push notifications and the VAPID key
3. **[File Structure](/docs/web/file-structure)** — where everything lives
4. **[Configuration & Theming](/docs/web/configuration)** — colours, home blocks, zones, languages
5. **[Deployment Guide (VPS)](/docs/web/deployment)** — Node 20, PM2, Apache/Nginx, HTTPS

:::warning Set up the Admin Panel first

The Web Portal needs a reachable API URL before it will render anything. See the [Admin Panel](/docs/admin/overview) documentation.

:::

## Quick start

```bash
npm install
# create .env in the project root — see Installation Steps for every variable
npm run dev             # http://localhost:3000
```

Production:

```bash
npm run build
npm start               # NODE_ENV=production, port 8004, via server.js
```
