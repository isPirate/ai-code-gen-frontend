<template>
  <div class="editor-page">
    <!-- Toolbar -->
    <div class="toolbar">
      <div class="tb-left">
        <router-link to="/dashboard" class="tb-back">
          <ArrowLeft :size="18" color="var(--foreground-secondary)" />
        </router-link>
        <div class="tb-divider"></div>
        <span class="tb-name">{{ projectName }}</span>
        <div class="breadcrumb">
          <button class="bread-item"><Home :size="14" color="var(--foreground-muted)" /></button>
          <ChevronRight :size="14" color="var(--foreground-muted)" />
          <span class="bread-text">Dashboard</span>
        </div>
      </div>
      <div class="tb-right">
        <button class="tb-btn-outline">
          <Share2 :size="14" />
          <span>Share</span>
        </button>
        <button class="tb-btn-primary">
          <Rocket :size="14" />
          <span>Deploy</span>
        </button>
      </div>
    </div>

    <!-- Editor Body -->
    <div class="editor-body">
      <!-- Chat Panel -->
      <div class="chat-panel">
        <div class="chat-header">
          <div class="chat-header-left">
            <Sparkles :size="16" color="var(--accent-primary)" />
            <span>AI Chat</span>
          </div>
          <Settings :size="16" color="var(--foreground-muted)" style="cursor:pointer" />
        </div>

        <div class="chat-messages">
          <div class="msg ai-msg">
            <div class="msg-avatar">AI</div>
            <div class="msg-bubble ai-bubble">I'll help you build an e-commerce dashboard. Let me start by creating the main layout with a sidebar navigation and a data visualization area.</div>
          </div>
          <div class="msg user-msg">
            <div class="msg-bubble user-bubble">Add a sales chart showing monthly revenue for the past year</div>
          </div>
          <div class="msg ai-msg">
            <div class="msg-avatar">AI</div>
            <div class="msg-bubble ai-bubble">I've added a bar chart showing monthly revenue. The data shows a steady increase over the past 12 months with a peak in December.</div>
          </div>
        </div>

        <div class="chat-input-area">
          <input v-model="chatInput" placeholder="Describe changes..." class="chat-input" @keyup.enter="sendMessage" />
          <button class="send-btn" @click="sendMessage">
            <Send :size="18" color="#fff" />
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="preview-panel">
        <div class="preview-tabs">
          <button class="preview-tab active">Preview</button>
          <button class="preview-tab">Code</button>
          <button class="preview-tab">Files</button>
        </div>
        <div class="preview-content">
          <div class="browser-mock">
            <div class="browser-header">
              <span style="background:#FF5F57"></span>
              <span style="background:#FEBC2E"></span>
              <span style="background:#28C840"></span>
            </div>
            <div class="browser-body">
              <Monitor :size="48" color="var(--foreground-muted)" />
              <span>Live Preview</span>
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
import { ArrowLeft, ChevronRight, Home, Share2, Rocket, Sparkles, Settings, Send, Monitor } from 'lucide-vue-next'

const route = useRoute()
const projectName = ref('E-Commerce Dashboard')
const chatInput = ref('')

function sendMessage() {
  if (!chatInput.value.trim()) return
  chatInput.value = ''
}
</script>

<style scoped>
.editor-page {
  width: 1440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

/* Toolbar */
.toolbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--surface-primary);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}
.tb-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tb-back {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 4px;
}
.tb-divider {
  width: 1px;
  height: 20px;
  background: var(--border-subtle);
}
.tb-name {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground-primary);
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
}
.bread-item {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--rounded-md);
  display: flex;
}
.bread-item:hover {
  background: var(--surface-secondary);
}
.bread-text {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
}
.tb-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tb-btn-outline {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 6px 12px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
  cursor: pointer;
}
.tb-btn-outline:hover {
  background: var(--surface-secondary);
}
.tb-btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--rounded-lg);
  background: var(--accent-primary);
  padding: 6px 14px;
  font-family: var(--font-body);
  font-size: 13px;
  color: #fff;
  border: none;
  cursor: pointer;
}
.tb-btn-primary:hover {
  background: var(--accent-hover);
}

/* Editor Body */
.editor-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* Chat Panel */
.chat-panel {
  width: 360px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-subtle);
  background: var(--surface-primary);
  flex-shrink: 0;
}
.chat-header {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-subtle);
}
.chat-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
}
.chat-messages {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
}
.msg {
  display: flex;
  gap: 8px;
}
.ai-msg {
  align-items: flex-start;
}
.user-msg {
  justify-content: flex-end;
}
.msg-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.msg-bubble {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
}
.ai-bubble {
  background: var(--surface-secondary);
  color: var(--foreground-primary);
}
.user-bubble {
  background: var(--accent-primary);
  color: #fff;
}
.chat-input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border-subtle);
}
.chat-input {
  flex: 1;
  height: 36px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 0 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
}
.chat-input:focus {
  border-color: var(--accent-primary);
}
.send-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--rounded-lg);
  background: var(--accent-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.send-btn:hover {
  background: var(--accent-hover);
}

/* Preview Panel */
.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.preview-tabs {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  background: var(--surface-primary);
  border-bottom: 1px solid var(--border-subtle);
}
.preview-tab {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  padding-bottom: 10px;
}
.preview-tab.active {
  color: var(--foreground-primary);
  font-weight: 500;
}
.preview-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-primary);
}
.preview-content {
  flex: 1;
  background: var(--surface-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.browser-mock {
  width: 80%;
  height: 70%;
  background: var(--surface-primary);
  border-radius: 8px;
  box-shadow: 0 4px 16px #00000012;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.browser-header {
  display: flex;
  gap: 6px;
  padding: 10px 12px;
  background: var(--surface-secondary);
  border-bottom: 1px solid var(--border-subtle);
}
.browser-header span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.browser-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-muted);
}
</style>
