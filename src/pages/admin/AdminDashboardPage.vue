<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center justify-between h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">Overview</h1>
        <div class="flex items-center gap-[12px]">
          <button class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <Calendar :size="16" />
            Last 30 days
          </button>
          <button class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
            <Download :size="16" />
            Export Report
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-[32px]">
        <div class="flex flex-col gap-[24px] w-full">
          <!-- Stats Row -->
          <div class="flex gap-[20px] w-full">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-[8px] flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] p-[20px_24px]">
              <div class="flex items-center justify-between">
                <span class="font-caption text-[12px] text-[var(--foreground-muted)] uppercase tracking-wide">{{ stat.label }}</span>
                <TrendingUp v-if="stat.trend > 0" :size="20" class="text-green-500" />
                <TrendingDown v-else :size="20" class="text-red-500" />
              </div>
              <span class="font-heading text-[32px] font-bold text-[var(--foreground-primary)]">{{ stat.value }}</span>
              <span :class="['font-body text-[12px]', stat.trend > 0 ? 'text-green-600' : 'text-red-600']">
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% from last month
              </span>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="flex gap-[20px] w-full flex-1">
            <div class="flex flex-col gap-[16px] flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] p-[20px_24px]">
              <div class="flex items-center justify-between">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">User Growth</h3>
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">Monthly</span>
              </div>
              <div class="flex-1 flex items-end gap-[12px] min-h-[200px]">
                <div v-for="(val, i) in statsData.userGrowth" :key="i" class="flex-1 flex flex-col items-center gap-[6px]">
                  <div class="w-full rounded-t-[6px] bg-[var(--accent-primary)] transition-all" :style="{ height: (val / 1500 * 100) + '%', opacity: 0.3 + (val / 1500 * 0.7) }"></div>
                  <span class="font-caption text-[10px] text-[var(--foreground-muted)]">{{ months[i] }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-[16px] flex-1 bg-white rounded-[12px] border border-[var(--border-subtle)] p-[20px_24px]">
              <div class="flex items-center justify-between">
                <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">Project Growth</h3>
                <span class="font-caption text-[11px] text-[var(--foreground-muted)]">Monthly</span>
              </div>
              <div class="flex-1 flex items-end gap-[12px] min-h-[200px]">
                <div v-for="(val, i) in statsData.projectGrowth" :key="i" class="flex-1 flex flex-col items-center gap-[6px]">
                  <div class="w-full rounded-t-[6px] bg-[var(--accent-secondary)] transition-all" :style="{ height: (val / 1100 * 100) + '%', opacity: 0.3 + (val / 1100 * 0.7) }"></div>
                  <span class="font-caption text-[10px] text-[var(--foreground-muted)]">{{ months[i] }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="flex flex-col bg-white rounded-[12px] border border-[var(--border-subtle)] overflow-hidden">
            <div class="flex items-center justify-between p-[16px_24px] border-b border-[var(--border-subtle)]">
              <h3 class="font-body text-[15px] font-semibold text-[var(--foreground-primary)]">Recent Activity</h3>
              <a href="#" class="font-body text-[13px] text-[var(--accent-primary)] hover:underline">View all</a>
            </div>
            <div v-for="activity in statsData.recentActivity" :key="activity.id" class="flex items-center justify-between p-[14px_24px] hover:bg-[var(--surface-secondary)] transition-colors border-b border-[var(--border-subtle)] last:border-b-0">
              <div class="flex items-center gap-[12px]">
                <div class="w-[32px] h-[32px] rounded-full bg-[var(--surface-secondary)] flex items-center justify-center">
                  <span class="font-body text-[13px] font-medium text-[var(--foreground-secondary)]">{{ activity.user[0] }}</span>
                </div>
                <div>
                  <span class="font-body text-[13px] text-[var(--foreground-primary)]">
                    <strong>{{ activity.user }}</strong> {{ activity.action }}
                    <span v-if="activity.target" class="font-medium text-[var(--accent-primary)]">{{ activity.target }}</span>
                  </span>
                </div>
              </div>
              <span class="font-caption text-[12px] text-[var(--foreground-muted)]">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { LayoutDashboard, Users, Folder, Settings, Calendar, Download, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { mockApi } from '../../api/mock.js'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const stats = [
  { label: 'Total Users', value: '12,834', trend: 12.5 },
  { label: 'Total Projects', value: '45,210', trend: 18.2 },
  { label: 'Active Projects', value: '38,920', trend: 8.1 },
  { label: 'Revenue', value: '$284.5K', trend: -2.4 },
]

const statsData = ref({
  userGrowth: [120, 180, 250, 310, 420, 530, 680, 820, 950, 1100, 1280, 1430],
  projectGrowth: [80, 150, 220, 300, 380, 460, 550, 640, 720, 810, 900, 980],
  recentActivity: [
    { id: 1, user: 'Alice Chen', action: 'created a new project', target: 'SaaS Dashboard', time: '2 minutes ago' },
    { id: 2, user: 'Bob Williams', action: 'deployed', target: 'E-Commerce Store', time: '15 minutes ago' },
    { id: 3, user: 'Carol Smith', action: 'updated settings for', target: 'Blog Platform', time: '1 hour ago' },
    { id: 4, user: 'Dave Johnson', action: 'registered a new account', target: '', time: '2 hours ago' },
    { id: 5, user: 'Eve Brown', action: 'exported code for', target: 'Portfolio Site', time: '3 hours ago' },
  ],
})

onMounted(async () => {
  try {
    const data = await mockApi.getStats()
    statsData.value = data
  } catch (e) { /* use defaults */ }
})
</script>
