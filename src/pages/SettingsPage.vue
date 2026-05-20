<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AppSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full overflow-auto">
      <div class="flex flex-col gap-[36px] p-[48px] max-w-[800px]">
        <div class="flex flex-col gap-[8px]">
          <h1 class="font-heading text-[28px] font-bold text-[var(--foreground-primary)]">Settings</h1>
          <p class="font-body text-[14px] text-[var(--foreground-secondary)]">Manage your account and preferences</p>
        </div>

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
            <component :is="tab.icon" :size="18" />
            {{ tab.label }}
          </button>
        </div>

        <div class="flex flex-col gap-[28px] w-full max-w-[560px]">
          <div class="flex items-center gap-[16px]">
            <div class="w-[64px] h-[64px] rounded-full bg-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0">
              <span class="font-heading text-[24px] font-bold text-white">{{ userInitial }}</span>
            </div>
            <div>
              <p class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ auth.user.value?.userName || 'User' }}</p>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)]">{{ auth.user.value?.userAccount || '' }}</p>
            </div>
          </div>

          <div class="flex gap-[16px] w-full">
            <div class="flex flex-col gap-[6px] flex-1">
              <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Display Name</label>
              <input v-model="form.userName" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" />
            </div>
            <div class="flex flex-col gap-[6px] flex-1">
              <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Account</label>
              <input :value="form.userAccount" disabled class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-muted)] outline-none bg-[var(--surface-secondary)] cursor-not-allowed" />
            </div>
          </div>

          <div class="flex flex-col gap-[6px] w-full">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Profile</label>
            <textarea v-model="form.userProfile" rows="3" placeholder="Tell us about yourself..." class="px-[14px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors resize-none"></textarea>
          </div>

          <div class="w-full h-[1px] bg-[var(--border-subtle)]"></div>

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

          <div class="flex justify-end gap-[12px] w-full">
            <button @click="resetForm" class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">Cancel</button>
            <button @click="saveProfile" :disabled="saving" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
          <p v-if="saveError" class="font-body text-[13px] text-red-500 text-center">{{ saveError }}</p>
        </div>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showDeleteConfirm = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl">
        <h3 class="font-heading text-[20px] font-bold text-[var(--foreground-primary)] mb-[12px]">Delete Account</h3>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">Are you sure? This cannot be undone.</p>
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
import { MonitorDot, Star, Palette, User, Bell, CreditCard } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'
import { api } from '../api/client'

const router = useRouter()
const auth = useAuth()

const navItems = [
  { to: '/dashboard', label: 'Projects', icon: MonitorDot },
  { to: '/featured', label: 'Featured', icon: Star },
  { to: '/settings', label: 'Settings', icon: Palette },
]

const tabs = [
  { label: 'Profile', value: 'profile', icon: User },
  { label: 'Notifications', value: 'notifications', icon: Bell },
  { label: 'Billing', value: 'billing', icon: CreditCard },
]

const activeTab = ref('profile')
const saving = ref(false)
const saveError = ref('')
const showDeleteConfirm = ref(false)

// Init form from auth store
const form = ref({
  userName: auth.user.value?.userName || '',
  userAccount: auth.user.value?.userAccount || '',
  userProfile: auth.user.value?.userProfile || '',
})

const userInitial = computed(() => (form.value.userName || 'U')[0].toUpperCase())

async function saveProfile() {
  saveError.value = ''
  saving.value = true
  try {
    const userId = auth.user.value?.id
    if (!userId) throw new Error('Not authenticated')

    await api.updateUser({
      id: userId,
      userName: form.value.userName,
      userAvatar: auth.user.value?.userAvatar || '',
      userProfile: form.value.userProfile,
    })
    // Refresh user data from server
    await auth.fetchCurrentUser()
  } catch (e) {
    saveError.value = e.message
  } finally {
    saving.value = false
  }
}

function confirmDelete() {
  showDeleteConfirm.value = true
}

function resetForm() {
  form.value = {
    userName: auth.user.value?.userName || '',
    userAccount: auth.user.value?.userAccount || '',
    userProfile: auth.user.value?.userProfile || '',
  }
  saveError.value = ''
}

async function deleteAccount() {
  const userId = auth.user.value?.id
  if (!userId) return
  try {
    await api.deleteUser(userId)
  } catch (e) {
    saveError.value = e.message || '删除账号失败'
    showDeleteConfirm.value = false
    return
  }
  await auth.logout()
  router.push('/')
}
</script>
