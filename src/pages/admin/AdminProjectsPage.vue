<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px]">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">Project Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px]">
            <div class="flex items-center gap-[6px] h-[36px] px-[10px] rounded-[8px] border border-[#E5E7EB] w-[160px]">
              <Search :size="13" class="text-[var(--foreground-muted)] flex-shrink-0" />
              <input v-model="filterAppName" @input="onFilterChange" placeholder="Project name..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
            </div>
            <div class="flex items-center gap-[6px] h-[36px] px-[10px] rounded-[8px] border border-[#E5E7EB] w-[140px]">
              <User :size="13" class="text-[var(--foreground-muted)] flex-shrink-0" />
              <input v-model="filterOwner" @input="onFilterChange" placeholder="Owner..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
            </div>
            <div class="flex items-center gap-[6px] h-[36px] px-[10px] rounded-[8px] border border-[#E5E7EB] w-[150px]">
              <Tag :size="13" class="text-[var(--foreground-muted)] flex-shrink-0" />
              <select v-model="filterType" @change="onFilterChange" class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] outline-none bg-transparent cursor-pointer">
                <option value="">All types</option>
                <option value="html">HTML</option>
                <option value="multi_file">Multi File</option>
              </select>
            </div>
            <button v-if="hasFilters" @click="clearFilters" class="flex-shrink-0 w-[28px] h-[28px] rounded-[6px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors" title="Clear filters">
              <X :size="14" />
            </button>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div class="flex-1 overflow-auto p-[20px] lg:p-[32px]">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden overflow-x-auto min-h-full">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] px-[20px]" style="background:#F0F1F3">
            <div class="w-[200px] font-body text-[13px] font-bold text-[#4A4A4A]">Project</div>
            <div class="w-[120px] font-body text-[13px] font-bold text-[#4A4A4A]">Owner</div>
            <div class="w-[90px] font-body text-[13px] font-bold text-[#4A4A4A]">Type</div>
            <div class="w-[130px] font-body text-[13px] font-bold text-[#4A4A4A]">Cover</div>
            <div class="w-[70px] font-body text-[13px] font-bold text-[#4A4A4A]">Priority</div>
            <div class="w-[90px] font-body text-[13px] font-bold text-[#4A4A4A]">Status</div>
            <div class="w-[110px] font-body text-[13px] font-bold text-[#4A4A4A]">Deployed</div>
            <div class="w-[100px] font-body text-[13px] font-bold text-[#4A4A4A]">Created</div>
            <div class="flex-1 font-body text-[13px] font-bold text-[#4A4A4A] text-right">Actions</div>
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
              <div class="flex items-center gap-[10px] w-[200px]">
                <div class="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center flex-shrink-0" :style="{ background: iconBgs[(project.id || 0) % iconBgs.length] }">
                  <component :is="icons[(project.id || 0) % icons.length]" :size="16" class="text-white" />
                </div>
                <span class="font-body text-[13px] text-[var(--foreground-primary)] truncate">{{ project.appName || 'Untitled' }}</span>
                <Star v-if="project.priority == 99" :size="12" class="text-[var(--accent-primary)] fill-[var(--accent-primary)] flex-shrink-0" />
              </div>
              <span class="w-[120px] font-body text-[13px] text-[var(--foreground-secondary)] truncate">{{ project.user?.userName || '-' }}</span>
              <div class="w-[90px]">
                <span class="px-[6px] py-[2px] rounded-[4px] bg-[var(--surface-secondary)] font-caption text-[11px] text-[var(--foreground-secondary)]">{{ typeLabel(project.codeGenType) }}</span>
              </div>
              <div class="w-[130px] flex items-center">
                <img v-if="project.cover" :src="project.cover" class="w-[36px] h-[36px] rounded-[6px] object-cover border border-[var(--border-subtle)]" :title="project.cover" />
                <div v-else class="w-[36px] h-[36px] rounded-[6px] bg-[var(--surface-secondary)] flex items-center justify-center border border-[var(--border-subtle)]">
                  <Image :size="16" class="text-[var(--foreground-muted)]" />
                </div>
              </div>
              <div class="w-[70px]">
                <span v-if="project.priority == 99" class="inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px] text-[var(--accent-primary)]" style="background:#FFF3E0">Featured</span>
                <span v-else class="font-body text-[12px] text-[var(--foreground-muted)]">-</span>
              </div>
              <div class="w-[90px]">
                <span
                  :class="['inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]', statusClass(project)]"
                  :style="{ background: statusBg(project) }"
                >
                  {{ project.deployKey ? 'Deployed' : 'Draft' }}
                </span>
              </div>
              <span class="w-[110px] font-body text-[12px] text-[var(--foreground-secondary)]">{{ project.deployedTime ? formatDate(project.deployedTime) : '-' }}</span>
              <span class="w-[100px] font-body text-[12px] text-[var(--foreground-secondary)]">{{ formatDate(project.createTime) }}</span>
              <div class="flex-1 flex items-center justify-end gap-[4px]">
                <button @click="viewProject(project)" class="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors" title="View">
                  <Eye :size="15" />
                </button>
                <button @click="openEdit(project)" class="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors" title="Edit">
                  <Pencil :size="15" />
                </button>
                <button @click="toggleFeatured(project)" class="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center transition-colors" :class="project.priority == 99 ? 'text-[var(--accent-primary)] hover:bg-[#FFF3E0]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)]'" :title="project.priority == 99 ? 'Unset Featured' : 'Set Featured'">
                  <Star :size="15" :class="project.priority == 99 ? 'fill-[var(--accent-primary)]' : ''" />
                </button>
                <button @click="handleDelete(project)" class="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                  <Trash2 :size="15" />
                </button>
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
import { LayoutDashboard, Users, Folder, Settings, Search, User, Tag, X, ChevronLeft, ChevronRight, LayoutDashboardIcon, ShoppingCart, BarChart3, PenTool, Eye, Pencil, Star, Image, Trash2 } from 'lucide-vue-next'
import { api } from '../../api/client'

