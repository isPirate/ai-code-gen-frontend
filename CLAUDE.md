# CodePilot - AI 零代码生成平台

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3 (Composition API, `<script setup>`) |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS v4 |
| 路由 | Vue Router 4 (history mode) |
| 图标 | lucide-vue-next |
| 字体 | Newsreader(标题) / Geist(正文) / Funnel Sans(标注) — Google Fonts |
| API 生成 | @umijs/openapi (openapi2ts CLI) |
| HTTP | 原生 fetch (credentials: include, session cookie) |

## 项目结构

```
src/
├── main.js                   # 入口：初始化 auth store → 挂载 app
├── App.vue                   # 根组件 <router-view>
├── style.css                 # Tailwind v4 入口 + CSS 变量 + 字体工具类
├── router/index.js           # 11 条路由 + beforeEach 鉴权守卫
├── api/
│   ├── request.ts            # 统一 request 函数 (BaseResponse 自动解包)
│   ├── client.js             # 业务 API 封装 (调用 generated controller)
│   └── generated/            # @umijs/openapi 自动生成 (勿手动修改)
│       └── codepilot/
│           ├── index.ts
│           ├── userController.ts
│           ├── appController.ts
│           ├── staticResourceController.ts
│           ├── healthController.ts
│           └── typings.d.ts
├── stores/
│   └── auth.js               # 响应式 auth store (useAuth composable)
├── components/
│   ├── Navbar.vue            # Landing 页导航栏
│   ├── AppFooter.vue         # 全局页脚
│   ├── AppSidebar.vue        # 用户端侧边栏 (Projects/Featured/Settings)
│   ├── MarkdownRenderer.vue   # Markdown 渲染 (marked + highlight.js)
│   └── AdminSidebar.vue      # 管理端侧边栏 (含 Admin 徽标)
└── pages/
    ├── LandingPage.vue       # /         Hero + Prompt + Mockup + Steps + CTA
    ├── LoginPage.vue         # /login    左侧品牌 + 右侧登录表单 (userAccount)
    ├── RegisterPage.vue      # /register 左侧品牌+评价 + 右侧注册表单
    ├── DashboardPage.vue     # /dashboard  项目卡片网格 + 新建 + 搜索 + 重命名/删除
    ├── TemplatesPage.vue     # /featured  精选应用展示 (2 列卡片 + 搜索)
    ├── EditorPage.vue        # /editor    AI 聊天面板 + Markdown 渲染 + 可拖拽 + 实时预览
    ├── SettingsPage.vue      # /settings  Profile 表单 + Danger Zone
    └── admin/
        ├── AdminDashboardPage.vue      # /admin          统计卡片 + 图表 + 活动 (mock)
        ├── AdminUsersPage.vue          # /admin/users    用户表格 + 分页 + 新增/删除
        ├── AdminProjectsPage.vue       # /admin/projects 项目表格 + 多字段筛选 + 精选管理
        └── AdminSystemSettingsPage.vue # /admin/settings AI 配置 + 用量限制 (mock)
```

## 设计风格

- **风格**: Illustrated Warm
- **色板**: Tangerine Orbit，主色 `#FF5C00`
- **字体**: Newsreader(标题) / Geist(正文) / Funnel Sans(标注)
- **圆角**: rounded-lg(8px) / rounded-xl(12px) / rounded-full(9999px)
- **CSS 变量**: 定义在 `src/style.css` 的 `:root` 中，代码中统一用 `var(--xxx)` 引用

## 后端接口

### 服务地址
`http://localhost:8888/api`（前端 Vite proxy `/api` → 后端）

### API 生成
接口 schema 地址 `http://localhost:8888/api/v3/api-docs`，通过 `@umijs/openapi` 生成。
```bash
npm run openapi2ts   # 重新生成 src/api/generated/
```
配置文件 `openapi2ts.config.ts`。

### request 规范
所有接口返回 `BaseResponse<T> = { code: number, data: T, message: string }`。
`src/api/request.ts` 自动解包：`code === 0` 返回 `data`，否则 `throw new Error(message)`。
前端代码只拿到解包后的 `data`，不感知 `code`/`message`。

