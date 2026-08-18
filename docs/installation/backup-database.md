---
id: backup-database
title: Backup Database
sidebar_position: 1
---

# Backup Database

Take a full database backup before any [System Updater](/docs/admin/system-updater) update, [Bulk Upload](/docs/admin/bulk-upload), or manual migration. A backup is a plain SQL dump you can restore in minutes if something goes wrong — there is no undo inside SnapBuy itself.

:::danger Do this every time, not just for big changes
Migrations can fail part-way even on a small update. A five-minute backup is cheaper than rebuilding lost data.
:::

## Option 1 — cPanel (shared hosting)

1. Open **phpMyAdmin** from cPanel.
2. Select your SnapBuy database in the left sidebar.
3. Click the **Export** tab.
4. Export method: **Quick**.
5. Format: **SQL**.
6. Click **Go** and save the `.sql` file somewhere off the server (your computer or cloud storage).

:::tip Large databases
If the export times out or the download is huge, use cPanel's **Backup Wizard** → **Download a MySQL Database Backup** instead — it streams a gzip-compressed dump.
:::

## Option 2 — Command line (`mysqldump`)

If you have SSH access:

```bash
mysqldump -u your_db_user -p your_db_name > snapbuy_backup_$(date +%Y%m%d).sql
```

You will be prompted for the database password. To compress the dump:

```bash
mysqldump -u your_db_user -p your_db_name | gzip > snapbuy_backup_$(date +%Y%m%d).sql.gz
```

Find the exact database name and username in your `.env` file (`DB_DATABASE`, `DB_USERNAME`).

## Option 3 — Hosting provider snapshot

Many managed hosts (Cloudways, RunCloud, Forge) offer scheduled or one-click database snapshots in their dashboard. If yours does, it is the fastest option — but always confirm you can locate and restore a snapshot before you need one, not during an incident.

## Restoring a backup

**Via phpMyAdmin:**

1. Create a new empty database, or truncate the existing one.
2. Open the database → **Import** tab.
3. Choose your `.sql` file and click **Go**.

**Via command line:**

```bash
mysql -u your_db_user -p your_db_name < snapbuy_backup_20260101.sql
```

:::warning Restoring overwrites matching tables
Import into an empty or disposable database first if you are unsure the dump is the right one. Restoring into a live database with newer data will lose anything written after the backup was taken.
:::

## Where backups fit into an update

1. [Backup Database](/docs/installation/backup-database) *(this page)*
2. [Backup Project Files](/docs/installation/backup-project)
3. Enable [Maintenance Mode](/docs/admin/maintenance-mode)
4. Apply the update via [System Updater](/docs/admin/system-updater)
5. Verify, then disable maintenance mode

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Export times out in phpMyAdmin | Database too large for the web UI | Use `mysqldump` over SSH, or the host's Backup Wizard |
| `mysqldump: command not found` | Not run on the database server, or MySQL client not installed | Run it on the server itself, or install the `mysql-client` package |
| Import fails with `Access denied` | Wrong database user or missing privileges | Confirm the user has `ALL PRIVILEGES` on the target database |
| Restored site still shows old data | Restored into the wrong database, or caches are stale | Confirm `DB_DATABASE` in `.env`, then visit `/clear` |
