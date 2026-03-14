# Copilot Instructions

本项目是一个 Expo SDK 55 + React Native 0.83 跨平台应用（iOS / Android / Web），**始终使用中文回复用户**。

## 快速参考

```bash
# 开发
npx expo start --dev-client   # 启动开发服务器
npx expo start --ios           # iOS 模拟器
npx expo start --android       # Android 模拟器
npx expo start --web           # Web

# 代码质量
npm run lint                   # expo lint（ESLint）

# 构建
eas build --profile development  # 开发客户端
eas build --profile preview      # 内部分发
eas build --profile production   # 商店提交
```

本项目未配置测试框架。

## 技术栈

| 领域   | 技术                                                                             |
| ------ | -------------------------------------------------------------------------------- |
| 框架   | Expo SDK ~55, React Native 0.83, React 19                                        |
| 路由   | `expo-router` 文件式路由（`src/app/`），已启用 `typedRoutes`                     |
| 样式   | NativeWind 5 + Tailwind CSS v4（`src/tw/` 包装层），CSS 变量（`src/global.css`） |
| 动画   | `react-native-reanimated` v4 + `react-native-worklets`                           |
| 状态   | Zustand 5（持久化用 MMKV）                                                       |
| 数据   | React Query 5 + Axios                                                            |
| 表单   | react-hook-form + Zod v4                                                         |
| 国际化 | i18next + react-i18next，JSON 资源（`src/i18n/locales/{locale}.json`）           |
| 存储   | `react-native-mmkv`（高性能本地存储）                                            |
| 编译   | React Compiler 已启用——**不要**手写 `useMemo` / `useCallback`                    |

## 项目结构

```
src/
├── app/                 # Expo Router 路由（文件即路由）
│   ├── _layout.tsx      # 根布局：i18n 初始化、React Query、SafeArea、SplashScreen
│   ├── index.tsx        # Home Tab
│   ├── explore.tsx      # Explore Tab
│   └── playground.tsx   # Playground Tab
├── components/          # 共享组件
│   ├── ui/              # 基础 UI 组件（Collapsible 等）
│   ├── app-tabs.tsx     # Native Tab 导航
│   └── app-tabs.web.tsx # Web Tab 导航
├── tw/                  # NativeWind 跨平台组件包装
│   ├── index.tsx        # View, Text, Pressable, ScrollView, TextInput
│   ├── animated.tsx     # Reanimated 动画组件
│   └── image.tsx        # expo-image 包装
├── constants/theme.ts   # 颜色（亮/暗）、字体、间距（8pt 网格）
├── hooks/               # 自定义 Hooks（useTheme, useColorScheme）
├── stores/              # Zustand stores
├── i18n/                # 国际化配置 & 翻译文件
├── lib/                 # 工具函数（storage, utils/cn()）
└── types/               # TypeScript 类型声明
```

## 编码约定

### 路径别名

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

### 平台差异化

- `*.web.tsx` / `*.web.ts` — Web 平台
- `*.tsx` / `*.ts` — Native（iOS/Android）
- Metro resolver 自动选择正确的文件

### 样式

- 优先使用 Tailwind className（通过 `src/tw/` 组件）
- 使用 `cn()` 合并类名（`@/lib/utils`）
- CSS 变量引用：`var(--foreground)` 等
- 平台特定值用 `Platform.select()`
- 间距遵循 8pt 网格（`src/constants/theme.ts` 中的 Spacing）

### 组件模式

```tsx
import { View, Text } from '@/tw';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <View className={cn('p-4 bg-surface', className)}>
      <Text className="text-foreground font-medium">{title}</Text>
    </View>
  );
}
```

### 状态管理

- **UI 局部状态** → `useState`
- **全局共享状态** → Zustand store（`src/stores/`），持久化用 MMKV
- **服务端/异步数据** → React Query

### 国际化

- 所有面向用户的文本必须使用 `t()` 函数
- 翻译资源在 `src/i18n/locales/en.json` 和 `zh.json`
- 使用嵌套 key（如 `common.save`、`home.title`）

### SVG 图标

- SVG 文件放 `assets/svg-icon/`
- 通过 `react-native-svg-transformer` 直接作为组件导入：
  ```tsx
  import AccountIcon from '@/assets/svg-icon/account.svg';
  ```

## 格式化

- printWidth: 110，singleQuote: true，tabWidth: 2（Prettier）
- 缩进: 2 空格，行尾: LF，编码: UTF-8

## 注意事项

- React Compiler 已启用，不要添加 `useMemo`、`useCallback`、`React.memo`
- `expo-env.d.ts` 和 `nativewind-env.d.ts` 是自动生成文件，**不要手动编辑**
- 环境变量使用 `EXPO_PUBLIC_` 前缀，类型定义在 `src/types/env.d.ts`
- 新增翻译 key 时需同时更新 `en.json` 和 `zh.json`
