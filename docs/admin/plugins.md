---
id: plugins
title: Plugins
sidebar_position: 50
---

# Plugins

Menu path: **Settings → Plugins**

Plugins are paid add-ons that bolt a new capability onto SnapBuy — a courier, a payment gateway — without you touching any code. You upload a zip, enter the purchase code you were given, and the feature appears across the panel.

![Plugins page](/images/panel/plugins-page.png)

## What is available

| Plugin | Type | Adds |
| --- | --- | --- |
| **[Shiprocket](/docs/admin/shiprocket-addon)** | Shipping | Live courier rates, pincode serviceability, waybills, labels, pickups and automatic tracking |
| **[PayU India](/docs/admin/payu-addon)** | Payment | PayU hosted checkout as a payment method, per country |

The **Available Plugins** section of the page lists what you can buy, with a **Buy** and a **Documentation** link on each card. Installed plugins appear above it.

:::info SnapBuy works perfectly well with none installed
Nothing in the core panel needs a plugin. With none installed, delivery is priced by your [zone](/docs/admin/zones) rules, orders go out by delivery boy or a manually entered tracking number, and payments use the [built-in gateways](/docs/admin/payment-gateway). A plugin only adds doors; it never removes one.
:::

## Installing a plugin

1. Buy the plugin and download its zip. The filename looks like `snapbuy-plugin-shiprocket-1.0.0.zip`.
2. Go to **Settings → Plugins** and click **Install** on its card.
3. Enter the **purchase code** you received when buying it.
4. Upload the zip **exactly as downloaded** — do not rename or re-zip it.
5. Click **Install**.

![Installing a plugin](/images/panel/plugin-install-dialog.png)

Installation runs the plugin's own migrations, merges its language strings and registers it. The card then shows its version, status and licence state.

:::danger Upload the zip exactly as you received it
Renaming or re-zipping the package changes what the installer reads and the upload is rejected. If your browser unzipped it on download, download it again and keep the archive intact.
:::

:::warning The purchase code is checked once, against the licence server
Installation needs outbound HTTPS. A server that blocks it, or a code already used on another domain, fails at this step — see the troubleshooting table below.
:::

## The licence

| State | Meaning |
| --- | --- |
| **Valid** | Verified at install. Nothing re-checks it, so a working plugin cannot lose its licence on its own. |
| **Unverified** | The stored purchase code can no longer be read — this happens when `APP_KEY` is changed. The plugin keeps working; use **Re-enter purchase code** to confirm it. |
| **Invalid** | The licence server rejected the code. |

:::danger Never regenerate `APP_KEY` on a live installation
It encrypts the stored purchase code, along with your payment credentials. Changing it leaves every plugin asking for its code again. See [Environment Configuration](/docs/installation/environment-configuration).
:::

## Enabling, configuring and removing

| Control | What it does |
| --- | --- |
| **Toggle** on the card | Enables or disables the plugin without uninstalling it. A disabled plugin stops contributing its features; your data stays. |
| **Settings** | Opens the plugin's own settings form. Only shown when the plugin has one. |
| **Uninstall** | Removes the plugin. You are then asked what to do with its data. |

### Where a plugin's settings live

| Plugin type | Configured at |
| --- | --- |
| **Shipping** | **Settings → Plugins → the plugin → Settings** |
| **Payment** | **Countries → edit a country → Payment Gateways** — credentials are per country, so a payment plugin has no settings page of its own |

A payment plugin's Settings page, if you reach it, says exactly that and points you to the country form.

### Uninstalling

You are offered two answers:

| Choice | Effect |
| --- | --- |
| **Keep its data** | The plugin's code and licence are removed; its tables, settings and records stay. Re-uploading the zip later resumes with history intact. |
| **Remove its data** | Also rolls back the plugin's migrations and deletes its records. Permanent. |

:::warning Core keeps your history either way
Shipments booked through a courier plugin, and transactions taken through a payment plugin, are recorded on SnapBuy's own tables. Removing a plugin never deletes an order, a parcel's tracking number on the order, or a payment.
:::

## The master switch

`PLUGINS_ENABLED` in `.env` turns the whole system off. When it is `false` the Plugins page says so and no plugin boots, whatever its own toggle says.

```ini
PLUGINS_ENABLED=true
```

:::tip Use it to rule plugins out when debugging
If the panel misbehaves straight after installing something, set it to `false`, clear the cache from **Settings → System Updater**, and see whether the problem goes with it.
:::

## Permissions

A single permission, `manage_plugins`, covers installing, configuring, enabling and uninstalling every plugin. See [Roles & Permissions](/docs/admin/roles-permissions).

:::danger Grant it narrowly
Whoever holds it can install code that runs on your server and can read payment credentials. Keep it with the people who administer the installation.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Plugins are switched off" | `PLUGINS_ENABLED=false` in `.env` | Set it to `true` and clear the cache |
| Could not reach the licence server | No outbound HTTPS from the server | Allow outbound HTTPS, then retry |
| The licence server did not accept this purchase code | Wrong code, or already used on another domain | Check the code on your Envato account |
| Please upload a valid zip file | The package was renamed, re-zipped or partly downloaded | Download it again and upload it untouched |
| Plugin files are missing | The plugin folder was deleted on the server | Re-upload the zip |
| Not compatible with this core version | The plugin needs a newer SnapBuy | Update SnapBuy — see [System Updater](/docs/admin/system-updater) |
| Licence shows **Unverified** | `APP_KEY` changed | Click **Re-enter purchase code** |
| The plugin's features do not appear | Its toggle is off, or the licence is invalid | Check the card on the Plugins page |

## Checklist

- [ ] `PLUGINS_ENABLED` is not set to `false`
- [ ] Server allows outbound HTTPS
- [ ] Purchase code to hand, zip untouched
- [ ] Plugin installed, enabled, licence valid
- [ ] Its settings filled in — on the plugin page, or on the country for a payment plugin
- [ ] `manage_plugins` granted only to installation administrators
