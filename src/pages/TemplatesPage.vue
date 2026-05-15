<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px]">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">Templates</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[220px]">
            <Search :size="16" class="text-[var(--foreground-muted)]" />
            <input v-model="search" placeholder="Search templates..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-[20px] lg:p-[32px]">
        <div class="flex flex-col gap-[20px] lg:gap-[24px] w-full">
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-[6px] lg:gap-[8px]">
            <button
              v-for="cat in categories"
              :key="cat.value"
              @click="activeCat = cat.value"
              :class="[
                'px-[16px] py-[8px] rounded-[8px] font-body text-[13px] transition-colors',
                activeCat === cat.value
                  ? 'bg-[var(--accent-primary)] text-white font-medium'
                  : 'text-[var(--foreground-secondary)] hover:bg-white hover:text-[var(--foreground-primary)]'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Template Grid -->
          <div class="flex flex-col gap-[20px] w-full">
            <div v-for="(row, ri) in templateRows" :key="ri" class="flex flex-col md:flex-row gap-[16px] lg:gap-[20px] w-full">
              <div
                v-for="tpl in row"
                :key="tpl.id"
                class="flex flex-col flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_2px_8px_#00000006] hover:shadow-[0_4px_16px_#0000000A] transition-shadow cursor-pointer"
              >
                <div class="flex items-center justify-center h-[140px]" :style="{ background: tpl.gradient }">
                  <component :is="tpl.iconComp" :size="40" class="text-white/40" />
                </div>
                <div class="flex flex-col gap-[6px] p-[16px_20px]">
                  <div class="flex items-center justify-between">
                    <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">{{ tpl.name }}</h3>
                    <div class="flex items-center gap-[4px]">
                      <Star :size="14" class="text-[var(--accent-secondary)]" fill="currentColor" />
                      <span class="font-caption text-[12px] text-[var(--foreground-muted)]">{{ tpl.rating }}</span>
                    </div>
                  </div>
                  <p class="font-body text-[13px] text-[var(--foreground-secondary)]">{{ tpl.description }}</p>
                  <div class="flex items-center justify-between mt-[4px]">
                    <span class="font-caption text-[11px] text-[var(--foreground-muted)]">{{ tpl.users.toLocaleString() }} users</span>
                    <button @click="useTemplate(tpl)" class="px-[12px] py-[6px] rounded-[6px] bg-[var(--accent-primary)] font-body text-[12px] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
              <!-- Empty placeholder to maintain layout -->
              <div v-if="row.length === 1" class="flex-1"></div>
            </div>
          </div>

          <p v-if="filteredTemplates.length === 0" class="text-center font-body text-[14px] text-[var(--foreground-muted)] py-[40px]">
            No templates found.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '../components/AppSidebar.vue'
import { MonitorDot, Store, Palette, Search, Star } from 'lucide-vue-next'

const router = useRouter()

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: MonitorDot },
  { to: '/templates', label: 'Templates', icon: Store },
  { to: '/settings', label: 'Settings', icon: Palette },
]

const search = ref('')
const activeCat = ref('all')

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'Blog', value: 'blog' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Landing', value: 'landing' },
  { label: 'Admin', value: 'admin' },
]

const templates = [
  { id: 1, name: 'Dashboard Pro', category: 'dashboard', description: 'Full-featured admin dashboard with analytics', users: 2340, rating: 4.8, iconComp: MonitorDot, gradient: 'linear-gradient(135deg, #1E1E2E, #2D1B4E)' },
  { id: 2, name: 'Shop Starter', category: 'ecommerce', description: 'E-commerce storefront with cart & checkout', users: 1890, rating: 4.7, iconComp: Store, gradient: 'linear-gradient(135deg, #0D2137, #1A3A5C)' },
  { id: 3, name: 'Blog Kit', category: 'blog', description: 'Content-first blog with CMS integration', users: 1560, rating: 4.6, iconComp: ScrollText, gradient: 'linear-gradient(135deg, #1A2E1A, #2D4A2A)' },
  { id: 4, name: 'Portfolio Plus', category: 'portfolio', description: 'Showcase portfolio with stunning effects', users: 980, rating: 4.9, iconComp: Palette, gradient: 'linear-gradient(135deg, #3E2723, #5D4037)' },
  { id: 5, name: 'Landing Page Pro', category: 'landing', description: 'Conversion-optimized landing pages', users: 3200, rating: 4.8, iconComp: Rocket, gradient: 'linear-gradient(135deg, #1A1A2E, #2D1B5E)' },
  { id: 6, name: 'Admin Pro', category: 'admin', description: 'Complete admin panel with user management', users: 1450, rating: 4.5, iconComp: Shield, gradient: 'linear-gradient(135deg, #2E1A1A, #5E2D1B)' },
]

const filteredTemplates = computed(() => {
  let list = templates
  if (activeCat.value !== 'all') list = list.filter(t => t.category === activeCat.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
  }
  return list
})

const templateRows = computed(() => {
  const rows = []
  for (let i = 0; i < filteredTemplates.value.length; i += 2) {
    rows.push(filteredTemplates.value.slice(i, i + 2))
  }
  return rows
})

function useTemplate(tpl) {
  router.push({ path: '/editor', query: { template: tpl.id, name: tpl.name } })
}

import { ScrollText, Rocket, Shield } from 'lucide-vue-next'
</script>
