---
id: php-ini-settings
title: PHP INI Settings
sidebar_position: 4
---

# PHP INI Settings

Default PHP limits on most shared hosts are too low for SnapBuy. Raise them **before** you run the installer — several failures (blank screens, "413" errors, half-finished imports) are caused purely by these values.

## Recommended values

| Directive | Minimum | Recommended | Why it matters |
| --- | --- | --- | --- |
| `max_execution_time` | `300` | `600` | The installer runs migrations and seeders in one request. Bulk product imports also run long. |
| `max_input_time` | `300` | `600` | Time allowed to receive a large upload. |
| `memory_limit` | `256M` | `512M` | Excel import/export and PDF invoice generation are memory-hungry. |
| `post_max_size` | `64M` | `128M` | Must be **larger** than `upload_max_filesize`. |
| `upload_max_filesize` | `40M` | `100M` | Bulk product files, product galleries, update packages. |
| `max_input_vars` | `3000` | `5000` | Product forms with many variants and attributes post a lot of fields. |
| `max_file_uploads` | `20` | `50` | Product image galleries upload several files at once. |

:::warning `post_max_size` must exceed `upload_max_filesize`
If `post_max_size` is smaller, PHP silently discards the whole request and the panel shows an empty error. Always keep it higher.
:::

## Limits enforced by SnapBuy itself

Even with generous PHP limits, SnapBuy applies its own caps:

| Upload | Cap | Allowed types |
| --- | --- | --- |
| Bulk product import | **20 MB** | `.xlsx`, `.xls` |
| Home Builder images | **5 MB** | jpeg, jpg, png, gif, webp, svg |
| Prescription upload (customer) | **5 MB** | jpg, jpeg, png, webp, pdf, svg |
| SEO Open Graph image | **2 MB** | jpeg, png, jpg, gif, svg, webp |
| Withdrawal receipt image | **2 MB** | jpeg, png, jpg |
| System update package | **1 GB** | `.zip` |

:::danger System Updater needs the biggest limits
Uploading an update package through **Settings → System Updater** can push a file far larger than a normal upload. If your update fails part-way, raise `upload_max_filesize`, `post_max_size` and `max_execution_time` first, or apply the update manually over FTP instead.
:::

## Where to change these

### cPanel

1. Log into cPanel.
2. Open **Select PHP Version** (or **MultiPHP INI Editor**).
3. Switch to the **Options** tab.
4. Edit each directive from the table above.
5. Save. cPanel applies changes immediately.


### VPS / dedicated server

Find your active `php.ini`:

```bash
php --ini
```

Edit it:

```bash
sudo nano /etc/php/8.3/apache2/php.ini
```

Set the values, then restart:

```bash
# Apache
sudo systemctl restart apache2

# Nginx + PHP-FPM
sudo systemctl restart php8.3-fpm
sudo systemctl restart nginx
```

:::info Nginx has its own limit
Nginx rejects large uploads before PHP ever sees them. Add this inside your `server` block in `/etc/nginx/sites-available/your-site`:

```nginx
client_max_body_size 128M;
```

Then reload Nginx. Without it you get a **413 Request Entity Too Large** no matter what PHP says.
:::

### XAMPP (local)

1. Open the XAMPP Control Panel.
2. Next to **Apache**, click **Config → PHP (php.ini)**.
3. Edit the values, save, and restart Apache.

### Shared hosting without INI access

Some hosts allow a `.user.ini` file in the project root:

```ini
max_execution_time = 600
max_input_time = 600
memory_limit = 512M
post_max_size = 128M
upload_max_filesize = 100M
max_input_vars = 5000
```

If that has no effect, ask your host to apply the values for you.

## Verify the change took effect

Create `info.php` in your panel's public folder:

```php
<?php phpinfo();
```

Open `https://yourdomain.com/info.php` and search for each directive. The **Local Value** column is what actually applies.

:::danger Delete it afterwards
`phpinfo()` exposes your full server configuration. Remove the file as soon as you have checked.
:::


## Functions that must stay enabled

Check the `disable_functions` line in your `php.ini`. None of these may appear in it:

```
symlink, exec, proc_open, shell_exec, putenv
```

`symlink` is the critical one — see [Server Requirements](/docs/admin/server-requirements#server-functions-that-must-not-be-disabled).
