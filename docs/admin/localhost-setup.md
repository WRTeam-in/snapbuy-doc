---
id: localhost-setup
title: Localhost Setup
sidebar_position: 5
---

# Localhost Setup

Use this page to run SnapBuy on your own computer for testing and customisation. For a live store, follow [Server Setup](/docs/admin/server-setup) instead.

## What you need

| Tool | Version | Purpose |
| --- | --- | --- |
| **XAMPP** | with PHP **8.2+** | Apache + PHP + MySQL in one package |
| **Composer** | 2.x | Installs PHP dependencies |
| **Node.js** | 18+ | Only if you want to rebuild the panel's front-end assets |

- XAMPP — [apachefriends.org/download.html](https://www.apachefriends.org/download.html)
- Composer — [getcomposer.org/download](https://getcomposer.org/download/)

:::warning Check the PHP version XAMPP ships with
Older XAMPP builds ship PHP 8.0 or 8.1, which **cannot** run SnapBuy. Download a build with PHP 8.2 or newer, or use [Laragon](https://laragon.org/) which lets you switch PHP versions freely.

Verify with:

```bash
php -v
```
:::

## Step 1 — Enable the required PHP extensions

Open `C:\xampp\php\php.ini` and make sure none of these lines are commented out with a `;`:

```ini
extension=bcmath
extension=curl
extension=fileinfo
extension=gd
extension=mbstring
extension=openssl
extension=pdo_mysql
extension=sodium
extension=zip
```

Also raise the limits described in [PHP INI Settings](/docs/admin/php-ini-settings), then restart Apache from the XAMPP Control Panel.

## Step 2 — Extract the project

Extract the SnapBuy admin panel package into your web root:

```
C:\xampp\htdocs\snapbuy\
```


## Step 3 — Install PHP dependencies

Open a terminal in `C:\xampp\htdocs\snapbuy` and run:

```bash
composer install
```

:::info The `vendor` folder may already be included
If your package already ships a `vendor/` folder, you can skip this. If Composer reports memory errors, run `composer install --no-dev` or temporarily set `memory_limit = -1`.
:::

## Step 4 — Create the database

1. Start **Apache** and **MySQL** in the XAMPP Control Panel.
2. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Click **New**, name the database `snapbuy`, choose collation `utf8mb4_unicode_ci`, and click **Create**.

Leave it empty — the installer builds every table.


## Step 5 — Prepare the `.env` file

Copy `.env.example` to `.env` in the project root, then open it and set:

```ini
APP_NAME=SnapBuy
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost/snapbuy/public

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=snapbuy
DB_USERNAME=root
DB_PASSWORD=

INSTALL_MODE=server
```

:::danger `INSTALL_MODE=server` is required
SnapBuy only runs migrations, seeders, Passport setup and the storage symlink when `INSTALL_MODE` is set to `server`. Without this line the installer writes your settings but leaves the database empty, and the panel will error immediately after "installation".

Add the line before you open the installer.
:::

Generate the application key:

```bash
php artisan key:generate
```

## Step 6 — Run the installer

Open:

```
http://localhost/snapbuy/public
```

You are redirected to the installation wizard. It has five steps:

**Welcome → Requirements → Database → Purchase Code → Finish**


### Requirements

Every PHP extension must show green and all four writable paths must pass. On Windows the permission checks normally pass without action.

### Database

Enter the same details you put in `.env`, plus the admin account you want to create:

| Field | Local value |
| --- | --- |
| Database Host | `127.0.0.1` |
| Database Port | `3306` |
| Database Name | `snapbuy` |
| Database Username | `root` |
| Database Password | *(blank on default XAMPP)* |
| Admin Email | your email |
| Admin Password | minimum 6 characters |


:::warning This step wipes the database
SnapBuy runs `migrate:fresh`, which drops every existing table in the database it connects to. Never point it at a database that holds other data.
:::

The installer also generates **Reverb** credentials automatically if they are empty, so live chat works without extra setup.

### Purchase Code

Enter the Envato purchase code for your SnapBuy licence. This step needs an internet connection even on localhost, because the code is validated against the licence server.

### Finish

You land on the login page. Sign in with the admin email and password you just set.

## Alternative — install from the command line

If you prefer not to use the wizard, run the bundled script from the project root:

```bash
composer install
npm install
php artisan migrate
php artisan db:seed
php artisan passport:install
php artisan storage:link
```

You still need to open `/install` once afterwards to create the Super Admin account and register your purchase code — the seeders do not create an admin user.

## Rebuilding front-end assets (optional)

Only needed if you modify the Vue source in `resources/js`:

```bash
npm install
npm run build      # production build
npm run dev        # dev server with hot reload
```

## Common localhost problems

| Symptom | Cause | Fix |
| --- | --- | --- |
| Blank white page | PHP version too old, or a missing extension | `php -v`, then re-check Step 1 |
| `could not find driver` | `pdo_mysql` disabled | Uncomment it in `php.ini`, restart Apache |
| Images upload but never display | Storage symlink missing | Visit `http://localhost/snapbuy/public/linkstorage` |
| `500` right after install | App key not generated | Run `php artisan key:generate`, then visit `/clear` |
| Login page loops back to itself | `APP_URL` does not match the address you are using | Correct `APP_URL` in `.env`, then visit `/clear` |
| Installer finishes but panel is broken | `INSTALL_MODE=server` was missing | Add it, empty the database, run the installer again |

:::tip Clearing the cache
SnapBuy exposes `http://localhost/snapbuy/public/clear`, which clears the config, route, view and application caches in one request. Use it after any manual `.env` change.
:::

---

**Previous:** [← PHP INI Settings](/docs/admin/php-ini-settings) · **Next:** [Server Setup →](/docs/admin/server-setup)
