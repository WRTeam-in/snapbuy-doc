---
id: roles-permissions
title: Roles & Permissions
sidebar_position: 34
---

# Roles & Permissions

Menu paths: **Role** and **System Users**

SnapBuy uses role-based access control. A **role** is a bundle of permissions; a **staff user** is assigned one role and sees only what it allows.

![Roles list](/images/panel/roles-list.png)

## The seeded roles

Installation creates three:

| Role | Purpose |
| --- | --- |
| **Super Admin** | Every permission. Created by the installer as your account. |
| **Admin** | Broad management access |
| **Delivery Boy** | The rider's own portal — not a panel administrator |

:::danger Protect the Super Admin account
It can read your live payment gateway secrets, change prices, and delete records. Use a strong unique password, and never share the login between people — the [activity log](/docs/admin/activity-logs) can only tell you *which account* acted, so a shared account destroys accountability.
:::

## Permission categories

Permissions are grouped by area, and most areas offer four actions — **list**, **create**, **update**, **delete**.

| Category | Covers |
| --- | --- |
| `dashboard` | The dashboard itself |
| `order` | Orders |
| `product` | Products, brands, attributes, stock |
| `category` | Categories |
| `store` | [Stores](/docs/admin/stores) |
| `location` | [Zones](/docs/admin/zones), delivery cities and areas |
| `countries` | [Countries](/docs/admin/countries) and their policies and gateways |
| `customer` | Customer accounts, wallet, transactions |
| `delivery_boy` | Riders, cash collection, salary, settlements |
| `withdrawal_request` | Payout approvals |
| `return_request` | Returns |
| `promo_code` | Promo codes |
| `home_builder` | [Home Builder](/docs/admin/home-builder) |
| `blogs` / `faq` / `popup_offer` | Content |
| `send_notification` | Push and email campaigns |
| `email_template` | Templates |
| `languages` | [Languages](/docs/admin/languages) |
| `report` | [Reports](/docs/admin/reports) |
| `chat` | Live chat |
| `settings` | **Everything under Settings** |

## Creating a role

**Role → Add Role**, name it, then tick the permissions.

![Editing role permissions](/images/panel/roles-permissions-edit.png)

:::danger `settings` is the permission to guard hardest
The settings category covers payment gateway credentials, SMTP passwords, Firebase keys and SMS gateway tokens — all readable in plain form by anyone who has it.

Grant it only to people you would trust with your bank login. A warehouse supervisor who needs stock access does not need settings.
:::

:::warning `list` without `update` is genuinely useful
For read-only oversight — an accountant who needs to see orders and reports but must not change them — grant only the `list` permissions in those categories. This is the safest way to widen visibility.
:::

## Suggested role designs

| Role | Grant | Withhold |
| --- | --- | --- |
| **Store Manager** | order, product, category, store, return_request, chat, report (list) | settings, countries, delivery_boy payouts |
| **Catalogue Staff** | product, category (list/create/update) | delete, order, settings, customer |
| **Support Agent** | order (list/update), customer (list), chat, return_request | settings, product, report |
| **Accountant** | report, order (list), customer (list), withdrawal_request (list) | everything create/update/delete |
| **Marketing** | promo_code, home_builder, send_notification, blogs, popup_offer | settings, order, customer, product |

:::tip Start narrow and widen on request
It is far easier to add a permission when someone asks than to discover months later that a role could delete products all along. Build the minimum, then respond to real needs.
:::

## Creating staff users

**System Users → Add User**: username, email, password, and the role.

![Adding a system user](/images/panel/system-users-add.png)

:::warning Every staff member gets their own account
Sharing one login makes the activity log useless and means you cannot revoke one person's access without changing everyone's password.
:::

:::danger Password reset needs working SMTP
Staff who forget their password recover by email. If [SMTP](/docs/admin/smtp-settings) is not configured, there is no in-panel recovery path — it takes direct database access. Configure SMTP before you create staff accounts.
:::

## When someone leaves

:::danger Deactivate the account the same day
Revoke access immediately, and rotate any shared credentials that person could read — particularly payment gateway keys and SMTP passwords if they had `settings`. Their knowledge of those secrets does not expire with their account.
:::

Deactivate rather than delete, so their history in the [activity log](/docs/admin/activity-logs) stays attributable.

## The Delivery Boy role is different

The `Delivery Boy` role is not a panel administrator. Riders sign in at `/delivery_boy/login` and get their own portal — orders, cash collection, settlements, chat. See [Delivery Boy Portal](/docs/admin/delivery-boy-portal).

:::warning Do not grant admin permissions to the delivery boy role
It changes what riders see in their own app, and can expose customer or financial data on a device that is frequently lost or shared.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Menu item missing for a staff member | Role lacks that `list` permission | Grant it |
| "Unauthorized" on save | Has `list` but not `update` | Grant `update` |
| Permission changes not taking effect | Cached permissions | Visit `/clear`; have the user sign out and back in |
| Staff can see payment credentials | Role has `settings` | Remove it |
| Cannot tell who made a change | Shared account | Give each person their own |
| Permission list looks incomplete | Seeder not fully run | Re-run the permission seeders after a backup |

## Checklist

- [ ] Super Admin password strong and not shared
- [ ] `settings` granted to as few roles as possible
- [ ] Read-only roles built from `list` permissions
- [ ] One account per person
- [ ] SMTP working, so password reset is possible
- [ ] Leavers deactivated and secrets rotated
