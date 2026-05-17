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
        <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">{{ app?.appName || 'New Project' }}</span>
        <span class="px-[6px] py-[2px] rounded-[6px] font-caption text-[10px]"
          :class="app?.deployKey || deployUrl ? 'bg-green-50 text-green-700' : 'bg-[#FFF5EE] text-[var(--accent-primary)]'">
          {{ app?.deployKey || deployUrl ? 'Deployed' : 'Draft' }}
        </span>
        <template v-if="deployUrl">
          <div class="w-[1px] h-[24px] bg-[var(--border-subtle)]"></div>
          <a :href="deployUrl" target="_blank" class="flex items-center gap-[4px] font-body text-[12px] text-[var(--accent-primary)] hover:underline">
            <ExternalLink :size="14" />
            {{ deployUrl }}
          </a>
        </template>
      </div>
      <div class="flex items-center gap-[8px]">
        <button class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
          <Download :size="16" />
          Export
        </button>
        <button
          v-if="appId"
          @click="handleDeploy"
          :disabled="deploying"
          class="flex items-center gap-[6px] px-[12px] py-[7px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[13px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60"
        >
          <Rocket :size="16" />
          {{ deploying ? 'Deploying...' : 'Deploy' }}
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Chat Panel -->
      <div class="flex flex-col bg-white border-r border-[var(--border-subtle)] relative" :style="{ width: chatWidth + 'px', minWidth: chatWidth + 'px' }">
        <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] gap-[8px]">
          <Sparkles :size="18" class="text-[var(--accent-primary)]" />
          <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">AI Assistant</span>
        </div>

        <div ref="chatContainer" @scroll="onChatScroll" class="flex-1 overflow-auto p-[16px] flex flex-col gap-[16px]">
          <div v-if="loadingApp" class="flex items-center justify-center h-full">
            <span class="font-body text-[13px] text-[var(--foreground-muted)]">Loading app...</span>
          </div>

          <template v-else>
            <div v-for="(msg, i) in messages" :key="i" :class="['flex gap-[8px] group', msg.role === 'user' ? 'justify-end' : '']">
              <div v-if="msg.role === 'ai'" class="w-[28px] h-[28px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                <Sparkles :size="14" class="text-white" />
              </div>
              <div
                v-if="msg.role === 'user'"
                class="relative rounded-[12px] p-[10px_14px] bg-[var(--accent-primary)] text-white rounded-tr-[4px] font-body text-[13px] leading-relaxed max-w-[260px] whitespace-pre-wrap"
              >
                {{ msg.text }}
                <button @click="copyMsg(i)" class="absolute bottom-[2px] right-[4px] w-[22px] h-[22px] rounded-[4px] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" title="Copy">
                  <Check v-if="copiedIdx === i" :size="12" class="text-green-300" />
                  <Copy v-else :size="12" />
                </button>
              </div>
              <div
                v-else
                class="relative rounded-[12px] p-[14px_18px] bg-[var(--surface-secondary)] text-[var(--foreground-primary)] rounded-tl-[4px] flex-1 min-w-0"
              >
                <MarkdownRenderer :content="msg.text" />
                <div class="absolute top-[6px] right-[8px] flex items-center gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span v-if="copiedIdx === i" class="font-caption text-[11px] text-green-600">Copied!</span>
                  <button @click="copyMsg(i)" class="w-[26px] h-[26px] rounded-[4px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[#00000008]" title="Copy">
                    <Check v-if="copiedIdx === i" :size="13" class="text-green-500" />
                    <Copy v-else :size="13" />
                  </button>
                </div>
              </div>
            </div>

            <div v-if="streaming" class="flex items-center gap-[4px] px-[8px]">
              <span class="w-[6px] h-[6px] rounded-full bg-[var(--accent-primary)] animate-bounce"></span>
              <span class="w-[6px] h-[6px] rounded-full bg-[var(--accent-primary)] animate-bounce" style="animation-delay: 0.1s"></span>
              <span class="w-[6px] h-[6px] rounded-full bg-[var(--accent-primary)] animate-bounce" style="animation-delay: 0.2s"></span>
            </div>
          </template>
        </div>

        <!-- Scroll-to-bottom button -->
        <div v-if="!nearBottom" class="absolute bottom-[60px] left-1/2 -translate-x-1/2 z-10">
          <button @click="scrollToBottom(); nearBottom = true" class="w-[36px] h-[36px] rounded-full bg-white border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--surface-secondary)] transition-all">
            <ChevronDown :size="18" class="text-[var(--foreground-secondary)]" />
          </button>
        </div>

        <div class="flex items-center gap-[8px] p-[12px_16px] border-t border-[var(--border-subtle)]">
          <input
            v-model="chatInput"
            @keydown.enter="sendMessage"
            :disabled="streaming"
            placeholder="Describe changes..."
            class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent disabled:opacity-40"
          />
          <button
            @click="sendMessage"
            :disabled="streaming || !chatInput.trim()"
            class="w-[32px] h-[32px] rounded-[8px] bg-[var(--accent-primary)] flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40"
          >
            <ArrowUp :size="16" class="text-white" />
          </button>
        </div>
      </div>

      <!-- Resize Handle -->
      <div
        class="w-[5px] bg-transparent hover:bg-[var(--accent-primary)] cursor-col-resize flex-shrink-0 transition-colors relative group"
        @mousedown="onResizeStart"
      >
        <div class="absolute inset-y-0 -left-[4px] -right-[4px]"></div>
      </div>

      <!-- Preview Panel -->
      <div class="flex flex-col flex-1 bg-[var(--surface-secondary)] min-w-0">
        <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] bg-white gap-[16px]">
          <div class="flex items-center gap-[8px]">
            <span class="w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-[#FFBC2E]"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-[#28CA41]"></span>
          </div>
          <div class="flex items-center gap-[8px]">
            <span class="px-[10px] py-[4px] rounded-[6px] bg-[var(--surface-secondary)] font-body text-[12px] font-medium text-[var(--foreground-primary)]">Preview</span>
          </div>
        </div>

        <div class="flex-1 overflow-auto">
          <div v-if="loadingApp" class="flex items-center justify-center h-full">
            <span class="font-body text-[14px] text-[var(--foreground-muted)]">Loading app...</span>
          </div>

          <div v-else-if="loadError" class="flex items-center justify-center h-full">
            <div class="text-center">
              <span class="font-body text-[14px] text-red-500">{{ loadError }}</span>
            </div>
          </div>

          <iframe
            v-else-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full border-0"
          ></iframe>

          <div v-else-if="streaming" class="flex items-center justify-center h-full">
            <div class="text-center">
              <Sparkles :size="24" class="text-[var(--accent-primary)] mx-auto mb-[12px] animate-pulse" />
              <span class="font-body text-[14px] text-[var(--foreground-muted)]">Generating preview...</span>
            </div>
          </div>

          <div v-else class="flex items-center justify-center h-full p-[24px]">
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
                  <span class="font-body text-[13px] text-[var(--foreground-muted)]">Chat with AI to generate your app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deploy Result Modal -->
    <div v-if="showDeployResult" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showDeployResult = false">
      <div class="bg-white rounded-[16px] p-[32px] w-[480px] shadow-xl">
        <div class="flex items-center gap-[12px] mb-[16px]">
          <div class="w-[40px] h-[40px] rounded-full bg-green-50 flex items-center justify-center">
            <Rocket :size="20" class="text-green-600" />
          </div>
          <h3 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)]">Deployed!</h3>
        </div>
        <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[16px]">Your app is now live at:</p>
        <a :href="deployUrl" target="_blank" class="block font-body text-[14px] text-[var(--accent-primary)] underline break-all mb-[24px]">{{ deployUrl }}</a>
        <div class="flex justify-end gap-[12px]">
          <button @click="showDeployResult = false" class="px-[20px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">Close</button>
        </div>
      </div>
    </div>
    <!-- Drag overlay — captures mouse events over iframe -->
    <div v-if="resizing" class="fixed inset-0 z-[9999] cursor-col-resize" @mousemove="onResizeMove" @mouseup="onResizeEnd"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Check, ChevronDown, Copy, Download, ExternalLink, Rocket, Sparkles, ArrowUp } from 'lucide-vue-next'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { api } from '../api/client'

