---
id: notification-templates
title: Notification, Email & SMS Templates
sidebar_position: 25
---

# Notification, Email & SMS Templates

Three template libraries, one shared set of rules:

| Library | Menu path | Delivered by |
| --- | --- | --- |
| **Notification Templates** | Settings → Notification Templates | Firebase push |
| **Email Templates** | Settings → Email Templates | [SMTP](/docs/admin/smtp-settings) |
| **SMS Templates** | Settings → SMS Templates | [SMS gateway](/docs/admin/sms-settings) |

Templates decide **what a message says**. Whether it is sent at all is [Notification Settings](/docs/admin/notification-settings).

![Notification templates list](/images/panel/templates-list.png)

## Placeholders

Templates contain placeholders in curly braces, replaced at send time with real values.

| Placeholder | Becomes |
| --- | --- |
| `{app_name}` | Your store name from [General Settings](/docs/admin/general-settings) |
| `{customer_name}` | The customer's name |
| `{delivery_boy_name}` | The assigned rider |
| `{id}` | Order or record ID |
| `{amount}` | Transaction amount |
| `{final_total}` | Order total |
| `{discount}` | Discount applied |
| `{currency}` | Currency symbol |
| `{balance}` | Wallet balance after the transaction |
| `{message}` | Chat message body |
| `{expiry_date}` | Promo code expiry |
| `{blog_title}`, `{blog_url}` | Blog post details |
| `{created_at}` | Timestamp |
| `{otp}` | One-time password (SMS) |


:::danger Placeholders must match exactly
`{customer_name}` works. `{Customer_Name}`, `{customer name}` and `{ customer_name }` do not — they are printed to the customer literally, braces and all.

Only use placeholders offered for that specific event. `{delivery_boy_name}` in a welcome message has no rider to resolve to and comes out blank.
:::

:::tip Preview with real data
After editing, trigger the event once — place a test order, request a test OTP — and read what actually arrives. Placeholder mistakes are invisible in the editor and obvious in the message.
:::

## Per-language templates

Every template is editable **per language**. Customers receive the version matching their selected language, falling back to your default language when a translation is missing.

:::warning Add translations when you add a language
Adding a language under [Manage Languages](/docs/admin/languages) does not translate existing templates. Until you fill them in, those customers get the default language — which usually looks like a bug to them.
:::

## Writing for each channel

### Push notifications

Short. A title and a body, both truncated by the operating system.

:::tip Aim for under 40 characters of title and 100 of body
Anything longer is cut off mid-sentence on a lock screen. Put the important part first: "Order ORD1042 is out for delivery" beats "We are pleased to inform you that…".
:::

### Email

HTML, so formatting and links are available.

:::warning Keep the SMTP content type set to HTML
With [SMTP](/docs/admin/smtp-settings) content type set to `Text`, HTML templates are delivered as raw markup.
:::

Include an unsubscribe path in promotional email — required by anti-spam law in many jurisdictions.

### SMS

Charged per segment: 160 characters for plain text, **70** if you include any non-GSM character.

:::danger Emoji and curly quotes triple your SMS cost
One emoji switches the whole message to Unicode encoding, dropping the segment size from 160 to 70 characters. A message that was one segment becomes three, and you pay three times for every send. Keep SMS plain.
:::

:::danger Registered SMS templates must match character for character
Where the regulator requires pre-registration — India's DLT regime, for example — the text you send must be identical to the registered text. Editing an SMS template here without updating the registration causes silent delivery failure: the provider reports success and nothing arrives.
:::

## OTP templates

The OTP message deserves care — it is the first thing a new customer ever receives from you.

:::tip Keep OTP messages boring and short
`{otp} is your {app_name} verification code. Do not share it.` — that is the whole message. Marketing copy in an OTP raises spam-filter risk and, in regulated markets, breaks the transactional classification you are billed under.
:::

## Restoring defaults

Templates are seeded at installation. If you overwrite one badly, re-seeding the template seeders restores the defaults — but this **overwrites your edits to every template**, not just the broken one.

:::warning Copy a template before you rewrite it
There is no per-template undo. Paste the original into a note first.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `{customer_name}` shown literally | Typo, or placeholder invalid for that event | Correct the spelling; use a supported placeholder |
| Message blank where a value should be | Placeholder has no value in that context | Use a placeholder valid for the event |
| Email arrives as raw HTML | SMTP content type is `Text` | Set it to `HTML` |
| Customers get the wrong language | Translation missing | Fill the template for that language |
| SMS costs tripled | Emoji or special characters | Remove them |
| SMS not delivered in India | Text differs from the DLT registration | Match it exactly |
| Push cut off mid-sentence | Too long | Shorten; front-load the meaning |
| Nothing sends at all | Event disabled, or cron/Firebase missing | See [Notification Settings](/docs/admin/notification-settings) |

---

**Previous:** [← Notification Settings](/docs/admin/notification-settings) · **Next:** [SEO Settings →](/docs/admin/seo-settings)
