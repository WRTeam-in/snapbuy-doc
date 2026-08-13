---
id: bulk-upload
title: Bulk Upload & Update
sidebar_position: 39
---

# Bulk Upload & Update

Menu paths: **Bulk Upload** and **Bulk Update**

Create or change hundreds of products from one spreadsheet, instead of one form at a time.

| Tool | Use it to |
| --- | --- |
| **Bulk Upload** | Create products that do not exist yet |
| **Bulk Update** | Change products that already exist |

![Bulk upload page](/images/panel/bulk-upload-page.png)

## Always start from the generated sample

The page generates a sample `.xlsx` built for **your** installation — your languages, your attributes, your custom fields, and one column group per [store](/docs/admin/stores).

:::danger Never build the file yourself
The columns are generated dynamically. A spreadsheet from another installation, or from an older version of yours, will have the wrong store columns and the wrong language columns. Download a fresh sample every time.
:::

The sample includes example rows and a notes sheet explaining each column, plus dropdown validation on the cells that accept fixed values.

## File requirements

| Requirement | Value |
| --- | --- |
| Format | `.xlsx` or `.xls` |
| Maximum size | **20 MB** |

:::warning A large catalogue may exceed the limits
20 MB is the application's cap, but PHP's own upload and execution limits bite first on shared hosting. Split a very large catalogue into batches of a few hundred rows. See [PHP INI Settings](/docs/admin/php-ini-settings).
:::

## How rows become products

Rows are grouped by a **handle** — a shared identifier that ties multiple rows into one product with several variants.

:::tip One product, many rows
A t-shirt in three sizes is **three rows sharing one handle**, not three products. Get this wrong and you create three separate products that customers see as unrelated items.
:::

## Per-store columns

Because stock and price are held per store, the sheet carries a column group for **each** store:

| Column | Meaning |
| --- | --- |
| **Listed** | Whether the product is sold at this store |
| **Price** | Selling price at this store |
| **Discounted Price** | Offer price at this store |
| **Purchase Price** | Your cost at this store |
| **Stock Status** | In stock / out of stock |
| **Available Qty** | Units on hand |
| **Min Alert** | Low-stock threshold |
| **Unlimited Stock** | Skip stock counting here |

![Per-store columns in the bulk sheet](/images/panel/bulk-upload-store-columns.png)

:::danger A product left unlisted everywhere is invisible
Importing a product without setting **Listed** at any store creates a catalogue entry no customer can ever see. If products "imported successfully but do not appear", check the Listed column first.
:::

:::warning Adding a store changes the sheet
Create a new [store](/docs/admin/stores) and the sample gains a new column group. An older file will not contain it, so the new store gets nothing. Re-download after any store change.
:::

## Languages

Translatable fields — name, description and others — appear once per active [language](/docs/admin/languages).

:::tip Fill the default language at minimum
Untranslated languages fall back to the default, so a partial sheet still works. Leaving the *default* language blank does not.
:::

## Product types

The type column accepts: `none`, `veg`, `non_veg`, `chemical`, `eggetarian`, `medical`.

:::warning Type affects how products are displayed and filtered
Grocery apps commonly filter by veg/non-veg, and mislabelling has real consequences for customers with dietary or religious requirements. Get this column right.
:::

## Images

Image columns are validated during the import.

:::warning Upload images before importing
The sheet references images by path. Referencing a file that has not been uploaded fails validation for that row.
:::

## Validation happens before anything is written

The file is validated first, and errors are reported per row and per cell.

:::tip Test with five rows before importing five hundred
Import a handful first, check the result in the catalogue — pricing, stock, images, the right store, the right language — then run the full file. Fixing five bad rows is trivial; unpicking five hundred is not.
:::

## Bulk Update

Bulk Update changes existing products. Export the current data, edit it, and upload it back.

:::danger Bulk Update overwrites — there is no undo
A blank cell can clear a value, and a mistyped price applies immediately to every affected product across every store.

Before any bulk update:

1. Take a [database backup](/docs/installation/backup-database)
2. Export the current data as your rollback copy
3. Change only the columns you intend to change
:::

:::warning Watch for spreadsheet auto-formatting
Excel and Google Sheets silently mangle data: leading zeros are stripped from SKUs, long numbers become scientific notation, and text that looks like a date gets converted. Format those columns as **Text** before editing, and check a sample after saving.
:::

## Large imports run in the background

Product bulk import is dispatched as a queued job.

:::danger No cron, no import
The import is processed by the queue. Without the [cron job](/docs/admin/cron-jobs) running, the file uploads and reports as accepted but nothing is ever created. Check the cron heartbeat and the pending-jobs count under **Settings → Cron Jobs** if an import appears to do nothing.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Upload rejected | Wrong format, or over 20 MB | Use `.xlsx` under 20 MB; split the file |
| Column errors on a valid-looking file | Sheet from another installation or an older version | Download a fresh sample |
| Import accepted, nothing appears | Queue not processed | Set up the [cron job](/docs/admin/cron-jobs) |
| Products created but invisible | Not listed at any store | Set the Listed column |
| Variants became separate products | Handle not shared across rows | Use one handle per product |
| Prices wrong at one store only | Edited the wrong store's column group | Check the column headings |
| SKUs lost leading zeros | Spreadsheet auto-formatting | Format the column as Text |
| Images missing | Referenced files not uploaded | Upload first, then import |
| Update wiped values | Blank cells overwrote them | Restore from backup |

## Checklist

- [ ] Fresh sample downloaded from **your** panel
- [ ] Backup taken before any bulk update
- [ ] Handles shared correctly across variant rows
- [ ] Listed and price set for every store that should sell the product
- [ ] Default language filled
- [ ] Product type correct
- [ ] Images uploaded first
- [ ] Five-row test import verified
- [ ] Cron heartbeat green
