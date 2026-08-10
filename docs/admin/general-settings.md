---
id: general-settings
title: General Settings
sidebar_position: 17
---

# General Settings

Menu path: **Settings → General Settings**

Store identity and the numbering rules used across orders, invoices and returns.

![General settings page](/images/panel/general-settings-page.png)

## Store identity

| Field | What it does |
| --- | --- |
| **App Name** | Your store name. Appears in the panel, app headers, email subjects and notification titles. |
| **Support Number** | Shown to customers in the apps and on the web portal |
| **Support Email** | Where customer enquiries are directed |
| **Logo** | Displayed in the panel, on invoices and in emails |
| **Favicon** | Browser tab icon |
| **Admin Theme Color** | Accent colour of the admin panel |
| **Copyright Details** | Footer text on the web portal |

:::tip App Name is used in more places than you expect
It is substituted into notification and email templates through the `{app_name}` placeholder. Changing it updates every template at once — you do not need to edit them individually.
:::

## Number prefixes

| Field | Applies to | Example |
| --- | --- | --- |
| **Order Prefix** | Order IDs | `ORD` → `ORD1042` |
| **Invoice Prefix** | Invoice numbers | `INV` → `INV1042` |
| **Return Request Prefix** | Return requests | `RET` → `RET87` |

:::danger Set prefixes before you take real orders
Prefixes are applied when a record is created. Changing one later does **not** renumber existing records, so you end up with two different formats in your books and in customers' inboxes. Decide these during setup.
:::

:::info Keep them short and distinct
Two-to-four characters is plenty. Use different prefixes for orders, invoices and returns so a support agent can tell at a glance what a customer is quoting.
:::

## Store location

| Field | Used for |
| --- | --- |
| **Store Address** | Displayed on invoices and the contact page |
| **Map Latitude / Longitude** | Default map centre when no customer location is known |

:::info This is not your fulfilment location
Delivery distance is measured from the **[store](/docs/admin/stores)** pin, not from here. This address is for display and for centring the map on first load.
:::

## Behaviour

| Field | What it does |
| --- | --- |
| **Max Cart Items Count** | Largest number of items a customer may place in one cart |
| **Product Rating** | Whether customers can rate and review products |
| **Date Format** | Panel-wide date display |
| **Time Format** | 12-hour or 24-hour |
| **Default City** | Pre-selected city for new customers |

:::warning Max cart items blocks checkout when reached
Customers hitting the limit are stopped at the cart with a validation message. Set it high enough for a genuine bulk order — a grocery basket can easily exceed a low limit.
:::

:::info Per-country formats override these
[Countries](/docs/admin/countries) carry their own date and time formats, currency and decimal settings. Those apply to customers; the values here apply to the admin panel.
:::

## Currency display

The **Currency**, **Currency Code** and **Decimal Point** fields here are the panel-level defaults. Customer-facing currency comes from their [country](/docs/admin/countries).

:::danger Keep them consistent
If the panel shows `₹` while the country is set to `$`, your reports and the customer's invoice disagree. Match them unless you deliberately operate multiple currencies.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Logo not updating | Cached assets | Hard-refresh the browser; visit `/clear` |
| Logo uploads but does not display | Storage symlink missing | Visit `/linkstorage` |
| Order numbers in two formats | Prefix changed after go-live | Existing records keep their old prefix — expected |
| Customers see a different currency | Country overrides the panel default | Check the [country](/docs/admin/countries) record |
| `{app_name}` appears literally in a message | Placeholder typo in the template | Check the [notification templates](/docs/admin/notification-templates) |

---

**Next:** [App Settings →](/docs/admin/app-settings)
