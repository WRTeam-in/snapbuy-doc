---
id: system-updater
title: System Updater
sidebar_position: 32
---

# System Updater

Menu path: **Settings → System Updater**

Applies a SnapBuy update from a `.zip` package you upload, without touching FTP or SSH.

![System updater page](/images/panel/system-updater-page.png)

:::danger Back up before every update
An update overwrites application files and runs database migrations. There is no undo button.

Take a **database backup** and a **file backup** first — both are covered in [Taking a backup](#taking-a-backup) below.

Do this every time, including for updates you expect to be small.
:::

## Taking a backup

There is no undo inside SnapBuy. A backup is the only way back from a failed update, so take both parts every time.

### Database

The recommended method on a VPS:

```bash
mysqldump -u your_db_user -p your_db_name > snapbuy_backup_$(date +%Y%m%d).sql
```

Compressed:

```bash
mysqldump -u your_db_user -p your_db_name | gzip > snapbuy_backup_$(date +%Y%m%d).sql.gz
```

Find the database name and username in your `.env` file (`DB_DATABASE`, `DB_USERNAME`).

If you have phpMyAdmin, select the database, open **Export**, choose **Quick** and format **SQL**. Large databases usually time out this way — prefer `mysqldump`.

Automate a nightly dump:

```bash
0 2 * * * mysqldump -u snapbuy -p'password' snapbuy | gzip > /backups/snapbuy-$(date +\%F).sql.gz
```

:::warning Keep copies off the server
A backup stored only on the machine it protects is not a backup.
:::

### Project files

A file backup captures the application code, your `.env`, and everything under `storage/app/public` — product images and uploaded documents.

| Path | Why |
| --- | --- |
| Entire project root | Application code, including any customisations |
| `.env` | Your live configuration — database, mail, payment keys, Firebase |
| `storage/app/public` | Uploaded images and files, served through `public/storage` |

`vendor/` and `node_modules/` do not need backing up — both are rebuilt by `composer install` and `npm install`, and they dominate the archive size.

```bash
cd /var/www/snapbuy
tar --exclude='vendor' --exclude='node_modules' -czf ../snapbuy_files_$(date +%Y%m%d).tar.gz .
```

Copy it off the server:

```bash
scp user@yourserver.com:/var/www/snapbuy_files_20260101.tar.gz ./
```

### Provider snapshots

Many managed hosts offer one-click or scheduled snapshots covering files and database together. If yours does, it is the fastest option — but confirm you can locate and restore one **before** you need it, and check the snapshot includes `storage/`, which some default policies exclude.

## Restoring a backup

### Database

```bash
mysql -u your_db_user -p your_db_name < snapbuy_backup_20260101.sql
```

Or import the `.sql` file through phpMyAdmin's **Import** tab.

:::warning Restoring overwrites matching tables
Import into an empty or disposable database first if you are not certain the dump is the right one. Restoring into a live database loses anything written after the backup was taken.
:::

### Project files

1. Extract the archive into place:

   ```bash
   cd /var/www/snapbuy
   tar -xzf snapbuy_files_20260101.tar.gz
   ```

2. Run `composer install` and `npm install` if `vendor` and `node_modules` were excluded.
3. Confirm `.env` matches the restored code — database credentials, `APP_URL`, keys.
4. Re-create the storage symlink: `php artisan storage:link`
5. Clear the caches: visit `https://admin.yourstore.com/clear`

:::danger Restore files and database together
A file backup and a database backup taken at different times can disagree — code expecting a column the restored database does not have, for example. Always restore both from the same point in time.

The same applies to `APP_KEY`: payment gateway credentials are encrypted with it, and a restored database without the original key cannot decrypt them.
:::

## What happens

1. You download the official update package from your purchase source (CodeCanyon).
2. You upload the `.zip` here, along with your purchase code.
3. The purchase code is validated against the domain the panel is actually served from.
4. The archive is extracted to a temporary folder.
5. Files are copied over the application root.
6. Database migrations run.
7. Caches are cleared.

:::info No remote update server is contacted
SnapBuy never downloads updates by itself. You control exactly which package is applied and when.
:::

## Requirements

| Requirement | Notes |
| --- | --- |
| **Valid purchase code** | Validated against the panel's live domain |
| **PHP `zip` extension** | The update is refused without it |
| **Upload limits** | The ceiling is 1 GB; real packages are far smaller |
| **Writable application root** | Files are copied over the live installation |

:::warning Purchase code is checked against the real domain
Validation uses the address the panel is being served from, not the `APP_URL` value in `.env`. Editing `APP_URL` will not make a code for a different domain work.
:::

:::danger Raise PHP limits before uploading
A large package can exceed the defaults and fail part-way — which is the worst outcome, because some files may already be replaced. Confirm `upload_max_filesize`, `post_max_size` and `max_execution_time` are generous first. See [PHP INI Settings](/docs/admin/php-ini-settings).
:::

## Applying an update

1. Take both backups.
2. Put the customer-facing surfaces into [Maintenance Mode](/docs/admin/maintenance-mode).
3. Go to **Settings → System Updater**.
4. Upload the `.zip` and enter your purchase code.
5. Wait — do not refresh or navigate away.
6. Visit `/clear` once it completes.
7. Test before turning maintenance off.

![Uploading an update package](/images/panel/system-updater-upload.png)

:::warning Do not interrupt an update in progress
Refreshing mid-copy can leave a half-updated file set — some files new, some old — which usually produces fatal errors. If it appears to hang, wait it out, then check `storage/logs/laravel.log` before doing anything else.
:::

## After updating

Check these, in order:

- [ ] The panel loads and you can sign in
- [ ] `/clear` has been visited
- [ ] Product images still display — if not, visit `/linkstorage`
- [ ] Place a test order end to end
- [ ] A test payment still completes
- [ ] Push notifications still arrive
- [ ] The cron heartbeat is still green under [Cron Jobs](/docs/admin/cron-jobs)
- [ ] Turn maintenance off

:::tip Update a staging copy first if you have customised anything
The updater copies package files over yours. Any file you edited directly — a template, a controller, a style sheet — is overwritten without warning. If you have customisations, apply the update to a copy first and reapply your changes there.
:::

## Updating manually instead

If the uploader fails — usually because of PHP limits on shared hosting — apply it over FTP or SSH:

```bash
# with backups already taken
unzip update.zip -d /path/to/snapbuy
cd /path/to/snapbuy
php artisan migrate --force
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

If you cannot run Artisan, the panel exposes `/migration` and `/clear` as browser equivalents.

:::warning Those URLs are unauthenticated
`/migration`, `/clear`, `/migrate` and `/logs` are not behind a login. Restrict them by IP in production — see [Database & Migrations](/docs/installation/database-migration).
:::

## Demo mode

Updates are disabled when the installation is running in demo mode, with *"This action is disabled in demo mode."*

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Invalid purchase code" | Code belongs to another domain, or no outbound HTTPS | Check the domain; test `curl -I https://validator.wrteam.in` |
| "Please upload a valid zip file" | Wrong file type or a corrupt download | Re-download the package |
| "PHP zip extension is required" | `zip` not enabled | Enable it and restart the web server |
| Upload fails on a large file | PHP limits too low | Raise them — see [PHP INI Settings](/docs/admin/php-ini-settings) |
| Update completes, panel errors | Stale caches | Visit `/clear` |
| Images gone after updating | Symlink lost | Visit `/linkstorage` |
| Customisations disappeared | Overwritten by the package | Restore from your file backup |
| Update hung part-way | Execution timeout | Restore from backup and retry with higher limits |
