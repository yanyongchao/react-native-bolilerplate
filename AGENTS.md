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

# AGENTS.md — AI Agent 工作指南

**始终使用中文回复用户。**

## 项目概述

Expo SDK 55 + React Native 0.83 跨平台应用（iOS / Android / Web）。使用文件式路由（Expo Router）、NativeWind 5 + Tailwind CSS v4 样式系统、Zustand 状态管理、React Query 数据获取、i18next 国际化。

## 常用命令

```bash
npx expo start --dev-client   # 开发服务器
npx expo start --ios           # iOS
npx expo start --android       # Android
npx expo start --web            # Web
npm run lint                   # ESLint 检查
```

无测试框架。

## 关键目录

| 目录                     | 职责                                                  |
| ------------------------ | ----------------------------------------------------- |
| `src/app/`               | Expo Router 路由（文件即路由），根布局 `_layout.tsx`  |
| `src/components/`        | 共享组件，`ui/` 子目录放基础 UI                       |
| `src/tw/`                | NativeWind 跨平台组件包装（View, Text, Pressable 等） |
| `src/constants/theme.ts` | 颜色、字体、间距（8pt 网格）                          |
| `src/hooks/`             | 自定义 Hooks                                          |
| `src/stores/`            | Zustand stores（持久化用 MMKV）                       |
| `src/i18n/`              | i18next 配置，`locales/{locale}.json`                 |
| `src/lib/`               | 工具函数（`storage.ts`, `utils.ts`/`cn()`）           |
| `src/types/`             | TypeScript 类型声明                                   |
| `assets/svg-icon/`       | SVG 图标（通过 transformer 直接作为组件导入）         |

## 编码规则

1. **路径别名**：`@/*` → `./src/*`，`@/assets/*` → `./assets/*`
2. **平台差异化**：`*.web.tsx` 用于 Web，`*.tsx` 用于 Native，Metro 自动选择
3. **样式优先 Tailwind**：使用 `src/tw/` 导出的组件 + `className`，用 `cn()` 合并类名
4. **React Compiler 已启用**：**不要**添加 `useMemo`、`useCallback`、`React.memo`
5. **国际化**：所有用户可见文本用 `t()` 函数，新增 key 需同时更新 `en.json` 和 `zh.json`
6. **状态管理**：局部 `useState` → 全局 Zustand → 异步 React Query
7. **自动生成文件勿编辑**：`expo-env.d.ts`、`nativewind-env.d.ts`
8. **环境变量**：`EXPO_PUBLIC_` 前缀，类型在 `src/types/env.d.ts`
9. **格式化**：printWidth 110，singleQuote，tabWidth 2，LF 行尾

## 组件模板

```tsx
import { View, Text } from '@/tw';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: Props) {
  return (
    <View className={cn('p-4 bg-surface', className)}>
      <Text className="text-foreground font-medium">{title}</Text>
    </View>
  );
}
```

## 注意事项

- Tab 导航在 Native 和 Web 有不同实现（`app-tabs.tsx` vs `app-tabs.web.tsx`）
- 主题系统通过 CSS 变量 + `useTheme` hook 驱动亮/暗模式切换
- SVG 图标：`import Icon from '@/assets/svg-icon/name.svg'` 直接使用
- MMKV 用于本地持久化存储（`src/lib/storage.ts`）
- 底部 Sheet 使用 `@gorhom/bottom-sheet`，高性能列表使用 `@shopify/flash-list`
