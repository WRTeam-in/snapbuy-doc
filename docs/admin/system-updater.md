---
id: system-updater
title: System Updater
sidebar_position: 32
---

# System Updater

Menu path: **Settings → System Updater**

Applies a SnapBuy update from a `.zip` package you upload, without touching FTP or SSH.

![System updater page](/images/panel/system-updater-page.png)

:::danger Back up first — it is your only way back
An update overwrites application files and runs database migrations. There is no undo button inside SnapBuy.

Before you start, take a copy of:

- your **project files**, and
- your **database**

If the update fails, or you simply do not want the new version, restoring those two copies is the only way back. Do it every time, including for updates you expect to be small.
:::

:::danger Upload the file exactly as supplied — do not rename it
The update package arrives with a version-stamped name, for example:

```
snapbuy-update-1.1.0.zip
```

The updater reads the version from that filename to work out what to apply. **Renaming the file, or re-zipping its contents, breaks the update.**

Do not extract it, do not repackage it, and do not change the name — upload the original `.zip` exactly as you received it.
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

1. Back up your project files and database.
2. Put the customer-facing surfaces into [Maintenance Mode](/docs/admin/maintenance-mode).
3. Go to **Settings → System Updater**.
4. Upload the `.zip` exactly as you received it, and enter your purchase code.
5. Wait — do not refresh or navigate away.
6. Visit `/clear` once it completes.
7. Test before turning maintenance off.

![Uploading an update package](/images/panel/system-updater-upload.png)

:::warning Do not interrupt an update in progress
Refreshing mid-copy can leave a half-updated file set — some files new, some old — which usually produces fatal errors. If it appears to hang, wait it out, then check `storage/logs/laravel.log` before doing anything else.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Invalid purchase code" | Code belongs to another domain, or no outbound HTTPS | Check the domain; test `curl -I https://validator.wrteam.in` |
| "Please upload a valid zip file" | Wrong file type, renamed or re-zipped file, or a corrupt download | Upload the original package under its supplied name; re-download if needed |
| "PHP zip extension is required" | `zip` not enabled | Enable it and restart the web server |
| Upload fails on a large file | PHP limits too low | Raise them — see [PHP INI Settings](/docs/admin/php-ini-settings) |
| Update completes, panel errors | Stale caches | Visit `/clear` |
| Images gone after updating | Symlink lost | Visit `/linkstorage` |
| Customisations disappeared | Overwritten by the package | Restore from your file backup |
| Update hung part-way | Execution timeout | Restore from backup and retry with higher limits |
