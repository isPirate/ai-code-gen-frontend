<template>
  <aside class="sidebar">
    <div class="logo">
      <Sparkles :size="24" color="var(--accent-primary)" />
      <span class="logo-text">CodePilot</span>
      <span class="badge">Admin</span>
    </div>

    <nav class="nav">
      <router-link
        v-for="item in navItems"
        :key="item.key"
        :to="item.to"
        class="nav-item"
        :class="{ active: activeItem === item.key }"
      >
        <component :is="item.icon" :size="18" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="user-slot">
      <div class="user-card">
        <div class="avatar">A</div>
        <div class="user-info">
          <span class="user-name">Admin</span>
          <span class="user-email">Super Admin</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { LayoutDashboard, Users, Folder, Settings, Sparkles } from 'lucide-vue-next'

defineProps({
  activeItem: { type: String, default: 'dashboard' },
})

const navItems = [
  { key: 'dashboard', label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { key: 'users', label: 'Users', to: '/admin/users', icon: Users },
  { key: 'projects', label: 'Projects', to: '/admin/projects', icon: Folder },
  { key: 'settings', label: 'Settings', to: '/admin/settings', icon: Settings },
]
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background: var(--surface-primary);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 16px;
  flex-shrink: 0;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
}
.logo-text {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 700;
  color: var(--foreground-primary);
}
.badge {
  font-family: var(--font-caption);
  font-size: 10px;
  color: var(--accent-primary);
  background: #FFF5EE;
  border-radius: var(--rounded-full);
  padding: 2px 8px;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 12px;
  border-radius: var(--rounded-lg);
  color: var(--foreground-secondary);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.15s;
}
.nav-item:hover {
  background: var(--surface-secondary);
}
.nav-item.active {
  background: #FFF5EE;
  color: var(--accent-primary);
  font-weight: 500;
}
.nav-item.active :deep(svg) {
  color: var(--accent-primary);
}
.user-slot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}
.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-name {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--foreground-primary);
}
.user-email {
  font-family: var(--font-caption);
  font-size: 11px;
  color: var(--foreground-muted);
}
</style>
