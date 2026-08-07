---
id: notification-settings
title: Notification Settings
sidebar_position: 24
---

# Notification Settings

Menu path: **Settings → Notification Settings**

A switchboard for every automatic notification Snapbuy sends. Each **event** can be turned on or off independently, per **audience**.

![Notification settings page](/images/panel/notification-settings-page.png)

## Audiences

| Audience | Receives |
| --- | --- |
| **Customer** | Order updates, wallet activity, promotions, chat replies |
| **Delivery Boy** | Order assignments, salary, wallet, withdrawal outcomes |
| **Admin** | Chat messages, withdrawal requests |

Filter by audience, or search by event name, to find what you need.

## The events

Grouped by area. The same underlying event often exists separately per audience — assigning an order notifies both the customer and the rider, and each can be switched independently.

### Orders

| Event | Audience |
| --- | --- |
| `assign_order_customer` | Customer — a rider has been assigned |
| `assign_order_delivery_boy` | Delivery boy — you have a new order |
| `order_item_status_customer` | Customer — item status changed |
| `order_item_cancelled_customer` | Customer — item cancelled |
| `order_item_returned_customer` | Customer — return processed |
| `payment_failed_customer` | Customer — payment failed |

### Wallet and money

| Event | Audience |
| --- | --- |
| `wallet_recharged_customer` | Customer |
| `wallet_recharge_failed_customer` | Customer |
| `wallet_admin_credit_customer` | Customer — you credited them manually |
| `wallet_cashback_customer` | Customer |
| `wallet_referral_bonus_customer` | Customer |
| `wallet_refund_cancelled_customer` | Customer |
| `wallet_refund_returned_customer` | Customer |
| `wallet_credited_delivery_boy` | Delivery boy |
| `wallet_debited_delivery_boy` | Delivery boy |
| `salary_paid_delivery_boy` | Delivery boy |
| `received_from_customer` | Cash collected |
| `withdrawal_request_admin` | Admin — a rider requested a payout |
| `withdrawal_status_delivery_boy` | Delivery boy — request approved or rejected |

### Account

| Event | Audience |
| --- | --- |
| `welcome_customer` | Customer — on signup |
| `password_changed_customer` | Customer |
| `account_status_customer` | Customer — account enabled/disabled |
| `account_status_delivery_boy` | Delivery boy |

### Marketing and content

| Event | Audience |
| --- | --- |
| `promo_code_customer` | Customer |
| `new_blog_customer` | Customer |
| `cart_reminder_first_customer` | Customer — see [Cart Settings](/docs/admin/cart-settings) |
| `cart_reminder_interval_customer` | Customer |

### Chat

| Event | Audience |
| --- | --- |
| `chat_message_customer` | Customer |
| `chat_message_delivery_boy` | Delivery boy |
| `chat_message_admin` | Admin |

## What to leave on

:::danger Never disable order status notifications
`assign_order_delivery_boy` is how riders learn they have work. `order_item_status_customer` is how customers know their order is moving. Turning these off produces immediate operational failure — riders miss orders and customers phone support.
:::

:::tip Where trimming is reasonable
Marketing events — `promo_code_customer`, `new_blog_customer`, cart reminders — are the ones worth being selective about. Over-notifying gets your app's notifications disabled entirely, which then costs you the order updates too.
:::

:::warning `password_changed_customer` is a security signal
It tells a customer their password changed. If an account is compromised, this is often the first thing they notice. Leave it on.
:::

## What a switch here does not do

Turning an event **on** only permits it. Delivery still needs:

| Requirement | Why |
| --- | --- |
| [Firebase](/docs/admin/firebase-settings) configured, including `config/firebase.json` | Push cannot be sent without it |
| [Cron job](/docs/admin/cron-jobs) running | Notifications are queued jobs |
| A [template](/docs/admin/notification-templates) for the event | No template, no message body |
| The customer granted notification permission | Nothing can be delivered otherwise |

:::danger "The event is enabled but nothing arrives"
Work through it in this order: cron heartbeat green → `config/firebase.json` exists → the template has content → the device granted permission. In practice it is almost always the first two.
:::

## Wording

This page controls **whether** a message is sent. **What it says** comes from [Notification Templates](/docs/admin/notification-templates).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Nothing sends at all | Cron or Firebase not set up | Check [Cron Jobs](/docs/admin/cron-jobs), [Firebase](/docs/admin/firebase-settings) |
| One event silent, others fine | That event disabled, or its template empty | Enable it; check the template |
| Riders miss new orders | `assign_order_delivery_boy` disabled | Re-enable it |
| Customers complain of too many messages | Marketing events all on | Disable the promotional ones |
| Message arrives in the wrong language | Template not translated | Add translations |
| Admin misses withdrawal requests | `withdrawal_request_admin` disabled | Enable it |

---

**Previous:** [← SMS Settings](/docs/admin/sms-settings) · **Next:** [Notification Templates →](/docs/admin/notification-templates)
