---
id: tax-settings
title: Tax Settings
sidebar_position: 22
---

# Tax Settings

Menu path: **Settings → Tax Settings**

Tax in SnapBuy is built from two pieces that work together:

| Piece | Answers |
| --- | --- |
| **Tax Category** | *What is this thing?* — "Standard rate", "Food 5%", "Zero rated" |
| **Tax Rule** | *What does this jurisdiction charge for that category?* — 9% + 9%, or a single 5% |

Both live on the same page, as two tabs.

:::info Why it is split in two
A category is a label you attach to products and charges once. A rule is what a particular country or state charges for that label. Splitting them means you tag a product as "Standard rate" a single time, and it is taxed correctly in every country you later sell in — you add a rule, not re-tag the catalogue.
:::

## The order to set it up

Follow these four steps. Each one depends on the one before it.

1. **Create tax categories** — the labels you will use.
2. **Create tax rules** — the rates each jurisdiction charges for those labels.
3. **Assign a category to each product**.
4. **Assign a category to any charge you want taxed** — delivery, surge, additional charges.

:::danger Anything without a tax category is not taxed
There is no fallback rate. A product with no tax category, or a charge you never marked taxable, is simply excluded from tax — silently, with no warning. If tax is missing from an order, an unassigned category is nearly always the reason.
:::

## Step 1 — Create tax categories

**Settings → Tax Settings → Tax Categories → Add**

| Field | Notes |
| --- | --- |
| **Name** | What you will see in dropdowns — "Standard rate", "Food", "Zero rated" |
| **Code** | A short internal identifier, e.g. `GST_5`, `VAT_STD` |
| **Description** | Optional note for your own reference |
| **Status** | Inactive categories stop appearing when tagging products |

:::tip Create categories by rate band, not by product type
"Food 5%" and "Standard 18%" are useful categories. "Biscuits", "Shampoo" and "Rice" are not — they multiply the work without changing the tax. Aim for as few categories as your tax authority actually distinguishes.
:::

## Step 2 — Create tax rules

**Settings → Tax Settings → Tax Rules → Add**

A rule says: *in this country (optionally this state), for this category, charge these components.*

| Field | Notes |
| --- | --- |
| **Country** | Required. The jurisdiction the rule belongs to. |
| **State / Region** | Optional. Leave blank for **Whole country**. |
| **Tax Category** | Required. Which category this rate applies to. |
| **Place of Supply** | `Any`, `Intra-state` or `Inter-state` — see below |
| **Status** | Inactive rules are ignored |
| **Tax Components** | One or more rows of **name + percentage** |

### Tax components

A rule breaks into named components, and the customer's invoice shows each one separately. That is how a single 18% GST appears as two 9% lines:

| Component name | Percentage |
| --- | --- |
| `CGST` | 9 |
| `SGST` | 9 |

For a flat VAT, a single component is enough:

| Component name | Percentage |
| --- | --- |
| `VAT` | 5 |

The rate charged is the **sum of the components**.

### Place of supply

This is what makes split taxes work, and it compares the **seller's** region with the **buyer's**.

| Value | Applies when |
| --- | --- |
| **Intra-state** | Buyer is in the same region as the store |
| **Inter-state** | Buyer is in a different region from the store |
| **Any** | Either case — use this where the distinction does not exist |

The classic Indian setup is two rules over the same category:

| Rule | Place of supply | Components | Total |
| --- | --- | --- | --- |
| GST 18 — intra | Intra-state | CGST 9 + SGST 9 | 18% |
| GST 18 — inter | Inter-state | IGST 18 | 18% |

:::warning Intra and inter totals should match
The two rules must add up to the same percentage. SnapBuy quotes the **intra** rule in the cart, before the customer has entered a delivery address and their region is still unknown. If your intra and inter totals differ, the tax shown in the cart will change at checkout.
:::

:::info If your country has no state-level split
Create a single rule with **Place of Supply = Any** and one component. You never need to think about intra/inter again.
:::

### Regions

The state or region list comes from the country. Manage it under **Countries → edit a country → Regions**.

A region also carries a **tax code**, used on invoices where the jurisdiction requires it.

## How a rule is chosen

