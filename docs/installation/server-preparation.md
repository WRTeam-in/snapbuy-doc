---
id: server-preparation
title: Server Setup
sidebar_position: 2
---

# Server Setup

This page provisions a clean VPS to the point where SnapBuy's installer can run. Commands are shown for Ubuntu 22.04 / 24.04; adapt package names for other distributions.

:::warning Shared hosting will not work
SnapBuy needs long-running processes, real cron access and a Node runtime for the server-rendered storefront. Provision a VPS or dedicated server with root access. See [Installation Overview](/docs/installation/installation-overview#a-vps-is-required).
:::

## Step 1 — Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

## Step 2 — Install PHP 8.3

SnapBuy requires **PHP 8.3 or newer**.

```bash
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-mbstring \
  php8.3-xml php8.3-curl php8.3-zip php8.3-gd php8.3-bcmath \
  php8.3-intl php8.3-sodium php8.3-tokenizer
```

Verify:

```bash
php -v
php -m | sort | tr '\n' ' '
```

Every extension listed in [Server Requirements](/docs/admin/server-requirements#required-php-extensions) must appear.

## Step 3 — Raise the PHP limits

Edit both the FPM and CLI configuration:

```bash
sudo nano /etc/php/8.3/fpm/php.ini
sudo nano /etc/php/8.3/cli/php.ini
```

Set at minimum:

```ini
max_execution_time = 600
max_input_time = 600
memory_limit = 512M
post_max_size = 128M
upload_max_filesize = 100M
max_input_vars = 5000
```

Also confirm `disable_functions` does not contain `symlink`, `exec`, `proc_open`, `shell_exec` or `putenv`.

```bash
sudo systemctl restart php8.3-fpm
```

Full explanation of each value: [PHP INI Settings](/docs/admin/php-ini-settings).

## Step 4 — Install MySQL

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Create the database and a dedicated user:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE snapbuy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'snapbuy'@'localhost' IDENTIFIED BY 'a-strong-password';
GRANT ALL PRIVILEGES ON snapbuy.* TO 'snapbuy'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

:::warning Use a fresh, empty database
The installer runs `migrate:fresh`, which drops every table in the database it connects to. Never point it at a database holding other data.
:::

:::tip Password characters
Use capitals, lowercase, digits and `@` or `_`. Some other symbols break `.env` parsing and produce a "could not connect" error even when the credentials are correct.
:::

## Step 5 — Install Nginx

```bash
sudo apt install -y nginx
```

Create `/etc/nginx/sites-available/snapbuy`:

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

:::danger The document root must be the `public/` folder
Pointing it at the project root exposes your `.env` file — database passwords, API keys and payment credentials — to anyone who requests it. After going live, open `https://admin.yourstore.com/.env` and confirm you get a 403 or 404.
:::

## Step 6 — Install Composer and Node

```bash
# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Node is needed to build front-end assets and to run the server-rendered web portal.

## Step 7 — Install Supervisor

Supervisor keeps background processes alive across reboots and crashes.

```bash
sudo apt install -y supervisor
sudo systemctl enable supervisor
```

It is used for the queue worker and, if you self-host chat, the Reverb WebSocket server. Configuration is covered in [Cron Job Setup](/docs/admin/cron-jobs) and [Chat Settings](/docs/admin/chat-settings).

## Step 8 — Install SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d admin.yourstore.com
```

:::danger Install SSL before running the installer
The installer saves whatever address you visit it on as `APP_URL`. Installing over `http://` bakes the wrong scheme into your configuration and causes mixed-content failures, broken payment callbacks and blocked web push later.
:::

## Step 9 — Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

If you run Laravel Reverb for chat on its default port:

```bash
sudo ufw allow 9090
```

## Step 10 — Upload SnapBuy

```bash
sudo mkdir -p /var/www/snapbuy
cd /var/www/snapbuy
# upload the archive here, then:
unzip snapbuy-admin.zip
```

Set ownership and permissions:

```bash
sudo chown -R www-data:www-data /var/www/snapbuy
sudo chmod -R 755 /var/www/snapbuy
sudo chmod -R 775 /var/www/snapbuy/storage /var/www/snapbuy/bootstrap/cache
```

:::tip Extract on the server
Uploading thousands of individual files over FTP is slow and frequently leaves files missing. Upload the single archive and extract it on the server.
:::

## Pre-flight checklist

- [ ] PHP 8.3+ with every required extension
- [ ] PHP limits raised in both FPM and CLI
- [ ] `symlink` and `exec` not disabled
- [ ] Empty MySQL database and dedicated user created
- [ ] Nginx document root points at `public/`
- [ ] Composer and Node 20 installed
- [ ] Supervisor installed and enabled
- [ ] SSL installed and the padlock shows
- [ ] Firewall configured
- [ ] Files uploaded, ownership and permissions set

---

**Previous:** [← Server Requirements](/docs/admin/server-requirements) · **Next:** [Domain, DNS & SSL →](/docs/admin/create-subdomain)
