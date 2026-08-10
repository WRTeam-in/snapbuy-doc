---
id: create-subdomain
title: Create a Subdomain
sidebar_position: 3
---

# Create a Subdomain

Snapbuy's admin panel is usually installed on its own subdomain, separate from the customer-facing website. A typical layout:

| Address | What runs there |
| --- | --- |
| `https://yourstore.com` | Web Portal (customer storefront) |
| `https://admin.yourstore.com` | **Admin Panel** — this documentation |

Keeping them apart means the panel and the storefront can be updated, secured and backed up independently. The mobile apps talk to the **admin panel URL**, so pick something short and permanent.

:::warning Choose the URL carefully
The panel URL is written into the Customer App, the Delivery Boy App and the Web Portal configuration. Changing it later means rebuilding and re-publishing both apps. Decide once, then keep it.
:::

## Create the subdomain in cPanel

1. Log into cPanel.
2. Under **Domains**, open **Subdomains** (on newer cPanel versions: **Domains → Create A New Domain**).
3. In **Subdomain**, type `admin`.
4. Choose your main domain from the dropdown.
5. cPanel fills **Document Root** automatically as `public_html/admin`. Note this path — you will upload Snapbuy here.
6. Click **Create**.


The subdomain becomes reachable within a few minutes, though DNS propagation can take up to a few hours.

## Point the document root at `public/`

This is the step most installations get wrong.

Snapbuy is a Laravel application. Everything above the `public/` folder — including your `.env` file with database passwords — **must not be reachable from a browser**.

You have two safe options.

### Option A — document root points directly at `public/` (recommended)

Upload Snapbuy so that the structure is:

```
/home/username/snapbuy/          ← application files (.env, app/, storage/ …)
/home/username/snapbuy/public/   ← document root of admin.yourstore.com
```

In cPanel, edit the subdomain and set **Document Root** to `snapbuy/public`.

This is the most secure layout and needs no extra configuration.

### Option B — upload everything into the subdomain folder

If your host will not let you move the document root, upload all Snapbuy files into `public_html/admin/` and rely on the bundled `.htaccess` in the project root, which forwards requests into `public/`.

:::danger Verify your `.env` is not public
After installing with Option B, open `https://admin.yourstore.com/.env` in a browser. You must see a **403** or **404**. If the file contents appear, stop immediately — your database credentials and API keys are exposed. Switch to Option A or add this to the `.htaccess` in the project root:

```apache
<Files ".env">
    Require all denied
</Files>
```
:::


## Nginx (VPS) server block

If you run Nginx instead of cPanel, use a server block like this:

```nginx
server {
    listen 80;
    server_name admin.yourstore.com;
    root /var/www/snapbuy/public;

    index index.php;
    charset utf-8;

    client_max_body_size 128M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/snapbuy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Install an SSL certificate

The panel must run over HTTPS in production. Firebase web push, several payment gateways and the mobile apps all refuse plain HTTP.

**cPanel:** open **SSL/TLS Status**, select the subdomain, click **Run AutoSSL**.

**VPS:**

```bash
sudo certbot --nginx -d admin.yourstore.com
```

Confirm `https://admin.yourstore.com` loads with a padlock before you run the installer — the installer writes `APP_URL` from the address you visit it on, and a wrong scheme there causes mixed-content problems later.

:::tip Install over HTTPS, not HTTP
Visit the installer at `https://…` from the very first screen. If you install over `http://`, `APP_URL` is saved as `http://` and you will have to correct it in `.env` afterwards.
:::

## Checklist

- [ ] Subdomain created and resolving
- [ ] Document root points at Snapbuy's `public/` folder
- [ ] `https://admin.yourstore.com/.env` returns 403/404
- [ ] SSL certificate installed and the padlock shows

---

**Previous:** [← Server Requirements](/docs/admin/server-requirements) · **Next:** [PHP INI Settings →](/docs/admin/php-ini-settings)
