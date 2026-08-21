---
id: database-migration
title: Database & Migrations
sidebar_position: 4
---

# Database & Migrations

SnapBuy builds its own schema. You never create tables by hand and no SQL dump is shipped — the installer runs Laravel migrations and seeders.

:::info If you installed through the wizard, this is already done
Running [Panel Installation](/docs/admin/panel-installation) creates the whole schema and seeds the default data for you. **You do not need to run any command on this page.**

The manual commands below are for a [Localhost Setup](/docs/admin/localhost-setup), or for the rare case where the web installer times out on a slow server. Read the rest of this page as reference — what the installer built, and how to migrate when you update later.
:::

## What the installer does

When you complete the database step of the wizard with `INSTALL_MODE=server` set, SnapBuy runs, in order:

1. `migrate:fresh` — drops every existing table, then creates the full schema
2. `db:seed` — inserts the default data listed below
3. Laravel Passport migrations and key generation, for API authentication
4. `storage:link` — creates `public/storage` so uploaded images are reachable
5. Creates your **Super Admin** account
6. Writes an install marker to `storage/installed`

:::danger `migrate:fresh` drops every table in the target database
This is destructive and unconditional. Always point the installer at a brand-new, empty database. Never at one holding other data.
:::

## What gets seeded

| Seeder | Creates |
| --- | --- |
| Roles | Super Admin, Admin, Delivery Boy |
| Permission categories & permissions | The full permission matrix |
| Order statuses | Both quick-commerce and eCommerce status sets |
| Settings | Default configuration rows |
| Supported languages | The language list you pick from |
| Languages | English as the default |
| Default country | India, with Cash on Delivery enabled |
| Notification / SMS / email templates | Default message wording |
| Home layout | A starter home screen |

:::info The seeded country is a starting point, not a finished setup
Installation creates India as the default country, which means the Setup Guide's "Add a country" step is already ticked when you first sign in. Open it and correct the currency, timezone, formats and policies — or delete it and create your own. See [Countries & Currency](/docs/admin/countries).
:::

Note that the seeders do **not** create an admin user. The Super Admin is created by the wizard from the email and password you type.

## Running migrations manually (localhost only)

Skip this section if you installed through the wizard.

These commands are for a local development copy, or for a server where the web installer could not finish because of an execution timeout.

```bash
cd /var/www/snapbuy

composer install --no-dev --optimize-autoloader
cp .env.example .env
# edit .env: database credentials, APP_URL, INSTALL_MODE=server
php artisan key:generate

php artisan migrate --force
php artisan db:seed --force
php artisan passport:install --no-interaction
php artisan storage:link
```

You still need to open `/install` once afterwards to create the Super Admin account and register your purchase code.

:::warning `--force` is required in production
Laravel refuses to run migrations non-interactively when `APP_ENV=production` unless you pass `--force`. This is a safety prompt, not an error.
:::

## Updating an existing installation

Applying an update package may add new tables or columns. After any update:

```bash
php artisan migrate --force
php artisan config:clear
php artisan cache:clear
```

If you cannot reach the command line, the panel exposes browser equivalents at `/migration` and `/clear`.

:::danger Back up before every migration
Migrations alter live tables and cannot be rolled back reliably once data has been written. Take a database backup first, every time — including for updates you expect to be trivial. See [Routine backups](#routine-backups) below.
:::

:::warning Restrict the maintenance URLs
`/migration`, `/migrate`, `/clear`, `/generate_key`, `/linkstorage` and `/logs` are not behind a login. In production, restrict them by IP in your Nginx configuration:

```nginx
location ~ ^/(logs|migrate|migration|generate_key|get_path) {
    allow 203.0.113.10;
    deny all;
}
```

Replace the address with your own. The log viewer in particular can reveal file paths and error detail.
:::

## Moving to another server

1. Back up the database and the project files, including `.env`.
2. Prepare the new server — see [Server Setup](/docs/installation/server-setup).
3. Restore the files and import the database dump.
4. Update `APP_URL` and the `DB_*` values in `.env`.
5. Keep the **same `APP_KEY`** — encrypted values such as payment credentials cannot be decrypted without it.
6. Run `php artisan storage:link`.
7. Clear the caches.
8. Re-register the cron job on the new server.

:::danger Losing `APP_KEY` means losing your stored credentials
Payment gateway keys and other secrets are encrypted with it. A restored database without the original `APP_KEY` will not decrypt them and they must all be re-entered by hand. Back up `APP_KEY` with your database dump.
:::

## Routine backups

Automate a nightly dump:

```bash
mysqldump -u snapbuy -p snapbuy | gzip > /backups/snapbuy-$(date +\%F).sql.gz
```

Add it to the server's crontab and keep copies off the server. A backup stored only on the machine it protects is not a backup.



## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Could not connect to the database" | Wrong credentials or host | Re-check `.env`; confirm the user has privileges on that database |
| Installer times out mid-migration | Execution limit too low | Raise `max_execution_time` and `memory_limit`, empty the database, retry |
| Panel errors after an update | Pending migrations, or stale cache | `php artisan migrate --force`, then clear caches |
| Images 404 after a move | Storage symlink missing | `php artisan storage:link` or visit `/linkstorage` |
| Payment credentials blank after a restore | `APP_KEY` changed | Restore the original key, or re-enter every credential |
| Installer reappears after installing | `storage/installed` missing or storage not writable | `chmod -R 775 storage`, re-run the installer |

---

**Previous:** [← Environment Configuration](/docs/installation/environment-configuration) · **Next:** [Cron Job Setup →](/docs/admin/cron-jobs)
