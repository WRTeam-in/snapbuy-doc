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
| `php-ini-phpinfo` | php-ini-settings.md | phpinfo output showing the updated limits | phpinfo page |
| `localhost-extract-files` | localhost-setup.md | SnapBuy files extracted into the htdocs folder | Local machine |
| `map-google-enable-apis` | map-api-keys.md | Enabling Google Maps APIs | Google Cloud console |
| `chat-pusher-keys` | chat-settings.md | Pusher app keys | Pusher dashboard |
| `payment-webhook-setup` | payment-gateway.md | Registering a webhook URL | Gateway dashboard |

## Admin panel installation — capture during a fresh install

These are the highest-priority shots. The installer is only reachable on a server where
SnapBuy has not yet been installed, so capture the whole sequence in one pass the next
time you provision one (or point a throwaway database at a staging copy).

Steps 5–9 of Server Setup already have **placeholder images in place**, so the page
renders correctly today. Replace the file at the same path and the page updates with
no markdown change:

`static/images/panel/<filename>.png` and `offline-docs/images/panel/<filename>.png`

Take them in this order — it matches the wizard:

| # | Filename | Page | What to capture |
| --- | --- | --- | --- |
| 1 | `server-installer-welcome` | admin/server-setup.md | The wizard's Welcome step |
| 2 | `server-installer-requirements` | admin/server-setup.md | Requirements step with every extension green |
| 3 | `requirements-extensions` | admin/server-requirements.md | Close-up of the PHP extension grid |
| 4 | `requirements-permissions` | admin/server-requirements.md | Close-up of the writable-paths check |
| 5 | `server-installer-database` | admin/server-setup.md | Database step with the fields filled |
| 6 | `server-installer-purchase-code` | admin/server-setup.md | Purchase code step |
| 7 | `server-installer-finish` | admin/server-setup.md | Finish step / first login screen |
| 8 | `installation-migrate-output` | installation/database-migration.md | Terminal output of `php artisan migrate --force` |
| 9 | `installation-env-file` | installation/environment-configuration.md | The `.env` file open in an editor |
| 10 | `installation-vps-nginx` | installation/server-setup.md | The Nginx site config |

Localhost equivalents, if you also want them:

| Filename | Page | What to capture |
| --- | --- | --- |
| `localhost-installer-welcome` | admin/localhost-setup.md | Wizard welcome on a local install |
| `localhost-installer-database` | admin/localhost-setup.md | Database step on a local install |

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

## New pages awaiting screenshots

Added with the CodeCanyon documentation expansion. All are capturable from the panel or a terminal.

| Filename | Page | Alt text | Where |
| --- | --- | --- | --- |
| `demo-admin-login` | demo-instructions.md | SnapBuy admin login screen | The demo panel login page |
| `map-key-restriction-referrer` | map-api-keys.md | Map API key restricted by website domain | Google Cloud console — **placeholder in place** |
| `map-key-restriction-ip` | map-api-keys.md | Place API key restricted by server IP address | Google Cloud console — **placeholder in place** |
| `payment-gateway-country-step` | payment-gateway.md | Payment Gateways step of the country wizard | Countries → edit → step 2 |
