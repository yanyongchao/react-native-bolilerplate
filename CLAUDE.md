<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 语言偏好

**始终使用中文回复用户。**

## 常用命令

```bash
# 开发
npx expo start          # 启动开发服务器（加 --ios、--android 或 --web 指定平台）
npx expo run:ios        # 构建并在 iOS 模拟器运行
npx expo run:android    # 构建并在 Android 模拟器运行

# package.json 快捷命令
npm start               # expo start
npm run ios             # expo run:ios
npm run android         # expo run:android
npm run web             # expo start --web

# 代码质量
npm run lint            # expo lint（使用 Expo 内置 ESLint 配置）

# 工具
npm run reset-project   # 将示例代码移至 /example 目录，重置为空白应用
```

本项目未配置测试框架。

## 架构说明

### 路由
使用 Expo Router 文件式路由，所有路由位于 `src/app/`。根布局 `_layout.tsx` 设置 Tab 导航。已启用类型化路由（`app.json` 中 `experiments.typedRoutes: true`）。

### 平台差异化代码
遵循 Expo resolver 约定：
- `*.web.tsx` / `*.web.ts` — Web 平台使用
- `*.tsx` / `*.ts` — Native（iOS/Android）使用

示例：`app-tabs.tsx`（原生 NativeTabs）vs `app-tabs.web.tsx`（自定义 Web tabs）；`animated-icon.tsx` vs `animated-icon.web.tsx`。

### 路径别名
在 `tsconfig.json` 中配置：
- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

### 主题系统
- `src/constants/theme.ts` — 集中定义颜色（亮/暗）、字体（各平台字体族）、间距（8pt 网格）及底部 Tab 内边距偏移
- `src/hooks/use-theme.ts` — 根据 `useColorScheme` 返回当前主题颜色
- `src/global.css` — CSS 变量（`--foreground`、`--background` 等）+ Tailwind token 注册（`@theme inline`），支持 dark mode 自适应

### 动画
使用 `react-native-reanimated`（v4）和 `react-native-worklets`。`src/components/animated-icon.tsx` 中的启动遮罩和图标入场动画基于 Keyframe + 弹性缓动实现。

### 导航
- **Native：** 使用 `expo-router` 的 `NativeTabs`，直接渲染原生 Tab 栏
- **Web：** `app-tabs.web.tsx` 中使用 `expo-router/ui` 的 `Tabs` + `TabList` + `TabTrigger` 实现自定义 Tab 栏

### 样式系统（NativeWind + Tailwind v4）
`src/tw/` 目录提供 Tailwind CSS 跨平台组件包装：
- `src/tw/index.tsx` — `View`、`Text`、`ScrollView`、`Pressable`、`TextInput` 等，通过 `useCssElement()` 将 `className` 转为 RN `style`
- `src/tw/animated.tsx` — Reanimated 集成的动画组件包装
- `src/tw/image.tsx` — `expo-image` 包装
- `src/lib/utils.ts` — `cn()` 工具函数（Tailwind 类名合并）

SVG 支持通过 metro.config.js 中的 `react-native-svg-transformer` 实现，可直接 `import Icon from '@/assets/svg-icon/account.svg'` 作为组件使用。

### 主要依赖版本
- Expo SDK `~55.0.5`，React Native `0.83.2`，React `19.2.0`
- `expo-router ~55.0.4` — 文件式路由
- `react-native-reanimated 4.2.1` — 动画
- `nativewind 5.0.0-preview.2` + `react-native-css 3.0.4` — Tailwind CSS 跨平台样式
- `expo-image ~55.0.6` — 优化图片加载
- `expo-symbols ~55.0.5` — SF Symbols（iOS）/ Material icons（Android）
- `expo-glass-effect ~55.0.7` — 玻璃态 UI 效果
- `zustand ^5.0.11` — 状态管理
- `@tanstack/react-query ^5.90.21` + `axios ^1.13.6` — 数据获取
- `react-hook-form ^7.71.2` + `zod ^4.3.6` — 表单与校验
- `i18next 25.8.17` + `react-i18next 16.5.6` — 国际化
- `react-native-mmkv ^4.2.0` — 高性能本地存储
- 已启用 React Compiler（实验性优化，避免手写 `useMemo`/`useCallback`）

### 环境变量
项目使用三套环境文件：`.env.development`、`.env.preview`、`.env.production`，类型定义在 `src/types/env.d.ts`。

### EAS 构建配置
定义于 `eas.json`：
- `development` — 开发客户端构建，内部分发
- `preview` — 内部分发
- `production` — 应用商店提交，自动递增版本号
