---
id: overview
title: Overview
sidebar_position: 1
description: What the Snapbuy Web Portal includes, its tech stack, and where to start.
---

# Overview

The Snapbuy Web Portal is the customer-facing web application that allows users to browse products, place orders, and track deliveries — all from a browser.

## What's Included

The Snapbuy Web Portal is built with **Next.js** and provides:

- 🛍️ **Product Browsing** — Customers can browse categories and products
- 🛒 **Cart & Checkout** — Seamless ordering flow with payment integration
- 📦 **Order Tracking** — Real-time order and delivery status
- 👤 **Customer Accounts** — Login, profile, and order history
- 📱 **PWA Support** — Installable on mobile as a Progressive Web App

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication |
| Maps | Google Maps API |
| Payments | Multiple payment gateways |

## Getting Started

1. [Installation Steps](/docs/web/installation-steps) — Install dependencies and configure `.env`, Firebase, and Maps
2. [Firebase Setup](/docs/web/firebase-setup) — Set up push notifications with FCM
3. [File Structure](/docs/web/file-structure) — Learn where everything lives before you customise
4. [Configuration & Theming](/docs/web/configuration) — Colours, home page blocks, channels, zones, and languages
5. [Deployment Guide](/docs/web/deployment) — Deploy to a production VPS with Apache, PM2, and HTTPS

:::info

The Web Portal runs in SSR mode and needs a long-lived Node.js process — **shared hosting is not supported**. See the [Deployment Guide](/docs/web/deployment) for the full VPS setup.

:::

If you need help setting up the Web Portal, reach out to our support team:

- 📧 **Email**: support@snapbuy.in
- 🌐 **Website**: [snapbuy.in](https://www.snapbuy.in/)

## Quick Links

- [Admin Panel](/docs/admin/overview) — Set up the backend first
- [Customer App Setup](/docs/app-customer/prerequisites) — Configure the mobile app
- [Delivery Boy App Setup](/docs/app-delivery/prerequisites) — Configure delivery app
- [Support](/docs/support) — Get help from our team
