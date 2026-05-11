<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 h-full overflow-auto">
      <div class="flex flex-col gap-[36px] p-[48px] max-w-[800px]">
        <!-- Header -->
        <div class="flex flex-col gap-[8px]">
          <h1 class="font-heading text-[28px] font-bold text-[var(--foreground-primary)]">Settings</h1>
          <p class="font-body text-[14px] text-[var(--foreground-secondary)]">Manage your account and preferences</p>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-[var(--border-subtle)]">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              'flex items-center gap-[6px] px-[16px] py-[8px] font-body text-[14px] transition-colors',
              activeTab === tab.value
                ? 'text-[var(--accent-primary)] border-b-[2px] border-[var(--accent-primary)] font-medium'
                : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground-primary)]'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-[28px] w-full max-w-[560px]">
          <!-- Avatar Section -->
          <div class="flex items-center gap-[16px]">
            <div class="w-[64px] h-[64px] rounded-full bg-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0">
              <span class="font-heading text-[24px] font-bold text-white">{{ userInitial }}</span>
            </div>
            <div>
              <p class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ user.name }}</p>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)]">{{ user.email }}</p>
            </div>
          </div>

          <!-- Name & Email Row -->
          <div class="flex gap-[16px] w-full">
            <div class="flex flex-col gap-[6px] flex-1">
              <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Full Name</label>
              <input v-model="form.name" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" />
            </div>
            <div class="flex flex-col gap-[6px] flex-1">
              <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Email</label>
              <input v-model="form.email" type="email" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" />
            </div>
          </div>

          <!-- Bio -->
          <div class="flex flex-col gap-[6px] w-full">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Bio</label>
            <textarea
              v-model="form.bio"
              rows="3"
              placeholder="Tell us about yourself..."
              class="px-[14px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Divider -->
          <div class="w-full h-[1px] bg-[var(--border-subtle)]"></div>

          <!-- Danger Zone -->
          <div class="flex flex-col gap-[12px]">
            <h3 class="font-body text-[15px] font-semibold text-[#D32F2F]">Danger Zone</h3>
            <div class="flex items-center justify-between w-full p-[16px_20px] rounded-[8px] border border-red-200 bg-red-50">
              <div>
                <p class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">Delete your account</p>
                <p class="font-body text-[12px] text-[var(--foreground-secondary)]">Permanently delete your account and all data</p>
              </div>
              <button @click="confirmDelete" class="px-[16px] py-[8px] rounded-[8px] border border-red-300 font-body text-[13px] text-red-600 font-medium hover:bg-red-100 transition-colors">
                Delete Account
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-[12px] w-full">
            <button class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
              Cancel
            </button>
            <button @click="saveProfile" :disabled="saving" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showDeleteConfirm = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl">
        <h3 class="font-heading text-[20px] font-bold text-[var(--foreground-primary)] mb-[12px]">Delete Account</h3>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="flex justify-end gap-[12px]">
          <button @click="showDeleteConfirm = false" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)]">Cancel</button>
          <button @click="deleteAccount" class="px-[20px] py-[10px] rounded-[8px] bg-red-600 font-body text-[14px] text-white font-medium hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '../components/AppSidebar.vue'
import { mockApi } from '../api/mock.js'

const router = useRouter()

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: 'dashboard' },
  { to: '/templates', label: 'Templates', icon: 'grid_view' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

const tabs = [
  { label: 'Profile', value: 'profile', icon: 'person' },
  { label: 'Notifications', value: 'notifications', icon: 'notifications' },
  { label: 'Billing', value: 'billing', icon: 'credit_card' },
]

const activeTab = ref('profile')
const saving = ref(false)
const showDeleteConfirm = ref(false)

const user = ref(JSON.parse(localStorage.getItem('codepilot_user') || '{"name":"John Doe","email":"john@example.com","bio":""}'))
const form = ref({
  name: user.value.name || 'John Doe',
  email: user.value.email || 'john@example.com',
  bio: user.value.bio || '',
})

const userInitial = computed(() => (form.value.name || 'U')[0].toUpperCase())

async function saveProfile() {
  saving.value = true
  try {
    const updated = await mockApi.updateProfile({ name: form.value.name, email: form.value.email, bio: form.value.bio })
    user.value = updated
  } finally {
    saving.value = false
  }
}

function confirmDelete() {
  showDeleteConfirm.value = true
}

async function deleteAccount() {
  await mockApi.deleteAccount()
  router.push('/')
}
</script>
