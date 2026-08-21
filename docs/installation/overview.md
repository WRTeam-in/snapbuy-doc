---
id: installation-overview
title: Installation Overview
sidebar_position: 1
---

# Installation Overview

SnapBuy is delivered as **four separate codebases**. They are installed in a fixed order, because each one needs the address of the one before it.

| # | Codebase | Technology | Where it runs |
| --- | --- | --- | --- |
| 1 | **Admin Panel / Backend** | Laravel 12 + Vue 3 | Your VPS |
| 2 | **Web Portal** | Server-rendered storefront | Your VPS |
| 3 | **Customer App** | Flutter | Android & iOS |
| 4 | **Delivery Boy App** | Flutter | Android & iOS |

:::info This section covers the backend
This **Installation** menu sits under Admin Panel because it installs the **backend** — the panel and the API every other codebase talks to. The mobile apps and web portal have their own sections in the sidebar, and are set up after the panel is live.
:::

## Install in this order

The order is not a preference. Each step produces something the next step needs. Work straight down the **Installation** menu:

| Step | Page | What it achieves |
| --- | --- | --- |
| 1 | **[Server Requirements](/docs/admin/server-requirements)** | Confirm the server can run SnapBuy |
| 2 | **[Deployment Guide](/docs/installation/server-setup)** | Install PHP, MySQL, Nginx, Node and Supervisor |
| 3 | **[Domain, DNS & SSL](/docs/admin/create-subdomain)** | Point the hostname at the server and install a certificate |
| 4 | **[PHP INI Settings](/docs/admin/php-ini-settings)** | Raise the limits the installer needs |
| 5 | **[Panel Installation](/docs/admin/panel-installation)** | Run the installation wizard — creates the schema and your Super Admin account |
| 6 | **[Environment Configuration](/docs/installation/environment-configuration)** | Review `.env` and add what the installer could not know |
| 7 | **[Database & Migrations](/docs/installation/database-migration)** | Understand what was built, and how to migrate later |
| 8 | **[Cron Job Setup](/docs/admin/cron-jobs)** | Register the scheduler — several features do nothing without it |
| 9 | **[Setup Guide](/docs/admin/setup-guide)** | The nine in-panel steps that make the store usable |
| 10 | **[Localhost Setup](/docs/admin/localhost-setup)** | Optional — run a copy on your own machine |
| 11 | **[Routine backups](/docs/installation/database-migration#routine-backups)** | Put a backup routine in place before you go live |

Once the panel is running, the other three codebases point at it:

- **Web Portal** — set the panel URL and deploy.
- **Customer & Delivery Boy apps** — set the panel URL, change the package name, add the Firebase files, and build.

:::warning The panel URL is decided at step 2 and baked into everything after it
The address you install the panel on is written into the web portal configuration and compiled into both mobile apps. Changing it later means editing the portal config and rebuilding and republishing both apps. Choose it once and keep it.
:::

## A VPS is required

SnapBuy does not run on budget shared hosting. This is a hard requirement, not a recommendation:

- The **web portal is server-rendered** so that search engines can index products. That needs a Node process running continuously.
- **Live chat** over Laravel Reverb needs a long-running process and an open port.
- The **queue worker and scheduler** need real cron access and the ability to run background processes.
- The installer runs database migrations that exceed the execution limits typical of shared plans.

See [Server Requirements](/docs/admin/server-requirements) for exact specifications.

## What you need before starting

- [ ] A VPS or dedicated server with root access
- [ ] A domain, with DNS pointing at the server
- [ ] Your Envato purchase code
- [ ] An email address for the Super Admin account
- [ ] Accounts for any third-party services you intend to use — see [Third-Party Service Costs](/docs/admin/third-party-costs)

## Typical layout

Most installations put the panel and storefront on separate hostnames:

| Address | Codebase |
| --- | --- |
| `https://yourstore.com` | Web Portal |
| `https://admin.yourstore.com` | Admin Panel and API |

Both can live on the same VPS. Keeping them on separate hostnames lets you update, secure and back them up independently.

---

**Next:** [Server Requirements →](/docs/admin/server-requirements)
