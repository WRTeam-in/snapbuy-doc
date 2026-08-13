---
id: app-settings
title: App Settings
sidebar_position: 18
---

# App Settings

Menu path: **Settings → App Settings**

Controls the two mobile apps: their store listings, theme colours, forced-update behaviour, and delivery boy bonuses.

![App settings page](/images/panel/app-settings-page.png)

## Customer app

### Store URLs

| Field | Where it is used |
| --- | --- |
| **Play Store URL** | "Rate us" and share links, and the update prompt on Android |
| **App Store URL** | The same on iOS |

:::warning Fill these before enabling forced updates
The update prompt sends customers to these URLs. If they are blank or wrong, customers are told to update with nowhere to go — and if the update is forced, they are locked out of the app entirely.
:::

### Theme colours

| Field | Default |
| --- | --- |
| **Light Mode Color** | `#0E9623` |
| **Dark Mode Color** | `#1A2A3A` |

Both accept hex values and apply to the customer app's accent colour.

:::tip Check contrast in both modes
A colour that reads well on white can be unreadable on the dark background. Set both, then check a real device in each mode.
:::

## Version control and forced updates

This is the most consequential section on the page. Android and iOS are configured separately.

| Field | What it does |
| --- | --- |
| **Version System On** | Enables version checking |
| **Required Force Update** | Whether the update is mandatory |
| **Current Version** | The version you consider current |

How the two switches combine:

| Version System | Force Update | Customer experience |
| --- | --- | --- |
| Off | — | No prompt |
| On | Off | Optional prompt, dismissible |
| On | **On** | **Blocking screen — the app cannot be used until updated** |

![Version and force update settings](/images/panel/app-settings-version.png)

:::danger Forced update locks out every customer on an older build
Turning on **Required Force Update** with a **Current Version** higher than what is live on the stores blocks your entire customer base immediately — including customers mid-order.

The safe sequence:

1. Submit the new build to the store.
2. **Wait for it to be approved and actually live** — Apple review can take days.
3. Confirm you can download the new version yourself.
4. Only then raise **Current Version** and enable the force flag.

Never raise it in anticipation of approval.
:::

:::warning Set Android and iOS independently
Store approvals do not land at the same time. Forcing both to a version only released on Android locks out every iOS customer. Configure each platform to the version genuinely live on that store.
:::

## Delivery boy app

### Store URLs and colours

The same fields as the customer app, applied to the Delivery Boy App: **Play Store URL**, **App Store URL**, **Light Mode Color**, **Dark Mode Color**.

### Delivery boy bonus

Rewards riders on top of their normal earnings.

| Field | Meaning |
| --- | --- |
| **Bonus Settings** | Master switch |
| **Bonus Type** | Fixed amount, or a percentage of the order |
| **Bonus Percentage** | Used when the type is percentage |
| **Bonus Min Amount** | Floor — the bonus never pays less than this |
| **Bonus Max Amount** | Ceiling — caps the bonus on large orders |

![Delivery boy bonus settings](/images/panel/app-settings-bonus.png)

:::danger Always set a maximum on percentage bonuses
With a percentage type and no cap, one unusually large order pays out a correspondingly large bonus. Set **Bonus Max Amount** to a value you are willing to pay on your biggest realistic order.
:::

:::info Bonuses appear in settlements
Bonus amounts flow into delivery boy earnings and show up in settlement history and salary transactions. See [Delivery Boy Money Flow](/docs/admin/wallet-withdrawals).
:::

## OTP generation

**Generate OTP** controls whether SnapBuy issues a delivery-confirmation OTP that the customer reads out to the rider on handover.

:::tip Worth enabling for cash and high-value orders
It is the simplest proof-of-delivery you have, and it settles most "I never received it" disputes without an investigation.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Customers locked out after a release | Force update enabled before the store build went live | Lower **Current Version** or disable the force flag — takes effect immediately |
| Update prompt leads nowhere | Store URL blank or wrong | Fill the correct store URLs |
| iOS customers blocked, Android fine | iOS version raised before Apple approval | Set the iOS version to what is actually live |
| Theme colour unchanged in the app | App reads it at launch | Fully close and reopen the app |
| Bonus not paid | Master switch off, or the order missed the minimum | Check the switch and the min amount |
| Bonus payout far too high | Percentage type with no maximum | Set **Bonus Max Amount** |
