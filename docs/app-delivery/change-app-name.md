---
id: change-app-name
title: Change App Name
sidebar_position: 6
---

# Change App Name

Update the displayed app name on Android, iOS, and inside the app code.

## Android Configuration

1. Navigate to `android/app/src/main/AndroidManifest.xml`.
2. Change the app name by modifying the `android:label` value inside the `<application>` tag.

![Android App Name Change](./images/appname1.png)

## iOS Configuration

1. Navigate to `ios/Runner/Info.plist`.
2. Change the app name by modifying the `CFBundleDisplayName` and `CFBundleName` values.

![iOS App Name Change](./images/appname2.png)

## Change App Name in Code

1. Open `lib/core/configs/appConfig.dart`.
2. Change the value of the `appName` variable to your desired app name.

![appConfig.dart App Name](./images/appname3.png)



Save the changes.

Rebuild the app by running the following commands:
```
flutter clean
flutter pub get
flutter run
```