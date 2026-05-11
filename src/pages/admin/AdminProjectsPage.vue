<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">Project Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[#E5E7EB] w-[240px]">
            <Search :size="14" class="text-[var(--foreground-muted)]" />
            <input v-model="search" placeholder="Search projects..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <button class="flex items-center gap-[6px] h-[36px] px-[12px] py-[6px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <SlidersHorizontal :size="14" class="text-[var(--foreground-secondary)]" />
            Filter
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="flex-1 overflow-auto p-[32px]">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden h-full">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] px-[20px]" style="background:#F0F1F3">
            <div class="w-[260px] font-body text-[13px] font-bold text-[#4A4A4A]">Project</div>
            <div class="w-[160px] font-body text-[13px] font-bold text-[#4A4A4A]">Owner</div>
            <div class="w-[100px] font-body text-[13px] font-bold text-[#4A4A4A]">Status</div>
            <div class="w-[120px] font-body text-[13px] font-bold text-[#4A4A4A]">Created</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Actions</div>
          </div>

          <!-- Table Rows -->
          <div
            v-for="(project, idx) in filteredProjects"
            :key="project.id"
            class="flex items-center h-[48px] px-[20px] hover:bg-[var(--surface-secondary)] transition-colors"
            :style="{ borderTop: idx === 0 ? 'none' : '1px solid var(--border-subtle)' }"
          >
            <!-- Project: icon + name -->
            <div class="flex items-center gap-[10px] w-[260px]">
              <div class="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center flex-shrink-0" :style="{ background: project.iconBg }">
                <component :is="project.icon" :size="16" class="text-white" />
              </div>
              <span class="font-body text-[13px] text-[var(--foreground-primary)]">{{ project.name }}</span>
            </div>
            <!-- Owner -->
            <span class="w-[160px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.owner }}</span>
            <!-- Status -->
            <div class="w-[100px]">
              <span
                :class="[
                  'inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]',
                  statusClass(project.status)
                ]"
                :style="{ background: statusBg(project.status) }"
              >
                {{ project.status }}
              </span>
            </div>
            <!-- Created -->
            <span class="w-[120px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.createdAt }}</span>
            <!-- Actions -->
            <div class="w-[80px] flex justify-center">
              <button class="text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">
                <Ellipsis :size="16" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProjects.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
            No projects found.
          </div>

          <!-- Divider -->
          <div class="h-[1px] bg-[var(--border-subtle)] flex-shrink-0"></div>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-[20px] py-[12px] bg-white">
            <span class="font-body text-[12px] text-[var(--foreground-muted)]">Showing 1-4 of 12,439 projects</span>
            <div class="flex items-center gap-[4px]">
              <!-- Prev -->
              <button class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors">
                <ChevronLeft :size="14" />
              </button>
              <!-- Page 1 (active) -->
              <button class="w-[32px] h-[32px] rounded-[8px] bg-[var(--accent-primary)] flex items-center justify-center text-white font-body text-[12px] font-semibold">1</button>
              <!-- Page 2 -->
              <button class="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">2</button>
              <!-- Page 3 -->
              <button class="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">3</button>
              <!-- Dots -->
              <span class="font-body text-[12px] text-[var(--foreground-muted)] px-[4px]">...</span>
              <!-- Last page -->
              <button class="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">311</button>
              <!-- Next -->
              <button class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { LayoutDashboard, Users, Folder, Settings, Search, SlidersHorizontal, Ellipsis, ChevronLeft, ChevronRight, LayoutDashboardIcon, ShoppingCart, BarChart3, PenTool } from 'lucide-vue-next'
import { mockApi } from '../../api/mock.js'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const search = ref('')
const projects = ref([])

const iconBgs = ['#1E1E2E', '#0D2137', '#1A2E1A', '#3E2723', '#1A1A2E', '#2E1A1A']
const icons = [LayoutDashboardIcon, ShoppingCart, BarChart3, PenTool, BarChart3, LayoutDashboardIcon]

const filteredProjects = computed(() => {
  if (!search.value) return projects.value
  const q = search.value.toLowerCase()
  return projects.value.filter(p => p.name.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q))
})

function statusClass(status) {
  if (status === 'Deployed') return 'text-[#2E7D32]'
  if (status === 'Draft') return 'text-[var(--accent-primary)]'
  return 'text-[#C62828]'
}
function statusBg(status) {
  if (status === 'Deployed') return '#E8F5E9'
  if (status === 'Draft') return '#FFF3E0'
  return '#FFEBEE'
}

onMounted(async () => {
  try {
    const raw = await mockApi.getAllProjects()
    projects.value = raw.map((p, i) => ({
      ...p,
      icon: icons[i % icons.length],
      iconBg: iconBgs[i % iconBgs.length],
      owner: ['Sarah Chen', 'Mike Liu', 'Anna Park', 'Tom Wang', 'Admin'][i] || 'Unknown',
      status: ['Deployed', 'Draft', 'Deployed', 'Archived'][i % 4],
    }))
  } catch (e) {
    projects.value = [
      { id: 1, name: 'E-Commerce Dashboard', owner: 'Sarah Chen', status: 'Deployed', createdAt: 'Apr 12, 2026', icon: LayoutDashboardIcon, iconBg: '#1E1E2E' },
      { id: 2, name: 'ShopVista Store', owner: 'Mike Liu', status: 'Draft', createdAt: 'Apr 11, 2026', icon: ShoppingCart, iconBg: '#0D2137' },
      { id: 3, name: 'InsightBoard Analytics', owner: 'Anna Park', status: 'Deployed', createdAt: 'Apr 10, 2026', icon: BarChart3, iconBg: '#1A2E1A' },
      { id: 4, name: 'Personal Portfolio', owner: 'Tom Wang', status: 'Archived', createdAt: 'Apr 8, 2026', icon: PenTool, iconBg: '#3E2723' },
    ]
  }
})
</script>
