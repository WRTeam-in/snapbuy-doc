---
id: contact-about
title: Contact Us & About Us Pages
sidebar_position: 31
---

# Contact Us & About Us Pages

Menu paths: **Settings → Contact Us** and **Settings → About Us**

Two rich-text pages shown in the apps and on the web portal.

![Contact Us editor](/images/panel/contact-us-page.png)

## Contact Us

Everything a customer needs to reach you. At minimum:

- Support email and phone number
- Business address
- Support hours, with the timezone stated
- Expected response time

:::danger App stores require genuine contact details
Both Apple and Google reject apps whose contact page carries placeholder text or a dead email address. This is a common rejection reason and an easy one to avoid.
:::

:::tip State support hours with a timezone
"9 AM – 6 PM" means nothing to a customer in another region. "9 AM – 6 PM IST, Monday to Saturday" sets a real expectation and cuts angry follow-ups.
:::

## About Us

Your story, what you sell and why customers should trust you. Worth including:

- What the business does and where it operates
- How long you have been trading
- Delivery areas
- Any certifications or licences relevant to what you sell

:::tip Write it for a customer deciding whether to order
This page is most often read by someone about to spend money with a store they have never used. Concrete facts — years trading, areas served, licences held — do more than adjectives.
:::

## The editor

Both pages use a rich-text editor supporting headings, lists, links, images and tables.

:::warning Do not paste directly from Word or Google Docs
Pasting carries hidden formatting that breaks the layout on mobile. Paste as plain text, then apply formatting in the editor.
:::

:::tip Check the result on a phone
Multi-column layouts and wide tables that look fine in the editor frequently overflow on a phone screen, where most customers will read them.
:::

## Per-language content

Both pages are translatable. Customers see the version for their language, falling back to the default language when a translation is missing.

See [Manage Languages](/docs/admin/languages).

## Where these differ from policies

| Content | Where it lives | Scope |
| --- | --- | --- |
| Contact Us, About Us | **Here** | Global — one version per language |
| Privacy, Returns, Shipping, Cancellation, Terms | [Countries](/docs/admin/countries#policies) | **Per country** |

:::info Why policies are per country and these are not
Legal terms vary by jurisdiction, so they attach to the country. Who you are and how to reach you does not change by region.
:::

## Public print URLs

Both pages are also served as standalone URLs, useful for app store listings and support links:

| Page | URL |
| --- | --- |
| About Us | `https://admin.yourstore.com/about-us` |
| Contact Us | `https://admin.yourstore.com/contact-us` |

The per-country policies have their own equivalents:

```
/customer-privacy-policy
/customer-returns-and-exchanges-policy
/customer-shipping-policy
/customer-cancellation-policy
/customer-terms-conditions
/delivery-boy-privacy-policy
/delivery-boy-terms-conditions
```

:::tip Use these for your app store listing
App stores ask for a publicly reachable privacy policy URL. These endpoints are public and always current, so the listing never drifts out of date with the panel.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Page blank in the app | Content empty for that language | Fill it, or complete the default language |
| Layout broken on mobile | Pasted formatting from a word processor | Re-paste as plain text |
| Images not displaying | Storage symlink missing | Visit `/linkstorage` |
| App store rejection over contact details | Placeholder text still present | Enter real details |
| Wrong language shown | Translation missing | Add it under [Languages](/docs/admin/languages) |
