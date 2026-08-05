---
id: run-the-app
title: Run the App
sidebar_position: 18
---

# Run the App

## Prerequisites

Before running the app, ensure the following are in place:

- Flutter SDK installed
- Android Studio (for Android) or Xcode (for iOS) installed
- A physical device connected via USB, or an emulator/simulator set up and running
- All dependencies installed:
  ```bash
  flutter pub get
  ```

---

## Run on Android

1. Open your terminal and navigate to the project directory:
   ```bash
   cd path/to/your/project
   ```

2. Run the app:
   ```bash
   flutter run
   ```

3. When prompted, select your target device:
   - **Physical device** — connected via USB with USB debugging enabled
   - **Emulator** — launched from Android Studio's AVD Manager

The app will be built and launched on the selected device.

---

## Run on iOS

1. Open your terminal and navigate to the project directory:
   ```bash
   cd path/to/your/project
   ```

2. Install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   ```

   :::tip Pod install issues?
   If `pod install` fails, run the following inside the `ios` folder to clean and retry:
   ```bash
   rm -rf Podfile.lock Pods .symlinks
   rm -rf ~/Library/Developer/Xcode/DerivedData
   pod install --repo-update
   ```
   :::

3. Go back to the project root and run the app:
   ```bash
   cd ..
   flutter run
   ```

4. When prompted, select your target device:
   - **Physical device** — iPhone or iPad connected via USB
   - **iOS Simulator** — iPhone or iPad simulator launched from Xcode
