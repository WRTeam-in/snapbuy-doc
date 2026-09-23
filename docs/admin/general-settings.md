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
| **Copyright Details** | Footer text on the web portal |
| **Address** | Your store address, shown on invoices and the contact page. Translatable per language. |
| **Map Location Link** | A Google Maps link to the exact spot, opened when a customer taps the address |
| **Logo** | Displayed in the panel, on invoices and in emails |
| **Favicon** | Browser tab icon |
| **Panel Login Background Image** | Backdrop on the admin login screen |
| **Admin Theme Color** | Accent colour of the admin panel |

:::tip App Name is used in more places than you expect
It is substituted into notification and email templates through the `{app_name}` placeholder. Changing it updates every template at once — you do not need to edit them individually.
:::

:::info The address here is not your fulfilment location
Delivery distance is measured from the **[store](/docs/admin/stores)** pin, not from this address. This one is for display — invoices, the contact page and the apps' "about" screens.
:::

### Map Location Link

The address above is only text. This field is the link behind it, so a customer on the contact page can tap through to directions instead of retyping the address into their own maps app.

To get it:

1. Open [Google Maps](https://www.google.com/maps) and find your store.
2. Click **Share → Copy link**.
3. Paste it here and save.

A shortened share link (`https://maps.app.goo.gl/...`) is the usual result and is exactly what this field expects. A full `https://www.google.com/maps/...` URL works too.

Unlike the address, this is **one link for all languages** — it is only set on the default-language tab.

:::danger Only Google Maps links are accepted
SnapBuy checks the link on save. It must start with `https://` and be a Google Maps address — `google.com/maps/...`, `maps.google.com/...`, `maps.app.goo.gl/...` or `goo.gl/...`.

Anything else — an Apple Maps link, a plain `http://` link, a what3words or OpenStreetMap URL, a pasted address — is **discarded silently**: the field saves as empty with no error. If your link keeps disappearing after save, that is why.
:::

:::tip Check it after saving
Reopen the page and click the saved link. A link copied from a browser's address bar while panning around a map often points at the map view rather than the place — use **Share → Copy link** on the pin itself.
:::

:::info Leave it blank if you have no storefront
An online-only operation with no public counter has nothing useful to link to. Empty is fine — the address then displays as plain text.
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

## Behaviour

| Field | What it does |
| --- | --- |
| **Max Cart Items Count** | Largest number of items a customer may place in one cart |
| **Product Rating** | Whether customers can rate and review products |

:::warning Max cart items blocks checkout when reached
Customers hitting the limit are stopped at the cart with a validation message. Set it high enough for a genuine bulk order — a grocery basket can easily exceed a low limit.
:::

:::info Currency, formats and timezone are not set here
They belong to the **country**, so each market can differ. See [Countries & Currency](/docs/admin/countries).
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Logo not updating | Cached assets | Hard-refresh the browser |
| Map Location Link empty after saving | The link is not a Google Maps URL, or is not `https://` | Copy it again with **Share → Copy link** in Google Maps |
| Logo uploads but does not display | Storage symlink missing | Visit `/linkstorage` |
| Order numbers in two formats | Prefix changed after go-live | Existing records keep their old prefix — expected |
| `{app_name}` appears literally in a message | Placeholder typo in the template | Check the [notification templates](/docs/admin/notification-templates) |

---

**Next:** [App Settings →](/docs/admin/app-settings)
