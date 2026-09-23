---
id: countries
title: Countries & Currency
sidebar_position: 9
---

# Countries & Currency

**Setup Guide step 1 of 9.** Menu path: **Countries**

A country in SnapBuy is far more than a name in a dropdown. It is the container for your **currency**, **phone number rules**, **timezone**, **date formats**, **which payment gateways are offered**, your **referral programme**, and every **legal policy** the apps display.

Get this right before anything else — zones, stores and prices all hang off it.

![Countries list](/images/panel/countries-list.png)

:::info India already exists
Installation seeds one default country — **India**, with its states and COD enabled. That means the Setup Guide's Country step is already ticked when you first log in.

Do not take that as "done". Open it and correct the currency, timezone, formats and policies before you launch.
:::

## Importing a country

Countries are **imported**, not typed in by hand. SnapBuy ships a dataset of every country with its dial code, ISO code and subdivisions, so you pick from a list instead of filling a blank form.

Go to **Countries → Import**.

![Importing countries](/images/panel/countries-import.png)

1. Search for the country by name or code.
2. Tick one or more. Countries already in your panel are greyed out and marked **Imported**.
3. Click **Import**.

| What you get | Detail |
| --- | --- |
| Name, dial code, ISO code | Taken from the dataset |
| Flag | Downloaded automatically |
| States / regions | Imported with the country — you do not add them separately |
| Status | **Inactive** |

:::danger An imported country arrives switched off
It has no currency, no payment gateway and no policies yet, so SnapBuy leaves it **inactive** on purpose. Configure it first, then set its status to Active — otherwise customers see a country they cannot order from.
:::

:::warning Flags need outbound internet access
Flags are fetched from a public flag service at import time. On a server that blocks outbound HTTPS the country still imports, but with no flag — upload one yourself on the country's edit form.
:::

:::info There is no "Add Country" button
Everything the old blank form asked for is already in the dataset. If a country you need is genuinely missing, import the closest match and correct its details on the edit form.
:::

## Configuring a country

Open a country from the list and work through the five steps of the form.

| Step | Covers |
| --- | --- |
| **Country Details** | Name, dial code, code, mobile length, formats, timezone, flag, status |
| **Payment Gateways** | Currency, plus which gateways are offered here |
| **Refer & Earn** | Referral credit values |
| **Customer Policies** | The five customer-facing legal documents |
| **Delivery Boy Policies** | The two rider-facing documents |

### Country details

![Country details](/images/panel/countries-add-form.png)

| Field | What it does |
| --- | --- |
| **Name** | Shown in the country switcher and in address forms. Translatable per language. |
| **Country Code** | Two-letter ISO code — `IN`, `US`, `AE`. Used for flags and matching. |
| **Flag** | Icon shown beside the country in the apps |
| **Status** | Inactive countries disappear from the apps immediately |

The **Default** country — the one pre-selected for new customers — is set from the country **list**, not this form. Switch the toggle on against another country to move the default; you cannot switch the current default off, and only an active country can take its place.

### Phone number rules

| Field | What it does |
| --- | --- |
| **Dial Code** | `+91`, `+1`, `+971` — prefixed to every mobile number |
| **Min Mobile Length** | Shortest valid number (default `7`) |
| **Max Mobile Length** | Longest valid number (default `15`) |

:::warning These rules block logins if wrong
Customers sign in by mobile number. If the length range does not match reality for that country, valid customers are rejected at the login screen with a validation error.

For India set both min and max to `10`. For countries with variable-length numbers, widen the range rather than guessing.
:::

### Currency

Set on the **Payment Gateways** step, alongside the gateways that will charge in it.

| Field | What it does |
| --- | --- |
| **Currency Symbol** | Displayed beside every price — `₹`, `$`, `AED` |
| **Currency Code** | ISO code — `INR`, `USD`, `AED`. Payment gateways use **this**, not the symbol. |
| **Decimal Point** | Digits after the decimal (default `2`) |

:::danger The currency code must match your payment gateway account
If your Stripe or Razorpay account settles in `INR` but the country is set to `USD`, payments are rejected or charged in the wrong currency. Match the code to what your gateway account actually supports.

Use `0` decimal points for currencies without minor units (for example JPY) — otherwise amounts are sent to the gateway multiplied incorrectly.
:::

### Timezone and formats

| Field | Example | Affects |
| --- | --- | --- |
| **Timezone** | `Asia/Kolkata` | Order timestamps, delivery slots, surge windows, scheduled maintenance, scheduled home layouts |
| **Date Format** | `d-m-Y` | How dates read in apps and emails |
| **Time Format** | `h:i A` | 12-hour (`h:i A`) or 24-hour (`H:i`) |

