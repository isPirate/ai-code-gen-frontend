<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px]">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">My Projects</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[220px]">
            <Search :size="16" class="text-[var(--foreground-muted)]" />
            <input v-model="search" @input="onSearchInput" placeholder="Search projects..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <button @click="handleNewProject" class="flex items-center gap-[6px] h-[36px] px-[16px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            <Plus :size="16" />
            New Project
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-[20px] lg:p-[40px]">
        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center h-[200px]">
          <span class="font-body text-[14px] text-[var(--foreground-muted)]">Loading projects...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex items-center justify-center h-[200px]">
          <span class="font-body text-[14px] text-red-500">{{ error }}</span>
        </div>

        <!-- Empty -->
        <div v-else-if="projects.length === 0" class="flex flex-col items-center justify-center h-[200px] gap-[12px]">
          <span class="font-body text-[14px] text-[var(--foreground-muted)]">No projects found. Create your first one!</span>
          <button @click="handleNewProject" class="px-[16px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">Create New Project</button>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px] w-full">
          <div
            v-for="project in projects"
            :key="project.id"
            @click="openProject(project)"
            class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden shadow-[0_2px_8px_#00000006] hover:shadow-[0_4px_16px_#0000000A] transition-shadow cursor-pointer group"
          >
            <div class="flex items-center justify-center h-[160px]" :style="{ background: projectGradient(project) }">
              <component :is="projectIcon(project)" :size="48" class="text-white/40" />
            </div>
            <div class="flex flex-col gap-[6px] p-[16px_20px]">
              <div class="flex items-center justify-between">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">{{ project.appName || 'Untitled' }}</h3>
                <div class="flex gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click.stop="handleRename(project)" class="p-[4px] rounded-[4px] hover:bg-[var(--surface-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)]" title="Rename">
                    <Pencil :size="14" />
                  </button>
                  <button @click.stop="handleDelete(project)" class="p-[4px] rounded-[4px] hover:bg-red-50 text-[var(--foreground-muted)] hover:text-red-500" title="Delete">
                    <Trash2 :size="14" />
                  </button>
                </div>
              </div>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)] line-clamp-2">{{ project.initPrompt || 'No description' }}</p>
              <div class="flex items-center gap-[8px] mt-[4px]">
                <span class="px-[8px] py-[2px] rounded-[6px] bg-[var(--surface-secondary)] font-caption text-[11px] text-[var(--foreground-muted)]">{{ project.codeGenType || 'Custom' }}</span>
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">{{ formatTime(project.updateTime || project.createTime) }}</span>
                <span v-if="project.deployKey" class="ml-auto px-[8px] py-[2px] rounded-[6px] bg-green-50 font-caption text-[11px] text-green-700">Deployed</span>
              </div>
            </div>
          </div>

          <!-- Create New Card -->
          <button @click="handleNewProject" class="flex flex-col items-center justify-center gap-[12px] h-full min-h-[280px] rounded-[12px] border border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:bg-[var(--surface-primary)] transition-colors">
            <Plus :size="32" class="text-[var(--foreground-muted)]" />
            <span class="font-body text-[14px] text-[var(--foreground-muted)]">Create New Project</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Rename Modal -->
    <div v-if="showRename" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showRename = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl">
        <h2 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[20px]">Rename Project</h2>
        <form @submit.prevent="confirmRename" class="flex flex-col gap-[16px]">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Project Name</label>
            <input v-model="renameValue" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" placeholder="My Awesome App" />
          </div>
          <div class="flex justify-end gap-[12px] mt-[8px]">
            <button type="button" @click="showRename = false" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
            <button type="submit" :disabled="renaming" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60">{{ renaming ? 'Saving...' : 'Save' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showDeleteConfirm = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl text-center">
        <Trash2 :size="40" class="text-red-500 mx-auto mb-[16px]" />
        <h3 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[8px]">Delete Project?</h3>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">
          Are you sure you want to delete "{{ deleteTarget?.appName || 'this project' }}"? This action cannot be undone.
        </p>
        <div class="flex gap-[12px] justify-center">
          <button @click="showDeleteConfirm = false" class="px-[24px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
          <button @click="confirmDelete" :disabled="deleting" class="px-[24px] py-[10px] rounded-[8px] bg-red-500 font-body text-[14px] text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-60">{{ deleting ? 'Deleting...' : 'Delete' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '../components/AppSidebar.vue'
import { Search, Plus, MonitorDot, Star, Store, ScrollText, Palette, Pencil, Trash2 } from 'lucide-vue-next'
import { api } from '../api/client'

const router = useRouter()

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: MonitorDot },
  { to: '/featured', label: 'Featured', icon: Star },
  { to: '/settings', label: 'Settings', icon: Palette },
]

const search = ref('')
const projects = ref([])
const loading = ref(false)
const error = ref('')

const showRename = ref(false)
const renameTarget = ref(null)
const renameValue = ref('')
const renaming = ref(false)

const showDeleteConfirm = ref(false)
const deleteTarget = ref(null)
const deleting = ref(false)

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

function projectIcon(project) {
  const type = (project.codeGenType || '').toLowerCase()
  return iconMap[type] || MonitorDot
}

function projectGradient(project) {
  const id = typeof project.id === 'number' ? project.id : (String(project.id || '').charCodeAt(0) || 0)
  return gradients[id % gradients.length]
}

function formatTime(t) {
  if (!t) return ''
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function fetchProjects() {
  loading.value = true
  error.value = ''
  try {
    const params = { pageSize: 20 }
    if (search.value.trim()) {
      params.appName = search.value.trim()
    }
    const result = await api.listMyAppVOPage(params)
    projects.value = result.records || []
  } catch (e) {
    error.value = e.message || 'Failed to load projects'
    projects.value = []
  } finally {
    loading.value = false
  }
}

function onSearchInput() {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(fetchProjects, 300)
}

function openProject(project) {
  router.push({ path: '/editor', query: { appId: project.id } })
}

function handleNewProject() {
  router.push({ path: '/editor' })
}

function handleRename(project) {
  renameTarget.value = project
  renameValue.value = project.appName || ''
  showRename.value = true
}

async function confirmRename() {
  if (!renameValue.value.trim() || !renameTarget.value) return
  renaming.value = true
  try {
    await api.updateApp({ id: renameTarget.value.id, appName: renameValue.value.trim() })
    showRename.value = false
    renameTarget.value = null
    await fetchProjects()
  } catch (e) {
    error.value = 'Rename failed: ' + (e.message || '')
  } finally {
    renaming.value = false
  }
}

function handleDelete(project) {
  deleteTarget.value = project
  showDeleteConfirm.value = true
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await api.deleteApp(deleteTarget.value.id)
    showDeleteConfirm.value = false
    deleteTarget.value = null
    await fetchProjects()
  } catch (e) {
    error.value = 'Delete failed: ' + (e.message || '')
  } finally {
    deleting.value = false
  }
}

onMounted(fetchProjects)

onUnmounted(() => {
  clearTimeout(searchTimer.value)
})
</script>