const route = useRoute()
const router = useRouter()

const appId = ref(route.query.appId || null)
const app = ref(null)
const loadingApp = ref(false)
const loadError = ref('')
const chatInput = ref('')
const chatContainer = ref(null)
const messages = ref([])
const streaming = ref(false)
const previewUrl = ref('')
const deploying = ref(false)

const copiedIdx = ref(-1)
let copyTimer = null

function copyMsg(i) {
  const msg = messages.value[i]
  if (!msg) return
  navigator.clipboard.writeText(msg.text)
  copiedIdx.value = i
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => { copiedIdx.value = -1 }, 2000)
}
const deployUrl = ref('')
const showDeployResult = ref(false)

// Smart scroll: only auto-scroll when user is near the bottom
const nearBottom = ref(true)

function isNearBottom() {
  const el = chatContainer.value
  if (!el) return true
  return el.scrollTop + el.clientHeight >= el.scrollHeight - 50
}

function onChatScroll() {
  nearBottom.value = isNearBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Resize chat panel
const chatWidth = ref(420)
const resizing = ref(false)

function onResizeStart(e) {
  e.preventDefault()
  resizing.value = true
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
  document.addEventListener('mousemove', onResizeMove)
  document.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(e) {
  if (!resizing.value) return
  const w = Math.max(300, Math.min(e.clientX, window.innerWidth * 0.6))
  requestAnimationFrame(() => { chatWidth.value = w })
}

function onResizeEnd() {
  resizing.value = false
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
}

onUnmounted(() => {
  clearTimeout(copyTimer)
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
})

onMounted(async () => {
  if (!appId.value) {
    messages.value = [
      { role: 'ai', text: "Hi! I'm your AI assistant. Describe the app you want to build, and I'll generate it for you." },
    ]
    return
  }

  loadingApp.value = true
  try {
    const result = await api.getAppVOById(appId.value)
    app.value = result
    appId.value = result.id

    if (result.codeGenType) {
      previewUrl.value = `/api/static/${result.codeGenType}_${result.id}/`
    }

    // Restore deploy URL from stored state if app is already deployed
    if (result.deployKey) {
      const stored = sessionStorage.getItem(`deploy_url_${result.id}`)
      if (stored) {
        deployUrl.value = stored
      }
    }

    loadingApp.value = false

    if (result.initPrompt && !result.codeGenType) {
      await sendMessage(result.initPrompt)
    } else {
      messages.value = [
        { role: 'ai', text: "Hi! I'm your AI assistant. Describe the app you want to build, and I'll generate it for you." },
      ]
    }
  } catch (e) {
    loadError.value = e.message || 'Failed to load app'
    loadingApp.value = false
  }
})

async function sendMessage(text) {
  if (text && typeof text !== 'string') text = undefined
  const msg = (text || chatInput.value.trim())
  if (!msg || streaming.value) return

  chatInput.value = ''

  if (!appId.value) {
    loadingApp.value = true
    try {
      const id = await api.addApp({ initPrompt: msg })
      appId.value = id
      router.replace({ query: { appId: id } })
    } catch (e) {
      loadError.value = 'Failed to create app: ' + (e.message || '')
      loadingApp.value = false
      return
    }
    loadingApp.value = false
  }

  messages.value = [...messages.value, { role: 'user', text: msg }]

  streaming.value = true
  nearBottom.value = true
  const aiMsg = { role: 'ai', text: '' }
  messages.value = [...messages.value, aiMsg]
  scrollToBottom()

  await api.sseChatToGenCode(
    appId.value,
    msg,
    (chunk) => {
      aiMsg.text += chunk
      messages.value = [...messages.value]
      if (nearBottom.value) scrollToBottom()
    },
    async () => {
      streaming.value = false
      try {
        const updated = await api.getAppVOById(appId.value)
        app.value = updated
        if (updated.codeGenType) {
          previewUrl.value = `/api/static/${updated.codeGenType}_${updated.id}/`
        }
      } catch {}
    },
    (err) => {
      aiMsg.text = 'Error: ' + (err.message || 'Unknown error')
      streaming.value = false
      messages.value = [...messages.value]
    }
  )
}

async function handleDeploy() {
  if (!appId.value || deploying.value) return
  deploying.value = true
  try {
    const url = await api.deployApp({ appId: appId.value })
    deployUrl.value = url
    showDeployResult.value = true
    sessionStorage.setItem(`deploy_url_${appId.value}`, url)
    const updated = await api.getAppVOById(appId.value)
    app.value = updated
  } catch (e) {
    console.error('Deploy failed:', e)
  } finally {
    deploying.value = false
  }
}
</script>
