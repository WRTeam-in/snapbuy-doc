---
id: overview
title: Admin Panel Overview
sidebar_position: 1
---

# Admin Panel Overview

The **SnapBuy Admin Panel** is the control centre for your entire store. Everything the Customer App, the Delivery Boy App and the Web Portal display is driven from here — products, stores, delivery zones, orders, payments, notifications and every configuration switch.

This section takes you from an empty server to a fully configured, live store.

## What the Admin Panel manages

| Area | What you control |
| --- | --- |
| **Catalogue** | Categories, products, brands, attributes, taxes, stock, bulk import/update |
| **Selling area** | Countries, delivery zones, delivery cities & areas, stores |
| **Orders** | Order lifecycle, delivery boy assignment, return requests, invoices |
| **Customers** | Accounts, carts, wishlists, wallet, transactions, withdrawal requests |
| **Delivery boys** | Accounts, cash collection, salary, settlements, their own web portal |
| **Storefront** | Home Builder layouts, banners, offers, blogs, FAQs, SEO |
| **Marketing** | Promo codes, push notifications, emails, popup offers, cart reminders |
| **Configuration** | Firebase, maps, SMTP, SMS, payment gateways, chat, languages, deeplinks |
| **System** | Roles & permissions, staff users, activity logs, cron jobs, system updater |

## How SnapBuy is put together

SnapBuy's admin panel is a **Laravel 12** application with a **Vue 3** single-page front end. Knowing this helps when you are choosing hosting:

- **PHP 8.2 or newer** is required — a hard floor, not a recommendation.
- **MySQL / MariaDB** is the only supported database.
- The panel needs a **server cron job** for scheduled work (cart reminders, maintenance windows, scheduled home layouts, queued jobs).
- Live chat and real-time order updates run over **Laravel Reverb** or **Pusher**.
- Push notifications run through **Firebase Cloud Messaging**.

:::info Version
This documentation covers **SnapBuy v3.0.0**.
:::

## The recommended path

Follow these pages in order. Each one assumes the previous is done.

1. **[Server Requirements](/docs/admin/server-requirements)** — confirm your hosting can run SnapBuy.
2. **[Create a Subdomain](/docs/admin/create-subdomain)** — where the panel will live.
3. **[PHP INI Settings](/docs/admin/php-ini-settings)** — limits that must be raised before installing.
4. **[Localhost Setup](/docs/admin/localhost-setup)** — for testing on your own machine.
5. **[Server Setup](/docs/admin/server-setup)** — the live installation wizard.
6. **[Cron Job Setup](/docs/admin/cron-jobs)** — without this, several features silently stop working.
7. **[Setup Guide](/docs/admin/setup-guide)** — the nine in-panel steps that make the store usable.

After that, work through **Settings** and then the individual modules.

## The Setup Guide widget

After installation the panel shows a **Setup Guide** in the sidebar with a completion ring. It tracks nine steps and hides itself once all nine are done:

Country → Zone → Store → Home Builder → SMTP → Firebase → Map → Chat → Cron

If a store ever reports "the app shows nothing" or "no notifications arrive", the Setup Guide is the first place to look — an incomplete step is almost always the cause.

![Setup Guide widget in the admin sidebar](/images/panel/setup-guide-widget.png)

## Access and permissions

SnapBuy uses **role-based access control**. The account created during installation is the **Super Admin** and holds every permission. Staff accounts you create later see only the menus their role allows.

## Need help?

- 📧 **Email**: support@snapbuy.in
- 🌐 **Website**: [snapbuy.in](https://www.snapbuy.in/)
- 📄 **[Support](/docs/support)**
