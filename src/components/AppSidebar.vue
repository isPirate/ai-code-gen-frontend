<template>
  <aside class="flex flex-col gap-[24px] w-[240px] h-full bg-[var(--surface-primary)] border-r border-[var(--border-subtle)] p-[20px_16px]">
    <!-- Logo -->
    <div class="flex items-center gap-[10px] px-[8px]">
      <span class="material-symbols-outlined text-[24px] text-[var(--accent-primary)]">sparkles</span>
      <span class="font-heading text-[20px] font-bold text-[var(--foreground-primary)]">CodePilot</span>
    </div>

    <!-- Nav Items -->
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
        <span class="material-symbols-outlined text-[18px]" :class="{ 'text-[var(--accent-primary)]': isActive(item.to) }">{{ item.icon }}</span>
        <span class="font-body text-[14px]">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- User Card -->
    <div class="flex items-center gap-[10px] p-[10px_12px] rounded-[8px] border border-[var(--border-subtle)] w-full">
      <div class="w-[32px] h-[32px] rounded-full bg-[var(--accent-secondary)] flex-shrink-0"></div>
      <div class="flex flex-col gap-[2px] min-w-0">
        <span class="font-body text-[13px] font-medium text-[var(--foreground-primary)] truncate">{{ userName }}</span>
        <span class="font-caption text-[11px] text-[var(--foreground-muted)] truncate">{{ userEmail }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  navItems: { type: Array, required: true },
})

const route = useRoute()

const user = computed(() => JSON.parse(localStorage.getItem('codepilot_user') || '{}'))
const userName = computed(() => user.value.name || 'User')
const userEmail = computed(() => user.value.email || 'user@example.com')

function isActive(path) {
  return route.path === path
}
</script>
