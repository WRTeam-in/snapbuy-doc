---
id: spin-wheel
title: Spin Wheel
sidebar_position: 46
---

# Spin Wheel

Menu path: **Spin Wheel → Manage Spin Wheel** and **Spin Wheel → Spin History**

A prize wheel your customers spin in the app. Each wedge is a reward — a coupon, wallet money, free delivery, or nothing — and you control the odds, the limits and the look.

![Spin wheel campaigns list](/images/panel/spin-wheel-list.png)

## How it works in one paragraph

You build a **campaign**: a named wheel made of **segments**. Every segment carries a win chance, and the chances must total 100%. When a customer spins, SnapBuy draws a segment using those chances, issues the reward immediately — a coupon in their account, or a wallet credit — and records the spin. The odds themselves are never sent to the app.

:::danger Only one campaign is live at a time
Activating a campaign deactivates every other one. The panel warns you when you switch a campaign on.
:::

## Step 1 — Create the campaign

**Spin Wheel → Manage Spin Wheel → Add**, then open the **Campaign** panel.

| Field | Meaning |
| --- | --- |
| **Campaign Name** | Shown above the wheel in the app. Max 15 characters, translatable per language. |
| **Coupon Code Prefix** | Prefix for every coupon this wheel issues, e.g. `SPIN` → `SPINA4K29X` |
| **Status** | Activate or deactivate. Activating switches the others off. |

### Spin rules

| Field | Meaning |
| --- | --- |
| **Spins Per Day** | How many times one customer may spin in a day. Minimum `1`. |
| **Max Spins Per User** | Lifetime cap for this campaign. `0` = unlimited. |
| **Min Delivered Orders** | The customer must have this many **delivered** orders before the wheel unlocks. `0` = open to everyone. |
| **Start Date / End Date** | The campaign window. Leave the end blank for no limit. |
| **Activate On Start Date** | Queue the campaign — the scheduler switches it on when the start time arrives, and switches off whichever campaign was live. |

:::tip Delivered, not placed
**Min Delivered Orders** counts delivered orders only. An abandoned or unpaid order does not unlock the wheel, which is what stops people from farming spins with orders they never complete.
:::

:::warning The daily allowance resets in the country's timezone
"Today" is measured in the customer's country timezone, set on the [country](/docs/admin/countries) record — not on your server clock.
:::

## Step 2 — Build the segments

Add a wedge with **Segments → Add**. The list order is the order on the wheel, and you can drag to reorder, clone or delete.

![Editing a wheel segment](/images/panel/spin-wheel-segment.png)

| Field | Meaning |
| --- | --- |
| **Label** | The text on the wedge. Translatable. |
| **Reward Type** | Promo Code, Wallet Amount, Free Delivery or No Luck |
| **Win Chance (%)** | The odds for this wedge. All wedges must total 100%. |
| **Winner Limit** | Stop awarding this wedge after N wins. `0` = unlimited. |
| **Status** | Inactive wedges are not drawn and not shown |
| **Segment Colour / Label Colour** | The wedge's own colours |
| **Display Mode** | Name and icon, name only, or icon only |
| **Segment Icon** | Shown when the display mode includes an icon |

### The four reward types

| Type | What the customer gets |
| --- | --- |
| **Promo Code** | A coupon issued to that customer only, usable for a set number of days |
| **Wallet Amount** | Money credited to their wallet immediately |
| **Free Delivery** | A free-delivery coupon, with an optional minimum order value |
| **No Luck** | Nothing — the "better luck next time" wedge |

### Coupon settings (Promo Code)

| Field | Meaning |
| --- | --- |
| **Discount Type** | `Percentage` or `Flat` |
| **Discount Apply Type** | `Instant discount` — taken off the bill at checkout; `Wallet cashback` — credited after the order is delivered |
| **Discount Percentage** | The rate, for percentage coupons |
| **Validity Days** | How many days the coupon lives after it is won |
| **Apply To** | All products, specific categories, or specific brands |

:::info Won coupons are private
A coupon issued by the wheel is bound to the customer who won it and to the country they spun in. It is not offered to anyone else, and it expires on its own after the validity days.
:::

### Prize amounts are per country

Money differs by market, so each segment carries one row per [country](/docs/admin/countries), in that country's currency:

