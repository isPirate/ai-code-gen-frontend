<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">Project Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[260px]">
            <span class="material-symbols-outlined text-[16px] text-[var(--foreground-muted)]">search</span>
            <input v-model="search" placeholder="Search projects..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <select v-model="statusFilter" class="h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-primary)] outline-none bg-white">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-auto p-[32px]">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] bg-[var(--surface-secondary)] border-b border-[var(--border-subtle)] px-[24px]">
            <div class="flex-1 font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Project</div>
            <div class="w-[140px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Owner</div>
            <div class="w-[120px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Status</div>
            <div class="w-[140px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Template</div>
            <div class="w-[120px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Created</div>
            <div class="w-[80px]"></div>
          </div>

          <!-- Table Rows -->
          <div v-for="project in filteredProjects" :key="project.id" class="flex items-center h-[56px] px-[24px] border-b border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] transition-colors">
            <div class="flex-1">
              <p class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ project.name }}</p>
              <p class="font-body text-[12px] text-[var(--foreground-muted)]">{{ project.description }}</p>
            </div>
            <div class="w-[140px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.owner || 'John Doe' }}</div>
            <div class="w-[120px]">
              <span :class="[
                'inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full font-caption text-[11px] font-medium',
                project.status === 'active'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-[var(--foreground-secondary)]'
              ]">
                <span :class="['w-[6px] h-[6px] rounded-full', project.status === 'active' ? 'bg-green-500' : 'bg-gray-400']"></span>
                {{ project.status === 'active' ? 'Active' : 'Draft' }}
              </span>
            </div>
            <div class="w-[140px] font-body text-[13px] text-[var(--foreground-muted)]">{{ project.template }}</div>
            <div class="w-[120px] font-body text-[13px] text-[var(--foreground-muted)]">{{ project.createdAt }}</div>
            <div class="w-[80px] flex items-center gap-[8px] justify-end">
              <button class="p-[6px] rounded-[6px] hover:bg-[var(--surface-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">
                <span class="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button @click="deleteProject(project.id)" class="p-[6px] rounded-[6px] hover:bg-red-50 text-[var(--foreground-muted)] hover:text-red-500 transition-colors">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProjects.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
            No projects found.
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-between h-[52px] px-[24px] bg-white border-t border-[var(--border-subtle)]">
            <span class="font-body text-[13px] text-[var(--foreground-muted)]">Showing {{ filteredProjects.length }} of {{ projects.length }} projects</span>
            <div class="flex items-center gap-[8px]">
              <button class="w-[32px] h-[32px] rounded-[6px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors">
                <span class="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button class="w-[32px] h-[32px] rounded-[6px] bg-[var(--accent-primary)] flex items-center justify-center text-white font-body text-[13px] font-medium">1</button>
              <button class="w-[32px] h-[32px] rounded-[6px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors">
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
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
import { mockApi } from '../../api/mock.js'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/users', label: 'Users', icon: 'group' },
  { to: '/admin/projects', label: 'Projects', icon: 'folder' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
]

const search = ref('')
const statusFilter = ref('')
const projects = ref([])

const filteredProjects = computed(() => {
  let list = projects.value
  if (statusFilter.value) list = list.filter(p => p.status === statusFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  return list
})

onMounted(async () => {
  try {
    projects.value = await mockApi.getAllProjects()
  } catch (e) {
    projects.value = [
      { id: 1, name: 'SaaS Dashboard', description: 'Analytics dashboard with real-time charts', status: 'active', template: 'Dashboard Pro', createdAt: '2026-03-10', owner: 'John Doe' },
      { id: 2, name: 'E-Commerce Store', description: 'Online store with Stripe payments', status: 'active', template: 'Shop Starter', createdAt: '2026-02-20', owner: 'Alice Chen' },
      { id: 3, name: 'Blog Platform', description: 'Content management with MDX editor', status: 'draft', template: 'Blog Kit', createdAt: '2026-04-05', owner: 'Bob Williams' },
      { id: 4, name: 'Portfolio Site', description: 'Personal portfolio with 3D', status: 'active', template: 'Portfolio Plus', createdAt: '2026-01-08', owner: 'John Doe' },
      { id: 5, name: 'Admin Panel', description: 'Internal admin for user mgmt', status: 'active', template: 'Admin Pro', createdAt: '2026-03-01', owner: 'Admin' },
    ]
  }
})

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return
  await mockApi.deleteProject(id)
  projects.value = projects.value.filter(p => p.id !== id)
}
</script>
