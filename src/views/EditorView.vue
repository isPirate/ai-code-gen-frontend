<script setup>
import { computed, onMounted, ref } from 'vue'
import { ArrowLeft, Eye, FileCode2, FolderTree, Rocket, Send, Share2, Sparkles } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { fetchEditorState, sendEditorPrompt } from '../mock/api'

const route = useRoute()
const router = useRouter()
const editor = ref(null)
const prompt = ref('')
const tab = ref('preview')
const sending = ref(false)

const title = computed(() => {
  if (!editor.value) return 'Editor'
  if (route.query.template) return `${editor.value.title} from template`
  return editor.value.title
})

onMounted(async () => {
  editor.value = await fetchEditorState()
})

async function submitPrompt() {
  if (!prompt.value.trim()) return
  sending.value = true
  editor.value = await sendEditorPrompt(prompt.value)
  prompt.value = ''
  sending.value = false
}
</script>

<template>
  <div class="editor-page" v-if="editor">
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <ArrowLeft :size="18" class="clickable" @click="router.push('/dashboard')" />
        <div class="toolbar-divider"></div>
        <strong>{{ title }}</strong>
        <div class="crumb-pill"><Sparkles :size="16" />CodePilot</div>
        <div class="toolbar-divider small"></div>
        <span>Dashboard</span>
      </div>
      <div class="toolbar-right">
        <button class="ghost-btn tiny" type="button"><Share2 :size="14" />Share</button>
        <button class="primary-btn tiny" type="button"><Rocket :size="14" />Deploy</button>
      </div>
    </div>

    <div class="editor-body">
      <aside class="editor-chat">
        <div class="editor-chat-head">
          <div class="chat-head-left"><Sparkles :size="16" /><span>AI Chat</span></div>
          <button class="link-btn muted" type="button">Clear</button>
        </div>
        <div class="editor-messages">
          <div v-for="message in editor.messages" :key="message.id" class="editor-message" :class="message.role">
            <template v-if="message.role === 'assistant'"><div class="assistant-head"><Sparkles :size="14" /><strong>{{ message.label }}</strong></div></template>
            <div v-else class="user-label">{{ message.label }}</div>
            <p>{{ message.text }}</p>
            <pre v-if="message.list">{{ message.list }}</pre>
          </div>
        </div>
        <div class="editor-input-area">
          <div class="editor-input-box"><input v-model="prompt" type="text" placeholder="Ask AI to modify..." @keyup.enter="submitPrompt" /></div>
          <button class="send-btn" :disabled="sending" type="button" @click="submitPrompt"><Send :size="16" /></button>
        </div>
      </aside>

      <section class="editor-preview">
        <div class="preview-tabs">
          <button class="preview-tab" :class="{ active: tab === 'preview' }" type="button" @click="tab = 'preview'"><Eye :size="14" />Preview</button>
          <button class="preview-tab" :class="{ active: tab === 'code' }" type="button" @click="tab = 'code'"><FileCode2 :size="14" />Code</button>
          <button class="preview-tab" :class="{ active: tab === 'files' }" type="button" @click="tab = 'files'"><FolderTree :size="14" />Files</button>
        </div>

        <div v-if="tab === 'preview'" class="preview-content">
          <aside class="mini-sidebar">
            <div class="mini-sidebar-title">DASHKIT</div>
            <div class="mini-nav-item active">Overview</div>
            <div class="mini-nav-item">Orders</div>
            <div class="mini-nav-item">Analytics</div>
            <div class="mini-nav-item">Customers</div>
          </aside>
          <div class="mini-main">
            <div class="mini-metrics">
              <div v-for="metric in editor.metrics" :key="metric.label" class="mini-metric-card"><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong><small>{{ metric.delta }}</small></div>
            </div>
            <div class="mini-chart-card">
              <div class="mini-chart-title">Sales Overview</div>
              <div class="mini-chart-bars">
                <span style="height: 30px"></span><span style="height: 50px"></span><span style="height: 40px"></span><span style="height: 70px"></span>
                <span style="height: 55px"></span><span style="height: 60px"></span><span style="height: 35px"></span><span style="height: 45px"></span>
              </div>
            </div>
            <div class="mini-table">
              <div class="mini-table-title">Recent Orders</div>
              <div class="mini-table-head"><span>Order ID</span><span>Customer</span><span>Amount</span><span>Status</span></div>
              <div v-for="order in editor.orders" :key="order[0]" class="mini-table-row">
                <span>{{ order[0] }}</span><span>{{ order[1] }}</span><span>{{ order[2] }}</span><span><em class="mini-status" :class="order[3].toLowerCase()">{{ order[3] }}</em></span>
              </div>
            </div>
          </div>
        </div>

        <pre v-else-if="tab === 'code'" class="code-panel">{{ editor.code }}</pre>
        <div v-else class="file-panel"><div v-for="file in editor.files" :key="file" class="file-row">{{ file }}</div></div>
      </section>
    </div>
  </div>
</template>
