# 开发指南

## 新增页面

1. 在 `src/pages/` 下创建 `.vue` 文件（admin 页面放 `src/pages/admin/`）
2. 在 `src/router/index.js` 添加路由，设置合适的 `meta`（`requiresAuth` / `requiresAdmin`）
3. 如果是需要侧边栏的页面，引入 `AppSidebar` 或 `AdminSidebar` 组件

```vue
<!-- 需要用户侧边栏的页面模板 -->
<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />
    <div class="flex flex-col flex-1 h-full">
      <!-- 页面内容 -->
    </div>
  </div>
</template>
```

## 对接新接口

1. 后端确认接口已部署，schema 地址 `http://localhost:8888/api/v3/api-docs` 可见
2. 运行 `npm run openapi2ts` 重新生成 `src/api/generated/`
3. 在 `src/api/client.js` 中封装调用（参考已有函数）
4. 页面中 `import { api } from '../api/client'` 调用

```js
// client.js 封装示例
import { someNewApi } from './generated/codepilot/someController'

export const api = {
  // ...
  newFeature(params) {
    return someNewApi(params)  // request.ts 自动解包 BaseResponse
  },
}
```

## 样式约定

- **只用 Tailwind class**，不用 `<style scoped>` 或 inline style
- **颜色**: `var(--xxx)` 引用 CSS 变量，禁止硬编码 `#FF5C00` 等
- **间距**: 匹配设计稿精确值，用 `[Npx]` 语法
- **装饰元素**: absolute 定位的纯装饰 div 必须加 `pointer-events-none`，否则会遮挡按钮点击

## 输入框模式

### 独立输入框（Account、Name 等）
```html
<input class="w-full h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)]
  outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]
  transition-colors" />
```

### 带显示/隐藏按钮的密码框
```html
<div class="flex items-center h-[44px] rounded-[8px] border border-[var(--border-subtle)]
  focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)]
  transition-colors overflow-hidden">
  <input :type="show ? 'text' : 'password'"
    class="flex-1 h-full px-[14px] outline-none bg-transparent" />
  <button type="button" @click="show = !show"
    class="flex-shrink-0 h-full px-[10px] flex items-center hover:bg-[var(--surface-secondary)] cursor-pointer">
    <EyeOff v-if="show" :size="18" />
    <Eye v-else :size="18" />
  </button>
</div>
```

## 分页列表模式

```html
<!-- 表格容器 -->
<div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden">
  <!-- 表头 -->
  <div class="flex items-center h-[48px] px-[20px]" style="background:#F0F1F3">
    <div class="w-[200px] font-body text-[13px] font-bold text-[#4A4A4A]">Col</div>
  </div>
  <!-- 数据行 -->
  <div v-for="(row, i) in data" :key="row.id"
    class="flex items-center h-[48px] px-[20px] hover:bg-[var(--surface-secondary)]"
    :style="{ borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }">...</div>
  <!-- 分隔线 -->
  <div class="h-[1px] bg-[var(--border-subtle)] flex-shrink-0"></div>
  <!-- 分页 -->
  <div class="flex items-center justify-between px-[20px] py-[12px]">
    <!-- 左侧：条数信息 + 每页条数选择 -->
    <!-- 右侧：页码按钮 -->
  </div>
</div>
```

## 鉴权模式

```js
import { useAuth } from '../stores/auth'

const auth = useAuth()

// 需要用户信息
const userName = computed(() => auth.user.value?.userName)

// 需要鉴权的操作
function doSomething() {
  if (!auth.isAuthenticated.value) {
    // 跳转登录或弹窗
    return
  }
  // ...
}

// 需要管理员权限
function adminAction() {
  if (!auth.isAdmin.value) return
  // ...
}
```

## 常见坑

| 问题 | 解决 |
|------|------|
| 装饰背景遮挡按钮 | absolute 装饰 div 加 `pointer-events-none` |
| `@mousedown.prevent` 阻止按钮 focus | 改用 `@click`，`type="button"` 已防表单提交 |
| `focus-within:ring-1` 未聚焦也显示线 | 检查是否有其他 CSS 叠加，或去掉 ring 只用 border |
| input 点击区域不够 | `w-full` + 去掉父容器 `px-[14px]`，改由 input 自身 px |
| API 返回中文错误信息 | 直接展示给用户，不做翻译 |

## 重新生成 API

后端接口变更后：
```bash
npm run openapi2ts    # 重新生成 src/api/generated/
```
生成后检查 `client.js` 中新接口是否需要封装。
