# Project Context

## Purpose
基于 Expo SDK 55 的跨平台移动应用学习/实验项目，目标平台为 iOS、Android 和 Web。用于探索 Expo Router、React Native Reanimated、平台差异化组件等现代 Expo 开发实践。

## Tech Stack
- **运行时：** React 19.2.0、React Native 0.83.2、Expo SDK ~55.0.5
- **路由：** Expo Router ~55.0.4（文件式路由，类型化路由已启用）
- **语言：** TypeScript ~5.9.2（strict 模式）
- **动画：** react-native-reanimated 4.2.1 + react-native-worklets 0.7.2
- **图片：** expo-image ~55.0.6
- **图标：** expo-symbols ~55.0.5（SF Symbols / Material Icons）
- **UI 效果：** expo-glass-effect ~55.0.7
- **导航：** @react-navigation/native ^7.1.28、@react-navigation/bottom-tabs ^7.7.3
- **构建/发布：** EAS Build（eas.json 定义三个 profile）
- **编译优化：** React Compiler（实验性，已在 app.json 中启用）

## Project Conventions

### Code Style
- 文件名使用 **kebab-case**（如 `themed-text.tsx`、`use-color-scheme.ts`）
- 组件名使用 **PascalCase**，hook 名以 `use` 开头
- 使用 `expo lint` 进行代码检查（Expo 内置 ESLint 配置，无单独 .eslintrc）
- 路径别名：`@/*` 映射至 `./src/*`，`@/assets/*` 映射至 `./assets/*`

### Architecture Patterns
- **文件式路由：** 所有页面在 `src/app/`，`_layout.tsx` 为根布局
- **平台差异化：** 同名文件使用 `.web.tsx` / `.web.ts` 后缀覆盖 Web 实现，Native 使用 `.tsx` / `.ts`
  - 示例：`app-tabs.tsx`（Native NativeTabs）vs `app-tabs.web.tsx`（自定义 Web Tabs）
- **主题系统：**
  - `src/constants/theme.ts` 集中定义颜色（亮/暗）、字体族（各平台）、间距（8pt 网格）
  - `src/hooks/use-theme.ts` 消费颜色方案，返回当前主题
  - `ThemedText` / `ThemedView` 封装原生组件并注入主题
- **目录结构：**
  - `src/app/` — 路由页面
  - `src/components/` — 可复用 UI 组件（含 `ui/` 子目录）
  - `src/hooks/` — 自定义 React Hooks
  - `src/constants/` — 常量（主题、颜色等）
- **导航：** Native 使用 `NativeTabs`（expo-router）；Web 使用 `expo-router/ui` 的 `Tabs + TabList + TabTrigger`

### Testing Strategy
项目当前**未配置测试框架**（无 Jest、无 Testing Library），暂无测试要求。如需添加，优先考虑 Jest + React Native Testing Library。

### Git Workflow
- 主分支：`main`
- 提交信息使用英文或中文均可，保持简洁描述变更内容
- 无 pre-commit hook 配置

## Domain Context
这是一个 Expo 学习/实验项目，当前包含两个页面（Home、Explore）和一套完整的主题系统。代码结构参考 Expo 官方 starter template，并进行了路径别名和平台差异化的定制。

## Important Constraints
- **无测试框架：** 不要生成测试文件，除非用户明确要求并先配置好测试环境
- **React Compiler 已启用：** 避免手动写不必要的 `useMemo` / `useCallback`，编译器会自动优化
- **Expo SDK 版本锁定：** 依赖版本与 Expo 55 兼容，升级依赖前需确认 Expo 兼容性
- **严格 TypeScript：** strict 模式开启，所有类型必须明确声明

## External Dependencies
- **EAS Build：** 构建和发布通过 EAS 服务，配置见 `eas.json`
  - `development`：开发客户端，内部分发
  - `preview`：内部分发
  - `production`：应用商店提交，自动递增版本号
- **Expo Go / Dev Client：** 本地开发使用 `npx expo start` 启动，支持 Expo Go 或 Dev Client
