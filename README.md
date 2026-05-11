# CodePilot

AI 零代码生成平台前端项目。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务 → http://localhost:5173
npm run build      # 生产构建
npm run openapi2ts # 从后端接口 schema 重新生成 API 代码
```

## 前置条件

- Node.js >= 18
- 后端服务运行在 `http://localhost:8888`（Vite 代理 `/api` → 后端）

## 项目文档

| 文档 | 说明 |
|------|------|
| [CLAUDE.md](./CLAUDE.md) | 完整技术文档（技术栈、目录结构、API 对接、认证体系、路由设计） |
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | 开发指南（代码模式、常见坑、新增页面/接口步骤） |
| [docs/PROGRESS.md](./docs/PROGRESS.md) | 开发进度（11 个页面完成状态 + API 对接进度） |
| [design.pen](./design.pen) | UI 设计稿（Pencil 格式，共 11 个页面） |

## 关键信息

| 项目 | 详情 |
|------|------|
| 框架 | Vue 3 + Vite 6 + Tailwind CSS v4 |
| 图标 | lucide-vue-next |
| API 方案 | @umijs/openapi 自动生成 + 原生 fetch |
| 主色 | `#FF5C00` (Tangerine Orbit) |
| 登录方式 | userAccount + userPassword |
| 默认管理员 | 由后端 userRole 字段决定 |
