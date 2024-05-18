---
title: AstroPaperでブログをリニューアル - v0.0.1
author: uuta
pubDatetime: 2023-11-01T00:11:06.130Z
postSlug: new-blog
featured: true
draft: true
tags:
  - dev
description: WordPressの重さにさよなら、AstroPaper + NeoVim + Netlifyで快適新生活
---

## Install Flutter SDK

I installed Flutter SDK via Brew.

```sh
$ brew install flutter
$ flutter --version
Flutter 3.13.9 • channel stable • https://github.com/flutter/flutter.git
Framework • revision d211f42860 (11 days ago) • 2023-10-25 13:42:25 -0700
Engine • revision 0545f8705d
Tools • Dart 3.1.5 • DevTools 2.25.0
```

```sh
❯ dart --version
Dart SDK version: 3.1.5 (stable) (Tue Oct 24 04:57:17 2023 +0000) on "macos_arm64"
```

```sh
❯ flutter doctor
Found an existing Dart Analysis Server cache at /Users/yutaaoki/.dartServer.
It can be reset by deleting /Users/yutaaoki/.dartServer.
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.13.9, on macOS 13.4 22F66 darwin-arm64, locale en-JP)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.dev/docs/get-started/install/macos#android-setup for detailed instructions).
      If the Android SDK has been installed to a custom location, please use
      `flutter config --android-sdk` to update to that location.

[✓] Xcode - develop for iOS and macOS (Xcode 14.3)
[✓] Chrome - develop for the web
[!] Android Studio (not installed)
[✓] VS Code (version 1.83.1)
[✓] Connected device (2 available)
[✓] Network resources
```

Installed Android Studio.

```sh
$ brew install --cask android-studio
```
