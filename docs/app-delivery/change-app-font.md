---
id: change-app-font
title: Change App Font
sidebar_position: 13
---

# Change App Font

Swap the default font for one of your choice across the entire app. The app uses the [`google_fonts`](https://pub.dev/packages/google_fonts) package, so no font files need to be added manually.

## Step 1 — Update the Font in `app_config.dart`

Open `lib/core/configs/app_config.dart` and change the `fontFamily` value to the [Google Font](https://fonts.google.com/) of your choice:

```dart
// App-wide font family
static final String? fontFamily = GoogleFonts.instrumentSans().fontFamily;
```

Replace `instrumentSans()` with any font method available in the `google_fonts` package, for example:

```dart
static final String? fontFamily = GoogleFonts.poppins().fontFamily;
```

## Step 2 — Rebuild

```bash
flutter pub get
flutter clean && flutter run
```

The new font should now be applied across all screens.

:::tip
Browse [fonts.google.com](https://fonts.google.com/) to preview fonts, then use the matching method name from the `google_fonts` package (e.g. `Poppins` → `GoogleFonts.poppins()`).
:::
