<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">User Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[var(--border-subtle)] w-[240px]">
            <span class="material-symbols-outlined text-[16px] text-[var(--foreground-muted)]">search</span>
            <input v-model="search" placeholder="Search users..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
          </div>
          <button class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            Add User
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-auto p-[32px]">
        <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden">
          <!-- Table Header -->
          <div class="flex items-center h-[48px] bg-[var(--surface-secondary)] border-b border-[var(--border-subtle)] px-[24px]">
            <div class="w-[48px]"></div>
            <div class="flex-1 font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Name</div>
            <div class="flex-1 font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Email</div>
            <div class="w-[100px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Role</div>
            <div class="w-[120px] font-caption text-[12px] font-medium text-[var(--foreground-secondary)] uppercase tracking-wide">Joined</div>
            <div class="w-[80px]"></div>
          </div>

          <!-- Table Rows -->
          <div v-for="user in filteredUsers" :key="user.id" class="flex items-center h-[56px] px-[24px] border-b border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] transition-colors">
            <div class="w-[48px]">
              <div class="w-[32px] h-[32px] rounded-full bg-[var(--accent-secondary)] flex items-center justify-center">
                <span class="font-body text-[13px] font-medium text-white">{{ user.name[0] }}</span>
              </div>
            </div>
            <div class="flex-1 font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ user.name }}</div>
            <div class="flex-1 font-body text-[13px] text-[var(--foreground-secondary)]">{{ user.email }}</div>
            <div class="w-[100px]">
              <span :class="[
                'inline-block px-[10px] py-[3px] rounded-full font-caption text-[11px] font-medium',
                user.role === 'admin'
                  ? 'bg-[#FFF5EE] text-[var(--accent-primary)]'
                  : 'bg-[var(--surface-secondary)] text-[var(--foreground-secondary)]'
              ]">
                {{ user.role === 'admin' ? 'Admin' : 'User' }}
              </span>
            </div>
            <div class="w-[120px] font-body text-[13px] text-[var(--foreground-muted)]">{{ user.joinedAt }}</div>
            <div class="w-[80px] flex items-center gap-[8px] justify-end">
              <button class="p-[6px] rounded-[6px] hover:bg-[var(--surface-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">
                <span class="material-symbols-outlined text-[16px]">edit</span>
              </button>
              <button @click="deleteUser(user.id)" class="p-[6px] rounded-[6px] hover:bg-red-50 text-[var(--foreground-muted)] hover:text-red-500 transition-colors">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredUsers.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
            No users found.
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-between h-[52px] px-[24px] bg-white border-t border-[var(--border-subtle)]">
            <span class="font-body text-[13px] text-[var(--foreground-muted)]">Showing {{ filteredUsers.length }} of {{ users.length }} users</span>
            <div class="flex items-center gap-[8px]">
              <button class="w-[32px] h-[32px] rounded-[6px] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors disabled:opacity-40">
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
const users = ref([])

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const q = search.value.toLowerCase()
  return users.value.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
})

onMounted(async () => {
  try {
    users.value = await mockApi.getUsers()
  } catch (e) {
    users.value = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joinedAt: '2026-01-15' },
      { id: 2, name: 'Admin', email: 'admin@codepilot.io', role: 'admin', joinedAt: '2025-11-01' },
      { id: 3, name: 'Alice Chen', email: 'alice@example.com', role: 'user', joinedAt: '2026-02-20' },
      { id: 4, name: 'Bob Williams', email: 'bob@example.com', role: 'user', joinedAt: '2026-03-08' },
      { id: 5, name: 'Carol Smith', email: 'carol@example.com', role: 'user', joinedAt: '2026-03-15' },
    ]
  }
})

async function deleteUser(id) {
  if (!confirm('Delete this user?')) return
  await mockApi.deleteUser(id)
  users.value = users.value.filter(u => u.id !== id)
}
</script>
