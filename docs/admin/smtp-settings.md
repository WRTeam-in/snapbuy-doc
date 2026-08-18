---
id: smtp-settings
title: SMTP / Email Settings
sidebar_position: 13
---

# SMTP / Email Settings

**Setup Guide step 5 of 9.** Menu path: **Settings → SMTP Settings**

SMTP is how SnapBuy sends email. Until it is configured, **no email leaves the system** — no order confirmations, no password resets, no email OTP, no promotional campaigns.

![SMTP settings page](/images/panel/smtp-settings-page.png)

## What breaks without SMTP

| Feature | Effect |
| --- | --- |
| Order confirmation & status emails | Never sent |
| Admin password reset | Admins locked out with no way back in |
| Email OTP login | Customers cannot sign in if email OTP is their method |
| Bulk promotional emails | Silently queued and never delivered |
| Return and refund notifications | Never sent |

:::danger Configure this before you invite other admins
Password reset relies on SMTP. If an admin forgets their password and SMTP is not working, there is no in-panel way to recover the account — it takes direct database access.
:::

## Settings

| Field | What to enter |
| --- | --- |
| **Mailer** | `SMTP` for a mail server, `Sendmail` for the server's local binary |
| **From Email ID** | Address emails are sent from. Must be one the SMTP account is allowed to send as. |
| **Reply-To Email ID** | Where customer replies go. Often your support inbox. |
| **SMTP Email Password** | Password or app password for the sending account |
| **SMTP Host** | Your provider's server — `smtp.gmail.com`, `smtp.sendgrid.net` |
| **SMTP Port** | `587` for TLS, `465` for SSL |
| **Email Content Type** | `HTML` (recommended) or `Text` |
| **SMTP Encryption** | `TLS` or `SSL` — must match the port |

:::warning Port and encryption must agree
`587` pairs with **TLS**. `465` pairs with **SSL**. Mismatching them causes a connection timeout that reads as a generic "could not send" error, with nothing useful in the log.
:::

:::info Use HTML content type
SnapBuy's built-in [email templates](/docs/admin/notification-templates) are HTML. Setting the content type to `Text` delivers raw markup to customers.
:::

## Common provider settings

### Gmail / Google Workspace

| Field | Value |
| --- | --- |
| Host | `smtp.gmail.com` |
| Port | `587` |
| Encryption | TLS |
| Password | **App password**, not your Google password |

:::danger Gmail requires an App Password
Google blocks normal account passwords over SMTP. Enable 2-Step Verification on the account, then generate an **App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and use that 16-character value.

Free Gmail also caps sending at roughly 500 messages a day. It is fine for testing and unsuitable for a live store running campaigns.
:::

### SendGrid

| Field | Value |
| --- | --- |
| Host | `smtp.sendgrid.net` |
| Port | `587` |
| Encryption | TLS |
| Username | the literal string `apikey` |
| Password | your SendGrid API key |

### Amazon SES

| Field | Value |
| --- | --- |
| Host | `email-smtp.<region>.amazonaws.com` |
| Port | `587` |
| Encryption | TLS |
| Password | SES **SMTP credentials** — not your AWS secret key |

:::warning SES starts in sandbox mode
In sandbox, SES only delivers to addresses you have verified. Request production access before launch, or real customers receive nothing.
:::

### Mailbox on your own domain

| Field | Value |
| --- | --- |
| Host | `mail.yourdomain.com` |
| Port | `465` |
| Encryption | SSL |
| From | the full mailbox address |
| Password | that mailbox's password |

## Send a test email

The page has a **test mail** box. Enter an address and press **Test Mail**.

![Sending a test email](/images/panel/smtp-test-mail.png)

:::tip Test to an external address
Sending to an address on your own domain can succeed while delivery to the outside world fails. Test to Gmail or Outlook, and check the spam folder too — arriving in spam is a deliverability problem, not a configuration success.
:::

## When the Setup Guide step will not tick

The Setup Guide marks SMTP complete only when **SMTP Host**, **SMTP Port** and **From Email ID** are all filled and non-blank. Filling only the password and host leaves the step red.

## Deliverability

Correct settings get mail *sent*. These get it *delivered*:

| Record | Purpose |
| --- | --- |
| **SPF** | Authorises your provider to send as your domain |
| **DKIM** | Cryptographically signs your mail |
| **DMARC** | Tells receivers what to do when SPF/DKIM fail |

:::warning Do not send as a domain you do not control
Setting the From address to a Gmail or Yahoo address while sending through your own server fails DMARC and lands in spam. Send from an address on your own domain.
:::

## Bulk email depends on the queue

Promotional campaigns are dispatched as **queued jobs**, not sent inline.

:::danger Bulk email needs the cron job
If the [cron job](/docs/admin/cron-jobs) is not running, campaigns queue up and are never delivered. The panel reports the campaign as sent. Check **Settings → Cron Jobs** and watch **Pending jobs** — if it only grows, nothing is being sent.
:::

Transactional email — order confirmations, password resets — is also queued.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Connection could not be established" | Port/encryption mismatch, or host blocks outbound SMTP | Try 587/TLS, then 465/SSL; ask the host to open outbound SMTP |
| "Authentication failed" with correct password | Provider requires an app password | Generate an app password (Gmail, Outlook) |
| Test mail succeeds, order emails never arrive | Queue not processed | Set up the [cron job](/docs/admin/cron-jobs) |
| Emails land in spam | Missing SPF/DKIM, or From on a domain you do not control | Add DNS records; send from your own domain |
| Emails show raw HTML tags | Content type set to `Text` | Set it to `HTML` |
| Nothing sends after changing settings | Cached config | Visit `/clear` once |
