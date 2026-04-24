# CodePilot - AI 零代码生成平台

## 项目概述

AI 驱动的零代码生成平台，用户通过自然语言描述需求，AI 自动生成可部署的 Web 应用。

## 核心功能

- AI 对话式生成：描述需求 → 实时预览 → 迭代修改
- 一键部署，导出完整代码
- 模板市场，快速启动
- 管理后台（用户/项目/系统配置）

## 设计文档

UI 设计稿位于 `design.pen`，采用 Pencil 格式，共 11 个页面：

### 用户端（7 页）

| 页面 | 说明 |
|------|------|
| Landing Page | Hero + 大型 Prompt 输入框 + 产品 Mockup + How it works(3步) + CTA + Footer |
| Login | 左侧品牌展示 + 右侧登录表单（邮箱密码 + OAuth） |
| Register | 左侧品牌 + 用户评价 + 右侧注册表单 |
| Dashboard | 项目卡片网格 + 快速创建 + 侧边栏导航 |
| Templates | 模板分类标签 + 6 个模板卡片（2x3） |
| Editor | 左侧 AI 聊天面板 + 右侧实时预览/代码/文件树 |
| Settings | 个人信息 + 头像 + Bio + Danger Zone |

### 管理端（4 页）

| 页面 | 说明 |
|------|------|
| Admin Dashboard | 统计卡片 + 用户增长图表 + 最近活动 |
| User Management | 用户表格 + 搜索筛选 + 分页 |
| Project Management | 项目表格 + 搜索 + 分页 |
| System Settings | AI 模型配置 + 用量额度限制 |

## 设计风格

- **风格**: Illustrated Warm
- **色板**: Tangerine Orbit（主色 `#FF5C00`）
- **字体**: Newsreader(标题) / Geist(正文) / Funnel Sans(标注)

## 角色权限

- **游客**: Landing、登录/注册
- **普通用户**: Dashboard、Templates、Editor、Settings
- **管理员**: 所有管理端页面 + 普通用户权限