When SnapBuy needs a rate, it works out the **seller's jurisdiction from the store** — the store belongs to a zone, and the zone carries the country and region. Tax here is **origin-based**: the store's location narrows the rule, not the customer's.

It then scores every rule for that country and category, and picks the highest:

| Match | Score |
| --- | --- |
| Rule names the seller's exact region | +4 |
| Place of supply matches exactly | +3 |
| Place of supply is `Any` | +2 |
| Buyer region not yet known, rule is `Intra-state` | +1 |

If two rules score the same, the **most recently edited one wins** — the assumption being that your latest edit reflects current intent.

:::tip A country-wide rule still applies where no regional rule exists
Because rules are scored rather than filtered, you can set one national rule and add regional exceptions only where a state actually differs. The national rule keeps covering everywhere else.
:::

## Step 3 — Assign a category to products

On the product form, set **Tax Category**. Leave it as **No tax** for anything exempt.

Whether the price you typed already includes tax is a separate switch, set **per store** on the variant:

| Setting | Meaning |
| --- | --- |
| **Price includes tax** ON | The price already contains the tax; SnapBuy works backwards to show the tax portion |
| **Price includes tax** OFF | Tax is added on top of the price at checkout |

:::info Inclusive pricing is a property of the price, not the rule
Two stores can sell the same product with the same tax category, one quoting tax-inclusive and the other tax-exclusive. That is why the switch sits on the store's price row and not on the tax rule.
:::

Bulk assignment of tax categories is available through [Bulk Upload & Update](/docs/admin/bulk-upload).

## Step 4 — Tax your charges

Delivery and other fees are taxable in most jurisdictions. Each charge on a [zone](/docs/admin/zones) carries the same three controls:

| Control | Meaning |
| --- | --- |
| **Is taxable** | Turn tax on for this charge |
| **Tax category** | Which category — and therefore which rate — applies |
| **Tax included in amount** | Whether the figure you typed already contains the tax |

These appear on:

- **Delivery charge** — the zone's own delivery fee
- **Surge slots** — each time-based surge charge
- **Additional charges** — each packaging, handling or service fee, per channel

:::warning A charge is untaxed until you both enable and categorise it
Turning **Is taxable** on but leaving the tax category empty results in no tax at all. Both are required.
:::

## Seller tax registration

Each [store](/docs/admin/stores) can hold its own **tax number** and **registration type** — a GSTIN, VAT number or equivalent. These are printed on invoices for the store that fulfilled the order.

:::tip Set it per store, not globally
The store is the seller for tax purposes. An installation with outlets in two states needs a different registration number on each, and putting it on the store is what makes that work.
:::

## Worked example — India

1. **Category**: `Standard 18` (code `GST_18`)
2. **Rules**, both for India, both on that category:
   - Place of supply **Intra-state** → components `CGST 9` + `SGST 9`
   - Place of supply **Inter-state** → component `IGST 18`
3. **Products**: set Tax Category to `Standard 18`
4. **Delivery charge**: Is taxable ON, Tax category `Standard 18`

A customer in the same state as the store is charged CGST 9% + SGST 9%. A customer in another state is charged IGST 18%. Both totals are 18%, so the cart figure never changes at checkout.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| No tax on any order | Products have no tax category | Assign one on the product |
| No tax on delivery | Charge not marked taxable, or no category on it | Enable **Is taxable** and pick a category |
| Tax changes between cart and checkout | Intra and inter rules total different percentages | Make both add up to the same rate |
| Wrong rate applied | A more specific regional rule exists, or two rules tie | Check the region and place of supply on each rule |
| Tax appears twice in the price | Price marked inclusive but tax also added | Check **Price includes tax** on the store's price row |
| Rule saved but never used | Rule inactive, or its category is inactive | Activate both |
| Correct rate, wrong split | Components do not match the jurisdiction | Edit the rule's component rows |

## Checklist

- [ ] Tax categories created, one per rate band
- [ ] A rule exists for every country you sell in
- [ ] Intra and inter rules total the same percentage
- [ ] Regions added where a state-level rate differs
- [ ] Every taxable product has a tax category
- [ ] **Price includes tax** set correctly per store
- [ ] Delivery, surge and additional charges marked taxable and categorised
- [ ] Store tax number and registration type filled in
- [ ] A test order shows the expected tax lines