:::warning Timezone drives scheduling, not just display
Zone surge slots, store operating hours, scheduled maintenance windows and scheduled Home Builder publishing are all evaluated against the country timezone. A wrong timezone means surge pricing applies at the wrong hours and stores appear closed when they are open.
:::

### Payment gateways per country

Each country carries its **own** list of enabled gateways. A gateway configured globally in [Payment Gateway settings](/docs/admin/payment-gateway) still will not appear to customers unless it is enabled on their country.

![Enabling payment gateways for a country](/images/panel/countries-payment-gateways.png)

:::tip "The gateway is configured but customers cannot see it"
This is almost always the cause. Check the country record, not just the global gateway settings.
:::

The seeded India record has **Cash on Delivery** enabled by default.

### Referral programme

| Field | What it does |
| --- | --- |
| **Referral Min Order Amount** | Order value the referred customer must reach before any credit is paid |
| **Referral Credit — First Order** | Credited to the **referrer** when their invitee's first qualifying order completes |
| **Referral Credit — Referred** | Credited to the **new customer** |
| **Referral Usage Limit** | Maximum referrals one customer can be paid for. Leave blank for unlimited. |

Referral credit is paid by a queued job, so it depends on the [cron job](/docs/admin/cron-jobs) running. Set all values to `0` to switch the programme off.

### Policies

Every legal document lives on the country, so different regions can carry different terms:

| Policy | Shown to |
| --- | --- |
| Privacy Policy | Customers |
| Return Policy | Customers |
| Shipping Policy | Customers |
| Cancellation Policy | Customers |
| Terms & Conditions | Customers |
| Privacy Policy — Delivery Boy | Delivery boys |
| Terms & Conditions — Delivery Boy | Delivery boys |

![Editing a country policy](/images/panel/countries-policies.png)

Installation writes **placeholder text** into these fields so nothing appears blank in the apps.

:::danger Replace the placeholder policies before going live
App stores reject submissions that show placeholder legal text, and in many regions publishing a store without a real privacy policy is a compliance problem. Rewrite all seven before you publish.
:::

Each policy is editable **per language** — see [Manage Languages](/docs/admin/languages). Customers see the policy for their selected language, falling back to the default language when a translation is missing.

## Regions (states)

Each country holds a list of **regions** — states, provinces or emirates. Open them from the country row's **Regions** action.

They are imported with the country, so the list is normally already populated.

![Regions of a country](/images/panel/countries-regions.png)

| Field | What it does |
| --- | --- |
| **Name** | The state or province name |
| **Subdivision Code** | ISO code, e.g. `IN-MH` |
| **Tax Code** | The jurisdiction's own code — India's GST state code, for example. Printed on invoices as the place of supply. |
| **Type** | `state`, `province`, `union_territory` and so on |
| **Status** | Inactive regions stop being offered |

Two ways to add more:

- **Import** — pick from the shipped dataset, exactly as the country import works. Regions already present are greyed out.
- **Add** — a manual entry, for anything the dataset does not carry.

:::info Regions are what region-wise tax rules attach to
A tax rule can apply to a whole country or to one state. The state list it offers comes from here, and its **tax code** is what appears on the invoice. See [Tax Settings](/docs/admin/tax-settings).
:::

:::tip Zones inherit their region from the country
A zone carries the country and region it sits in, and that is how SnapBuy works out the seller's jurisdiction for tax. Missing or wrong regions show up as the wrong tax rate, not as an error message.
:::

## Multiple countries

Importing more than one country lets you sell across regions with separate currencies, gateways, policies and referral rules.

Things that are **per country**: currency, phone rules, timezone, formats, gateways, referral values, policies, regions, zones.

Things that are **global**: languages, Firebase, SMTP, chat, catalogue attributes, most items under Settings.

:::info Zones belong to a country
Every zone carries a `country_id`. Create the country first, then draw zones inside it. See [Delivery Zones](/docs/admin/zones).
:::

## Deactivating or deleting

- **Set status inactive** to hide a country from the apps while keeping its orders and customers intact. This is the safe option.
- **Deleting** a country whose zones, stores and orders still reference it will break those records. Deactivate instead unless the country was created in error and never used.

## Checklist

- [ ] Currency symbol, currency code and decimal point all correct
- [ ] Currency code matches what your payment gateway account settles in
- [ ] Min/max mobile length matches real numbers in that country
- [ ] Timezone correct — scheduling depends on it
- [ ] At least one payment gateway enabled on the country
- [ ] All seven policies rewritten, placeholders removed
- [ ] Referral values set, or zeroed to disable
- [ ] Regions present and correct, with tax codes where your tax authority uses them
- [ ] One country marked as default in the list
- [ ] Imported countries switched to Active once configured
