---
id: send-notifications
title: Send Notifications & Emails
sidebar_position: 41
---

# Send Notifications & Emails

Menu paths: **Notifications**, **Emails**, **Popup Offer**

Campaign tools for reaching customers directly — as opposed to the automatic messages covered in [Notification Settings](/docs/admin/notification-settings).

![Send notification form](/images/panel/send-notification-page.png)

## Push notification campaigns

**Notifications → Send Notification**: title, message, an optional image, and a target.

| Field | Notes |
| --- | --- |
| **Title** | Keep under about 40 characters — longer is truncated on a lock screen |
| **Message** | Under about 100 characters |
| **Image** | Optional rich media |
| **Target** | Where a tap takes the customer — a product, category, or nothing |

:::danger Sends are queued — no cron, no campaign
Campaigns are dispatched as queued jobs. Without the [cron job](/docs/admin/cron-jobs), the panel reports the campaign as sent and **nothing is delivered**. Confirm the heartbeat is green under **Settings → Cron Jobs** first.
:::

:::danger There is no unsend
A push notification is delivered to every device within seconds. A typo, a wrong price or a broken link cannot be recalled.

Always send to yourself first. Every time, including for a "quick" campaign.
:::

## Email campaigns

**Emails → Send Email** works the same way, delivered through your [SMTP](/docs/admin/smtp-settings) configuration.

:::warning Bulk email can damage your sending reputation
A large send from a domain with no sending history, or to a list with stale addresses, drives bounces and spam complaints — and can get your domain blocked for *transactional* mail too. Losing order confirmations and password resets is a far bigger problem than a failed campaign.

Warm up gradually, and make sure SPF, DKIM and DMARC are in place. See [SMTP Settings](/docs/admin/smtp-settings#deliverability).
:::

:::danger Include an unsubscribe path in promotional email
Required by anti-spam law in many jurisdictions, and expected by every mail provider. Without it you are both breaking the law in some markets and training spam filters to distrust you.
:::

## Popup offers

**Popup Offer** shows a promotional overlay when customers open the app or website.

:::warning One popup, timed well, or none at all
A popup on every launch is the fastest way to get an app deleted. Use them for genuinely time-limited offers, and take them down when the offer ends — nothing looks more neglected than a popup for last month's sale.
:::

## Targeting and timing

:::tip Send when customers can act
A grocery promotion at 3 AM is ignored and mildly irritating. Check your [order reports](/docs/admin/reports) for when customers actually shop, and send shortly before that window.

Remember the country [timezone](/docs/admin/countries) — a campaign scheduled in your local time reaches an overseas audience at the wrong hour entirely.
:::

## Frequency

:::danger Over-notifying costs you order updates too
Customers do not disable *marketing* notifications — they disable notifications for your app. Once off, they no longer receive order status updates, delivery alerts or chat replies, and support volume rises.

Treat push as a scarce resource. A useful campaign once a week beats a forgettable one every day.
:::

## Language

Campaign content is not automatically translated.

:::warning Write per language, or accept the default
Customers whose language you have not written for receive whatever you typed. If you serve a multi-lingual audience, prepare the content per [language](/docs/admin/languages).
:::

## Prerequisites

| Requirement | For |
| --- | --- |
| [Cron job](/docs/admin/cron-jobs) | Everything — nothing sends without it |
| [Firebase](/docs/admin/firebase-settings), including `config/firebase.json` | Push |
| [SMTP](/docs/admin/smtp-settings) | Email |
| Customer granted notification permission | Push |

## Before you press send

- [ ] Cron heartbeat green
- [ ] Sent to yourself and checked on a real device
- [ ] Title and message not truncated
- [ ] Target link opens the right screen
- [ ] Prices and dates in the copy are correct
- [ ] Content prepared for each active language
- [ ] Timing suits the audience's timezone
- [ ] Unsubscribe path present, for email

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Reported sent, nothing received | Queue not processed | Check the [cron job](/docs/admin/cron-jobs) |
| Push fails, email works | Firebase service account missing | Check `config/firebase.json` |
| Email fails, push works | SMTP misconfigured | Check [SMTP Settings](/docs/admin/smtp-settings) |
| Delivered to some customers only | Others revoked notification permission | Nothing to fix — expected |
| Message cut off | Too long | Shorten it |
| Tap opens the home screen | Target not set, or deeplink broken | Check [Deeplink Settings](/docs/admin/deeplink-settings) |
| Emails landing in spam | Missing SPF/DKIM/DMARC | Add the DNS records |

---

**Previous:** [← Reports](/docs/admin/reports)
