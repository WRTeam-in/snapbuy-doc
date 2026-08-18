---
id: map-api-keys
title: Map & API Keys
sidebar_position: 15
---

# Map & API Keys

**Setup Guide step 7 of 9.** Menu path: **Settings → API Credentials**

Maps do real work in SnapBuy, not decoration:

- Customers pick their delivery address on a map
- You draw [zone](/docs/admin/zones) polygons on a map
- You drop the [store](/docs/admin/stores) pin on a map
- **Road distance between store and customer sets the quick-channel delivery charge**

![API credentials page](/images/panel/map-api-page.png)

## Choose a provider

| Provider | Cost | Address autocomplete | Setup |
| --- | --- | --- | --- |
| **OpenStreetMap** | Free | Basic | None — works immediately |
| **Google Maps** | Paid, with a monthly free credit | Excellent | Two API keys, billing enabled |

SnapBuy defaults to **OpenStreetMap**, and distance is measured with the public OSRM routing service.

:::tip Start on OpenStreetMap
It needs no keys, no billing and no Google account, and the Setup Guide's Map step completes the moment you select it. Switch to Google later if address search quality becomes a problem.
:::

:::warning OpenStreetMap uses a shared public routing service
Distance lookups go to the public OSRM demo server. It is free and unauthenticated, but it is rate-limited and offers no uptime guarantee. On a store doing serious order volume, move to Google Maps or host your own OSRM instance — otherwise busy periods can produce "unable to fetch distance" at checkout.
:::

## Using Google Maps

Google needs **two separate keys**. This trips people up constantly.

| SnapBuy field | Google API | Used for |
| --- | --- | --- |
| **Map API Key** | Maps JavaScript API | Rendering the map tiles you see when drawing zones and pinning stores |
| **Place API Key** | Places API, Places API (New), Geocoding API, Distance Matrix API | Address search, autocomplete, and measuring the store-to-customer distance that sets the quick-channel delivery charge |

:::danger Distance Matrix belongs to the Place key, not the Map key
SnapBuy sends the Distance Matrix request using the **Place API Key**. Enabling Distance Matrix against the Map key only — or restricting the Place key to Places and Geocoding — leaves the map working perfectly while every delivery-charge lookup fails.

The symptom is "unable to fetch distance" at checkout on a panel where the maps clearly render fine.
:::

:::danger Both keys are required
The Setup Guide marks the Map step complete only when **both** the Map key and the Place key are filled. Entering one leaves the step red — and address autocomplete or distance calculation will be broken depending on which is missing.
:::

### Create the keys

