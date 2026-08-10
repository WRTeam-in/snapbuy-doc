---
id: server-requirements
title: Server Requirements
sidebar_position: 2
---

# Server Requirements

Check every item on this page **before** you upload Snapbuy. The installation wizard runs the same checks and will refuse to continue if any of them fail.

## PHP version

| Requirement | Value |
| --- | --- |
| **Minimum PHP version** | **8.2.0** |
| Recommended | 8.3 |

:::danger PHP 8.1 and below will not work
Snapbuy runs on Laravel 12, which itself requires PHP 8.2 or newer. There is no fallback build for older PHP.
:::

## Required PHP extensions

All seventeen of these must be **enabled**. The installer shows them as a grid and blocks the "Next" button until every one is green.

| Extension | Used for |
| --- | --- |
| `bcmath` | Precise money and tax arithmetic |
| `ctype` | Laravel core |
| `curl` | Payment gateways, Firebase, Twilio, purchase-code validation |
| `dom` | Excel / XML import and export |
| `fileinfo` | Detecting the real type of uploaded files |
| `filter` | Input validation |
| `gd` | Image resizing and thumbnails |
| `iconv` | Character-set conversion |
| `json` | Laravel core |
| `mbstring` | Multi-byte / multi-language text |
| `openssl` | HTTPS calls and encryption |
| `pdo` | Database layer |
| `pdo_mysql` | MySQL driver |
| `sodium` | Token and key encryption |
| `tokenizer` | Laravel core |
| `xml` | Excel / XML import and export |
| `zip` | Bulk upload, backups, system updater |


:::tip How to enable an extension
On **cPanel**: *Select PHP Version → Extensions*, tick the missing one, save.
On **VPS / Ubuntu**: `sudo apt install php8.2-<extension>` then `sudo systemctl restart apache2` (or `php8.2-fpm`).
On **XAMPP**: open `php.ini`, remove the `;` in front of `extension=<name>`, restart Apache.
:::

## Database

| Requirement | Value |
| --- | --- |
| **Engine** | MySQL 5.7+ **or** MariaDB 10.3+ |
| Driver | `mysql` only |
| Privileges needed | `CREATE`, `ALTER`, `DROP`, `INDEX`, `SELECT`, `INSERT`, `UPDATE`, `DELETE` |

:::warning PostgreSQL and SQLite are not supported
The installer connects with the `mysql` driver only. Do not attempt to point Snapbuy at another engine.
:::

The installer runs `migrate:fresh`, which **drops every table in the database it connects to**. Always create a fresh, empty database for Snapbuy.

## Folder and file permissions

These four paths must be writable by the web server user. The installer verifies them and reports each one.

| Path | Required |
| --- | --- |
| `.env` | Writable |
| `storage/framework/` | `755` |
| `storage/logs/` | `755` |
| `bootstrap/cache/` | `755` |


On a VPS, the usual fix is:

```bash
sudo chown -R www-data:www-data storage bootstrap/cache .env
sudo chmod -R 755 storage bootstrap/cache
```

Replace `www-data` with `apache` on CentOS/AlmaLinux, or with your cPanel username on shared hosting.

## Server functions that must not be disabled

Shared hosts often disable PHP functions for "security". Snapbuy needs these:

| Function | Why |
| --- | --- |
| `symlink` | Creates `public/storage`, which serves every uploaded image |
| `exec` | Used by some maintenance routines |
| `proc_open` | Composer and queue processing |

:::danger The most common installation failure
If `symlink` is disabled, installation appears to succeed but **all uploaded images return 404**. Remove `symlink` from the `disable_functions` list in your `php.ini`, then visit `https://yourdomain.com/linkstorage` once to create the link.
:::

## Other server-side needs

| Need | Why |
| --- | --- |
| **Cron access** | Cart reminders, maintenance windows, scheduled home layouts and queued jobs all depend on it. See [Cron Job Setup](/docs/admin/cron-jobs). |
| **Outbound HTTPS** | The panel calls Firebase, Twilio, payment gateways and the licence server. Hosts that block outbound connections will break these. |
| **SSL certificate** | Required in production. Firebase web push, several payment gateways and the mobile apps refuse plain HTTP. |
| **A WebSocket port** (optional) | Only if you run **Laravel Reverb** for chat instead of Pusher. Default `9090`. See [Chat Settings](/docs/admin/chat-settings). |

## For local development only

If you are installing on your own machine rather than a server, you additionally need:

- **XAMPP** (or Laragon / MAMP) — bundles Apache, PHP and MySQL
- **Composer** — PHP dependency manager
- **Node.js 18+** and **npm** — only if you intend to rebuild the panel's front-end assets

Full walkthrough: **[Localhost Setup](/docs/admin/localhost-setup)**.

## Quick pre-flight checklist

- [ ] PHP 8.2 or newer
- [ ] All 17 extensions enabled
- [ ] Empty MySQL database created, with a user that has full privileges on it
- [ ] `.env`, `storage/`, `bootstrap/cache/` writable
- [ ] `symlink` not in `disable_functions`
- [ ] PHP INI limits raised — see [PHP INI Settings](/docs/admin/php-ini-settings)
- [ ] Cron job available
- [ ] SSL installed

---

**Next:** [Create a Subdomain →](/docs/admin/create-subdomain)
