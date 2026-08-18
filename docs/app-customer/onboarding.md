---
id: onboarding
title: Change Onboarding Images & Text
sidebar_position: 9
---

# Change Onboarding Images & Text

The onboarding screen is the first thing a new user sees when they open the app. You can customize the images, titles, and body text without touching any UI code.

---

## Change Onboarding Images

In the folder assets/images/svg, locate the images:

```dart
onboarding_1.svg
onboarding_2.jpg
onboarding_3.jpg
```

To replace an image:

1. Prepare your new image file.
2. Name it exactly the same as the existing file (e.g. `onboarding_1.svg`).
3. Place it at the same path in the assets folder, replacing the old file.

:::warning
Do **not** change the file name or path. The constants in `app_constants.dart` must continue to point to the correct file, or the image will not load.
:::

---

## Change Onboarding Text

The onboarding titles and descriptions are controlled via the translation file. Open:

```
assets/languages/en.json
```

Search for the following keys and update their values:

| Key | Used for |
|-----|----------|
| `onboarding_title_1` | Title of slide 1 |
| `onboarding_title_2` | Title of slide 2 |
| `onboarding_title_3` | Title of slide 3 |
| `onboarding_subtitle_1` | Body text of slide 1 |
| `onboarding_subtitle_2` | Body text of slide 2 |
| `onboarding_subtitle_3` | Body text of slide 3 |

Example:

```json
"onboardingTitle1": "Everything You Need, Delivered Fast",
"onboardingText1": "Shop groceries, essentials, and more from local stores near you.",
```

:::warning
Only change the **values** — never rename the keys. The app looks up text by key name, so renaming a key will cause the text to disappear.
:::

If you support multiple languages, apply the same value changes to each language file you added in Admin panel in Language list
