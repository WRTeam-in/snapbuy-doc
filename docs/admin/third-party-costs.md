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
| Gemini API key | AI-written product, blog and SEO content | Yes — entirely optional |

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

## Gemini — AI content generation

Optional. Powers the "Generate with AI" buttons for product descriptions, blog content, SEO meta text and automatic field translation. With no key those buttons do nothing and everything is written by hand — nothing else in SnapBuy is affected.

SnapBuy uses the **Generative Language API** with the `gemini-2.5-flash` model.

| | |
| --- | --- |
| **Free tier** | Yes — `gemini-2.5-flash` has a free tier suitable for light use |
| **Paid input** | About $0.30 per 1M tokens |
| **Paid output** | About $2.50 per 1M tokens |

:::tip Token cost in practice
A product description is a small request. A prompt plus a generated description lands in the low hundreds of tokens, so a thousand generated descriptions is measured in cents rather than dollars. This is the cheapest service on this page by a wide margin, and most stores never leave the free tier.
:::

:::warning Restrict the key
The key is used from your server. Restrict it to the **Generative Language API** only, and to your server's IP address. An unrestricted key can be spent against your billing account by anyone who obtains it. See [Map & API Keys](/docs/admin/map-api-keys).
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
| Gemini AI generation | Only past the free tier, and only if you enable it at all |
| Payment gateway | Per transaction, as a percentage |

---

## Third-party services and additional costs — disclaimer

:::danger Additional fees may apply
SnapBuy integrates with third-party services that are **not included with your purchase**. Those providers may charge you directly, depending on your usage, your region and the plan you select.
:::

### What your purchase covers

Your purchase covers the **source code, the application features and the components listed in the item package**, and nothing beyond that.

Charges arising from third-party services — APIs, cloud infrastructure, SMS delivery, maps, AI services, hosting, domains, email, payment gateways or any other external provider — are **the buyer's responsibility** and are not part of the item price.

### Services SnapBuy integrates with

| Service | Used for | What you need |
| --- | --- | --- |
| **Google Gemini AI** | AI-generated blog posts, product descriptions, SEO content and multilingual translation | Your own Gemini API credentials. Usage may be charged under Google's pricing. |
| **Google Maps Platform** | Maps, geolocation, coordinate lookup and place search/autocomplete across the mobile apps, web portal and admin panel | Your own Google Maps API credentials. Usage may be charged under Google Maps Platform pricing. |
| **Firebase Authentication (OTP login)** | Mobile number authentication and OTP verification | A Firebase project, and an active **Blaze** pay-as-you-go plan for SMS verification. Charges vary by destination country. |
| **Firebase Cloud Messaging** | Push notifications | A Firebase project. No per-message fee at the time of writing. |
| **SMS gateways** (Twilio, MSG91, Fast2SMS, 2Factor) | OTP and transactional SMS | Your own account and credentials with the provider. Delivery is billed by them, and varies by country, region and volume. |
| **Payment gateways** | Taking online payment | Your own merchant account. Transaction fees are set by the provider. |
| **Pusher** *(optional)* | Real-time chat, if you do not self-host Reverb | Your own Pusher account beyond the free tier. |
| **Hosting, domain, email** | Running the platform | Billed by your hosting provider, registrar and mail provider. |

### Buyer responsibility

Review the pricing and requirements of every third-party service you intend to use **before** you purchase and before you go to production.

We do not charge, control or receive any part of these fees, and we are not responsible for amounts billed by Google, Firebase, Twilio or any other SMS provider, payment gateways, hosting providers, email providers, domain registrars or any other third party.

By purchasing SnapBuy you acknowledge that third-party service fees, API usage costs, SMS charges, hosting expenses and related running costs are **separate from the purchase price** and payable directly to those providers.

:::warning Pricing and free tiers can change without notice
Third-party pricing, free-tier allowances, billing requirements and regional availability are set by those providers and may change at any time. Every figure on this page was accurate when written and is offered for planning only.

Confirm the current terms on each provider's own pricing page before deployment and before going live.
:::
