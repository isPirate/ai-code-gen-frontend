<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center justify-between h-[64px] px-[16px] lg:px-[32px] bg-white border-b border-[var(--border-subtle)] gap-[12px] flex-wrap">
        <h1 class="font-heading text-[20px] lg:text-[24px] font-bold text-[var(--foreground-primary)]">User Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[#E5E7EB] w-[240px]">
            <Search :size="14" class="text-[var(--foreground-muted)]" />
            <input v-model="search" @keydown.enter="searchUsers" placeholder="Search users..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <button @click="searchUsers" class="flex items-center gap-[6px] h-[36px] px-[12px] py-[6px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <SlidersHorizontal :size="14" class="text-[var(--foreground-secondary)]" />
            Filter
          </button>
          <button @click="showAddModal = true" class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            <UserPlus :size="16" />
            Add User
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-[20px] lg:p-[32px]">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden overflow-x-auto h-full">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] px-[20px]" style="background:#F0F1F3">
            <div class="w-[200px] font-body text-[13px] font-bold text-[#4A4A4A]">User</div>
            <div class="w-[180px] font-body text-[13px] font-bold text-[#4A4A4A]">Account</div>
            <div class="w-[100px] font-body text-[13px] font-bold text-[#4A4A4A]">Role</div>
            <div class="flex-1 font-body text-[13px] font-bold text-[#4A4A4A]">Profile</div>
            <div class="w-[120px] font-body text-[13px] font-bold text-[#4A4A4A]">Created</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Actions</div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex items-center justify-center h-[200px] font-body text-[14px] text-[var(--foreground-muted)]">
            Loading...
          </div>

          <!-- Rows -->
          <template v-else>
            <div
              v-for="(user, idx) in users"
              :key="user.id"
              class="flex items-center h-[48px] px-[20px] hover:bg-[var(--surface-secondary)] transition-colors"
              :style="{ borderTop: idx === 0 ? 'none' : '1px solid var(--border-subtle)' }"
            >
              <div class="flex items-center gap-[10px] w-[200px]">
                <div class="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0" :style="{ background: avatarColors[idx % avatarColors.length] }">
                  <span class="font-body text-[13px] font-medium text-white">{{ (user.userName || 'U')[0] }}</span>
                </div>
                <span class="font-body text-[13px] text-[var(--foreground-primary)] truncate">{{ user.userName || '-' }}</span>
              </div>
              <span class="w-[180px] font-body text-[13px] text-[var(--foreground-secondary)] truncate">{{ user.userAccount }}</span>
              <div class="w-[100px]">
                <span :class="['inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]',
                  user.userRole === 'admin' ? 'text-[#1565C0]' : 'text-[var(--foreground-secondary)]']"
                  :style="{ background: user.userRole === 'admin' ? '#E3F2FD' : 'var(--surface-secondary)' }">
                  {{ user.userRole === 'admin' ? 'Admin' : 'User' }}
                </span>
              </div>
              <span class="flex-1 font-body text-[13px] text-[var(--foreground-secondary)] truncate pr-[16px]">{{ user.userProfile || '-' }}</span>
              <span class="w-[120px] font-body text-[13px] text-[var(--foreground-secondary)]">{{ formatDate(user.createTime) }}</span>
              <div class="w-[80px] flex justify-center">
                <button @click="confirmDeleteUser(user)" class="p-[6px] rounded-[6px] hover:bg-red-50 text-[var(--foreground-muted)] hover:text-red-500 transition-colors">
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </template>

          <div v-if="!loading && users.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
            No users found.
          </div>

          <!-- Divider -->
          <div class="h-[1px] bg-[var(--border-subtle)] flex-shrink-0"></div>

          <!-- Pagination -->
          <div v-if="totalRow > 0" class="flex items-center justify-between px-[20px] py-[12px] bg-white">
            <div class="flex items-center gap-[16px]">
              <span class="font-body text-[12px] text-[var(--foreground-muted)]">
                Showing {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalRow) }} of {{ totalRow }} users
              </span>
              <div class="flex items-center gap-[6px]">
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">Rows:</span>
                <select v-model.number="pageSize" @change="currentPage = 1; fetchUsers()" class="h-[28px] px-[8px] rounded-[6px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-primary)] outline-none bg-white cursor-pointer">
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                </select>
              </div>
            </div>
            <div class="flex items-center gap-[4px]">
              <button :disabled="currentPage <= 1" @click="goPage(currentPage - 1)" class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors disabled:opacity-40">
                <ChevronLeft :size="14" />
              </button>
              <button v-for="p in visiblePages" :key="p" @click="goPage(p)"
                :class="['w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] transition-colors',
                  p === currentPage ? 'bg-[var(--accent-primary)] text-white font-semibold' : 'text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]']">
                {{ p }}
              </button>
              <span v-if="showDots" class="font-body text-[12px] text-[var(--foreground-muted)] px-[4px]">...</span>
              <button v-if="totalPage > 5" @click="goPage(totalPage)"
                :class="['w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px]',
                  currentPage === totalPage ? 'bg-[var(--accent-primary)] text-white font-semibold' : 'text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors']">
                {{ totalPage }}
              </button>
              <button :disabled="currentPage >= totalPage" @click="goPage(currentPage + 1)" class="w-[32px] h-[32px] rounded-[8px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors disabled:opacity-40">
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showAddModal = false">
      <div class="bg-white rounded-[20px] w-[480px] shadow-[0_16px_48px_#0000001A] overflow-hidden">
        <!-- Modal Header -->
        <div class="flex items-center gap-[12px] px-[28px] py-[20px] border-b border-[var(--border-subtle)]">
          <div class="w-[40px] h-[40px] rounded-[12px] bg-[#FFF5EE] flex items-center justify-center">
            <UserPlus :size="20" class="text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 class="font-body text-[16px] font-semibold text-[var(--foreground-primary)]">Add New User</h3>
            <p class="font-caption text-[12px] text-[var(--foreground-muted)]">Fill in the details to create a user account</p>
          </div>
        </div>
        <!-- Modal Body -->
        <form @submit.prevent="handleAddUser" class="flex flex-col gap-[20px] px-[28px] py-[24px]">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Account <span class="text-red-400">*</span></label>
            <input v-model="addForm.userAccount" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" placeholder="Login account name" required />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Password <span class="text-red-400">*</span></label>
            <input v-model="addForm.userPassword" type="password" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" placeholder="Login password" required />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Display Name <span class="text-red-400">*</span></label>
            <input v-model="addForm.userName" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" placeholder="Display name" required />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Role</label>
            <select v-model="addForm.userRole" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none bg-white focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors cursor-pointer">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Profile</label>
            <textarea v-model="addForm.userProfile" rows="3" class="px-[14px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors resize-none" placeholder="User profile or bio description"></textarea>
          </div>
          <p v-if="addError" class="font-body text-[13px] text-red-500 bg-red-50 px-[14px] py-[10px] rounded-[8px]">{{ addError }}</p>
          <!-- Modal Footer -->
          <div class="flex justify-end gap-[12px] pt-[4px]">
            <button type="button" @click="showAddModal = false; addError = ''" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
            <button type="submit" :disabled="adding" class="flex items-center gap-[6px] px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-60 transition-colors">
              <UserPlus v-if="!adding" :size="16" />
              {{ adding ? 'Creating...' : 'Create User' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="deleteTarget = null">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl">
        <h3 class="font-heading text-[20px] font-bold text-[var(--foreground-primary)] mb-[12px]">Delete User</h3>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">
          Are you sure you want to delete <strong>{{ deleteTarget.userName }}</strong> ({{ deleteTarget.userAccount }})? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-[12px]">
          <button @click="deleteTarget = null" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]">Cancel</button>
          <button @click="handleDeleteUser" :disabled="deleting" class="px-[20px] py-[10px] rounded-[8px] bg-red-600 font-body text-[14px] text-white font-medium hover:bg-red-700 disabled:opacity-60">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { LayoutDashboard, Users, Folder, Settings, Search, SlidersHorizontal, UserPlus, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { api } from '../../api/client'
import { useToast } from '../../composables/useToast'

const toast = useToast()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const avatarColors = ['#FF8533', '#5C8AFF', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4']

const search = ref('')
const users = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRow = ref(0)
const totalPage = ref(0)

// Add User
const showAddModal = ref(false)
const adding = ref(false)
const addError = ref('')
const addForm = ref({ userName: '', userAccount: '', userPassword: '', userRole: 'user', userProfile: '' })

// Delete User
const deleteTarget = ref(null)
const deleting = ref(false)

const visiblePages = computed(() => {
  const pages = []
  const max = Math.min(5, totalPage.value)
  const start = Math.max(1, Math.min(currentPage.value - 2, totalPage.value - max + 1))
  for (let i = start; i < start + max; i++) pages.push(i)
  return pages
})

const showDots = computed(() => totalPage.value > 5 && currentPage.value + 2 < totalPage.value)

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toISOString().split('T')[0]
}

async function fetchUsers() {
  loading.value = true
  try {
    const params = { pageNum: currentPage.value, pageSize: pageSize.value }
    if (search.value) {
      params.userAccount = search.value
    }
    const result = await api.listUserVOPage(params)
    users.value = result.records
    totalRow.value = result.totalRow
    totalPage.value = result.totalPage
  } catch {
    users.value = []
    totalRow.value = 0
    totalPage.value = 0
  } finally {
    loading.value = false
  }
}

function searchUsers() {
  currentPage.value = 1
  fetchUsers()
}

function goPage(p) {
  if (p < 1 || p > totalPage.value || p === currentPage.value) return
  currentPage.value = p
  fetchUsers()
}

function confirmDeleteUser(user) {
  deleteTarget.value = user
}

async function handleDeleteUser() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await api.deleteUser(deleteTarget.value.id)
    deleteTarget.value = null
    // If last item on page was deleted, go back one page
    if (users.value.length <= 1 && currentPage.value > 1) {
      currentPage.value--
    }
    fetchUsers()
    toast.showSuccess('User deleted')
  } catch (e) {
    toast.showError(e.message || 'Failed to delete user')
  } finally {
    deleting.value = false
  }
}

async function handleAddUser() {
  addError.value = ''
  if (!addForm.value.userName || !addForm.value.userAccount || !addForm.value.userPassword) {
    addError.value = 'Name, Account and Password are required'
    return
  }
  adding.value = true
  try {
    await api.addUser({
      userName: addForm.value.userName,
      userAccount: addForm.value.userAccount,
      userPassword: addForm.value.userPassword,
      userRole: addForm.value.userRole,
      userProfile: addForm.value.userProfile || '',
      userAvatar: '',
    })
    addForm.value = { userName: '', userAccount: '', userPassword: '', userRole: 'user', userProfile: '' }
    showAddModal.value = false
    fetchUsers()
    toast.showSuccess('User added')
  } catch (e) {
    addError.value = e.message || 'Failed to add user'
  } finally {
    adding.value = false
  }
}

onMounted(fetchUsers)
</script>
