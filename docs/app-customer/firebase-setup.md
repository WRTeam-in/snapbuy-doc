---
id: firebase-setup
title: Firebase Setup
sidebar_position: 2
---

# Firebase Setup

The app uses Firebase for push notifications, authentication, and other Google services. A full step-by-step guide (with screenshots) is maintained on our common docs site.

Please visit our [Firebase Setup Documentation](https://wrteam-in.github.io/common_app_doc/GeneralSettings/firebase/) and follow **every step in the order shown**.

## Authentication Methods

The following authentication methods should be enabled in the Firebase console as per your app requirements:

| Method | Where to configure |
|--------|-------------------|
| Phone | Firebase console → Authentication → Sign-in method |
| Google | Firebase console → Authentication → Sign-in method |
| Apple | Firebase console → Authentication → Sign-in method |

:::note
**Email/Password** authentication is handled by the backend — no Firebase configuration needed for it.
:::

## What the Guide Covers

- Installing the Firebase CLI
- Creating a new Firebase project
- Registering the Flutter app with Firebase
- Logging in via terminal and running the FlutterFire configuration commands
- Generating and adding **Android SHA-1 / SHA-256** keys (debug, release, and Play App Signing)
- Configuring **iOS URL schemes** and `GoogleService-Info.plist`


## Download Config Files & Place in Project

Even if you used the FlutterFire CLI, you must verify that the Firebase config files are present in the correct locations. If they are missing or you prefer to add them manually, follow the steps below.

### Android — google-services.json

1. Open [Firebase Console](https://console.firebase.google.com/) and select your project.
2. Go to **Project Settings** (gear icon) → **General** tab.
3. Scroll down to **Your apps** → select your Android app.
4. Click **Download google-services.json**.


5. Place the downloaded file at:

   ```
   android/app/google-services.json
   ```

### iOS — GoogleService-Info.plist

1. In the same **Project Settings → General** tab, select your iOS app.
2. Click **Download GoogleService-Info.plist**.
3. Place the downloaded file at:

   ```
   ios/Runner/GoogleService-Info.plist
   ```

:::warning
Both files must be placed at the exact paths above. Incorrect placement will cause Firebase to fail silently at runtime.
:::

---

## Update firebase_options.dart

The FlutterFire CLI auto-generates `lib/firebase_options.dart` when you run `flutterfire configure`. However, if you set up Firebase manually or need to update the values, open the file and fill in the required fields.

**File location:**

```
lib/firebase_options.dart
```

The file contains two platform configurations — one for Android and one for iOS. All values can be found in **Firebase Console → Project Settings → General → Your apps**.

```dart
static const FirebaseOptions android = FirebaseOptions(
  apiKey: 'YOUR_ANDROID_API_KEY',
  appId: 'YOUR_ANDROID_APP_ID',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
);

static const FirebaseOptions ios = FirebaseOptions(
  apiKey: 'YOUR_IOS_API_KEY',
  appId: 'YOUR_IOS_APP_ID',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID',
  iosBundleId: 'YOUR_IOS_BUNDLE_ID',
);
```

| Field | Where to find it |
|-------|-----------------|
| `apiKey` | Project Settings → General →  app-specific key in firebase json file |
| `appId` | Project Settings → General → App specific ID |
| `messagingSenderId` | Project Settings → General → Cloud Messaging Sender ID |
| `projectId` | Project Settings → General → Project ID |
| `storageBucket` | storage_bucket key's value in firebase json file |
| `iosClientId` | Inside `GoogleService-Info.plist` → `CLIENT_ID` field |
| `iosBundleId` | Your app's iOS bundle identifier |

:::warning
Never commit `firebase_options.dart` with real API keys to a public repository. Add it to `.gitignore` or use environment-based configuration.
:::


:::tip
Do not skip the SHA-key steps for Android or the URL scheme steps for iOS — Google Sign-In  and Apple Sign-In will silently fail without them.
:::

