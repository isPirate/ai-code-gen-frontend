<template>
  <div class="flex flex-col w-full h-screen bg-[var(--surface-primary)]">
    <!-- Toolbar -->
    <div class="flex items-center justify-between h-[56px] px-[16px] bg-white border-b border-[var(--border-subtle)]">
      <div class="flex items-center gap-[8px]">
        <button @click="$router.back()" class="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[8px] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
        <div class="w-[1px] h-[24px] bg-[var(--border-subtle)]"></div>
        <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ projectName }}</span>
        <span class="px-[6px] py-[2px] rounded-[6px] bg-[#FFF5EE] font-caption text-[10px] text-[var(--accent-primary)]">Draft</span>
      </div>
      <div class="flex items-center gap-[8px]">
        <button class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
          <span class="material-symbols-outlined text-[16px]">download</span>
          Export
        </button>
        <button class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
          <span class="material-symbols-outlined text-[16px]">rocket_launch</span>
          Deploy
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Chat Panel -->
      <div class="flex flex-col w-[360px] bg-white border-r border-[var(--border-subtle)]">
        <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] gap-[8px]">
          <span class="material-symbols-outlined text-[18px] text-[var(--accent-primary)]">sparkles</span>
          <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">AI Assistant</span>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-auto p-[16px] flex flex-col gap-[16px]">
          <div v-for="(msg, i) in messages" :key="i" :class="['flex gap-[8px]', msg.role === 'user' ? 'justify-end' : '']">
            <div v-if="msg.role === 'ai'" class="w-[28px] h-[28px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[16px] text-white">sparkles</span>
            </div>
            <div
              :class="[
                'rounded-[12px] p-[10px_14px] font-body text-[13px] leading-relaxed max-w-[260px]',
                msg.role === 'user'
                  ? 'bg-[var(--accent-primary)] text-white rounded-tr-[4px]'
                  : 'bg-[var(--surface-secondary)] text-[var(--foreground-primary)] rounded-tl-[4px]'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="flex items-center gap-[8px] p-[12px_16px] border-t border-[var(--border-subtle)]">
          <input
            v-model="chatInput"
            @keydown.enter="sendMessage"
            placeholder="Describe changes..."
            class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent"
          />
          <button @click="sendMessage" class="w-[32px] h-[32px] rounded-[8px] bg-[var(--accent-primary)] flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors">
            <span class="material-symbols-outlined text-[16px] text-white">arrow_upward</span>
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="flex flex-col flex-1 bg-[var(--surface-secondary)]">
        <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] bg-white gap-[16px]">
          <div class="flex items-center gap-[8px]">
            <span class="w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-[#FFBC2E]"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-[#28CA41]"></span>
          </div>
          <div class="flex items-center gap-[8px]">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'px-[10px] py-[4px] rounded-[6px] font-body text-[12px] transition-colors',
                activeTab === tab.value
                  ? 'bg-[var(--surface-secondary)] text-[var(--foreground-primary)] font-medium'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)]'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Preview Content -->
        <div class="flex-1 overflow-auto p-[24px] flex items-center justify-center">
          <div class="w-full max-w-[700px] bg-white rounded-[12px] border border-[var(--border-subtle)] shadow-sm overflow-hidden">
            <div class="flex h-[44px] border-b border-[var(--border-subtle)]">
              <div class="flex items-center gap-[8px] px-[16px] border-b-[2px] border-[var(--accent-primary)]">
                <span class="font-body text-[13px] font-medium text-[var(--accent-primary)]">Overview</span>
              </div>
              <div class="flex items-center gap-[8px] px-[16px]">
                <span class="font-body text-[13px] text-[var(--foreground-muted)]">Analytics</span>
              </div>
              <div class="flex items-center gap-[8px] px-[16px]">
                <span class="font-body text-[13px] text-[var(--foreground-muted)]">Reports</span>
              </div>
            </div>
            <div class="p-[20px] grid grid-cols-4 gap-[16px]">
              <div v-for="i in 4" :key="i" class="bg-[var(--surface-secondary)] rounded-[8px] p-[14px]">
                <div class="w-full h-[8px] rounded-full bg-[#E5E7EB] mb-[8px]"></div>
                <div class="w-2/3 h-[12px] rounded-full bg-[#D1D5DB] mb-[4px]"></div>
                <div class="w-1/3 h-[8px] rounded-full bg-[#E5E7EB]"></div>
              </div>
            </div>
            <div class="px-[20px] pb-[20px]">
              <div class="w-full h-[160px] rounded-[8px] bg-[var(--surface-secondary)] flex items-center justify-center">
                <span class="font-body text-[13px] text-[var(--foreground-muted)]">Chart preview area</span>
              </div>
            </div>
            <div class="px-[20px] pb-[20px] grid grid-cols-2 gap-[16px]">
              <div class="bg-[var(--surface-secondary)] rounded-[8px] p-[14px]">
                <div class="w-full h-[6px] rounded-full bg-[#E5E7EB] mb-[6px]"></div>
                <div class="w-3/4 h-[6px] rounded-full bg-[#E5E7EB] mb-[6px]"></div>
                <div class="w-1/2 h-[6px] rounded-full bg-[#E5E7EB]"></div>
              </div>
              <div class="bg-[var(--surface-secondary)] rounded-[8px] p-[14px]">
                <div class="w-full h-[6px] rounded-full bg-[#E5E7EB] mb-[6px]"></div>
                <div class="w-3/4 h-[6px] rounded-full bg-[#E5E7EB] mb-[6px]"></div>
                <div class="w-1/2 h-[6px] rounded-full bg-[#E5E7EB]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projectName = ref('Untitled Project')
const chatInput = ref('')
const activeTab = ref('preview')

const tabs = [
  { label: 'Preview', value: 'preview' },
  { label: 'Code', value: 'code' },
  { label: 'Files', value: 'files' },
]

const messages = ref([
  { role: 'ai', text: "Hi! I'm your AI assistant. Describe the app you want to build, and I'll generate it for you." },
  { role: 'user', text: 'I want a modern SaaS dashboard with analytics' },
  { role: 'ai', text: "Here's your dashboard! I've added analytics charts, user metrics, and a sidebar navigation. You can preview it on the right." },
])

function sendMessage() {
  const text = chatInput.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', text })
  chatInput.value = ''

  setTimeout(() => {
    messages.value.push({ role: 'ai', text: "I've updated the preview based on your request. Check the right panel to see the changes!" })
  }, 800)
}
</script>
