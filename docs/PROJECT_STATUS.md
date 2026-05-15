# CodePilot 项目状态速查

> 分支: `dsv4pro/ui-impl` | 提交: `c2d12fd` | 日期: 2026-05-15

---

## 1. 快速启动

```bash
cd dsv4-ui
npm install
npm run dev        # http://localhost:5173
npm run openapi2ts # 从后端 schema 重新生成 API
```

- 前端: `http://localhost:5173`
- 后端: `http://localhost:8888/api`
- 测试账号: `test` / `12345678`

---

## 2. 技术栈

Vue 3 (Composition API) + Vite 6 + Tailwind CSS v4 + Vue Router 4 + lucide-vue-next
API: @umijs/openapi 生成 → `src/api/generated/codepilot/`
HTTP: 原生 fetch (credentials: include, session cookie)

---

## 3. 架构要点

### API 层
```
src/api/request.ts        → 统一 request() 函数, 自动解包 BaseResponse<T> (code===0→返回data)
src/api/generated/codepilot/
  ├── appController.ts     → 12 个 app 接口
  ├── userController.ts    → 10 个用户接口
  ├── staticResourceController.ts → 静态资源服务
  ├── healthController.ts
  ├── index.ts
  └── typings.d.ts         → 所有 TS 类型 (namespace API)
src/api/client.js          → 业务 API 封装 + SSE 流式函数
```

### 认证 (session cookie)
```
src/stores/auth.js → useAuth() 导出: user, isAuthenticated, isAdmin, login(), logout(), init()
src/main.js        → 调用 auth.init() 恢复会话
src/router/index.js → beforeEach 守卫检查 requiresAuth / requiresAdmin
```

### 路由
| 路径 | 页面 | 权限 |
|------|------|------|
| / | LandingPage | 公开 |
| /login | LoginPage | 公开 |
| /register | RegisterPage | 公开 |
| /dashboard | DashboardPage | requiresAuth |
| /templates | TemplatesPage (精选应用) | requiresAuth |
| /editor | EditorPage | requiresAuth |
| /settings | SettingsPage | requiresAuth |
| /admin | AdminDashboardPage | requiresAdmin |
| /admin/users | AdminUsersPage | requiresAdmin |
| /admin/projects | AdminProjectsPage | requiresAdmin |
| /admin/settings | AdminSystemSettingsPage | requiresAdmin |

---

## 4. 已对接 VS 未对接

### 已对接

| 接口 | 使用位置 |
|------|---------|
| `POST /user/login` | auth.js |
| `POST /user/register` | auth.js |
| `POST /user/logout` | auth.js |
| `GET /user/get/login` | auth.js |
| `POST /user/list/page/vo` | AdminUsersPage |
| `POST /user/add` | AdminUsersPage |
| `POST /user/update` | SettingsPage |
| `POST /user/delete` | AdminUsersPage, SettingsPage |
| `GET /user/get` | client.js (封装, 未使用) |
| `GET /user/get/vo` | client.js (封装, 未使用) |
| `POST /app/add` | LandingPage, EditorPage |
| `POST /app/update` | DashboardPage |
| `POST /app/delete` | DashboardPage |
| `GET /app/get/vo` | EditorPage |
| `POST /app/my/list/page/vo` | DashboardPage |
| `POST /app/good/list/page/vo` | TemplatesPage |
| `GET /app/chat/gen/code` | EditorPage (SSE) |
| `POST /app/deploy` | EditorPage |
| `POST /app/admin/list/page/vo` | AdminProjectsPage |
| `POST /app/admin/update` | AdminProjectsPage |
| `POST /app/admin/delete` | AdminProjectsPage |
| `GET /health/` | client.js (封装, 未使用) |
| `GET /api/static/{deployKey}/**` | 预览 iframe |

### 未对接

| 接口 | 说明 |
|------|------|
| `GET /app/admin/get/vo` | 已封装但未使用, 管理端直接跳Editor用用户接口 |

### 未对接的业务模块
- AdminDashboardPage 的统计数据 (当前 mock)
- AdminSystemSettingsPage 的 AI 配置 (当前 mock)

---

## 5. 核心流程

### 流程 1: 首页创建应用
用户输入提示词 → `addApp({ initPrompt })` → 得到 appId → 跳转 `/editor?appId={id}`

### 流程 2: Dashboard 新建项目
点击"新建项目" → 跳转 `/editor`(无appId) → 输入第一句话 → Editor调用`addApp` → SSE对话

### 流程 3: AI 对话生成代码
进入Editor → 获取app信息 → 自动发送initPrompt → SSE流式输出 → 完成后iframe预览

### 流程 4: 部署
点击 Deploy → `deployApp({ appId })` → 弹窗+工具栏URL

### 流程 5: 会话恢复
`main.js` → `auth.init()` → `GET /user/get/login` → 恢复user / 失败置null → router守卫生效

---

## 6. 关键代码速查

| 功能 | 文件:行号 |
|------|----------|
| SSE 流式函数 | `src/api/client.js:77` |
| request 自动解包 | `src/api/request.ts:40` |
| Editor 发送消息 | `src/pages/EditorPage.vue:268` |
| Editor 智能滚动 | `src/pages/EditorPage.vue:220` |
| Editor 部署 | `src/pages/EditorPage.vue:325` |
| Dashboard 数据加载 | `src/pages/DashboardPage.vue:175` |
| Admin 分页加载 | `src/pages/admin/AdminProjectsPage.vue:245` |
| Auth store | `src/stores/auth.js` |
| 路由守卫 | `src/router/index.js:75` |
| Navbar 登录状态 | `src/components/Navbar.vue` |

---

## 7. 数据格式要点

### BaseResponse 自动解包
```typescript
{ code: number, data: T, message: string }
// request.ts: code===0 → return data, 否则 throw Error(message)
// 前端拿到的就是 data, 不感知 code/message
```

### AppVO 核心字段
```typescript
AppVO = { id, appName, cover, initPrompt, codeGenType, deployKey, deployedTime, priority, userId, createTime, updateTime, user?: UserVO }
```

### 预览 URL 格式
`/api/static/{codeGenType}_{appId}/`

### 部署 URL
部署后存储于 sessionStorage: `deploy_url_{appId}`

### Long 类型
后端返回时转为 String 避免 JS 精度丢失。**前端不要用 Number() 转换 appId**，直接当字符串传递。

---

## 8. SSE 关键细节

### 后端格式(Spring ServerSentEvent)
```
data:{"d":"content chunk"}
event:done
data:
```

### 前端实现(client.js)
使用原生 `fetch` + `response.body.getReader()` 手动解析。
**已尝试 EventSource 但因自动重连导致后端 `java.io.IOException: closed` 而放弃。**

### 消息格式匹配
后端 `data:` 后无空格: `data:{"d":"..."}`。解析代码用 `.trim()` 兼容两种格式。

---

## 9. 设计约束

- 样式: 只用 Tailwind class + `var(--xxx)` CSS 变量, 不硬编码色值
- 主色: `#FF5C00` (Tangerine Orbit)
- 图标: lucide-vue-next
- 密码框: div.flex > input + button(显示/隐藏)
- 装饰元素: absolute 定位加 `pointer-events-none`
- API 调用: 统一通过 `src/api/client.js`, 不直接调 generated controller

---

## 10. 已知待处理问题

1. 首页 prompt 为空时应给出提示
2. 管理端统计页 (AdminDashboardPage) 仍用 mock 数据
3. 管理端系统设置页 (AdminSystemSettingsPage) 仍用 mock
4. `getAppVOByIdByAdmin` 已封装但未使用
5. 编辑器历史消息在刷新后丢失
