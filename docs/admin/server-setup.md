---
id: server-setup
title: Server Setup
sidebar_position: 6
---

# Server Setup

This is the live installation. Before starting, confirm you have completed:

- [Server Requirements](/docs/admin/server-requirements)
- [Create a Subdomain](/docs/admin/create-subdomain) — with SSL working
- [PHP INI Settings](/docs/admin/php-ini-settings)

:::danger Read this before you begin
The installer runs `migrate:fresh`, which **drops every table** in the database it connects to. Create a brand-new, empty database for Snapbuy. Never point the installer at a database that already holds data.
:::

## Step 1 — Upload the files

Upload the Snapbuy admin panel package to your server and extract it into the folder your subdomain points at.

**Via cPanel File Manager**

1. Open **File Manager** and go to your subdomain folder.
2. Click **Upload** and select the `.zip`.
3. Once uploaded, right-click the file → **Extract**.
4. Delete the `.zip` afterwards.

**Via SSH** (faster for large packages)

```bash
cd /home/username/snapbuy
unzip snapbuy-admin.zip
```


:::tip Extract on the server, not locally
Uploading thousands of individual files over FTP is slow and often leaves files missing. Always upload the single archive and extract it on the server.
:::

## Step 2 — Create the database and user

In cPanel, open **MySQL® Databases**:

1. **Create New Database** — for example `username_snapbuy`.
2. **Add New User** — create a dedicated user with a strong password.
3. **Add User To Database** — grant **ALL PRIVILEGES**.

Write down the exact database name, username and password. cPanel prefixes both with your account name.


:::warning Password characters
Use a password made of capitals, lowercase letters, numbers and `@` or `_`. Some other symbols break the `.env` parser and cause a "could not connect" error even when the credentials are correct. If a connection fails and you are certain the details are right, regenerate the password without exotic symbols.
:::

## Step 3 — Set file permissions

The installer checks four paths. Set them before you start:

```bash
cd /home/username/snapbuy
chmod -R 755 storage bootstrap/cache
chmod 644 .env
chown -R username:username storage bootstrap/cache .env
```

On cPanel without SSH, use File Manager → select folder → **Permissions**.

## Step 4 — Prepare `.env`

Copy `.env.example` to `.env`, then add this line:

```ini
INSTALL_MODE=server
```

:::danger This line is mandatory on a live server
Snapbuy only runs the migrations, seeders, Passport key generation and the storage symlink when `INSTALL_MODE=server`. Without it, the wizard reports success but leaves you with an empty database and a broken panel.
:::

## Step 5 — Open the installer

Visit your panel over **HTTPS**:

```
https://admin.yourstore.com
```

You are redirected to the installation wizard.


:::tip Always use `https://`
The installer saves whatever address you visit it on as `APP_URL`. Installing over `http://` bakes the wrong scheme into your configuration and causes mixed-content and callback failures later.
:::

## Step 6 — Requirements check

The wizard verifies your PHP version, all seventeen extensions, and the four writable paths.


Every item must be green. If something fails:

| Failure | Fix |
| --- | --- |
| PHP version | Switch to 8.3+ in **Select PHP Version** |
| A red extension | Enable it in **Select PHP Version → Extensions** |
| `.env` not writable | `chmod 644 .env` and check ownership |
| `storage/` or `bootstrap/cache/` | `chmod -R 755` and check ownership |

Fix the issue, then click **Try again** — you do not need to restart the wizard.

## Step 7 — Database and admin account


| Field | What to enter |
| --- | --- |
| **Database Host** | `localhost` (or `127.0.0.1`) |
| **Database Port** | `3306` |
| **Database Name** | The full name including the cPanel prefix |
| **Database Username** | The full username including the prefix |
| **Database Password** | The password you set |
| **Admin Email** | The Super Admin login email |
| **Admin Password** | Minimum 6 characters — use a strong one |

When you continue, Snapbuy:

1. Tests the database connection.
2. Writes `DB_*`, `APP_URL` and `APP_ENV=production` into `.env`.
3. Generates **Reverb** credentials (`REVERB_APP_ID`, `REVERB_APP_KEY`, `REVERB_APP_SECRET`) if they are empty.
4. Runs `migrate:fresh` and all seeders.
5. Installs Laravel Passport keys.
6. Creates the `public/storage` symlink.
7. Creates your **Super Admin** account.
8. Writes an install marker to `storage/installed`.

:::info This step takes a while
Migrations and seeders run inside a single request. On a slow shared host this can take a minute or more. Do not refresh or navigate away. If it times out, raise `max_execution_time` — see [PHP INI Settings](/docs/admin/php-ini-settings).
:::

## Step 8 — Purchase code

Enter the Envato purchase code for your Snapbuy licence. It is validated online, so your server must be able to make outbound HTTPS requests.


:::warning "Invalid code supplied!"
This message means one of three things: the code was mistyped, the code belongs to a different product, or your server cannot reach the licence server. Test outbound access with:

```bash
curl -I https://api.envato.com
```
:::

## Step 9 — Finish

The wizard confirms the installation and sends you to the login page at `https://admin.yourstore.com`. Sign in with the admin email and password from Step 7.


## Immediately after installing

Three things must be done before the store is usable:

1. **[Set up the cron job](/docs/admin/cron-jobs)** — cart reminders, maintenance windows, scheduled home layouts and every queued job depend on it. Nothing warns you if this is missing.
2. **Work through the [Setup Guide](/docs/admin/setup-guide)** — nine steps covering Country, Zone, Store, Home Builder, SMTP, Firebase, Map, Chat and Cron.
3. **Secure the maintenance routes** — see below.

### Secure the maintenance routes

Snapbuy exposes several helper URLs that are **not behind a login**:

| URL | What it does |
| --- | --- |
| `/clear` | Clears config, route, view and application caches |
| `/migrate`, `/migration` | Runs pending database migrations |
| `/generate_key` | Regenerates the application key |
| `/linkstorage` | Recreates the `public/storage` symlink |
| `/logs` | Opens the Laravel log viewer |
| `/get_path` | Prints the server file path |

They are useful for support, but `/logs` in particular can reveal file paths and error details to anyone who finds it.

:::danger Restrict these in production
Protect them with an IP allow-list or HTTP authentication in your web server configuration, for example:

```apache
<LocationMatch "^/(logs|migrate|migration|generate_key|get_path)">
    Require ip 203.0.113.10
</LocationMatch>
```

Replace the address with your own IP.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Could not connect to the database" | Wrong prefix, wrong host, or user not attached | Re-check the full prefixed names; confirm ALL PRIVILEGES |
| "Could not connect" with correct details | `symlink` or `proc_open` disabled | Remove them from `disable_functions` in `php.ini` |
| Blank page after the database step | PHP timeout mid-migration | Raise `max_execution_time` and `memory_limit`, empty the database, re-run |
| Panel loads but every image is 404 | Storage symlink missing | Visit `https://admin.yourstore.com/linkstorage` once |
| `500` on first login | Caches hold stale config | Visit `https://admin.yourstore.com/clear` |
| Redirect loop at login | `APP_URL` scheme or host is wrong | Fix `APP_URL` in `.env`, then visit `/clear` |
| Installer reappears after installing | `storage/installed` missing or storage not writable | `chmod -R 755 storage` and re-run the installer |

---

**Previous:** [← Localhost Setup](/docs/admin/localhost-setup) · **Next:** [Cron Job Setup →](/docs/admin/cron-jobs)
