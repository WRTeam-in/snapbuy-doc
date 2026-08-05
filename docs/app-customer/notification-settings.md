---
id: notification-settings
title: Notification Settings
sidebar_position: 4
---

# Notification Settings

Configure push notifications across the admin panel, Firebase, Android, and iOS so users receive real-time updates from the app.

Please visit our [Notification Settings Documentation](https://wrteam-in.github.io/common_app_doc/GeneralSettings/notifications) and follow **every step in the order shown**.

## What the Guide Covers

- **Admin Panel Settings** — Adding the Firebase Project ID and uploading the Service Account JSON file.
- **Firebase Configuration** — Cloud Messaging tab setup and selecting the iOS app.
- **iOS App Settings** — Enabling Push Notifications + Background Modes capabilities, and uploading either the `.p8` token (recommended) or `.p12` certificate to Firebase.
- **Android Setup** — Downloading and placing `google-services.json` in `android/app/`.

:::tip
The `.p8` token-based method is preferred over `.p12` certificates — tokens don't expire and a single key works for both development and production.
:::
