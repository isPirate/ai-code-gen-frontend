<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, LayoutGrid, Settings, Sparkles, Users, Folder } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  admin: { type: Boolean, default: false }
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const items = computed(() => {
  if (props.admin) {
    return [
      { label: 'Overview', icon: LayoutDashboard, to: '/admin' },
      { label: 'User Management', icon: Users, to: '/admin/users' },
      { label: 'Project Management', icon: Folder, to: '/admin/projects' },
      { label: 'System Settings', icon: Settings, to: '/admin/system' }
    ]
  }
  return [
    { label: 'Projects', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Templates', icon: LayoutGrid, to: '/templates' },
    { label: 'Settings', icon: Settings, to: '/settings' }
  ]
})

function isActive(path) {
  return route.path === path
}

function go(path) {
  router.push(path)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo-row">
      <Sparkles :size="24" class="accent-text" />
      <div class="sidebar-logo-text">CodePilot</div>
      <div v-if="admin" class="admin-badge">Admin</div>
    </div>

    <nav class="sidebar-nav">
      <button v-for="item in items" :key="item.to" class="sidebar-nav-item" :class="{ active: isActive(item.to) }" type="button" @click="go(item.to)">
        <component :is="item.icon" :size="18" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar-user-slot">
      <div class="sidebar-user-card">
        <div class="sidebar-avatar" :class="{ admin }"></div>
        <div class="sidebar-user-copy">
          <div class="sidebar-user-name">{{ auth.user?.name || (admin ? 'Admin' : 'User Name') }}</div>
          <div class="sidebar-user-email">{{ admin ? 'Super Admin' : auth.user?.email || 'user@email.com' }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>
