# Wakeupbrah

> **Defeat the Snooze Button.**

## Introduction

**Wakeupbrah** is a mobile application designed to solve sleep inertia. It combines an "unstoppable" alarm system—requiring physical or cognitive tasks to dismiss—with a sleep quality monitoring system based on sensor analysis.

Built with a **Local-First** architecture, prioritizing user privacy and offline performance.

[![React Native](https://img.shields.io/badge/React_Native-v0.73+-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020.svg)](https://expo.dev/)
[![State Management](https://img.shields.io/badge/State-Zustand-orange.svg)](https://github.com/pmndrs/zustand)
[![Database](https://img.shields.io/badge/DB-SQLite-green.svg)](https://www.sqlite.org/index.html)

## ✨ Key Features

### 🛡️ Anti-Snooze System (Core)

The alarm cannot be dismissed until the user completes a verified task:

- **Shake Mode:** Detects vigorous movement using the accelerometer (Vector Magnitude analysis).
- **QR Scan:** Forces the user to get out of bed and scan a barcode in another room (e.g., toothpaste).
- **Math Puzzles:** Cognitive challenges to wake up the brain.
- **Walk:** The user walks a number of steps. Detects when the user moves by walking.
- **Geolocation**: Using the location services, forces the user to move to a specific place on the map.
- **Type**: Type a random phrase.

### 🌙 Sleep Tracking (In Development)

- **Audio Analysis:** Noise and snore detection using FFT (Fast Fourier Transform) and decibel metering.
- **Actigraphy:** Sleep cycle monitoring via movement sensors.

## 🛠 Tech Stack

This project uses a modern React Native stack with **Expo Prebuild** to access native code for background tasks.

- **Core:** React Native / Expo (Managed Workflow with Prebuild).
- **Language:** TypeScript (Strict typing).
- **Database**: SQLite.
- **State Management**: Zustand.
