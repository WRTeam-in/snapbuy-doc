---
id: backup-project
title: Backup Project Files
sidebar_position: 2
---

# Backup Project Files

A file backup captures the application code, your `.env` configuration, and everything stored under `storage/app/public` (product images, uploaded documents, etc.). Take one alongside a [database backup](/docs/installation/backup-database) before every [System Updater](/docs/admin/system-updater) run.

:::danger An update overwrites files without warning
The updater copies package files over your installation. Any file you customised directly — a Blade template, a controller, a style sheet — is silently overwritten. A file backup is the only way back.
:::

## What to include

| Path | Why |
| --- | --- |
| Entire project root | Application code, including any customisations |
| `.env` | Your live configuration — database, mail, payment keys, Firebase, etc. |
| `storage/app/public` | Uploaded images and files (symlinked to `public/storage`) |

You do **not** need to back up `vendor/` or `node_modules/` — both are rebuilt from `composer install` / `npm install` and only add size.

## Option 1 — cPanel (shared hosting)

1. Open **File Manager**, go to your subdomain's root folder.
2. Select everything, right-click → **Compress**.
3. Choose **Zip Archive** and confirm.
4. Once created, select the `.zip` and click **Download**.

:::tip Skip `vendor` and `node_modules` to save time
If File Manager lets you multi-select, exclude these two folders from the archive — they are the largest and least necessary part of a backup.
:::

## Option 2 — Command line

```bash
cd /home/username/snapbuy
tar --exclude='vendor' --exclude='node_modules' -czf ../snapbuy_files_$(date +%Y%m%d).tar.gz .
```

Copy the resulting archive off the server:

```bash
scp username@yourserver.com:/home/username/snapbuy_files_20260101.tar.gz ./
```

## Option 3 — Hosting provider snapshot

If your host offers full-server or full-application snapshots (Cloudways, RunCloud, a VPS provider's disk snapshot), that covers files and database together in one step. Confirm the snapshot includes `storage/` — some default snapshot policies exclude large upload directories.

## Restoring a backup

1. Extract the archive into place:
   ```bash
   cd /home/username/snapbuy
   tar -xzf snapbuy_files_20260101.tar.gz
   ```
2. Run `composer install` and `npm install` if `vendor`/`node_modules` were excluded.
3. Confirm `.env` matches the restored code (database credentials, `APP_URL`, keys).
4. Re-create the storage symlink if needed:
   ```bash
   php artisan storage:link
   ```
5. Clear caches: visit `https://admin.yourstore.com/clear`.

:::warning Restore files and database together
A file backup and database backup taken at different times can disagree — for example, code expecting a column a restored database doesn't have. Always restore both from the same point in time.
:::

## Where this fits into an update

1. [Backup Database](/docs/installation/backup-database)
2. [Backup Project Files](/docs/installation/backup-project) *(this page)*
3. Enable [Maintenance Mode](/docs/admin/maintenance-mode)
4. Apply the update via [System Updater](/docs/admin/system-updater)
5. Verify, then disable maintenance mode

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Archive is huge / times out | `vendor` and `node_modules` included | Exclude them; rebuild with `composer install` / `npm install` after restoring |
| Images missing after restore | `storage/app/public` not included, or symlink not recreated | Confirm the folder was in the backup; run `php artisan storage:link` |
| Site errors after restore | `.env` from backup doesn't match the current database | Update `.env` to point at the correct, currently-restored database |
| Permission errors after restore | Ownership changed during transfer | `chown -R username:username storage bootstrap/cache` and `chmod -R 755` |
