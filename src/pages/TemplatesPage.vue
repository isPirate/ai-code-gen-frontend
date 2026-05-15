<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px]">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">Featured Apps</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[220px]">
            <Search :size="16" class="text-[var(--foreground-muted)]" />
            <input v-model="search" @input="onSearchInput" placeholder="Search apps..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-[20px] lg:p-[32px]">
        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center h-[200px]">
          <span class="font-body text-[14px] text-[var(--foreground-muted)]">Loading apps...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex items-center justify-center h-[200px]">
          <span class="font-body text-[14px] text-red-500">{{ error }}</span>
        </div>

        <!-- Empty -->
        <div v-else-if="templates.length === 0" class="flex items-center justify-center h-[200px]">
          <span class="font-body text-[14px] text-[var(--foreground-muted)]">No featured apps found.</span>
        </div>

        <!-- Apps Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-[16px] lg:gap-[20px] w-full">
          <div
            v-for="tpl in templates"
            :key="tpl.id"
            class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_2px_8px_#00000006] hover:shadow-[0_4px_16px_#0000000A] transition-shadow cursor-pointer"
          >
            <div class="flex items-center justify-center h-[140px]" :style="{ background: projectGradient(tpl) }">
              <component :is="projectIcon(tpl)" :size="40" class="text-white/40" />
            </div>
            <div class="flex flex-col gap-[6px] p-[16px_20px]">
              <div class="flex items-center justify-between">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">{{ tpl.appName || 'Untitled' }}</h3>
                <span class="font-caption text-[12px] text-[var(--foreground-muted)]">{{ tpl.codeGenType || 'App' }}</span>
              </div>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)] line-clamp-2">{{ tpl.initPrompt || 'No description' }}</p>
              <div class="flex items-center justify-between mt-[4px]">
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">By {{ tpl.user?.userName || 'Unknown' }}</span>
                <button @click="useTemplate(tpl)" class="px-[12px] py-[6px] rounded-[6px] bg-[var(--accent-primary)] font-body text-[12px] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '../components/AppSidebar.vue'
import { MonitorDot, Store, ScrollText, Palette, Search } from 'lucide-vue-next'
import { api } from '../api/client'

const router = useRouter()

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: MonitorDot },
  { to: '/templates', label: 'Templates', icon: Store },
  { to: '/settings', label: 'Settings', icon: Palette },
]

const search = ref('')
const templates = ref([])
const loading = ref(false)
const error = ref('')
const searchTimer = ref(null)

const iconMap = {
  'dashboard': MonitorDot,
  'ecommerce': Store,
  'blog': ScrollText,
  'portfolio': Palette,
}

const gradients = [
  'linear-gradient(135deg, #1E1E2E, #2D1B4E)',
  'linear-gradient(135deg, #0D2137, #1A3A5C)',
  'linear-gradient(135deg, #1A2E1A, #2D4A2A)',
  'linear-gradient(135deg, #3E2723, #5D4037)',
  'linear-gradient(135deg, #1A1A2E, #2D1B5E)',
  'linear-gradient(135deg, #2E1A1A, #5E2D1B)',
]

function projectIcon(tpl) {
  const type = (tpl.codeGenType || '').toLowerCase()
  return iconMap[type] || MonitorDot
}

function projectGradient(tpl) {
  return gradients[(tpl.id || 0) % gradients.length]
}

async function fetchTemplates() {
  loading.value = true
  error.value = ''
  try {
    const params = { pageSize: 50 }
    if (search.value.trim()) {
      params.appName = search.value.trim()
    }
    const result = await api.listGoodAppVOPage(params)
    templates.value = result.records || []
  } catch (e) {
    error.value = e.message || 'Failed to load apps'
    templates.value = []
  } finally {
    loading.value = false
  }
}

function onSearchInput() {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(fetchTemplates, 300)
}

function useTemplate(tpl) {
  router.push({ path: '/editor', query: { appId: tpl.id } })
}

onMounted(fetchTemplates)
</script>
