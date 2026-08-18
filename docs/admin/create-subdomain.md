---
id: create-subdomain
title: Domain, DNS & SSL
sidebar_position: 3
---

# Domain, DNS & SSL

The admin panel is normally installed on its own hostname, separate from the customer-facing storefront.

| Address | What runs there |
| --- | --- |
| `https://yourstore.com` | Web Portal — the customer storefront |
| `https://admin.yourstore.com` | **Admin Panel and API** |

Both can live on the same VPS. Separate hostnames let you update, secure and back them up independently, and keep the panel out of your public search results.

:::danger Choose this URL once
The panel URL is written into the Web Portal configuration and compiled into the Customer and Delivery Boy apps. Changing it later means editing the portal config and rebuilding and republishing both apps through the stores.

Decide it before installing, and keep it.
:::

## Point DNS at your server

Create two records with your DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | Your server's IPv4 address |
| `A` | `admin` | Your server's IPv4 address |

Add `AAAA` records as well if your server has IPv6.

Propagation is usually minutes but can take several hours. Verify before continuing:

```bash
dig +short admin.yourstore.com
```

The output should be your server's IP address.

## Serve the panel from `public/`

SnapBuy is a Laravel application. Everything above the `public/` folder — including the `.env` file holding your database password, payment keys and application key — **must not be reachable from a browser**.

The Nginx `root` directive therefore points at `public/`, not the project root:

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
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_read_timeout 600;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/snapbuy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

:::danger Verify `.env` is not public
Once the site responds, open `https://admin.yourstore.com/.env` in a browser. You must see a **403** or **404**.

If the file contents appear, stop immediately — your database credentials, application key and payment gateway secrets are exposed to anyone who requests that URL. Correct the `root` directive so it ends in `/public` and reload Nginx.
:::

## Apache alternative

If you run Apache rather than Nginx, the equivalent virtual host is:

```apache
<VirtualHost *:80>
    ServerName admin.yourstore.com
    DocumentRoot /var/www/snapbuy/public

    <Directory /var/www/snapbuy/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Enable `mod_rewrite`, then restart Apache. The bundled `.htaccess` handles routing.

## Install SSL

HTTPS is mandatory in production. Firebase web push, several payment gateway callbacks and both mobile apps refuse plain HTTP.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d admin.yourstore.com -d yourstore.com
```

Certbot installs the certificate, adds the HTTPS server block and sets up automatic renewal. Confirm renewal works:

```bash
sudo certbot renew --dry-run
```

:::danger Install SSL before running the installer
The installer saves whatever address you visit it on as `APP_URL`. Installing over `http://` writes the wrong scheme into your configuration and causes mixed-content errors, failed payment callbacks and blocked web push.

Load `https://admin.yourstore.com` and confirm the padlock appears **before** you open the installer.
:::

## Checklist

- [ ] DNS records resolve to your server
- [ ] Nginx (or Apache) document root ends in `/public`
- [ ] `https://admin.yourstore.com/.env` returns 403 or 404
- [ ] SSL certificate installed and auto-renewal tested
- [ ] The panel URL is final and recorded for the apps and web portal

---

**Previous:** [← Server Setup](/docs/installation/server-preparation) · **Next:** [PHP INI Settings →](/docs/admin/php-ini-settings)
