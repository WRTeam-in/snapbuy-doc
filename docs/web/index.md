---
id: index
title: Installation & Deployment
sidebar_position: 0
description: Setup, deployment, and configuration guides for the Snapbuy Web Portal storefront.
---

# Installation & Deployment

Setup, deployment, and configuration guides for the Snapbuy Web Portal storefront.

## Start here

| Guide | Read it when |
| --- | --- |
| [Overview](/docs/web/overview) | Getting oriented — what the Web Portal includes and its tech stack |
| [Installation Steps](/docs/web/installation-steps) | Setting the project up for the first time — prerequisites, `.env`, Firebase, first build |
| [Firebase Setup](/docs/web/firebase-setup) | Wiring up push notifications — FCM project, VAPID key, service worker |
| [File Structure](/docs/web/file-structure) | Finding your way around the codebase |
| [Configuration & Theming](/docs/web/configuration) | Changing colours, home page blocks, channels, zones, languages |
| [Deployment Guide (VPS)](/docs/web/deployment) | Putting it live with SEO enabled — Node 20, PM2, Apache/Nginx proxy |

## The short version

The storefront is a **Next.js 16 Pages Router** app backed by an Admin Panel API. It is a **white-label template**: colours, header artwork, home page composition, channels, and languages all arrive from the API at runtime.

Two consequences worth internalising before changing anything:

1. **Never hardcode** a brand colour, image host, or store name. Read colours from CSS variables and derive image hosts from `NEXT_PUBLIC_API_URL`.
2. **`NEXT_PUBLIC_SEO` must be `true`.** It produces the server build, which needs a Node host. The `false` static export is not supported — middleware does not run in it, so zone and language URLs 404. See [Overview](/docs/web/overview#two-decisions-that-shape-everything).

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

## All guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
