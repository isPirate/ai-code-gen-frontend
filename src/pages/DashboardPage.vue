<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">My Projects</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[220px]">
            <span class="material-symbols-outlined text-[16px] text-[var(--foreground-muted)]">search</span>
            <input v-model="search" placeholder="Search projects..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <button @click="showCreate = true" class="flex items-center gap-[6px] h-[36px] px-[16px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            <span class="material-symbols-outlined text-[16px]">add</span>
            New Project
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-auto p-[40px]">
        <div class="flex flex-col gap-[20px] w-full">
          <!-- Row 1 -->
          <div class="flex gap-[20px] w-full">
            <div
              v-for="project in row1"
              :key="project.id"
              class="flex flex-col flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_2px_8px_#00000006] hover:shadow-[0_4px_16px_#0000000A] transition-shadow cursor-pointer"
            >
              <div class="flex items-center justify-center h-[160px]" :style="{ background: project.gradient }">
                <span class="material-symbols-outlined text-[48px] text-white/40">{{ project.icon }}</span>
              </div>
              <div class="flex flex-col gap-[6px] p-[16px_20px]">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">{{ project.name }}</h3>
                <p class="font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.description }}</p>
                <div class="flex items-center gap-[8px] mt-[4px]">
                  <span class="px-[8px] py-[2px] rounded-[6px] bg-[var(--surface-secondary)] font-caption text-[11px] text-[var(--foreground-muted)]">{{ project.template }}</span>
                  <span class="font-caption text-[11px] text-[var(--foreground-muted)]">{{ project.updatedAt }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="flex gap-[20px] w-full">
            <div
              v-for="project in row2"
              :key="project.id"
              class="flex flex-col flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_2px_8px_#00000006] hover:shadow-[0_4px_16px_#0000000A] transition-shadow cursor-pointer"
            >
              <div class="flex items-center justify-center h-[160px]" :style="{ background: project.gradient }">
                <span class="material-symbols-outlined text-[48px] text-white/40">{{ project.icon }}</span>
              </div>
              <div class="flex flex-col gap-[6px] p-[16px_20px]">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">{{ project.name }}</h3>
                <p class="font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.description }}</p>
                <div class="flex items-center gap-[8px] mt-[4px]">
                  <span class="px-[8px] py-[2px] rounded-[6px] bg-[var(--surface-secondary)] font-caption text-[11px] text-[var(--foreground-muted)]">{{ project.template }}</span>
                  <span class="font-caption text-[11px] text-[var(--foreground-muted)]">{{ project.updatedAt }}</span>
                </div>
              </div>
            </div>

            <!-- Create New -->
            <button @click="showCreate = true" class="flex flex-col items-center justify-center gap-[12px] flex-1 h-[206px] rounded-[12px] border border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:bg-[var(--surface-primary)] transition-colors">
              <span class="material-symbols-outlined text-[32px] text-[var(--foreground-muted)]">add</span>
              <span class="font-body text-[14px] text-[var(--foreground-muted)]">Create New Project</span>
            </button>
          </div>

          <p v-if="filteredProjects.length === 0" class="text-center font-body text-[14px] text-[var(--foreground-muted)] py-[40px]">
            No projects found. Create your first one!
          </p>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showCreate = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[480px] shadow-xl">
        <h2 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[20px]">Create New Project</h2>
        <div class="flex flex-col gap-[16px]">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Project Name</label>
            <input v-model="newProject.name" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" placeholder="My Awesome App" />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Description</label>
            <input v-model="newProject.description" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" placeholder="What does it do?" />
          </div>
          <div class="flex justify-end gap-[12px] mt-[8px]">
            <button @click="showCreate = false" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
            <button @click="createProject" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppSidebar from '../components/AppSidebar.vue'

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: 'dashboard' },
  { to: '/templates', label: 'Templates', icon: 'grid_view' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

const search = ref('')
const showCreate = ref(false)
const newProject = ref({ name: '', description: '' })

const allProjects = ref([
  { id: 1, name: 'SaaS Dashboard', description: 'Analytics dashboard with real-time charts', template: 'Dashboard Pro', updatedAt: 'May 1, 2026', icon: 'monitoring', gradient: 'linear-gradient(135deg, #1E1E2E, #2D1B4E)' },
  { id: 2, name: 'E-Commerce Store', description: 'Online store with Stripe payments', template: 'Shop Starter', updatedAt: 'Apr 28, 2026', icon: 'storefront', gradient: 'linear-gradient(135deg, #0D2137, #1A3A5C)' },
  { id: 3, name: 'Blog Platform', description: 'Content management with MDX editor', template: 'Blog Kit', updatedAt: 'Apr 25, 2026', icon: 'article', gradient: 'linear-gradient(135deg, #1A2E1A, #2D4A2A)' },
  { id: 4, name: 'Portfolio Site', description: 'Personal portfolio with 3D animations', template: 'Portfolio Plus', updatedAt: 'Mar 15, 2026', icon: 'palette', gradient: 'linear-gradient(135deg, #3E2723, #5D4037)' },
])

const filteredProjects = computed(() => {
  if (!search.value) return allProjects.value
  const q = search.value.toLowerCase()
  return allProjects.value.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
})

const row1 = computed(() => filteredProjects.value.slice(0, 3))
const row2 = computed(() => filteredProjects.value.slice(3, 5))

function createProject() {
  if (!newProject.value.name) return
  allProjects.value.push({
    id: Date.now(),
    name: newProject.value.name,
    description: newProject.value.description || 'New project',
    template: 'Custom',
    updatedAt: 'Just now',
    icon: 'rocket_launch',
    gradient: 'linear-gradient(135deg, #1E3A5F, #2D5A8A)',
  })
  newProject.value = { name: '', description: '' }
  showCreate.value = false
}
</script>
