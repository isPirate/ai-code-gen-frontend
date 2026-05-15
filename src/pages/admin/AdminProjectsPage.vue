<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px]">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">Project Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[#E5E7EB] w-[240px]">
            <Search :size="14" class="text-[var(--foreground-muted)]" />
            <input v-model="search" @input="onSearchInput" placeholder="Search projects..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div class="flex-1 overflow-auto p-[20px] lg:p-[32px]" @click.self="openMenuId = null">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden overflow-x-auto min-h-full">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] px-[20px]" style="background:#F0F1F3">
            <div class="w-[260px] font-body text-[13px] font-bold text-[#4A4A4A]">Project</div>
            <div class="w-[160px] font-body text-[13px] font-bold text-[#4A4A4A]">Owner</div>
            <div class="w-[100px] font-body text-[13px] font-bold text-[#4A4A4A]">Status</div>
            <div class="w-[120px] font-body text-[13px] font-bold text-[#4A4A4A]">Created</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Actions</div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex items-center justify-center h-[200px] font-body text-[14px] text-[var(--foreground-muted)]">
            Loading...
          </div>

          <!-- Table Rows -->
          <template v-else>
            <div
              v-for="(project, idx) in projects"
              :key="project.id"
              class="flex items-center h-[48px] px-[20px] hover:bg-[var(--surface-secondary)] transition-colors"
              :style="{ borderTop: idx === 0 ? 'none' : '1px solid var(--border-subtle)' }"
            >
              <div class="flex items-center gap-[10px] w-[260px]">
                <div class="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center flex-shrink-0" :style="{ background: iconBgs[(project.id || 0) % iconBgs.length] }">
                  <component :is="icons[(project.id || 0) % icons.length]" :size="16" class="text-white" />
                </div>
                <span class="font-body text-[13px] text-[var(--foreground-primary)]">{{ project.appName || 'Untitled' }}</span>
              </div>
              <span class="w-[160px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ project.user?.userName || '-' }}</span>
              <div class="w-[100px]">
                <span
                  :class="['inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]', statusClass(project)]"
                  :style="{ background: statusBg(project) }"
                >
                  {{ project.deployKey ? 'Deployed' : 'Draft' }}
                </span>
              </div>
              <span class="w-[120px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ formatDate(project.createTime) }}</span>
              <div class="w-[80px] flex justify-center relative">
                <button @click="toggleMenu(project.id)" class="text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">
                  <Ellipsis :size="16" />
                </button>
                <!-- Dropdown Menu -->
                <div v-if="openMenuId === project.id"
                  class="absolute top-[100%] right-0 z-10 bg-white rounded-[8px] border border-[var(--border-subtle)] shadow-lg py-[4px] min-w-[120px]"
                  @click.stop>
                  <button @click="viewProject(project)" class="flex items-center gap-[6px] w-full px-[12px] py-[6px] font-body text-[12px] text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] text-left">
                    <Eye :size="14" /> View
                  </button>
                  <button @click="openEdit(project)" class="flex items-center gap-[6px] w-full px-[12px] py-[6px] font-body text-[12px] text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] text-left">
                    <Pencil :size="14" /> Edit
                  </button>
                  <button @click="handleDelete(project)" class="flex items-center gap-[6px] w-full px-[12px] py-[6px] font-body text-[12px] text-red-600 hover:bg-red-50 text-left">
                    <Trash2 :size="14" /> Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="projects.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
              No projects found.
            </div>
          </template>

          <!-- Divider -->
          <div class="h-[1px] bg-[var(--border-subtle)] flex-shrink-0"></div>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-[20px] py-[12px] bg-white">
            <div class="flex items-center gap-[16px]">
              <span class="font-body text-[12px] text-[var(--foreground-muted)]">
                Showing {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalRow) }} of {{ totalRow }} projects
              </span>
              <div class="flex items-center gap-[6px]">
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">Rows:</span>
                <select v-model.number="pageSize" @change="currentPage = 1; fetchProjects()"
                  class="h-[28px] px-[8px] rounded-[6px] border border-[var(--border-subtle)] font-body text-[12px] outline-none bg-white cursor-pointer">
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                </select>
              </div>
            </div>
            <div class="flex items-center gap-[4px]">
              <button :disabled="currentPage <= 1" @click="goPage(currentPage - 1)" class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] disabled:opacity-40 transition-colors">
                <ChevronLeft :size="14" />
              </button>
              <button
                v-for="p in visiblePages"
                :key="p"
                @click="goPage(p)"
                :class="['w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] transition-colors',
                  p === currentPage ? 'bg-[var(--accent-primary)] text-white font-semibold' : 'text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]']"
              >
                {{ p }}
              </button>
              <span v-if="showDots" class="font-body text-[12px] text-[var(--foreground-muted)] px-[4px]">...</span>
              <button v-if="totalPage > 5" @click="goPage(totalPage)"
                :class="['w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] transition-colors',
                  currentPage === totalPage ? 'bg-[var(--accent-primary)] text-white font-semibold' : 'text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]']"
              >
                {{ totalPage }}
              </button>
              <button :disabled="currentPage >= totalPage" @click="goPage(currentPage + 1)" class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] disabled:opacity-40 transition-colors">
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showEditModal = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[480px] shadow-xl">
        <h2 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[20px]">Edit Project</h2>
        <form @submit.prevent="confirmEdit" class="flex flex-col gap-[16px]">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Project Name</label>
            <input v-model="editForm.appName" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Cover URL</label>
            <input v-model="editForm.cover" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" placeholder="https://..." />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Priority</label>
            <input v-model.number="editForm.priority" type="number" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)]" />
          </div>
          <div class="flex justify-end gap-[12px] mt-[8px]">
            <button type="button" @click="showEditModal = false" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60">{{ saving ? 'Saving...' : 'Save' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="deleteTarget = null">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl text-center">
        <Trash2 :size="40" class="text-red-500 mx-auto mb-[16px]" />
        <h3 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[8px]">Delete Project?</h3>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">
          Are you sure you want to delete "{{ deleteTarget.appName || 'this project' }}"? This action cannot be undone.
        </p>
        <div class="flex gap-[12px] justify-center">
          <button @click="deleteTarget = null" class="px-[24px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
          <button @click="confirmDelete" :disabled="deleting" class="px-[24px] py-[10px] rounded-[8px] bg-red-500 font-body text-[14px] text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-60">{{ deleting ? 'Deleting...' : 'Delete' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { LayoutDashboard, Users, Folder, Settings, Search, Ellipsis, ChevronLeft, ChevronRight, LayoutDashboardIcon, ShoppingCart, BarChart3, PenTool, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { api } from '../../api/client'

const router = useRouter()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const search = ref('')
const projects = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRow = ref(0)
const totalPage = ref(0)
const searchTimer = ref(null)
const openMenuId = ref(null)

const showEditModal = ref(false)
const editTarget = ref(null)
const editForm = ref({ appName: '', cover: '', priority: 0 })
const saving = ref(false)

const deleteTarget = ref(null)
const deleting = ref(false)

const iconBgs = ['#1E1E2E', '#0D2137', '#1A2E1A', '#3E2723', '#1A1A2E', '#2E1A1A']
const icons = [LayoutDashboardIcon, ShoppingCart, BarChart3, PenTool, BarChart3, LayoutDashboardIcon]

const visiblePages = computed(() => {
  const pages = []
  const max = Math.min(5, totalPage.value)
  const start = Math.max(1, Math.min(currentPage.value - 2, totalPage.value - max + 1))
  for (let i = start; i < start + max; i++) pages.push(i)
  return pages
})

const showDots = computed(() => totalPage.value > 5 && currentPage.value + 2 < totalPage.value)

function statusClass(project) {
  return project.deployKey ? 'text-[#2E7D32]' : 'text-[var(--accent-primary)]'
}

function statusBg(project) {
  return project.deployKey ? '#E8F5E9' : '#FFF3E0'
}

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function fetchProjects() {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    }
    if (search.value.trim()) {
      params.appName = search.value.trim()
    }
    const result = await api.listAppVOPageByAdmin(params)
    projects.value = result.records || []
    totalRow.value = result.totalRow || 0
    totalPage.value = result.totalPage || 0
  } catch (e) {
    projects.value = []
    totalRow.value = 0
    totalPage.value = 0
  } finally {
    loading.value = false
  }
}

function onSearchInput() {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(() => {
    currentPage.value = 1
    fetchProjects()
  }, 300)
}

function goPage(p) {
  if (p < 1 || p > totalPage.value || p === currentPage.value) return
  currentPage.value = p
  fetchProjects()
}

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function viewProject(project) {
  openMenuId.value = null
  router.push({ path: '/editor', query: { appId: project.id } })
}

function openEdit(project) {
  openMenuId.value = null
  editTarget.value = project
  editForm.value = {
    appName: project.appName || '',
    cover: project.cover || '',
    priority: project.priority || 0,
  }
  showEditModal.value = true
}

async function confirmEdit() {
  if (!editTarget.value) return
  saving.value = true
  try {
    await api.updateAppByAdmin({
      id: editTarget.value.id,
      appName: editForm.value.appName,
      cover: editForm.value.cover,
      priority: editForm.value.priority,
    })
    showEditModal.value = false
    editTarget.value = null
    await fetchProjects()
  } catch (e) {
    console.error('Edit failed:', e)
  } finally {
    saving.value = false
  }
}

function handleDelete(project) {
  openMenuId.value = null
  deleteTarget.value = project
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await api.deleteAppByAdmin(deleteTarget.value.id)
    deleteTarget.value = null
    await fetchProjects()
  } catch (e) {
    console.error('Delete failed:', e)
  } finally {
    deleting.value = false
  }
}

onMounted(fetchProjects)
</script>
