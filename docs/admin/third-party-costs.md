---
id: third-party-costs
title: Third-Party Service Costs
sidebar_position: 5
---

# Third-Party Service Costs

SnapBuy is a one-time purchase. The **external services it connects to are not included** and are billed directly to you by their providers.

Nothing on this page is charged by us. Every account below is opened in your own name, with your own billing details, and you keep full control of it.

:::info Read this before you launch
Most services have a free allowance that comfortably covers development and a small store. Costs begin when order volume grows. Knowing which meter is running — and where the free tier ends — avoids an unexpected bill in month two.
:::

## What is optional and what is not

| Service | Needed for | Can you launch without it? |
| --- | --- | --- |
| Hosting (VPS) | Running the panel, website and APIs | No |
| Domain + SSL | Any production install | No |
| Google Maps *or* OpenStreetMap | Address selection, delivery distance | A map provider is required; OpenStreetMap is free |
| Firebase Cloud Messaging | Push notifications | Yes, but customers get no order updates |
| Firebase Phone Auth *or* an SMS gateway | OTP login | Only if you disable phone login entirely |
| SMTP email | Order mail, password reset | No — password reset depends on it |
| Payment gateway | Online payment | Yes, if you sell Cash on Delivery only |
| Pusher | Live chat, if you do not self-host Reverb | Yes — Reverb is free and bundled |

## Maps

SnapBuy supports two providers. **OpenStreetMap is the default and costs nothing.**

### OpenStreetMap — free

No account, no key, no billing. Address search and routing use public community services.

The trade-off is reliability: the public routing endpoint is rate-limited and carries no uptime guarantee. Fine for launch and low volume; move to Google Maps or a self-hosted routing server once order volume is steady.

### Google Maps Platform — paid, with a monthly free allowance

Google changed its pricing model in March 2025. The old **$200 monthly credit was replaced** by a per-API free allowance of **10,000 calls per month, per SKU**.

| API SnapBuy uses | Free per month | Cost after the free tier (per 1,000 calls) |
| --- | --- | --- |
| Maps JavaScript API | 10,000 | from $7.00 |
| Places Autocomplete | 10,000 | from $2.83 |
| Place Details | 10,000 | from $5.00 |
| Geocoding | 10,000 | from $5.00 |
| Distance Matrix | 10,000 | from $5.00 |
| Directions | 10,000 | from $5.00 |

Rates fall as volume rises. Figures above are the entry band.

:::warning A billing account is mandatory even inside the free tier
Google refuses Maps requests from a project with no billing account attached — the map renders grey with a "for development purposes only" watermark. You must attach a card even if you never exceed the free allowance.
:::

:::tip Set a budget alert on day one
In **Billing → Budgets & alerts**, create a budget with email notifications. It does not cap spending, but it tells you within hours instead of at the end of the month. Also restrict every key — an unrestricted key found in your page source can be used by anyone and billed to you.
:::

**Rough sizing.** Each customer checkout that uses address autocomplete plus a distance lookup consumes roughly one Autocomplete, one Place Details and one Distance Matrix call. At 10,000 free calls per SKU you can serve on the order of 10,000 address selections a month before any charge.

## Firebase

| Feature | Cost |
| --- | --- |
| **Cloud Messaging (push)** | Free and unlimited, on both Spark and Blaze plans. No per-message fee, no device cap. |
| **Authentication (email, Google, Apple)** | Free up to 50,000 monthly active users |
| **Phone / SMS authentication** | **Charged per verification** — roughly $0.01–$0.06 depending on country |

:::danger Phone OTP requires the paid Blaze plan
Since September 2024 Google requires a Blaze plan with a billing account for SMS verification. This is the Firebase cost that surprises people: push notifications are genuinely free, but every OTP sent during signup is billed.

A store with heavy signup traffic — or one being probed by automated signups — can run up a real bill here. If your market is India, an Indian SMS gateway is usually cheaper and delivers more reliably. See [SMS Settings](/docs/admin/sms-settings).
:::

## SMS gateways

Only needed if you send OTP or transactional SMS through your own provider instead of Firebase.

| Provider | Region | Indicative cost | Notes |
| --- | --- | --- | --- |
| **Twilio** | Worldwide | From about $0.0079 per segment in the US; under $0.005 to India | US A2P 10DLC adds a carrier surcharge plus monthly brand and campaign registration fees. Phone numbers are rented monthly. |
| **MSG91** | India | Around ₹0.15 per SMS | DLT registration required |
| **Fast2SMS** | India | Roughly ₹0.12–₹0.25 per SMS by volume | DLT registration required |
| **2Factor** | India | Pay-per-delivered-OTP | Only charges when the OTP is delivered inside its delivery window |

Indian prices are subject to 18% GST. All Indian providers operate on DLT-registered routes.

:::warning India requires DLT registration
Sender IDs and message templates must be pre-registered on a DLT platform before anything is delivered. Unregistered traffic is dropped by the carrier while the provider still reports success — messages simply never arrive. Budget time for this; approval is not instant.
:::

:::tip Cap your SMS spend
Every OTP is a paid message, and an automated signup script can generate thousands overnight. Set a spending cap in your provider's dashboard and enable alerts before you go live.
:::

## Real-time chat

| Option | Cost |
| --- | --- |
| **Laravel Reverb** (bundled) | Free — runs on your own server |
| **Pusher Channels** | Free Sandbox plan: 100 concurrent connections, 200,000 messages/day. Paid plans start around $49/month for 500 connections. |

Reverb needs a long-running process and an open port, which your VPS provides. Pusher costs money at scale but requires no server administration.

## Email

SMTP is not bundled. Use any provider:

| Option | Typical cost |
| --- | --- |
| Mailbox on your own domain | Usually included with hosting |
| SendGrid, Mailgun, Amazon SES | Free tiers exist; SES is billed per thousand emails and is the cheapest at volume |
| Gmail / Google Workspace | Fine for testing; roughly 500 messages/day and unsuitable for campaigns |

## Payment gateways

Gateways charge a percentage of each transaction rather than a subscription. Typical rates run about 2–3% per domestic transaction, with higher rates for international cards. Rates are negotiated with the provider and vary by country, business type and volume.

There is no charge for configuring a gateway in SnapBuy — you pay the provider only when you take money.

## Hosting

See [Server Requirements](/docs/admin/server-requirements). SnapBuy requires a **VPS or dedicated server**. Budget shared hosting cannot run it, because the web portal is server-rendered for SEO and the panel needs long-running background processes.

Expect from roughly $10–$40 per month for a VPS sized for a new store, rising with traffic and catalogue size.

## Summary

| Cost | When it starts |
| --- | --- |
| VPS hosting | Immediately — required |
| Domain and SSL | Immediately — SSL is free via Let's Encrypt |
| Google Maps | Only past 10,000 calls per API per month, and only if you choose Google over OpenStreetMap |
| Firebase push | Never — free and unlimited |
| Firebase phone OTP | From the first verification, on the Blaze plan |
| SMS gateway | Per message sent |
| Pusher | Only past the free Sandbox limits, and only if you choose it over Reverb |
| Payment gateway | Per transaction, as a percentage |

:::info Prices change
Every figure here was accurate at the time of writing and is provided for planning only. Confirm current rates on each provider's own pricing page before committing.
:::
