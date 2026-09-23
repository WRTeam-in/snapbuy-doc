---
id: reports
title: Reports
sidebar_position: 40
---

# Reports

Menu path: **Reports**

Twelve reports covering sales, operations, customers and tax.

![Reports overview](/images/panel/reports-page.png)

## The twelve reports

| Report | Answers |
| --- | --- |
| **Sales** | What am I selling, and for how much, over time? |
| **Orders** | How many orders, at what value, in what status? |
| **Products** | Which products sell, and which do not? |
| **Category** | Which categories carry the business? |
| **Customers** | Who buys, how often, and how much? |
| **Inventory** | What stock do I hold, and where? |
| **Returns** | What comes back, and why? |
| **Delivery** | How are riders and delivery performing? |
| **Payment** | Which payment methods are used, and what succeeds? |
| **Promo** | Are discount campaigns working? |
| **Tax** | How much tax did I collect, at what rate, on what? |
| **Order-wise Tax** | What tax did each individual order carry? |

## Reading them well

:::tip Compare periods, not just totals
A single month's revenue tells you almost nothing on its own. The same month against the previous one, or against the same month last year, tells you whether the business is growing. Every report supports a date range — use two.
:::

### Sales and Orders

Sales shows revenue; Orders shows volume and status mix.

:::warning A high cancellation rate is a symptom, not a statistic
Cancellations concentrated in one [zone](/docs/admin/zones) usually mean delivery charges are wrong or the area is unserviceable. Concentrated at Payment Pending, they usually mean a payment gateway problem — see [Payment Gateways](/docs/admin/payment-gateway#webhooks) before blaming customers.
:::

### Products and Category

:::tip Look at the bottom of the product report, not just the top
The products that never sell are costing you stock capital, shelf space and catalogue clutter. The slow-moving tail is usually a bigger opportunity than the bestsellers, which are already working.
:::

### Inventory

Stock on hand, by [store](/docs/admin/stores).

:::warning Inventory is per store
A product can be out of stock at one outlet and plentiful at another. The customer only ever sees the stock of the store serving their [zone](/docs/admin/zones), so a healthy total across all stores can still mean "unavailable" for most customers.
:::

### Delivery

Rider and delivery performance.

:::tip Cross-check against cash collection
A rider with strong delivery numbers but persistently unsettled COD cash is a reconciliation problem, not a performance success. Read this alongside [Wallet & Settlements](/docs/admin/wallet-withdrawals).
:::

### Payment

Methods used and success rates.

:::danger A falling success rate on one gateway needs immediate attention
Payment failures are silent lost revenue — the customer rarely tells you, they just leave. A sudden drop usually means expired credentials, an account issue at the provider, or a mode/currency mismatch. Check [Payment Gateways](/docs/admin/payment-gateway).
:::

### Promo

:::warning Measure promo codes against margin, not revenue
A discount code will almost always increase order volume. The question is whether the extra orders covered the discount given, and whether they went to customers who would have bought anyway. Revenue alone flatters every campaign.
:::

### Tax

Two reports, meant to be read together: **Tax** is the accounting summary, **Order-wise Tax** is the evidence behind any line of it.

#### Tax Report

One row per **what was taxed × rate**, with every tax head as its own column — CGST and SGST for an Indian order, VAT for a UAE one. The columns build themselves from your [tax rules](/docs/admin/tax-settings), so you see the heads you actually charge.

| Column | Shows |
| --- | --- |
| **Taxed on** | Items, Delivery charge, Surge charges or Additional charges |
| **Rate** | The rate that applied |
| **Taxable value** | The amount the tax was charged on |
| *(one per tax head)* | e.g. CGST, SGST, IGST, VAT |
| **Total tax** | The row's tax across all heads |
| **Orders** | How many orders contributed |

The cards above the table give the figures a filing needs:

| Card | Meaning |
| --- | --- |
| **Taxable value** | Total value taxed in the period |
| **Tax collected** | Tax charged on orders placed |
| **Tax reversed** | Tax given back through cancellations and returns |
| **Net tax payable** | Collected − reversed. This is the number you file. |
| **Tax on goods** | The items portion |
| **Tax on charges** | The delivery, surge and additional-charge portion |
| **Effective tax rate** | Net tax as a percentage of taxable value |

Click any row to drill into **Order-wise Tax**, already filtered to that source and rate.

#### Order-wise Tax Report

One row per order, with the tax split by what produced it.

| Column | Shows |
| --- | --- |
| **Order ID**, **Date**, **Channel** | Which order |
| **Place of supply** | The jurisdiction recorded on the order |
| **Taxable value** | The order's taxed amount |
| **Items / Delivery charge / Surge charges / Additional charges** | Tax from each source |
| **Tax reversed** | Tax returned on that order |
| **Total tax** | Net tax for the order |
| **Status** | The order's current status |

:::info Tax figures are frozen at the moment of the order
Every tax line is written once, when the order is placed, and is never recalculated. Changing a [tax rule](/docs/admin/tax-settings) today cannot move a figure you already filed last month — which is exactly what an audit needs.
:::

:::danger File the net figure, not the collected one
**Tax collected** ignores money you gave back. Cancellations and returns write a reversal line, and **Net tax payable** is collected minus those reversals. Filing the collected figure means paying tax on refunded orders out of your own pocket.
:::

:::warning Tax on charges is easy to forget
Delivery, surge and additional charges are taxed separately from the goods and appear as their own rows. If **Tax on charges** reads zero while you do charge for delivery, the charge is probably not marked taxable — see [Tax Settings](/docs/admin/tax-settings#step-4--tax-your-charges).
:::

:::tip Filter to one country before filing
Tax is a per-jurisdiction obligation. Reading a multi-country total mixes rates and currencies into a figure no tax authority wants. Filter by country — and by zone where you file separately — then export.
:::

### Returns

:::tip Returns clustered on one product are a product problem
A single item appearing repeatedly in the returns report usually means the listing is misleading — wrong size guidance, a photograph that does not match, or an inaccurate description. Fixing the listing is cheaper than processing the returns.
:::

## Timezone and currency

Report periods are evaluated against the [country's](/docs/admin/countries) timezone, and amounts in its currency.

:::warning A wrong country timezone shifts every daily figure
Orders land in the wrong day, so daily comparisons and "best hour" analysis are quietly wrong. If your figures look shifted by a few hours, check the timezone before anything else.
:::

## Access

:::danger Reports expose commercial data
Revenue, margin, customer value and purchase prices are all visible here. Grant the `report` permission narrowly — and remember that granting `list` only, with no update rights, is the right shape for an accountant or analyst. See [Roles & Permissions](/docs/admin/roles-permissions).
:::

## Exports

Reports can be exported for use in a spreadsheet.

:::warning An exported report leaves your access controls behind
Once downloaded, a file containing customer details and revenue can be forwarded anywhere. Treat exports as sensitive documents, and be deliberate about who can produce them.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Report empty | Date range has no data, or filters too narrow | Widen the range |
| Figures shifted by hours | Country timezone wrong | Fix it on the [country](/docs/admin/countries) |
| Totals disagree with the gateway | Missing webhook, some payments unrecorded | See [Payment Gateways](/docs/admin/payment-gateway#webhooks) |
| Inventory looks wrong | Reading totals across stores | Filter by store |
| Export times out | Range too large | Export in smaller periods |
| Staff cannot open reports | `report` permission not granted | Grant `list` in that category |
| Tax report empty | No orders carried tax in the range, or no product has a tax category | Check [Tax Settings](/docs/admin/tax-settings) |
| Tax report shows no delivery tax | The delivery charge is not marked taxable | Enable **Is taxable** on the [zone](/docs/admin/zones) |
| A tax head column is missing | No rule in the period used that component | Expected — the columns follow what was actually charged |
