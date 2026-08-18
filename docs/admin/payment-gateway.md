---
id: payment-gateway
title: Payment Gateways
sidebar_position: 21
---

# Payment Gateways

Configured **per country**, on the [country](/docs/admin/countries) record — not on a global settings page.

:::danger This is the thing people get wrong
There is no single "Payment Gateways" settings screen. Every gateway's credentials and its on/off switch live on the **country** it applies to.

If a gateway "is configured but customers cannot see it", you are almost certainly looking at the wrong place — open **Countries → edit the country → Payment Gateways**.
:::

![Payment gateway configuration on a country](/images/panel/payment-gateway-page.png)

## Why per country

Different regions need different processors. A store selling in India and the UAE cannot use one gateway for both — Razorpay settles in INR, PayTabs serves the Gulf. Attaching gateways to countries lets each region use what actually works there, in the right currency.

The **Payment Method Settings** master switch on the country turns online payment on or off for that country as a whole.

## Supported gateways

| Gateway | Credentials needed |
| --- | --- |
| **Cash on Delivery** | None — just enable it |
| **Razorpay** | Key, Secret Key |
| **Stripe** | Publishable Key, Secret Key, Webhook Secret, Currency Code, Mode |
| **PayPal** | Business Email, Currency Code, Mode |
| **Paystack** | Public Key, Secret Key, Currency Code |
| **Midtrans** | Server Key, Mode |
| **PhonePe** | Merchant ID, Client ID, Client Version, Client Secret, Mode |
| **Cashfree** | App ID, Secret Key, Mode |
| **PayTabs** | Profile ID, Secret Key, Mode |

Installation enables **Cash on Delivery** only. Everything else starts disabled and blank.

## Getting the credentials for each gateway

Every gateway names its keys differently. This section maps SnapBuy's fields to where you find each value in the provider's own dashboard.

All of them follow the same shape: create an account, complete business verification (KYC), copy the test keys, test, then swap in the live keys.

:::warning Verification takes time
Most providers will not issue live keys until your business documents are approved. This commonly takes several working days. Start the account opening before you need to launch, and use test keys meanwhile.
:::

### Cash on Delivery

No account and no credentials. Enable the toggle on the country and choose the COD mode:

| Mode | Behaviour |
| --- | --- |
| **Global** | COD offered on every product |
| **Product wise** | COD offered only on products individually marked as COD-eligible |

### Razorpay (India)

