# 开发进度

> 最后更新：2026-05-17

## 状态说明

- ✅ 已完成 — 设计还原 + 接口对接 + 逻辑完整
- 🟡 部分完成 — 设计还原但接口未对接
- ⬜ 未开始

## 用户端（7 页）

| 页面 | 状态 | UI | 接口 | 备注 |
|------|------|-----|------|------|
| Landing Page | ✅ | ✅ | ✅ | Hero + Prompt + Mockup + Steps + CTA + Footer；未登录弹登录引导；调用addApp创建应用 |
| Login | ✅ | ✅ | ✅ | userAccount + userPassword；管理员跳 /admin |
| Register | ✅ | ✅ | ✅ | userAccount + password + checkPassword；注册后自动登录 |
| Dashboard | ✅ | ✅ | ✅ | 项目卡片网格 + 搜索 + 重命名 + 删除；对接 my/list/page/vo |
| Featured (原Templates) | ✅ | ✅ | ✅ | 精选应用展示(grid 2列) + 搜索 + 查看；对接 good/list/page/vo (priority=99) |
| Editor | ✅ | ✅ | ✅ | AI 聊天 + Markdown 渲染 + 可拖拽面板 + 消息复制 + SSE 流式 + 部署 + iframe 预览 |
| Settings | ✅ | ✅ | ✅ | Profile 表单 + 注销账号；Account 字段只读 |

## 管理端（4 页）

| 页面 | 状态 | UI | 接口 | 备注 |
|------|------|-----|------|------|
| Admin Dashboard | 🟡 | ✅ | ⬜ | 统计卡片 + 图表的静态 mock 数据，缺统计接口 |
| User Management | ✅ | ✅ | ✅ | 分页列表 + 搜索 + 新增弹窗 + 删除确认，全部对接 |
| Project Management | ✅ | ✅ | ✅ | 多列展示(Type/Cover/Priority/Deployed等) + 多字段筛选 + 精选开关 + inline操作按钮 |
| System Settings | 🟡 | ✅ | ⬜ | AI 配置 + 用量限制为本地状态，缺配置接口 |

## 共享组件（5 个）

| 组件 | 状态 | 备注 |
|------|------|------|
| Navbar | ✅ | Landing 页导航，已对接路由 (Featured替代Templates) |
| AppSidebar | ✅ | 用户端侧边栏 (Projects/Featured/Settings)，含登出 |
| AdminSidebar | ✅ | 管理端侧边栏，含 Admin 徽标 + 登出 |
| AppFooter | ✅ | 全局页脚 (Featured替代Templates) |
| MarkdownRenderer | ✅ | marked + highlight.js，代码块语法高亮 + Copy 按钮 |

## 认证系统

| 功能 | 状态 |
|------|------|
| 登录 | ✅ |
| 注册 | ✅ |
| 登出 | ✅ |
| 会话恢复（刷新保持登录） | ✅ |
| 路由守卫（requiresAuth / requiresAdmin） | ✅ |
| localStorage 缓存 + 服务端验证双保险 | ✅ |

## API 对接

### 用户接口
| 接口 | 状态 |
|------|------|
| POST /user/login | ✅ |
| POST /user/register | ✅ |
| POST /user/logout | ✅ |
| GET /user/get/login | ✅ |
| POST /user/list/page/vo | ✅ |
| POST /user/add | ✅ |
| POST /user/update | ✅ |
| POST /user/delete | ✅ |
| GET /user/get | ⬜ 已封装，待使用 |
| GET /user/get/vo | ⬜ 已封装，待使用 |

### 应用接口
| 接口 | 状态 |
|------|------|
| POST /app/add | ✅ |
| POST /app/update | ✅ |
| POST /app/delete | ✅ |
| GET /app/get/vo | ✅ |
| POST /app/my/list/page/vo | ✅ |
| POST /app/good/list/page/vo | ✅ |
| GET /app/chat/gen/code | ✅ SSE EventSource |
| POST /app/deploy | ✅ |
| POST /app/admin/list/page/vo | ✅ |
| POST /app/admin/update | ✅ |
| POST /app/admin/delete | ✅ |
| GET /app/admin/get/vo | ⬜ 已封装，待使用 |

### 待对接后端（需后端开发接口后接入）

| 模块 | 涉及页面 |
|------|---------|
| 统计 | AdminDashboardPage |
| 系统配置 | AdminSystemSettingsPage |