| Reward type | Amount fields |
| --- | --- |
| Wallet Amount | Wallet amount |
| Promo Code — flat | Discount amount, Minimum order amount |
| Promo Code — percentage | Minimum order amount, Maximum discount amount |
| Free Delivery | Minimum order amount |

:::warning A blank country means the wedge is not offered there
Leave a country's amount empty and that wedge is hidden from customers in that country — the preview dims it and lists it under "not offered in this country". The chance it would have used goes to the **No Luck** wedge, or is spread over the remaining wedges if there is none.
:::

## Step 3 — Style the wheel

The **Theme** panel controls how the wheel is drawn, and the preview updates as you type.

| Setting | Controls |
| --- | --- |
| **Background Colour** | The card behind the wheel |
| **Title Colour / Second Line** | The campaign title |
| **Pointer Colour** | The marker at the top |
| **Rim Colour / Border Colour** | The outer ring and the lines between wedges |
| **Spin Button Colour / Text / Text Colour** | The button in the middle |
| **Light Colour** | The bulbs around the rim |
| **Segment Fill** | `Flat colour` or `Glossy gradient` |
| **Centre Icon** | An image at the hub |

![Spin wheel editor](/images/panel/spin-wheel-editor.png)

## How a spin is decided

1. The customer's quota is checked — spins today, lifetime cap, and the delivered-order requirement.
2. Wedges not offered in their country, switched off, or already at their winner limit are set aside.
3. A wedge is drawn using the win chances.
4. The reward is issued: a coupon is created, or the wallet is credited.
5. The spin is written to **Spin History**.

:::danger Win chances must total 100%
The editor warns you while they do not. A wheel that does not add up is refused on save.
:::

:::info Winner limits are enforced under a lock
Two customers spinning at the same moment cannot both take the last prize of a limited wedge. The one that loses the race is sent to the No Luck wedge, or the wheel is redrawn without the exhausted wedge.
:::

## Spin History

**Spin Wheel → Spin History** lists every spin, with totals across the current filter.

| Column | Shows |
| --- | --- |
| **Date** | When the spin happened |
| **Customer** | Name and mobile number |
| **Campaign** | Which wheel |
| **Reward** | The reward type won |
| **Amount** | Wallet credit or discount value |
| **Promo Code** | The coupon issued, if any |

The cards at the top total **spins**, **wins**, **wallet credited**, **coupons issued** and **free deliveries** for whatever country, campaign, reward type, date range or search term is applied.

![Spin history](/images/panel/spin-history.png)

:::tip Use the totals to price the campaign
Filter to one country and one month, and the wallet-credited figure is what the wheel cost you there. If it is running hotter than you planned, lower the win chances of the expensive wedges rather than removing them.
:::

## Scheduling and expiry

Two scheduled jobs support the wheel, and both run from the standard [cron job](/docs/admin/cron-jobs):

| Job | What it does |
| --- | --- |
| Campaign scheduler | Activates a queued campaign at its start time, and retires one past its end time |
| Coupon expiry | Deactivates spin-wheel coupons past their validity date each night |

:::danger No cron, no schedule
Without the cron entry, a campaign set to "activate on start date" never turns on and expired campaigns keep running. See [Cron Job Setup](/docs/admin/cron-jobs).
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Wheel does not appear in the app | No campaign is active, or the window has passed | Activate one; check the start and end dates |
| Customer cannot spin | Daily or lifetime limit reached, or too few delivered orders | Check the campaign's spin rules |
| A wedge never comes up | Win chance is `0`, the wedge is inactive, or its winner limit is used up | Check the segment |
| A wedge is missing in one country | No amount entered for that country | Fill the country's amount row |
| Cannot save the campaign | Chances do not total 100% | Adjust the wedges |
| Coupon won but rejected at checkout | It expired, or the cart does not match its Apply To rule | Check validity days and applicability |
| Scheduled campaign never activated | Cron not running | See [Cron Job Setup](/docs/admin/cron-jobs) |

## Checklist

- [ ] Campaign name and coupon prefix set
- [ ] Spins per day, lifetime cap and minimum delivered orders decided
- [ ] Win chances total 100%
- [ ] Every segment has an amount for every country you sell in
- [ ] Winner limits set on the expensive wedges
- [ ] A No Luck wedge exists
- [ ] Theme matches your brand, checked in the preview
- [ ] Cron job running
- [ ] One test spin completed and visible in Spin History
