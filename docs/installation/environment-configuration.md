---
id: environment-configuration
title: Environment Configuration
sidebar_position: 3
---

# Environment Configuration

The `.env` file in the project root holds every environment-specific value: database credentials, application URL, mail, queue and broadcasting settings.

Most of it is written for you by the installation wizard. This page explains what each value does, which ones the installer cannot know, and which ones you must never change casually.

:::info If you installed through the wizard, most of this is already set
[Panel Installation](/docs/admin/server-setup) writes the database credentials, `APP_URL`, `APP_ENV`, `APP_KEY` and the Reverb keys for you. **You do not need to create or edit `.env` by hand.**

Editing it manually is for a [Localhost Setup](/docs/admin/localhost-setup), or for changing a specific value later — a queue driver, a broadcast driver, a moved database. Use this page as a reference for what each key means, not as a list of steps to perform.
:::

:::danger `.env` is the most sensitive file in the installation
It contains your database password and application key. It must never be reachable from a browser and must never be committed to version control. Confirm `https://admin.yourstore.com/.env` returns 403 or 404.
:::

## Application

| Key | Meaning |
| --- | --- |
| `APP_NAME` | Internal application name |
| `APP_ENV` | `production` on a live server, `local` for development |
| `APP_KEY` | Encryption key, generated during installation |
| `APP_DEBUG` | `false` in production |
| `APP_URL` | Full public URL of the panel, including `https://` |

:::danger `APP_DEBUG=true` leaks your configuration
With debug on, any application error renders a stack trace that includes environment values — database credentials among them — to whoever triggered it. Keep it `false` on any server the public can reach.
:::

:::warning Never regenerate `APP_KEY` on a live installation
`APP_KEY` decrypts data already stored in the database, including saved payment gateway credentials. Regenerating it makes that data unreadable. It is set once during installation and left alone.
:::

`APP_URL` must exactly match the address customers and apps use. A mismatch causes redirect loops at login, broken image URLs and failed payment callbacks.

## Installation mode

| Key | Meaning |
| --- | --- |
| `INSTALL_MODE` | Must be `server` for the installer to build the database |

:::danger This line is mandatory and easy to miss
SnapBuy only runs migrations, seeders, Passport key generation and the storage symlink when `INSTALL_MODE=server`. Without it the wizard reports success but leaves you with an empty database and a broken panel.

Add it to `.env` **before** opening the installer. If the panel is already installed and working, it has served its purpose and needs no further attention.
:::

## Database

| Key | Typical value |
| --- | --- |
| `DB_CONNECTION` | `mysql` — the only supported driver |
| `DB_HOST` | `127.0.0.1` |
| `DB_PORT` | `3306` |
| `DB_DATABASE` | Your database name |
| `DB_USERNAME` | Your database user |
| `DB_PASSWORD` | That user's password |

If the password contains spaces or `#`, wrap it in double quotes.

## Queue, cache and session

| Key | Recommended | Notes |
| --- | --- | --- |
| `QUEUE_CONNECTION` | `database` | Order emails, push notifications, referral credit and bulk imports all run through the queue |
| `CACHE_DRIVER` | `file`, or `redis` at scale | |
| `SESSION_DRIVER` | `file` | |
| `SESSION_LIFETIME` | `120` | Minutes before an idle admin is signed out |

:::danger The queue does nothing without the scheduler
Setting `QUEUE_CONNECTION` only decides where jobs are stored. They are processed by the queue worker that the cron scheduler starts every minute. Without the cron job, jobs queue up and are never delivered while the panel reports success. See [Cron Job Setup](/docs/admin/cron-jobs).
:::

## Mail

The panel writes SMTP settings through **Settings → SMTP** rather than `.env`, so `MAIL_*` values are usually left at their defaults. Configure email in the panel — see [SMTP Settings](/docs/admin/smtp-settings).

## Broadcasting — live chat

Set `BROADCAST_DRIVER` to `reverb` or `pusher`.

**Reverb** (self-hosted, free). The installer generates these automatically if they are empty:

| Key | Notes |
| --- | --- |
| `REVERB_APP_ID` | Generated at install |
| `REVERB_APP_KEY` | Generated at install |
| `REVERB_APP_SECRET` | Generated at install |
| `REVERB_HOST` | Your domain |
| `REVERB_PORT` | `9090` by default |
| `REVERB_SCHEME` | `https` behind a proxy |

The matching `VITE_REVERB_*` values are read by the browser and must mirror the server values.

**Pusher** (hosted): `PUSHER_APP_ID`, `PUSHER_APP_KEY`, `PUSHER_APP_SECRET`, `PUSHER_APP_CLUSTER`.

Guidance on choosing between them: [Chat Settings](/docs/admin/chat-settings).

## File storage

`FILESYSTEM_DRIVER` defaults to `local`. The `AWS_*` keys exist for S3-compatible storage and are optional.

Uploaded files are served through a symlink at `public/storage`. If images upload but return 404, the symlink is missing — visit `/linkstorage` once.

## Keys the installer cannot set

Everything else is configured **in the panel**, not in `.env`:

| Configuration | Where |
| --- | --- |
| Payment gateway credentials | Per country — [Payment Gateways](/docs/admin/payment-gateway) |
| Firebase keys and service account | [Firebase Settings](/docs/admin/firebase-settings) |
| Google Maps keys | [Map & API Keys](/docs/admin/map-api-keys) |
| SMS gateway credentials | [SMS Settings](/docs/admin/sms-settings) |
| SMTP | [SMTP Settings](/docs/admin/smtp-settings) |

These are stored encrypted in the database, which is why `APP_KEY` must never change.

## Applying changes

Laravel caches configuration. After editing `.env`:

```bash
php artisan config:clear
php artisan cache:clear
```

Or open `https://admin.yourstore.com/clear` in a browser.

:::warning Changes appear to do nothing until the cache is cleared
This is the single most common cause of "I changed the setting and nothing happened".
:::

## Security checklist

- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] `.env` returns 403/404 in a browser
- [ ] File permissions `644`, owned by the web server user
- [ ] `APP_KEY` backed up alongside the database
- [ ] Database user has privileges on the SnapBuy database only

---

**Previous:** [← Panel Installation](/docs/admin/server-setup) · **Next:** [Database & Migrations →](/docs/installation/database-migration)
