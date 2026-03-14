我先深入了解下你的项目现状，然后给出分析。

Explore project architecture thoroughly

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/_layout.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks/use-theme.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/hooks/use-color-scheme.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/index.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/explore.tsx#1-1)，行 1 到 100

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/components/app-tabs.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/components/app-tabs.web.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/app/playground.tsx#1-1)，行 1 到 100

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/constants/theme.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/global.css#1-1)，行 1 到 100

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/tw/animated.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/lib/utils.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/components/ui/collapsible.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/components/animated-icon.tsx#1-1)，行 1 到 100

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/tw/index.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/tw/image.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/lib/storage.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/stores/language.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/i18n/index.ts)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/i18n/locales/en.json)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/package.json)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/src/components/external-link.tsx)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/tsconfig.json)

读取 [](file:///Users/yanyongchao/Documents/dreame/study/expo-test-app/app.json)

已创建记忆文件 [](file:///Users/yanyongchao/Library/Application%20Support/Code/User/workspaceStorage/d429b854b75eb09104fbc892bc6f2eb1/GitHub.copilot-chat/memory-tool/memories/MmU2ZDRkMTEtYzAzNS00YzJjLWIwNjgtNzlhY2EwOGMyZmZj/expo-project-exploration.md)

Analyzing your answers...

了解了，Web3 钱包 + U 卡 + 理财，需要认证和完整网络层。让我整理一下基础架构的缺失分析。

已创建记忆文件 [](file:///Users/yanyongchao/Library/Application%20Support/Code/User/workspaceStorage/d429b854b75eb09104fbc892bc6f2eb1/GitHub.copilot-chat/memory-tool/memories/MmU2ZDRkMTEtYzAzNS00YzJjLWIwNjgtNzlhY2EwOGMyZmZj/plan.md)

## Plan: Web3 钱包应用基础架构补全

你的项目模板层（主题、i18n、NativeWind、Zustand、React Query、MMKV）已经很完整。但面向 **Web3 钱包 + U 卡 + 理财** 业务，以下基础架构尚缺，按 6 大类分析：

---

### 一、导航与页面框架层

1. **自定义 Header 导航栏** — 当前没有统一的页面 Header（标题、返回键、右侧操作区），每个页面需要自己拼
2. **Screen 页面容器** — 缺少统一包装（SafeArea + StatusBar + 键盘避让 + 可选 ScrollView），现在各页面各写各的
3. **路由结构重构** — 现在 3 个 Tab 平铺在 app 下，需改为 `(tabs)/` group 嵌套 Stack，才能 push 详情页；还需 `(auth)/` 路由组
4. **Modal 路由** — 交易确认、PIN 输入等场景需要全局 Modal 路由

### 二、网络与数据层

5. **Axios 实例 + 拦截器** — axios 已装但完全没配置，需要：baseURL、请求 Token 注入、401 自动刷新、统一错误格式化 → `src/lib/api-client.ts`
6. **React Query 全局配置** — QueryClient 用默认配置，需定义 retry / staleTime / gcTime 策略和全局 onError → `src/lib/query-client.ts`
7. **API 层约定** — 缺少 `src/api/` 目录，需建立 queryKey 工厂 + API 函数的组织规范

### 三、认证与安全层

8. **Auth Store** — 无认证状态管理，需要 Zustand store（token / refreshToken / 用户信息 / 登录登出），Token 持久化到 SecureStore（已安装）
9. **Auth Guard 路由守卫** — 未登录时重定向到登录页，Expo Router 里在 layout 判断 + redirect
10. **登录/注册路由** — `src/app/(auth)/` 路由组尚未创建
11. **PIN / 生物识别** — 钱包类应用刚需，expo-secure-store 已装，但还需 `expo-local-authentication`（指纹/面容）和 PIN 输入组件

### 四、基础 UI 组件库

目前 ui 只有一个 `collapsible.tsx`，**严重缺少以下高频组件**：

| #   | 组件                   | 说明                                                        |
| --- | ---------------------- | ----------------------------------------------------------- |
| 12  | **Button**             | 主要/次要/幽灵/危险变体，loading + disabled 状态            |
| 13  | **Input + FormField**  | 集成 react-hook-form Controller + 错误提示 + label          |
| 14  | **Modal / Dialog**     | 确认弹窗、信息对话框                                        |
| 15  | **Toast**              | `burnt` 已装但没封装，需要统一的 success/error/warning 调用 |
| 16  | **Loading / Skeleton** | 全屏 Loading、Spinner、骨架屏（钱包首页加载态）             |
| 17  | **Empty State**        | 无交易记录、无卡片时的空状态                                |
| 18  | **Card**               | 圆角 + 阴影容器，钱包/理财页高频使用                        |
| 19  | **Divider**            | 列表分隔线                                                  |
| 20  | **Badge**              | Tab 角标、交易状态标签                                      |

### 五、钱包业务基础层

21. **金额格式化** — 精度处理（`bignumber.js`）、千分位、法币换算，避免浮点精度问题 → `src/lib/format.ts`
22. **金额输入组件** — 限制小数位、最大值校验、"全部"快捷按钮
23. **网络状态监听** — 钱包对网络敏感，需离线检测 + 全局离线提示条（`@react-native-community/netinfo`）

### 六、质量保障

24. **Error Boundary** — 全局错误边界 + Fallback UI，防止白屏崩溃
25. **环境配置** — 确认 `.env.*` 文件中 API baseURL 等变量已就位

---

### 优先级建议

| 优先级 | 内容 | 说明 |
| --- | --- | --- |
| **P0 先建** | Axios 实例(#5)、Auth Store(#8)、路由重构(#3,#10)、Auth Guard(#9)、Screen(#2)、Header(#1)、Button(#12)、Toast(#15) | **阻塞页面开发**，没这些写不了业务页 |
| **P1 核心** | Input/FormField(#13)、Modal(#14)、Loading/Skeleton(#16)、Card(#18)、金额格式化(#21)、Query 配置(#6)、API 约定(#7)、Error Boundary(#24) | 第一个完整页面写完前需要 |
| **P2 完善** | Empty State(#17)、Badge(#20)、Divider(#19)、金额输入(#22)、网络监听(#23)、PIN/生物识别(#11)、Modal 路由(#4) | 可按需补充 |

---

### 进一步确认

想让我针对哪个优先级（P0/P1/P2）或哪个具体模块出详细的实现方案？比如先做 **P0 的 Axios + Auth + 路由重构**？