### 已对接接口
| 接口 | 调用位置 |
|------|---------|
| POST /user/login | auth.js login() |
| POST /user/register | auth.js register() |
| POST /user/logout | auth.js logout() |
| GET /user/get/login | auth.js fetchCurrentUser() |
| POST /user/list/page/vo | AdminUsersPage |
| POST /user/add | AdminUsersPage |
| POST /user/update | SettingsPage |
| POST /user/delete | AdminUsersPage / SettingsPage |
| POST /app/add | LandingPage, EditorPage |
| POST /app/update | DashboardPage |
| POST /app/delete | DashboardPage |
| GET /app/get/vo | EditorPage |
| POST /app/my/list/page/vo | DashboardPage |
| POST /app/good/list/page/vo | TemplatesPage(Featured) |
| GET /app/chat/gen/code | EditorPage (SSE EventSource) |
| POST /app/deploy | EditorPage |
| GET /app/download/{appId} | EditorPage (二进制 ZIP 响应，client.js 直接 fetch 解析 Content-Disposition) |
| POST /app/admin/list/page/vo | AdminProjectsPage |
| POST /app/admin/update | AdminProjectsPage |
| POST /app/admin/delete | AdminProjectsPage |

### 未对接接口（待后端开发）
- 统计相关（AdminDashboardPage 使用静态 mock 数据）
- 系统配置相关（AdminSystemSettingsPage 使用静态 mock）

## 认证体系

### 登录流程
1. 用户提交 userAccount + userPassword → POST /user/login
2. 后端设置 session cookie，返回 LoginUserVO
3. auth store 保存 user ref + localStorage 缓存
4. 根据 userRole 跳转 /dashboard 或 /admin

### 注册流程
1. 用户提交 userAccount + userPassword + checkPassword → POST /user/register
2. 注册成功后自动调用 login 获取 user 对象
3. 跳转逻辑同登录

### 会话恢复 (页面刷新)
1. `main.js` 调用 `auth.init()` → `GET /user/get/login`
2. 成功 → 恢复 user 状态；失败 → user 置 null
3. router beforeEach 检查 `auth.isAuthenticated`，未登录重定向 /login

### 登出
`auth.logout()` → POST /user/logout → 清除 user + localStorage

### 权限分级
| 角色 | 路由 |
|------|------|
| 游客 (未登录) | /, /login, /register |
| user | /dashboard, /featured, /editor, /settings |
| admin | 所有 user 路由 + /admin, /admin/users, /admin/projects, /admin/settings |

## 路由设计

| 路径 | 页面 | meta |
|------|------|------|
| / | LandingPage | - |
| /login | LoginPage | - |
| /register | RegisterPage | - |
| /dashboard | DashboardPage | requiresAuth |
| /featured | TemplatesPage | requiresAuth |
| /editor | EditorPage | requiresAuth |
| /settings | SettingsPage | requiresAuth |
| /admin | AdminDashboardPage | requiresAuth + requiresAdmin |
| /admin/users | AdminUsersPage | requiresAuth + requiresAdmin |
| /admin/projects | AdminProjectsPage | requiresAuth + requiresAdmin |
| /admin/settings | AdminSystemSettingsPage | requiresAuth + requiresAdmin |

## 开发命令

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务 (http://localhost:5173)
npm run build      # 生产构建
npm run preview    # 预览构建产物
npm run openapi2ts # 从接口 schema 重新生成 API 代码
```

## 关键约定

- **样式**: 只用 Tailwind class，不用 inline style（背景图 data URI 除外）
- **颜色**: 统一 `var(--xxx)` 引用 CSS 变量，不硬编码色值
- **间距**: 严格匹配设计稿，用 `[Npx]` 精确值
- **密码框结构**: `div.flex.items-center`(容器, focus-within 效果) > `input.flex-1` + `button`(显示/隐藏)
- **装饰元素**: absolute 定位的装饰 div 必须加 `pointer-events-none`
- **API 调用**: 统一通过 `src/api/client.js` 导入，不直接调 generated controller
- **Auth**: 所有需要用户信息的地方通过 `useAuth()` composable，不直接读 localStorage

## 相关文档

| 文档 | 说明 |
|------|------|
| [README.md](./README.md) | 项目入口、快速开始、关键信息速查 |
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | 开发指南：代码模式、常见坑、新增页面/接口步骤 |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | 开发进度：页面/接口/组件的完成状态跟踪 |
| [design.pen](./design.pen) | UI 设计稿 (Pencil 格式) |
