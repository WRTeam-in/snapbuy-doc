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

The page generates a sample `.xlsx` built for **your** installation — your languages, your attributes, your custom fields, and one column group per [branch](/docs/admin/branches).

:::danger Never build the file yourself
The columns are generated dynamically. A spreadsheet from another installation, or from an older version of yours, will have the wrong branch columns and the wrong language columns. Download a fresh sample every time.
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

## Per-branch columns

Because stock and price are held per branch, the sheet carries a column group for **each** branch:

| Column | Meaning |
| --- | --- |
| **Listed** | Whether the product is sold at this branch |
| **Price** | Selling price at this branch |
| **Discounted Price** | Offer price at this branch |
| **Purchase Price** | Your cost at this branch |
| **Stock Status** | In stock / out of stock |
| **Available Qty** | Units on hand |
| **Min Alert** | Low-stock threshold |
| **Unlimited Stock** | Skip stock counting here |

![Per-branch columns in the bulk sheet](/images/panel/bulk-upload-branch-columns.png)

:::danger A product left unlisted everywhere is invisible
Importing a product without setting **Listed** at any branch creates a catalogue entry no customer can ever see. If products "imported successfully but do not appear", check the Listed column first.
:::

:::warning Adding a branch changes the sheet
Create a new [branch](/docs/admin/branches) and the sample gains a new column group. An older file will not contain it, so the new branch gets nothing. Re-download after any branch change.
:::

## Addons sheet

A product marked as a [food item](/docs/admin/food-items-addons) carries a menu of addon groups and options. The generated workbook has a **second tab, Addons**, for exactly that — so a whole menu can be built in a spreadsheet instead of typed in the panel.

![The Addons tab of the bulk sheet](/images/panel/bulk-upload-addons-sheet.png)

### How the tab is read

| Rule | Detail |
| --- | --- |
| **One row per option** | A group offering four toppings is four rows, not one |
| **Group columns repeat** | Group Name, Selection Type, Required, Min/Max Select, Max Qty Per Option and Group Status are repeated on every option row of that group |
| **The first row of a group wins** | A different value further down is reported as an error, never silently ignored |
| **Keep rows together** | A product's rows together, and a group's rows together inside it. Sheet order is the order the customer sees. |
| **Which product** | **Product Name** must match a Product Name on the Products sheet exactly. On update the **Product ID** identifies it, and the name beside it is only there to read. |

### Columns

| Column | Accepts |
| --- | --- |
| **Group Name** | One column per language; the default language is required |
| **Selection Type** | `Radio` (pick one) or `Checkbox` (pick several) |
| **Required** | Yes / No |
| **Min Select** / **Max Select** | Numbers; `0` means no bound |
| **Max Qty Per Option** | 1–50 |
| **Group Status** | Active / Inactive |
| **Option Name** | One column per language; the default language is required |
| **Option Image (path or URL)** | Same image rules as the Products sheet |
| **Diet Type** | Veg / non-veg marker for the option |
| **Linked Product SKU** | Point the option at a catalogue variant. On update a **Linked Variant ID** column sits beside it and wins when filled, because an SKU may be blank. |
| **Price From** | `Custom` or `Follow product` |
| **Free** | Yes / No |
| **Option Status** | Active / Inactive |
| **[Branch] Addon Offered / Addon Price / Addon Offer Price** | One group of three per branch, exactly like the product pricing columns |

:::danger A product listed here has its whole menu replaced
Every group and option for that product is rebuilt from these rows. **Anything you do not list is removed from it.** Export, edit, re-upload — never type a partial sheet by hand.
:::

:::info Leaving the tab alone changes nothing
A product you do not list keeps the addons it has. An empty Addons tab means "do not touch any menu", so you can use the workbook for ordinary product edits and ignore the second tab entirely.
:::

:::warning Do not delete the Group ID and Option ID columns on update
A live cart stores its addons by option ID. A sheet that cannot send those ids back recreates every option on every upload, which empties the cart of every customer holding that dish. Export, edit in place, upload.
:::

Limits per upload: **4000 addon rows** across at most **500 dishes**.

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
Import a handful first, check the result in the catalogue — pricing, stock, images, the right branch, the right language — then run the full file. Fixing five bad rows is trivial; unpicking five hundred is not.
:::

## Bulk Update

Bulk Update changes existing products. Export the current data, edit it, and upload it back.

:::danger Bulk Update overwrites — there is no undo
A blank cell can clear a value, and a mistyped price applies immediately to every affected product across every branch.

Before any bulk update:

1. Take a [database backup](/docs/installation/database-migration#routine-backups)
2. Export the current data as your rollback copy
3. Change only the columns you intend to change
:::

:::warning Watch for spreadsheet auto-formatting
Excel and Google Sheets silently mangle data: leading zeros are stripped from SKUs, long numbers become scientific notation, and text that looks like a date gets converted. Format those columns as **Text** before editing, and check a sample after saving.
:::

## Large imports run in the background

Product bulk import is dispatched as a queued job.

:::danger No cron, no import
The import is processed by the queue. Without a [queue worker](/docs/admin/cron-jobs#the-queue-worker) running, the file uploads and reports as accepted but nothing is ever created. Check the pending-jobs count under **Settings → Cron Jobs** if an import appears to do nothing.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Upload rejected | Wrong format, or over 20 MB | Use `.xlsx` under 20 MB; split the file |
| Column errors on a valid-looking file | Sheet from another installation or an older version | Download a fresh sample |
| Import accepted, nothing appears | No queue worker running | Set one up from the **Queue Worker** card on [Cron Jobs](/docs/admin/cron-jobs#the-queue-worker) |
| Products created but invisible | Not listed at any branch | Set the Listed column |
| Variants became separate products | Handle not shared across rows | Use one handle per product |
| Prices wrong at one branch only | Edited the wrong branch's column group | Check the column headings |
| SKUs lost leading zeros | Spreadsheet auto-formatting | Format the column as Text |
| Images missing | Referenced files not uploaded | Upload first, then import |
| Update wiped values | Blank cells overwrote them | Restore from backup |

## Checklist

- [ ] Fresh sample downloaded from **your** panel
- [ ] Backup taken before any bulk update
- [ ] Handles shared correctly across variant rows
- [ ] Listed and price set for every branch that should sell the product
- [ ] Default language filled
- [ ] Product type correct
- [ ] Images uploaded first
- [ ] Five-row test import verified
- [ ] Cron heartbeat green
