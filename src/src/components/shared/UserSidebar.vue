<template>
  <aside class="sidebar">
    <router-link to="/dashboard" class="logo">
      <Sparkles :size="24" color="var(--accent-primary)" />
      <span class="logo-text">CodePilot</span>
    </router-link>

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
        <div class="avatar">{{ initials }}</div>
        <div class="user-info">
          <span class="user-name">{{ user?.name || 'User' }}</span>
          <span class="user-email">{{ user?.email || 'user@email.com' }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { LayoutDashboard, LayoutGrid, Settings, Sparkles } from 'lucide-vue-next'

const props = defineProps({
  activeItem: { type: String, default: 'dashboard' },
  user: { type: Object, default: () => ({}) },
})

const navItems = [
  { key: 'dashboard', label: 'Projects', to: '/dashboard', icon: LayoutDashboard },
  { key: 'templates', label: 'Templates', to: '/templates', icon: LayoutGrid },
  { key: 'settings', label: 'Settings', to: '/settings', icon: Settings },
]

const initials = computed(() => {
  const name = props.user?.name || 'U'
  return name.charAt(0).toUpperCase()
})
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
  text-decoration: none;
}
.logo-text {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 700;
  color: var(--foreground-primary);
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
  background: var(--accent-secondary);
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
  min-width: 0;
}
.user-name {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--foreground-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-email {
  font-family: var(--font-caption);
  font-size: 11px;
  color: var(--foreground-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
