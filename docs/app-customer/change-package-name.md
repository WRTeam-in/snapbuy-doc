---
id: change-package-name
title: Change Package Name
sidebar_position: 4
---

# Change Package Name

Update the default package name to your own unique identifier before publishing the app to the Play Store / App Store.

Please visit our [Change Package Name Documentation](https://wrteam-in.github.io/common_app_doc/GeneralSettings/packagename) for detailed instructions on changing the package name.

After changing the package name, you need to rerun the below commands to update the package references.
```
flutter clean
flutter pub get
```

:::warning Update Firebase after changing the package name
If Firebase is already configured, changing the package name/bundle ID invalidates the existing `google-services.json` / `GoogleService-Info.plist`. Re-register the app (or re-run `flutterfire configure`) under the new identifier — see [Firebase Setup](./firebase-setup.md).
:::