const router = useRouter()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const filterAppName = ref('')
const filterOwner = ref('')
const filterType = ref('')
const projects = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRow = ref(0)
const totalPage = ref(0)
const searchTimer = ref(null)

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

const hasFilters = computed(() => filterAppName.value || filterOwner.value || filterType.value)
const showDots = computed(() => totalPage.value > 5 && currentPage.value + 2 < totalPage.value)

function statusClass(project) {
  return project.deployKey ? 'text-[#2E7D32]' : 'text-[var(--accent-primary)]'
}

function statusBg(project) {
  return project.deployKey ? '#E8F5E9' : '#FFF3E0'
}

const TYPE_LABELS = { html: 'HTML', multi_file: 'Multi File' }
function typeLabel(v) { return TYPE_LABELS[v] || v || '-' }

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
    if (filterAppName.value.trim()) {
      params.appName = filterAppName.value.trim()
    }
    if (filterOwner.value.trim()) {
      params.userName = filterOwner.value.trim()
    }
    if (filterType.value.trim()) {
      params.codeGenType = filterType.value.trim()
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

function onFilterChange() {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(() => {
    currentPage.value = 1
    fetchProjects()
  }, 300)
}

function clearFilters() {
  filterAppName.value = ''
  filterOwner.value = ''
  filterType.value = ''
  currentPage.value = 1
  fetchProjects()
}

function goPage(p) {
  if (p < 1 || p > totalPage.value || p === currentPage.value) return
  currentPage.value = p
  fetchProjects()
}

function viewProject(project) {
  router.push({ path: '/editor', query: { appId: project.id } })
}

function openEdit(project) {
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
  deleteTarget.value = project
}

async function toggleFeatured(project) {
  const isFeatured = project.priority == 99
  try {
    await api.updateAppByAdmin({
      id: project.id,
      priority: isFeatured ? 0 : 99,
    })
    await fetchProjects()
  } catch (e) {
    console.error('Toggle featured failed:', e)
  }
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