1. Open [console.cloud.google.com](https://console.cloud.google.com/).
2. Create a project, or select one.
3. **Enable billing** — Google refuses Maps requests without a billing account, even inside the free credit.
4. Go to **APIs & Services → Library** and enable:
   - Maps JavaScript API
   - Places API
   - Places API (New)
   - Geocoding API
   - Distance Matrix API
   - Directions API
5. Go to **APIs & Services → Credentials → Create credentials → API key**.
6. Create **two** keys and name them clearly.

Places API and Places API (New) are listed as two separate services in the Library and are not interchangeable. SnapBuy calls the legacy Places endpoints, so Places API must be enabled, while Google Cloud projects created recently only surface Places API (New). Enable both. If your project shows only one of the two, enable what is available and then test address search before going live — this is a common reason autocomplete returns nothing on an otherwise correct setup.

:::danger Billing must be enabled
Without a billing account every Google Maps request fails and the map area renders grey with a "for development purposes only" watermark. Google applies a recurring monthly credit that covers small stores, but the account must still exist.
:::

### Restrict the keys

An unrestricted Maps key found in your page source can be used by anyone, billed to you.

The two keys are restricted differently, because they are called from different places:

| Key | Called from | Application restriction |
| --- | --- | --- |
| **Map API Key** | The visitor's browser | **Websites (HTTP referrers)** — your domain |
| **Place API Key** | Your server | **IP addresses** — your server's IP |

#### Map API Key — restrict by domain

This key is loaded into the page, so anyone can read it. Restricting it by referrer means it only works when requested from your own site.

In **APIs & Services → Credentials**, open the key and under **Application restrictions** choose **Websites**, then add:

```
https://admin.yourstore.com/*
https://yourstore.com/*
```

![Map API key restricted by website domain](/images/panel/map-key-restriction-referrer.png)

#### Place API Key — restrict by IP address

SnapBuy calls Places, Geocoding and Distance Matrix **from the server**, not the browser. A referrer restriction would block those calls, because a server-to-server request sends no referrer.

Restrict this key by **IP addresses** instead and enter your server's address. Modern VPS providers usually assign an **IPv6** address, so add that — and the IPv4 address too if your server has one.

In **APIs & Services → Credentials**, open the key, choose **IP addresses** under **Application restrictions**, and add:

```
2400:xxxx:xxxx:xxxx::1
203.0.113.10
```

![Place API key restricted by server IP address](/images/panel/map-key-restriction-ip.png)

Under **API restrictions**, limit it to Places, Places (New), Geocoding and Distance Matrix.

:::danger Do not restrict the Place key by referrer
It is the most common way to break delivery-charge calculation. Server-side requests carry no referrer, so the key is rejected — the map still draws, because that uses the other key, and the failure looks like a distance problem rather than a key problem.
:::

:::tip Find your server's IP
Run this on the server:

```bash
curl -6 ifconfig.co   # IPv6
curl -4 ifconfig.co   # IPv4
```

If your server's IP changes, the key stops working until you update the restriction. Static addressing is worth having here.
:::

:::warning Restrict, but test afterwards
Over-restricting is the second most common Maps problem. After adding restrictions, reload the panel and confirm the zone map still draws — **then place a test order to an address a few kilometres from the store** and check the delivery charge is calculated. The map drawing correctly does not prove the Place key can still reach Distance Matrix.

Restriction changes can take a few minutes to take effect.
:::

### Set a budget alert

In **Billing → Budgets & alerts**, create a budget with email alerts. It will not stop charges, but you find out about a spike in hours rather than at the end of the month.

## Gemini key — AI content generation (optional)

The same page carries a **Gemini Key** field. It has nothing to do with maps and is entirely optional.

### What it powers

With a key entered, the panel can generate text for you from a short prompt:

| Feature | Where |
| --- | --- |
| Product descriptions | Product add/edit form |
| Blog content | Blogs |
| SEO content — meta titles and descriptions | [SEO Settings](/docs/admin/seo-settings) |
| Automatic translation of fields into your other languages | Any translatable field |

:::info Leaving it blank simply turns the feature off
The Gemini key is **not required**. With no key, the "Generate with AI" buttons do nothing and every one of those fields is written by hand as normal. Nothing else in SnapBuy depends on it — orders, payments, notifications and delivery are all unaffected.

Add it only if you want the AI writing assistance.
:::

### Getting a key

1. Open [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Sign in and click **Create API key**.
3. Select an existing Google Cloud project, or let it create one.
4. Copy the key into the **Gemini Key** field and save.

### Enable only the Generative Language API

SnapBuy calls a single endpoint — the **Generative Language API**, model `gemini-2.5-flash`.

In **APIs & Services → Library**, enable **Generative Language API** and nothing else. Then open the key under **Credentials** and, under **API restrictions**, choose **Restrict key** and select only that API.

:::warning Do not leave the key unrestricted
An unrestricted key works against every Google API your project has enabled, and anyone who obtains it can spend against your billing account. Restricting it to one API caps the damage.
:::

### Restrict by IP address

Like the Place API Key, this key is used **from your server**, not from the browser. Restrict it by **IP addresses** and enter your server's address — the IPv6 address if your VPS uses one, plus IPv4 if it has one.

```
2400:xxxx:xxxx:xxxx::1
203.0.113.10
```

A referrer restriction would break it, because a server-to-server request sends no referrer.

:::tip Costs
Gemini has a free tier that covers light use. Beyond it you are billed per token by Google, not by us. See [Third-Party Service Costs](/docs/admin/third-party-costs#gemini--ai-content-generation).
:::

:::info Generated text still needs review
AI-written product copy can be confidently wrong about specifications, ingredients or compliance claims — and wrong product information is a refund and a complaint, not just a typo. Treat every generated description as a first draft and check it before publishing.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Setup Guide Map step stays red | Provider is Google but only one key filled | Fill both Map and Place keys |
| Grey map with a watermark | Billing not enabled on the Google project | Enable billing |
| "This page can't load Google Maps correctly" | Required API not enabled, or the Map key's domain restriction does not cover this hostname | Enable the APIs; add the hostname to the Map key's website restrictions |
| Map loads, address search does nothing | Places API (New) not enabled, Places API not enabled, or Place key missing | Enable both Places services; fill the Place key |
| "Unable to fetch distance" at checkout, but maps render fine | Distance Matrix not enabled, or the Place key is restricted by referrer instead of by server IP | Enable Distance Matrix; restrict the Place key by IP address |
| "Unable to fetch distance" on OpenStreetMap | Public OSRM routing service rate-limited | Switch to Google Maps, or host your own OSRM |
| Distance lookups failed after a server migration | Place key still restricted to the old server IP | Update the IP restriction |
| Unexpected Google bill | Unrestricted key in use elsewhere | Apply the restrictions above and regenerate the key |
| "Generate with AI" does nothing | Gemini key blank, or Generative Language API not enabled | Add the key; enable the API |
| AI generation fails only from the server | Gemini key restricted by referrer instead of IP | Switch it to an IP address restriction |

## Checklist

- [ ] Provider chosen
- [ ] If Google: billing enabled, all six APIs enabled (including Places API (New))
- [ ] If Google: **both** Map and Place keys entered
- [ ] Distance Matrix enabled and allowed on the Place API Key
- [ ] Map key restricted by domain; Place key restricted by server IP
- [ ] Budget alert configured
- [ ] Zone map draws correctly
- [ ] Test address returns a sensible delivery charge
- [ ] If using AI generation: Gemini key added, Generative Language API enabled, key restricted to that API and your server IP
