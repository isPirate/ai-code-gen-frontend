<template>
  <aside class="flex flex-col gap-[24px] w-[240px] h-full bg-[var(--surface-primary)] border-r border-[var(--border-subtle)] p-[20px_16px]">
    <div class="flex items-center gap-[10px] px-[8px]">
      <Sparkles :size="24" class="text-[var(--accent-primary)]" />
      <span class="font-heading text-[20px] font-bold text-[var(--foreground-primary)]">CodePilot</span>
      <span class="px-[8px] py-[2px] rounded-full bg-[#FFF5EE] font-caption text-[10px] text-[var(--accent-primary)]">Admin</span>
    </div>

    <nav class="flex flex-col gap-[4px] w-full">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-[10px] h-[40px] px-[12px] rounded-[8px] w-full transition-colors',
          isActive(item.to)
            ? 'bg-[#FFF5EE] text-[var(--accent-primary)] font-medium'
            : 'text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]'
        ]"
      >
        <component :is="item.icon" :size="18" />
        <span class="font-body text-[14px]">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="flex-1"></div>

    <!-- Logout -->
    <button @click="handleLogout" class="flex items-center gap-[10px] h-[40px] px-[12px] rounded-[8px] w-full text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
      <LogOut :size="18" />
      <span class="font-body text-[14px]">Log out</span>
    </button>

    <div class="flex items-center gap-[10px] p-[10px_12px] rounded-[8px] border border-[var(--border-subtle)] w-full">
      <div class="w-[32px] h-[32px] rounded-full bg-[var(--accent-primary)] flex-shrink-0"></div>
      <div class="flex flex-col gap-[2px] min-w-0">
        <span class="font-body text-[13px] font-medium text-[var(--foreground-primary)] truncate">Admin</span>
        <span class="font-caption text-[11px] text-[var(--foreground-muted)] truncate">Super Admin</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { Sparkles, LogOut } from 'lucide-vue-next'
import { mockApi } from '../api/mock.js'

defineProps({
  navItems: { type: Array, required: true },
})

const route = useRoute()
const router = useRouter()

function isActive(path) {
  return route.path === path
}

async function handleLogout() {
  await mockApi.logout()
  router.push('/')
}
</script>
