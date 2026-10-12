---
id: shipments
title: Shipments
sidebar_position: 34
---

# Shipments

Menu path: **Shipments**

The dispatch desk. The order drawer decides how *one* order ships; this page answers **what goes out today** — every parcel across every order, in one list, with the printing and tracking actions applied to as many as you select.

![Shipments page](/images/panel/shipments-page.png)

:::info It works with no courier plugin installed
A store handing parcels to its own rider still needs a stack of delivery receipts, so this page is part of core. With a shipping plugin added — see [Shiprocket](/docs/admin/shiprocket-addon) — the courier columns, labels, manifests and pickups come alive on the same rows.
:::

## What appears here

| Included | Excluded |
| --- | --- |
| **eCommerce** orders going out for **delivery** | Quick-commerce orders — they are delivered within the hour |
| Items with a rider, a waybill, a booked parcel, or nothing yet | [Self pickup](/docs/admin/self-pickup) orders — the customer collects |
| | Cancelled items, and orders still at Payment Pending |

## One row is one parcel, not one item

Lines are grouped into a **consignment** — the items that would physically go in one box. A row is one order, from one store, under one waybill or one booked shipment, with one rider.

So an order whose three items ship together is a single row; split that order across two parcels and you get two rows.

| Column | Shows |
| --- | --- |
| **Order No** | The order. Click it to open the order drawer right here. |
| **Item** | The first product, with the count of the rest. Expand the row to see every line. |
| **Customer** | Name, city and pincode |
| **Store** | Which outlet is shipping it |
| **Courier** | The carrier and its waybill, once there is one |
| **Status** | The parcel's state — see below |
| **Amount** | The consignment's total |

:::tip Clicking an order number keeps your place
The order drawer opens over the list, so the dispatch queue underneath keeps its filters, its tab and its page. Close the drawer and carry on where you were.
:::

:::info The least advanced line sets the parcel's status
A parcel counts as delivered only when every item in it is, and a failed delivery on any one line makes the whole parcel a problem. A row whose lines disagree is flagged as mixed.
:::

## The state tabs

Each tab carries a count, and **To Dispatch** is where the page opens.

| Tab | Holds |
| --- | --- |
| **To Dispatch** | Not handed to anyone yet — this is your work queue |
| **Awaiting Waybill** | Booked with the courier, waiting for a tracking number |
| **Ready to Ship** | Has a waybill, not collected yet |
| **In Transit** | On its way |
| **Delivered** | Done |
| **Needs Attention** | A delivery attempt failed |

:::info Two tabs belong to the courier
**Awaiting Waybill** and **Needs Attention** can only be filled by a shipping plugin, so they are hidden on an installation that has none — unless they still hold rows from a plugin that was removed.
:::

:::tip Work the tabs in order each morning
**Needs Attention** first (someone is waiting on an answer), then **Awaiting Waybill** (parcels stuck before they moved), then **To Dispatch**. In Transit and Delivered are there to look things up, not to work through.
:::

## Finding a parcel

| Filter | Matches |
| --- | --- |
| **Search** | Order number, pincode, waybill, product name or customer name |
| **Store** | One outlet |
| **Date range** | When the order was placed |
| **Reset** | Clears all of them |

:::info A store user only ever sees their own store
The store filter is applied automatically for a store login, so a branch cannot read another branch's dispatch queue. See [Stores](/docs/admin/stores).
:::

## Acting on a selection

Tick the rows you want — the toolbar then shows how many parcels and how many items are selected — and choose an action. Every action applies to the whole consignment, not one line of it.

| Action | Needs | What it does |
| --- | --- | --- |
| **Print Delivery Receipts** | Nothing | One receipt per parcel, in the order you selected them. Works with or without a courier. |
| **Print Labels** | A waybill | The carrier's label sheet for the selected parcels |
| **Print Manifest** | A waybill | The handover sheet the courier signs when collecting |
| **Schedule Pickup** | A waybill | Asks the carrier to collect |
| **Refresh Tracking** | A waybill | Pulls the latest scan now instead of waiting for the next update |

Paper size, logo and notes on the delivery receipt come from [Invoice Settings](/docs/admin/invoice-settings).

:::tip The print actions are why this page exists
Printing twenty labels one order at a time is the slow way to run a dispatch desk. Filter to **Ready to Ship**, select the page, print labels and the manifest together, and hand the lot over in one go.
:::

:::warning An action on a parcel with no waybill is refused
You will see *"this item has no shipment yet"*. Labels, manifests, pickups and tracking all need the carrier to have issued a waybill first — book the parcel from the order drawer, or check the **Awaiting Waybill** tab.
:::

## The courier balance

With a courier plugin that reports it, your prepaid balance is shown at the top of the page.

:::danger An empty carrier wallet stops waybills
It is the most common reason a booking produces no tracking number, and the carrier's own error rarely says so. If parcels are piling up in **Awaiting Waybill**, read this figure first.
:::

## Where each thing is done

| Task | Where |
| --- | --- |
| Decide how one order ships, book a parcel, answer a failed delivery | [Orders](/docs/admin/orders) → the order drawer |
| Print, collect and track in bulk | **This page** |
| Carrier credentials and automation | [Shiprocket](/docs/admin/shiprocket-addon) |
| Which methods a zone may use | [Zones](/docs/admin/zones) |
| Receipt and label paper | [Invoice Settings](/docs/admin/invoice-settings) |

## Permissions

The page uses the existing `order_list` permission — anyone who can see orders can work the dispatch desk. See [Roles & Permissions](/docs/admin/roles-permissions).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| An order is missing from the list | It is quick-commerce, self pickup, cancelled, or still unpaid | Those never appear here |
| A row covers items you wanted apart | They share an order, store, waybill and rider | Book them as separate parcels from the order drawer |
| Two tabs are missing | No shipping plugin installed | Expected — see [Plugins](/docs/admin/plugins) |
| Labels or manifest refused | The selection has no waybill | Assign one first |
| Nothing happens on **Refresh Tracking** | The parcel has no waybill, or the carrier has no new scan | Check the waybill |
| Parcels stuck in Awaiting Waybill | Carrier wallet empty, or waybill assignment failed | Top up the carrier account and retry from the order |
| Counts look wrong | A filter or date range is still applied | Use **Reset** |

## Checklist

- [ ] Work **Needs Attention** and **Awaiting Waybill** before **To Dispatch**
- [ ] Filter to one store when a desk packs for one outlet
- [ ] Labels and manifest printed together before the courier arrives
- [ ] Delivery receipts printed for rider handovers
- [ ] Carrier balance watched
