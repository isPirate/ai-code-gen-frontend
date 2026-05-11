# 开发进度

> 最后更新：2026-05-11

## 状态说明

- ✅ 已完成 — 设计还原 + 接口对接 + 逻辑完整
- 🟡 部分完成 — 设计还原但接口未对接
- ⬜ 未开始

## 用户端（7 页）

| 页面 | 状态 | UI | 接口 | 备注 |
|------|------|-----|------|------|
| Landing Page | ✅ | ✅ | N/A | Hero + Prompt + Mockup + Steps + CTA + Footer；未登录点 Generate 弹登录引导 |
| Login | ✅ | ✅ | ✅ | userAccount + userPassword；管理员跳 /admin |
| Register | ✅ | ✅ | ✅ | userAccount + password + checkPassword；注册后自动登录 |
| Dashboard | 🟡 | ✅ | ⬜ | 项目卡片为静态 mock 数据，Create 弹窗本地模拟，缺项目 CRUD 接口 |
| Templates | 🟡 | ✅ | ⬜ | 模板卡片为静态 mock 数据，缺模板接口 |
| Editor | 🟡 | ✅ | ⬜ | AI 对话为本地模拟回复，缺 AI 生成接口 |
| Settings | ✅ | ✅ | ✅ | Profile 表单 + 注销账号；Account 字段只读 |

## 管理端（4 页）

| 页面 | 状态 | UI | 接口 | 备注 |
|------|------|-----|------|------|
| Admin Dashboard | 🟡 | ✅ | ⬜ | 统计卡片 + 图表的静态 mock 数据，缺统计接口 |
| User Management | ✅ | ✅ | ✅ | 分页列表 + 搜索 + 新增弹窗 + 删除确认，全部对接 |
| Project Management | 🟡 | ✅ | ⬜ | 表格为静态 mock 数据，缺项目接口 |
| System Settings | 🟡 | ✅ | ⬜ | AI 配置 + 用量限制为本地状态，缺配置接口 |

## 共享组件（4 个）

| 组件 | 状态 | 备注 |
|------|------|------|
| Navbar | ✅ | Landing 页导航，已对接路由 |
| AppSidebar | ✅ | 用户端侧边栏，含登出 |
| AdminSidebar | ✅ | 管理端侧边栏，含 Admin 徽标 + 登出 |
| AppFooter | ✅ | 全局页脚 |

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
| GET /health/ | ⬜ 已生成，未封装 |

## 待对接后端（需后端开发接口后接入）

| 模块 | 涉及页面 |
|------|---------|
| 项目 CRUD | DashboardPage、AdminProjectsPage |
| 统计 | AdminDashboardPage |
| 模板 | TemplatesPage |
| AI 生成 | EditorPage |
| 系统配置 | AdminSystemSettingsPage |
