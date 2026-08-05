---
id: panel-url-deeplink
title: Panel URL & Deeplink Setup
sidebar_position: 4
---

# Base URL & Deeplink Setup

Configure the backend API URL and deeplink (Universal Link / App Link) settings used by the app.

## Overview

The project ships with **three environments**: `dev`, `stage`, and `demo`. Each environment has its own JSON file under `env/` holding the API base URL and deeplink config. A single sync script propagates those JSON values into the Dart code and the native Android / iOS config files.

:::info
Most clients won't need multiple environments — they push directly to a single production server. In that case, **just edit `env/demo.json`** and ignore the `dev` and `stage` files. The `demo` environment is the default and is what your end users will run.
:::


## Config Keys

Each `env/<name>.json` file contains three keys:

| Key | Meaning |
|-----|---------|
| `BASE_URL` | Backend API root for all network calls |
| `DEEPLINK_SCHEME` | Custom URL scheme (e.g. `estay` → `estay://booking/123`) |
| `DEEPLINK_HOST` | Universal / App Link host — must match the web app host (e.g. `estay-demo.vercel.app`) |

**Example** — `env/demo.json`:

```json
{
  "BASE_URL": "https://demo-estay.thewrteam.in",
  "DEEPLINK_SCHEME": "estay",
  "DEEPLINK_HOST": "estay-demo.vercel.app"
}
```

## How to Change Values

### Step 1 — Pick Environment

Open `lib/core/configs/app_config.dart` and set the active environment:

```dart
static const String environment = 'demo'; // or 'dev' / 'stage'
```

Most clients leave this on `'demo'` and edit only `env/demo.json` (single production server, no multi-env workflow needed).

### Step 2 — Edit Matching JSON

Open the matching file under `env/` (e.g. `env/demo.json`) and update `BASE_URL`, `DEEPLINK_SCHEME`, and `DEEPLINK_HOST` to your values.

### Step 3 — Run Sync Script

From the project root:

```bash
dart run tool/apply_config.dart
```

The script automatically patches:

- `baseUrl`, `deeplinkScheme`, `deeplinkHost` constants in `app_config.dart`
- Android `<data>` intent-filter tags in `AndroidManifest.xml` (scheme + host; `pathPattern` is preserved)
- iOS `CFBundleURLSchemes` first entry in `Info.plist` (the Google Sign-In reverse-client-ID below is left untouched)
- iOS `applinks:<host>` entry in `Runner.entitlements`

### Step 4 — Rebuild

```bash
flutter clean && flutter run
```

### Files Involved

| File | Purpose |
|------|---------|
| `lib/core/configs/app_config.dart` | Dart-side config consumed by the app |
| `env/dev.json` · `env/stage.json` · `env/demo.json` | Source of truth per environment |
| `tool/apply_config.dart` | Sync script |
| `android/app/src/main/AndroidManifest.xml` | Android deeplink intent filters |
| `ios/Runner/Info.plist` | iOS URL scheme |
| `ios/Runner/Runner.entitlements` | iOS Universal Links |


## Important Notes

:::warning
- **Never edit the constants in `app_config.dart` by hand** — the sync script overwrites them. Edit the JSON instead.
- `DEEPLINK_HOST` **must match the web app domain** for iOS Universal Links and Android App Links to work. 
- `DEEPLINK_SCHEME` is the scheme value used for deeplinking. and it must be same in app settings and in web app. (dont change unless you want)
- `webUrl` is auto-derived as `https://<DEEPLINK_HOST>`.

:::

:::tip
You can switch environments at any time: change the `environment` constant → rerun the sync script → rebuild the app.
:::
