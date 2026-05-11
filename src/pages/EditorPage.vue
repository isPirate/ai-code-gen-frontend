<template>
  <div class="flex flex-col w-full h-screen bg-[var(--surface-primary)]">
    <!-- Toolbar -->
    <div class="flex items-center justify-between h-[56px] px-[16px] bg-white border-b border-[var(--border-subtle)]">
      <div class="flex items-center gap-[8px]">
        <button @click="$router.back()" class="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[8px] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
          <ArrowLeft :size="18" />
          Back
        </button>
        <div class="w-[1px] h-[24px] bg-[var(--border-subtle)]"></div>
        <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ projectName }}</span>
        <span class="px-[6px] py-[2px] rounded-[6px] bg-[#FFF5EE] font-caption text-[10px] text-[var(--accent-primary)]">Draft</span>
      </div>
      <div class="flex items-center gap-[8px]">
        <button class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
          <Download :size="16" />
          Export
        </button>
        <button class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
          <Rocket :size="16" />
          Deploy
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Chat Panel -->
      <div class="flex flex-col w-[360px] bg-white border-r border-[var(--border-subtle)]">
        <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] gap-[8px]">
          <Sparkles :size="18" class="text-[var(--accent-primary)]" />
          <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">AI Assistant</span>
        </div>

        <div class="flex-1 overflow-auto p-[16px] flex flex-col gap-[16px]">
          <div v-for="(msg, i) in messages" :key="i" :class="['flex gap-[8px]', msg.role === 'user' ? 'justify-end' : '']">
            <div v-if="msg.role === 'ai'" class="w-[28px] h-[28px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
              <Sparkles :size="14" class="text-white" />
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

        <div class="flex items-center gap-[8px] p-[12px_16px] border-t border-[var(--border-subtle)]">
          <input
            v-model="chatInput"
            @keydown.enter="sendMessage"
            placeholder="Describe changes..."
            class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent"
          />
          <button @click="sendMessage" class="w-[32px] h-[32px] rounded-[8px] bg-[var(--accent-primary)] flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors">
            <ArrowUp :size="16" class="text-white" />
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
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
              :class="['px-[10px] py-[4px] rounded-[6px] font-body text-[12px] transition-colors',
                activeTab === tab.value
                  ? 'bg-[var(--surface-secondary)] text-[var(--foreground-primary)] font-medium'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)]']">
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-auto p-[24px] flex items-center justify-center">
          <div class="w-full max-w-[700px] bg-white rounded-[12px] border border-[var(--border-subtle)] shadow-sm overflow-hidden">
            <div class="flex h-[44px] border-b border-[var(--border-subtle)]">
              <div class="flex items-center gap-[8px] px-[16px] border-b-[2px] border-[var(--accent-primary)]">
                <span class="font-body text-[13px] font-medium text-[var(--accent-primary)]">Overview</span>
              </div>
              <div class="flex items-center gap-[8px] px-[16px]"><span class="font-body text-[13px] text-[var(--foreground-muted)]">Analytics</span></div>
              <div class="flex items-center gap-[8px] px-[16px]"><span class="font-body text-[13px] text-[var(--foreground-muted)]">Reports</span></div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Download, Rocket, Sparkles, ArrowUp } from 'lucide-vue-next'

const route = useRoute()

const projectName = ref(route.query.name || 'Untitled Project')
const chatInput = ref('')
const activeTab = ref('preview')

const tabs = [
  { label: 'Preview', value: 'preview' },
  { label: 'Code', value: 'code' },
  { label: 'Files', value: 'files' },
]

// If coming from landing page with a prompt, show it
const initialPrompt = route.query.prompt || ''

const messages = ref([
  { role: 'ai', text: "Hi! I'm your AI assistant. Describe the app you want to build, and I'll generate it for you." },
])

if (initialPrompt) {
  messages.value.push({ role: 'user', text: initialPrompt })
  messages.value.push({ role: 'ai', text: "Here's what I've built based on your description! You can preview it on the right, or describe changes to refine it." })
}

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
