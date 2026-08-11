---
id: stores
title: Stores
sidebar_position: 11
---

# Stores

**Setup Guide step 3 of 9.** Menu path: **Stores**

A **store** is a physical outlet that fulfils orders — your shop, warehouse or dark store. It holds the location orders are dispatched from, the hours it operates, and its own stock and prices.

:::info Stores are your outlets, not third-party sellers
SnapBuy stores are fulfilment locations that you own and operate. There is no vendor account, commission split or seller login attached to a store. Adding a second store means opening a second branch, not onboarding a marketplace seller.
:::

![Stores list](/images/panel/stores-list.png)

## One zone, one store

This is the rule that shapes everything else:

> **Each store belongs to exactly one zone, and each zone can hold exactly one store.**

Attempting to attach a second store to a zone is rejected with *"Zone already assigned to another store."*

:::warning Create the zone first
You cannot create a store without selecting a zone. Work through [Delivery Zones](/docs/admin/zones) before this page. To open a second outlet, draw a **new zone** for its catchment area first.
:::

This design means the customer's address decides the store: their coordinates match a zone polygon, and that zone's store fulfils the order.

## Creating a store

Go to **Stores → Add Store**.

![Add store form](/images/panel/stores-add-form.png)

### Basic details

| Field | Notes |
| --- | --- |
| **Name** | Shown to customers — "Andheri West Outlet" |
| **Provider** | Optional operator or brand label for the outlet |
| **Fulfillment Type** | `Quick`, `eCommerce` or `Both` |
| **Zone** | The one zone this store serves |
| **Status** | Inactive stores stop receiving orders |

:::danger Fulfillment type must match the zone's sales channel
A store set to **Quick** cannot be attached to a zone whose sales channel is **eCommerce** only. SnapBuy rejects it with *"Selected zone does not support this fulfillment type."*

The zone declares which channels it serves; the store must be a subset of that. A store set to **Both** requires a zone set to **Both**.
:::

### Location

| Field | Notes |
| --- | --- |
| **Address** | Free-text address shown to customers |
| **Map location** | Click the map to drop the pin — **required** |
| **Latitude / Longitude** | Filled from the pin |
| **Formatted Address / Place ID** | Filled automatically when using Google Maps |

:::warning The pin is what distance is measured from
On the quick channel, delivery charge is calculated from the **store pin** to the customer. A pin dropped on the wrong side of town produces wrong charges on every single order. Zoom in and place it on the actual building.

Saving without a pin fails with *"Please select store location on map."*
:::

### Contact

| Field | Used for |
| --- | --- |
| **Contact Number** | Shown to customers and delivery boys for that outlet |
| **Email** | Store-level notifications |

### Operating hours

Set open and close times per day of the week, and mark days closed.

![Store operating hours](/images/panel/stores-operating-hours.png)

:::warning Hours are read in the country's timezone
Operating hours are evaluated against the timezone set on the store's zone's [country](/docs/admin/countries) — not the server clock. A wrong country timezone makes the store appear closed while it is open.
:::

## Multi-language

Store **name**, **provider** and **address** are translatable.

:::info Create in the default language first
SnapBuy rejects creating a store in a secondary language with *"Please create store in default language first."* Create the record in your default language, then switch language and add translations. See [Manage Languages](/docs/admin/languages).
:::

## Per-store stock and pricing

Once you have more than one store, stock and price stop being a single global number. Each product variant carries a separate record **per store**:

| Field | Meaning |
| --- | --- |
| **Listed** | Whether the product is sold at this store at all |
| **Unlimited stock** | Skip stock counting for this store |
| **Stock status** | In stock / out of stock |
| **Available** | Units on hand |
| **Reserved** | Units held by orders not yet delivered |
| **Min alert** | Low-stock threshold for this outlet |
| **Price** | Selling price **at this store** |
| **Discounted price** | Offer price at this store |
| **Pricing slabs** | Quantity-break pricing at this store |
| **Purchase price** | Your cost at this store |

![Per-store stock and pricing](/images/panel/stores-stock-pricing.png)

:::tip Prices can differ per outlet
Because price lives on the store-variant record, the same product can legitimately cost more at one outlet than another — useful when outlets sit in different tax or cost regions. If a price change "did not apply", check you edited the right store.
:::

:::warning A product listed nowhere is invisible
A product can exist in the catalogue, be Active, and still never appear to customers because it is not **listed** at the store serving their zone. When a customer reports a missing product, check the store listing before checking the product itself.
:::

Day-to-day stock work is covered in **Stock Management**; bulk changes across many products are covered in [Bulk Upload & Update](/docs/admin/bulk-upload).

## How a store gets chosen for an order

1. Customer sets a delivery address.
2. The coordinates are matched against zone polygons for the channel being shopped.
3. The matched zone's **single store** fulfils the order.
4. Prices and stock come from that store's variant records.
5. Delivery charge is measured from that store's pin.

This is why a missing or misconfigured zone shows up as "delivery not available" rather than as a store error.

## Deactivating a store

Setting a store **Inactive** stops new orders while preserving its history and stock records. Prefer this over deletion.

Deleting a store is a soft delete, but it frees the zone so another store can claim it.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Zone already assigned to another store" | That zone already has a store | Create a new zone for the new outlet |
| "Selected zone does not support this fulfillment type" | Store channel is wider than the zone's | Change the store type, or set the zone to `Both` |
| "Please select store location on map" | No pin dropped | Click the map to place the pin |
| "Please create store in default language first" | Creating in a secondary language | Switch to the default language, create, then translate |
| Delivery charges are wrong for every order | Store pin in the wrong place | Re-drop the pin at the real address |
| Store shows closed during business hours | Country timezone wrong | Fix the timezone on the [country](/docs/admin/countries) |
| Product missing for some customers only | Not listed at that zone's store | List it on that store |

## Checklist

- [ ] A zone exists for this outlet's catchment
- [ ] Fulfillment type is compatible with the zone's sales channel
- [ ] Map pin dropped on the actual building
- [ ] Operating hours set for all seven days
- [ ] Contact number and email filled
- [ ] Name, provider and address translated into every active language
- [ ] Products listed and priced at this store
- [ ] Status Active

---

**Previous:** [← Delivery Zones](/docs/admin/zones) · **Next:** [Home Builder →](/docs/admin/home-builder)