1. Sign up at [dashboard.razorpay.com](https://dashboard.razorpay.com/).
2. Complete KYC under **Account & Settings → Business details**.
3. Go to **Account & Settings → API Keys**.
4. Select **Test Mode** or **Live Mode** using the toggle at the top of the dashboard.
5. Click **Generate Key**. The secret is shown **once** — copy it immediately.

| SnapBuy field | Razorpay value |
| --- | --- |
| Razorpay Key | Key ID, begins `rzp_test_` or `rzp_live_` |
| Razorpay Secret Key | Key Secret |

### Stripe (international)

1. Sign up at [dashboard.stripe.com](https://dashboard.stripe.com/).
2. Complete business activation.
3. Go to **Developers → API keys** for the publishable and secret keys.
4. Go to **Developers → Webhooks → Add endpoint**, enter your webhook URL, and copy the **Signing secret**.

| SnapBuy field | Stripe value |
| --- | --- |
| Stripe Publishable Key | Publishable key, begins `pk_` |
| Stripe Secret Key | Secret key, begins `sk_` |
| Stripe Webhook Secret Key | Signing secret from the endpoint, begins `whsec_` |
| Stripe Currency Code | The currency your Stripe account settles in |
| Stripe Mode | `test` or `live` |

Without the signing secret SnapBuy cannot verify that a callback genuinely came from Stripe, and will reject it.

### PayPal

1. Sign up at [paypal.com](https://www.paypal.com/) and upgrade to a **Business** account.
2. Use the [Developer Dashboard](https://developer.paypal.com/) sandbox accounts for testing.
3. Enable **Instant Payment Notification (IPN)** in **Account Settings → Notifications** and point it at your IPN URL.

| SnapBuy field | PayPal value |
| --- | --- |
| PayPal Business Email | The email address on the Business account |
| PayPal Currency Code | Currency your PayPal account accepts |
| PayPal Mode | `sandbox` or `live` |

### Paystack (Africa)

1. Sign up at [dashboard.paystack.com](https://dashboard.paystack.com/).
2. Complete business verification.
3. Go to **Settings → API Keys & Webhooks**.

| SnapBuy field | Paystack value |
| --- | --- |
| Paystack Public Key | Public key, begins `pk_test_` or `pk_live_` |
| Paystack Secret Key | Secret key, begins `sk_test_` or `sk_live_` |
| Paystack Currency Code | NGN, GHS, ZAR, USD as enabled on your account |

### Midtrans (Indonesia)

1. Sign up at [midtrans.com](https://midtrans.com/).
2. Complete merchant verification.
3. Go to **Settings → Access Keys**.
4. Sandbox and Production have separate keys — take them from the matching environment.

| SnapBuy field | Midtrans value |
| --- | --- |
| Midtrans Server Key | Server Key |
| Midtrans Mode | `sandbox` or `production` |

Set the payment notification URL in **Settings → Configuration** to your Midtrans callback URL.

### PhonePe (India)

1. Register as a merchant at [business.phonepe.com](https://business.phonepe.com/).
2. Complete onboarding — PhonePe issues credentials directly to the merchant.
3. Collect the values from the merchant dashboard or your onboarding email.

| SnapBuy field | PhonePe value |
| --- | --- |
| PhonePe Merchant ID | Merchant ID |
| PhonePe Client ID | Client ID |
| PhonePe Client Version | Client version supplied during onboarding |
| PhonePe Client Secret | Client secret |
| PhonePe Mode | `UAT` for testing, `PROD` for live |

### Cashfree (India)

1. Sign up at [merchant.cashfree.com](https://merchant.cashfree.com/).
2. Complete KYC.
3. Go to **Developers → API Keys**.

| SnapBuy field | Cashfree value |
| --- | --- |
| Cashfree App ID | App ID / Client ID |
| Cashfree Secret Key | Secret Key / Client Secret |
| Cashfree Mode | `TEST` or `PROD` |

Register the callback URL under **Developers → Webhooks**.

### PayTabs (Middle East)

1. Sign up at [paytabs.com](https://www.paytabs.com/) for your country.
2. Complete merchant verification.
3. Open **Developers → Key management** in the merchant dashboard.

| SnapBuy field | PayTabs value |
| --- | --- |
| PayTabs Profile ID | Profile ID |
| PayTabs Secret Key | Server key |
| PayTabs Mode | Test or live |

## Where to enter them

Credentials are stored **per country**, not globally:

1. Open **Countries** and edit the country you sell in.
2. Go to step 2 of the wizard, **Payment Gateways**.
3. Turn on the gateway and fill its fields.
4. Save.

The **Payment Method Settings** master switch on the same step enables online payment for that country as a whole.

Repeat for every country you sell in. A gateway configured on India is not offered to customers in the UAE.

## Test mode and live mode

Most gateways carry a **Mode** field — `test`/`sandbox` or `live`.

:::danger Test and live keys are not interchangeable
Test keys in live mode reject every payment. Live keys in test mode either fail or, worse, take a real payment through a sandbox flow that never settles.

Before launch, confirm for **each** enabled gateway: mode is `live`, and the keys are the live keys from the provider's dashboard — not the ones you tested with.
:::

Recommended sequence:

1. Configure in test mode.
2. Place a full test order end to end.
3. Confirm the order reaches **Paid** in the panel.
4. Switch mode to live and replace the keys.
5. Place one **real** low-value order and refund it.

:::warning Always do a real live transaction before launch
A successful sandbox payment proves your keys parse. It does not prove your live account is activated, your KYC is approved, or your settlement account is attached. One real order catches all three.
:::

## Webhooks

Several gateways confirm payment by calling **your server** rather than the customer's browser. If a customer closes the app after paying, the webhook is the only thing that marks the order paid.

| Gateway | Webhook / callback URL |
| --- | --- |
| PayPal (IPN) | `https://admin.yourstore.com/ipn` |
| Stripe | `https://admin.yourstore.com/webhook/stripe` |
| Razorpay | `https://admin.yourstore.com/webhook/razorpay` |
| PhonePe | `https://admin.yourstore.com/phonepe/callback` |
| Midtrans | `https://admin.yourstore.com/midtrans/callback` |
| Cashfree | `https://admin.yourstore.com/cashfree/callback` |
| PayTabs | `https://admin.yourstore.com/paytabs/callback` |

Register these in each provider's dashboard.


:::danger Payments taken but orders stuck unpaid
This is the classic missing-webhook symptom: money leaves the customer's account, the gateway shows it as captured, and the order sits unpaid in your panel.

Check that the webhook URL is registered, reachable over HTTPS, and that your host is not blocking the request.
:::

:::info Webhook endpoints are exempt from CSRF by design
These URLs are server-to-server POSTs with no session, so SnapBuy exempts them from CSRF checks. That is expected — do not attempt to "secure" them by removing the exemption, or payments will stop confirming.
:::

### Stripe webhook secret

Stripe additionally needs a **Webhook Secret** (`whsec_…`), issued when you create the endpoint in the Stripe dashboard. Without it, SnapBuy cannot verify the request is genuinely from Stripe and rejects it.

## Currency must match

Each gateway's **Currency Code** must match:

- The [country's](/docs/admin/countries#currency) currency code, **and**
- What your gateway account is actually able to settle in.

:::danger Mismatched currency is charged wrong, not blocked
A country set to `INR` with a gateway set to `USD` does not error — it charges the number as dollars. An order of ₹500 becomes a $500 charge. Check both sides.
:::

## Cash on Delivery

COD needs no credentials. Its **mode** setting controls where it is offered.

:::tip Consider limits on COD
COD carries real cost — failed deliveries, cash handling, reconciliation. If you offer it, pair it with a delivery OTP (see [App Settings](/docs/admin/app-settings#otp-generation)) so handovers are provable.
:::

## Refunds

Refunds are issued from the order and flow back through the original gateway, or to the customer's [wallet](/docs/admin/wallet-withdrawals) depending on how the refund is processed.

:::warning Refunds need the gateway to stay configured
Removing or rotating a gateway's credentials breaks refunds for **past** orders taken through it. Keep credentials in place while any refundable orders remain.
:::

## Security

:::danger Secret keys are as sensitive as your bank login
- Never share them over chat or email
- Never paste them into a support ticket
- Rotate immediately if exposed
- Restrict panel access to Payment settings by [role](/docs/admin/roles-permissions)

Anyone with access to this screen can read your live gateway credentials.
:::

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Gateway not visible to customers | Not enabled on the customer's country | Enable it on that country |
| No online payment options at all | Payment Method Settings master switch off | Turn it on for that country |
| Every payment declined | Test keys in live mode, or account not activated | Check mode and keys; confirm KYC with the provider |
| Money taken, order unpaid | Webhook not registered or unreachable | Register the URL; confirm HTTPS access |
| Stripe webhook rejected | Missing or wrong webhook secret | Copy `whsec_…` from the Stripe dashboard |
| Charged in the wrong currency | Gateway currency ≠ country currency | Align both |
| Works on web, fails in the app | Return URL or deeplink not configured | See [Deeplink Settings](/docs/admin/deeplink-settings) |
| Refund fails on an old order | Gateway credentials changed | Restore the credentials used at the time |

## Launch checklist

- [ ] Gateway enabled on **every** country you sell in
- [ ] Mode set to `live` for each
- [ ] Live keys in place, not test keys
- [ ] Currency code matches the country and the gateway account
- [ ] Webhook URLs registered and reachable
- [ ] Stripe webhook secret entered
- [ ] One real live payment completed **and refunded**
- [ ] Access to payment settings restricted by role
