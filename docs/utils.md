crashlytics ← 崩溃监控，上线必备 analytics ← 数据分析 messaging ←

推送通知你的后端服务器 ↓ 向 FCM 发送推送请求 ↓ FCM（Firebase 通道）↓ iOS APNs / Android FCM ↓ 用户手机收到通知 expo-notifications + Expo Push Service

原理：你的后端 ↓ 调用 Expo Push API ↓ Expo 服务器（帮你转发）↓ iOS APNs / Android FCM ↓ 用户手机

PostHog sentry expo-sharing react-native-view-shot react-native-mobilesdk-module react-native-webview @sentry/react-native
