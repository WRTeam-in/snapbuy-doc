---
id: prerequisites
title: App Prerequisites
sidebar_position: 1
---

# App Prerequisites

Before setting up the SnapBuy mobile app, install the required software and tools listed below.

## Flutter Setup

Download and install the Flutter SDK from the official site:

- [Flutter SDK — Official Install Guide](https://docs.flutter.dev/get-started/install)

Follow the installation steps for your operating system (Windows / macOS / Linux), then run `flutter doctor` to verify the setup.

## Software Requirements

The Customer app was developed and tested with the following versions:

| Software | Version | Purpose |
|----------|---------|---------|
| Flutter SDK | 3.44.8 (stable) | App framework |
| Java (JDK) | 21 (LTS) | Android build toolchain |
| Android Studio | 2025.2.3 | Android SDK, emulator, build tools |
| Xcode | 26.2 | iOS build (macOS only) |
| CocoaPods | Latest stable | iOS dependency manager |
| Git | Latest stable | Version control |
| VS Code _or_ Android Studio | Latest stable | Code editor / IDE |

### Platform-Specific

**Android**

- Android SDK Platform 34+ (installed via Android Studio)
- Android SDK Command-line Tools
- Android Emulator or physical device (USB debugging enabled)

**iOS** (macOS only)

- Xcode 26.2+
- iOS Simulator or physical device
- Apple Developer account (for signing and release builds)

## Verify Installation

Run the following command in your terminal to confirm everything is installed correctly:

```bash
flutter doctor -v
```

All checks should pass (green check marks) before moving to the next step.

## Additional Reference

For a complete environment walkthrough, see our [Basic Setup Guide](http://wrteam-in.github.io/common_app_doc/GeneralSettings/basicsetup/).
