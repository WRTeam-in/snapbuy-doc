---
id: pending-screenshots
title: Pending Screenshots (internal)
sidebar_class_name: hidden
draft: true
---

# Pending screenshots — internal checklist

These image slots were removed from the docs because no real screenshot exists yet.
To restore one: drop the PNG into `static/images/panel/<filename>.png` and put the
markdown line back into the listed page at roughly the noted position.

Markdown format:

```markdown
![<alt text>](/images/panel/<filename>.png)
```

## Not obtainable from the admin panel

These live outside SnapBuy — they need a screen recording from the relevant
third-party account or a pre-installation environment.

| Filename | Page | Alt text | Source |
| --- | --- | --- | --- |
| `php-ini-cpanel` | php-ini-settings.md | cPanel MultiPHP INI Editor showing the PHP limits | cPanel |
| `php-ini-phpinfo` | php-ini-settings.md | phpinfo output showing the updated limits | phpinfo page |
| `subdomain-cpanel-create` | create-subdomain.md | cPanel subdomain creation form | cPanel |
| `subdomain-document-root` | create-subdomain.md | Setting the subdomain document root to the public folder | cPanel |
| `server-upload-files` | server-setup.md | Extracted SnapBuy files on the server | cPanel File Manager |
| `server-create-database` | server-setup.md | Creating the database and user in cPanel | cPanel |
| `cron-cpanel-add` | cron-jobs.md | Adding the cron job in cPanel | cPanel |
| `localhost-extract-files` | localhost-setup.md | SnapBuy files extracted into the htdocs folder | Local machine |
| `localhost-create-database` | localhost-setup.md | Creating an empty database in phpMyAdmin | phpMyAdmin |
| `firebase-create-project` | firebase-settings.md | Creating a Firebase project | Firebase console |
| `firebase-web-config` | firebase-settings.md | Firebase web app config values | Firebase console |
| `firebase-vapid-key` | firebase-settings.md | Generating the VAPID key pair | Firebase console |
| `firebase-service-account` | firebase-settings.md | Generating the service account private key | Firebase console |
| `firebase-phone-auth` | firebase-settings.md | Enabling phone sign-in in Firebase | Firebase console |
| `map-google-enable-apis` | map-api-keys.md | Enabling Google Maps APIs | Google Cloud console |
| `map-key-restrictions` | map-api-keys.md | Restricting an API key | Google Cloud console |
| `chat-pusher-keys` | chat-settings.md | Pusher app keys | Pusher dashboard |
| `payment-webhook-setup` | payment-gateway.md | Registering a webhook URL | Gateway dashboard |

## Installer screens — only visible before installation

An installed panel redirects away from `/install`, so these can only be captured
on a fresh installation (or one pointed at a throwaway database).

| Filename | Page | Alt text |
| --- | --- | --- |
| `requirements-extensions` | server-requirements.md | Installer requirements check showing PHP extensions |
| `requirements-permissions` | server-requirements.md | Installer permissions check |
| `server-installer-welcome` | server-setup.md | Installation wizard welcome step |
| `server-installer-requirements` | server-setup.md | Installer requirements step with all checks passing |
| `server-installer-database` | server-setup.md | Installer database step |
| `server-installer-purchase-code` | server-setup.md | Installer purchase code step |
| `server-installer-finish` | server-setup.md | SnapBuy admin login screen |
| `localhost-installer-welcome` | localhost-setup.md | SnapBuy installation wizard welcome screen |
| `localhost-installer-database` | localhost-setup.md | Installer database step |

## Blocked by panel state

Reachable in principle, but the demo panel lacks the data or login needed.

| Filename | Page | Alt text | Blocker |
| --- | --- | --- | --- |
| `orders-assign-rider` | orders.md | Assigning a delivery boy to an order | Needs at least one order |
| `delivery-boy-portal` | delivery-boy-portal.md | Delivery boy portal dashboard | Needs a delivery boy login |

## Still to capture from the panel

Straightforward — just not done yet.

| Filename | Page | Alt text | Where |
| --- | --- | --- | --- |
| `templates-edit` | notification-templates.md | Editing a template with placeholders | Settings → Notification Templates → edit |
| `seo-edit-page` | seo-settings.md | Editing a page's SEO entry | Settings → SEO Settings → Add SEO Page |
| `languages-add` | languages.md | Adding a language | Languages → Add Language |
| `languages-json-edit` | languages.md | Editing language strings | Languages → edit → JSON editor |
| `home-builder-schedule` | home-builder.md | Scheduling a layout to publish | Home Builder → edit → Edit setup |
| `home-builder-redirect` | home-builder.md | Setting a banner redirect | Home Builder → edit → banner section |
