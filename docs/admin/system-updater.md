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

Before you start:

1. Back up the **database** — see [Backup Database](/docs/installation/backup-database)
2. Back up the **project files** — see [Backup Project](/docs/installation/backup-project)

Do this every time, including for updates you expect to be small.
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
`/migration`, `/clear`, `/migrate` and `/logs` are not behind a login. Restrict them by IP in production — see [Server Setup](/docs/admin/server-setup#secure-the-maintenance-routes).
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
