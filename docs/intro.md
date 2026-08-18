---
id: intro
title: Introduction
sidebar_position: 1
---

# Welcome to SnapBuy Documentation

SnapBuy is a complete delivery & shopping platform that includes an Admin Panel, Customer App, Delivery Boy App, and Web Portal.

## What's Included

- **Admin Panel** — Manage products, orders, delivery boys, users, payments, and more
- **Customer App** — Flutter-based app for iOS and Android for customers to shop and track orders
- **Delivery Boy App** — Flutter-based app for iOS and Android for delivery boys to manage deliveries
- **Web Portal** — Web frontend for online shopping

## Before you start

- **[Demo Instructions](/docs/admin/demo-instructions)** — try the live demo, with login details
- **[Third-Party Service Costs](/docs/admin/third-party-costs)** — what Google Maps, Firebase, SMS and hosting cost outside the purchase price

## Getting Started

SnapBuy ships as four codebases. Install them in order:

1. **[Admin Panel → Installation](/docs/installation/installation-overview)** — provision the server and install the backend
2. **[Web Portal](/docs/web/overview)** — point the storefront at the panel
3. **[Customer App](/docs/app-customer/prerequisites)** and **[Delivery Boy App](/docs/app-delivery/prerequisites)** — configure and build

:::warning A VPS is required
The web portal is server-rendered for SEO and the panel runs background processes for notifications and chat. Entry-level shared hosting cannot run either. See [Server Requirements](/docs/admin/server-requirements).
:::

Or choose a section from the sidebar:

- [Admin Panel Setup](/docs/admin/overview)
- [Customer App Setup](/docs/app-customer/prerequisites)
- [Delivery Boy App Setup](/docs/app-delivery/prerequisites)
- [Web Portal](/docs/web/overview)



## Requirements

- PHP 8.3+
- MySQL 5.7+ / MariaDB 10.3+
- Node.js 20 LTS+
- Flutter 3.x

## Third-Party Services

Some features rely on external services that are **not included** in the purchase price and may involve their own costs or usage limits:

- **Google Maps API** — usage-based billing beyond the free tier
- **Firebase** — Cloud Messaging is free; other Firebase services may have usage costs at scale
- **SMS gateway** (OTP/notifications) — billed per message by your chosen provider
- **Payment gateways** (Stripe, Razorpay, Paystack, PhonePe, etc.) — standard transaction fees apply
- **Hosting, domain, and SSL** — required for production deployment
