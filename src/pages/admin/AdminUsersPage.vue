<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">User Management</h1>
        <div class="flex items-center gap-[12px]">
          <div class="flex items-center gap-[8px] h-[36px] px-[12px] rounded-[8px] border border-[#E5E7EB] w-[240px]">
            <Search :size="14" class="text-[var(--foreground-muted)]" />
            <input v-model="search" placeholder="Search users..." class="flex-1 font-body text-[12px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
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
            <div class="w-[240px] font-body text-[13px] font-bold text-[#4A4A4A]">User</div>
            <div class="flex-1 font-body text-[13px] font-bold text-[#4A4A4A]">Email</div>
            <div class="w-[100px] font-body text-[13px] font-bold text-[#4A4A4A]">Role</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Projects</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Status</div>
            <div class="w-[80px] font-body text-[13px] font-bold text-[#4A4A4A]">Actions</div>
          </div>

          <!-- Table Rows -->
          <div
            v-for="(user, idx) in filteredUsers"
            :key="user.id"
            class="flex items-center h-[48px] px-[20px] hover:bg-[var(--surface-secondary)] transition-colors"
            :style="{ borderTop: idx === 0 ? 'none' : '1px solid var(--border-subtle)' }"
          >
            <!-- User: avatar + name -->
            <div class="flex items-center gap-[10px] w-[240px]">
              <div class="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0" :style="{ background: user.avatarColor }">
                <span class="font-body text-[13px] font-medium text-white">{{ user.name[0] }}</span>
              </div>
              <span class="font-body text-[13px] text-[var(--foreground-primary)]">{{ user.name }}</span>
            </div>
            <!-- Email -->
            <span class="flex-1 font-body text-[13px] text-[var(--foreground-secondary)]">{{ user.email }}</span>
            <!-- Role -->
            <div class="w-[100px]">
              <span
                :class="[
                  'inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]',
                  user.role === 'admin' ? 'text-[#1565C0]' : 'text-[var(--foreground-secondary)]'
                ]"
                :style="{ background: user.role === 'admin' ? '#E3F2FD' : 'var(--surface-secondary)' }"
              >
                {{ user.role === 'admin' ? 'Admin' : 'User' }}
              </span>
            </div>
            <!-- Projects -->
            <span class="w-[80px] font-body text-[13px] text-[var(--foreground-primary)]">{{ user.projectCount }}</span>
            <!-- Status -->
            <div class="w-[80px]">
              <span
                :class="[
                  'inline-block px-[8px] py-[3px] rounded-full font-caption text-[11px]',
                  user.status === 'Active' ? 'text-[#2E7D32]' : 'text-[#C62828]'
                ]"
                :style="{ background: user.status === 'Active' ? '#E8F5E9' : '#FFEBEE' }"
              >
                {{ user.status }}
              </span>
            </div>
            <!-- Actions -->
            <div class="w-[80px] flex justify-center">
              <button class="text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">
                <Ellipsis :size="16" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredUsers.length === 0" class="flex items-center justify-center h-[120px] font-body text-[14px] text-[var(--foreground-muted)]">
            No users found.
          </div>

          <!-- Divider -->
          <div class="h-[1px] bg-[var(--border-subtle)] flex-shrink-0"></div>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-[20px] py-[12px] bg-white">
            <span class="font-body text-[12px] text-[var(--foreground-muted)]">Showing 1-4 of 5,847 users</span>
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
              <button class="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">146</button>
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
import { LayoutDashboard, Users, Folder, Settings, Search, SlidersHorizontal, Ellipsis, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { mockApi } from '../../api/mock.js'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const search = ref('')
const users = ref([])

const avatarColors = ['#FF8533', '#5C8AFF', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4']

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const q = search.value.toLowerCase()
  return users.value.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
})

onMounted(async () => {
  try {
    const raw = await mockApi.getUsers()
    users.value = raw.map((u, i) => ({
      ...u,
      avatarColor: avatarColors[i % avatarColors.length],
      projectCount: [24, 12, 8, 3, 15, 6][i] || Math.floor(Math.random() * 20 + 1),
      status: i === 3 ? 'Disabled' : 'Active',
    }))
  } catch (e) {
    users.value = [
      { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'admin', avatarColor: '#FF8533', projectCount: 24, status: 'Active' },
      { id: 2, name: 'Mike Liu', email: 'mike@example.com', role: 'user', avatarColor: '#5C8AFF', projectCount: 12, status: 'Active' },
      { id: 3, name: 'Anna Park', email: 'anna@example.com', role: 'user', avatarColor: '#4CAF50', projectCount: 8, status: 'Active' },
      { id: 4, name: 'Tom Wang', email: 'tom@example.com', role: 'user', avatarColor: '#FF9800', projectCount: 3, status: 'Disabled' },
    ]
  }
})
</script>
