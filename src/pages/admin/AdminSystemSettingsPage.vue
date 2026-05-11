<template>
  <div class="flex w-full h-screen bg-[var(--surface-secondary)]">
    <AdminSidebar :navItems="navItems" />

    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-center h-[64px] px-[32px] bg-white border-b border-[var(--border-subtle)]">
        <h1 class="font-heading text-[24px] font-bold text-[var(--foreground-primary)]">System Settings</h1>
      </div>

      <div class="flex-1 overflow-auto p-[32px]">
        <div class="flex flex-col gap-[24px] w-full max-w-[800px]">
          <!-- AI Model Configuration -->
          <div class="flex flex-col gap-[20px] bg-white rounded-[12px] border border-[var(--border-subtle)] p-[24px]">
            <div>
              <h3 class="font-body text-[16px] font-semibold text-[var(--foreground-primary)]">AI Model Configuration</h3>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)] mt-[4px]">Configure the AI models used for code generation</p>
            </div>
            <div class="flex flex-col gap-[16px]">
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Default Model</label>
                <select v-model="aiConfig.model" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none bg-white focus:border-[var(--accent-primary)]">
                  <option value="claude-4">Claude Opus 4</option>
                  <option value="claude-sonnet-4">Claude Sonnet 4</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="deepseek-v3">DeepSeek V3</option>
                </select>
              </div>
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Temperature</label>
                <div class="flex items-center gap-[12px]">
                  <input type="range" v-model.number="aiConfig.temperature" min="0" max="1" step="0.1" class="flex-1 accent-[var(--accent-primary)]" />
                  <span class="font-body text-[14px] text-[var(--foreground-primary)] w-[36px] text-right">{{ aiConfig.temperature }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Max Tokens</label>
                <input v-model.number="aiConfig.maxTokens" type="number" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">API Key</label>
                <div class="flex items-center gap-[12px]">
                  <input :type="showKey ? 'text' : 'password'" v-model="aiConfig.apiKey" class="flex-1 h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)]" />
                  <button type="button" @click="showKey = !showKey" class="p-[6px] rounded-[6px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                    <EyeOff v-if="showKey" :size="20" />
                    <Eye v-else :size="20" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Usage Limits -->
          <div class="flex flex-col gap-[20px] bg-white rounded-[12px] border border-[var(--border-subtle)] p-[24px]">
            <div>
              <h3 class="font-body text-[16px] font-semibold text-[var(--foreground-primary)]">Usage Limits</h3>
              <p class="font-body text-[13px] text-[var(--foreground-secondary)] mt-[4px]">Set usage quotas for different user tiers</p>
            </div>
            <div class="flex flex-col gap-[16px]">
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Free Tier - Monthly Generations</label>
                <input v-model.number="limits.freeGenerations" type="number" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Pro Tier - Monthly Generations</label>
                <input v-model.number="limits.proGenerations" type="number" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
              <div class="flex flex-col gap-[6px]">
                <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Max Project Size (MB)</label>
                <input v-model.number="limits.maxProjectSize" type="number" class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
              <label class="flex items-center gap-[8px] cursor-pointer mt-[4px]">
                <input type="checkbox" v-model="limits.requireEmailVerification" class="w-[16px] h-[16px] rounded-[4px] accent-[var(--accent-primary)]" />
                <span class="font-body text-[13px] text-[var(--foreground-secondary)]">Require email verification before first generation</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-[12px] w-full">
            <button class="px-[20px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
              Reset to Default
            </button>
            <button @click="saveSettings" :disabled="saving" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60">
              {{ saving ? 'Saving...' : 'Save Settings' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { LayoutDashboard, Users, Folder, Settings, Eye, EyeOff } from 'lucide-vue-next'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: Folder },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const showKey = ref(false)
const saving = ref(false)

const aiConfig = ref({
  model: 'claude-4',
  temperature: 0.7,
  maxTokens: 8192,
  apiKey: 'sk-••••••••••••••••••••',
})

const limits = ref({
  freeGenerations: 10,
  proGenerations: 500,
  maxProjectSize: 50,
  requireEmailVerification: true,
})

async function saveSettings() {
  saving.value = true
  await new Promise(r => setTimeout(r, 800))
  saving.value = false
}
</script>
