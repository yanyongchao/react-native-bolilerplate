Explore i18n setup status

搜索正则表达式 `i18n|i18next|localization|locale|react-i18next|expo-localization`，20 个结果

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/app.json)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/index.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/playground.tsx#1-1)，行 1 到 150

搜索正则表达式 `mmkv|MMKV|storage`，20 个结果

搜索匹配 `**/translations/**` 的文件，无匹配项

搜索匹配 `**/locales/**` 的文件，无匹配项

搜索匹配 `**/i18n/**` 的文件，无匹配项

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/package.json#1-1)，行 1 到 80

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/_layout.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/explore.tsx#1-1)，行 1 到 100

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/lib)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/constants)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/playground.tsx#150-150)，行 150 到 250

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/explore.tsx#100-100)，行 100 到 125

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks/use-theme.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/lib/utils.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/constants/theme.ts)

搜索正则表达式 `zustand|create\(|useStore`，8 个结果

搜索匹配 `**/store*` 的文件，无匹配项

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks/use-color-scheme.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks/use-color-scheme.web.ts)

已创建记忆文件 [](file:///Users/yanyongchao/Library/Application%20Support/Code/User/workspaceStorage/d429b854b75eb09104fbc892bc6f2eb1/GitHub.copilot-chat/memory-tool/memories/MDQyN2U4NDItNmJjNi00ZDc0LTkzMDAtZTIxMDAyZDY4NjRj/plan.md)

Using "创建文件"

文件创建工具未启用，我直接把完整计划输出给你，你可以手动保存到 `docs/i18n-plan.md`：

---

# 🌐 中英文切换实施计划

## 现状分析

| 项目                        | 状态                  |
| --------------------------- | --------------------- |
| `i18next` + `react-i18next` | ✅ 已安装，未配置     |
| `expo-localization`         | ✅ 已安装，未使用     |
| `react-native-mmkv`         | ✅ 已安装，无全局实例 |
| `zustand`                   | ✅ 已安装，无 store   |
| 翻译文件                    | ❌ 不存在             |
| 界面文本                    | 硬编码中英文混用      |

---

## 实施步骤

### Step 1：创建全局 MMKV Storage 实例

- [ ] 新建 `src/lib/storage.ts`
- [ ] 导出全局 `storage = createMMKV()` 实例
- [ ] 提供 `getItem` / `setItem` 辅助函数，方便 i18next 和 zustand 使用
- [ ] 更新 playground.tsx 引用全局实例，避免重复创建

### Step 2：创建翻译文件

- [ ] 新建 `src/i18n/locales/zh.ts` — 中文翻译
- [ ] 新建 `src/i18n/locales/en.ts` — 英文翻译
- [ ] 按模块拆分 namespace：`common`（通用）、`home`（首页）、`explore`（探索页）、`playground`（测试页）、`tabs`（Tab 标签）
- [ ] 提取所有现有硬编码文本到翻译文件

### Step 3：初始化 i18next

- [ ] 新建 `src/i18n/index.ts`
- [ ] 配置 i18next：
  - 使用 `expo-localization` 获取设备默认语言
  - 从 MMKV 读取用户手动选择的语言偏好（优先级高于系统语言）
  - 设置 `fallbackLng: 'en'`
  - 设置 `interpolation: { escapeValue: false }`（React 已自带 XSS 防护）
  - 注册 zh / en 资源
- [ ] **不使用** `i18next-http-backend`（翻译直接打包，不远程加载）

### Step 4：创建语言切换 Zustand Store

- [ ] 新建 `src/stores/language.ts`
- [ ] Store 状态：`language: 'zh' | 'en' | 'system'`
- [ ] Store 方法：`setLanguage(lang)` — 切换语言，同步写入 MMKV 持久化 + 调用 `i18next.changeLanguage()`
- [ ] 初始化时从 MMKV 读取已保存的语言偏好

### Step 5：集成到根布局

- [ ] 修改 \_layout.tsx
- [ ] 在顶层导入 `src/i18n/index.ts`（触发 i18next 初始化）
- [ ] **不需要** 额外的 `I18nextProvider`（react-i18next v16 使用全局实例）
- [ ] 确保 i18n 初始化在 SplashScreen 隐藏之前完成

### Step 6：替换硬编码文本

- [ ] index.tsx — `"Hello, Expo Router!"` 等
- [ ] explore.tsx — 所有教程文本
- [ ] playground.tsx — 中文标签（`"原生模块验证页"`、`"功能测试"` 等）
- [ ] app-tabs.tsx — Tab 标签名（`"Home"`、`"Explore"`、`"Playground"`）
- [ ] app-tabs.web.tsx — Web 端 Tab 标签名
- [ ] 使用 `useTranslation()` hook 获取 `t` 函数
- [ ] 格式：`t('home.greeting', { count: i + 1 })`

### Step 7：创建语言切换 UI

- [ ] 在 playground.tsx 或新建设置页中添加语言切换组件
- [ ] 展示当前语言：中文 / English / 跟随系统
- [ ] 切换后立即生效（通过 zustand store → i18next.changeLanguage）
- [ ] 可选：使用底部弹窗（BottomSheet）做语言选择器

### Step 8：TypeScript 类型安全

- [ ] 新建 `src/types/i18next.d.ts`
- [ ] 声明 `react-i18next` 模块的 `CustomTypeOptions`，让 `t()` 函数的 key 有自动补全
- [ ] 以英文翻译文件作为类型来源（`defaultNS` + `resources`）

### Step 9：验证 & 测试

- [ ] 验证：切换到英文 → 所有文本变英文
- [ ] 验证：切换到中文 → 所有文本变中文
- [ ] 验证：选择"跟随系统" → 跟随设备语言设置
- [ ] 验证：杀掉 App 重新打开 → 语言偏好保持
- [ ] 验证：Web 端正常工作
- [ ] 验证：深色模式下文字颜色正常

---

## 文件清单

```
src/
├── i18n/
│   ├── index.ts              # i18next 初始化配置
│   └── locales/
│       ├── zh.ts             # 中文翻译
│       └── en.ts             # 英文翻译
├── lib/
│   └── storage.ts            # 全局 MMKV 实例（新建）
├── stores/
│   └── language.ts           # 语言切换 Zustand store（新建）
├── types/
│   └── i18next.d.ts          # i18next TypeScript 类型声明（新建）
└── app/
    ├── _layout.tsx           # 修改：导入 i18n 初始化
    ├── index.tsx             # 修改：替换硬编码文本
    ├── explore.tsx           # 修改：替换硬编码文本
    └── playground.tsx        # 修改：替换硬编码 + 添加语言切换 UI
```

## 注意事项

- 翻译 key 统一用英文小写 + 点号分隔：`common.confirm`、`home.greeting`
- 不要在翻译文件中嵌套超过 2 层
- 变量插值用 `{{variable}}` 格式
- 复数形式用 i18next 内置的 `_one` / `_other` 后缀

---

文件创建工具当前不可用，请手动将以上内容保存到 `docs/i18n-plan.md`。后续实施时告诉我执行哪个 Step，我逐步帮你完成。
