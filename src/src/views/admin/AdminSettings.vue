<template>
  <div class="admin-page">
    <AdminSidebar activeItem="settings" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">System Settings</h1>
      </div>
      <div class="content">
        <!-- AI Model Card -->
        <div class="card">
          <h3 class="card-title">AI Model Configuration</h3>
          <p class="card-desc">Configure the AI models used for code generation</p>
          <div class="form-row">
            <div class="field">
              <label>Default Model</label>
              <select v-model="model">
                <option>GPT-4o</option>
                <option>Claude 3.5 Sonnet</option>
                <option>Gemini Pro</option>
              </select>
            </div>
            <div class="field">
              <label>Temperature</label>
              <input type="number" v-model="temperature" step="0.1" min="0" max="1" />
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label>Max Tokens</label>
              <input type="number" v-model="maxTokens" />
            </div>
            <div class="field">
              <label>Timeout (ms)</label>
              <input type="number" v-model="timeout" />
            </div>
          </div>
        </div>

        <!-- Quota Card -->
        <div class="card">
          <h3 class="card-title">Usage Quotas</h3>
          <p class="card-desc">Set generation limits per user tier</p>
          <div class="quota-list">
            <div class="quota-row" v-for="q in quotas" :key="q.tier">
              <span class="quota-tier">{{ q.tier }}</span>
              <span class="quota-limit">{{ q.limit }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="cancel-btn">Cancel</button>
          <button class="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminSidebar from '../../components/shared/AdminSidebar.vue'

const model = ref('GPT-4o')
const temperature = ref(0.7)
const maxTokens = ref(4096)
const timeout = ref(30000)

const quotas = [
  { tier: 'Free Tier', limit: '100 generations/day' },
  { tier: 'Pro Tier', limit: '1,000 generations/day' },
  { tier: 'Enterprise', limit: 'Unlimited' },
]
</script>

<style scoped>
.admin-page {
  width: 1440px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.top-bar {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: var(--surface-primary);
  border-bottom: 1px solid var(--border-subtle);
}
.top-title {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground-primary);
}
.content {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
}
.card {
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-title {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground-primary);
}
.card-desc {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
}
.form-row {
  display: flex;
  gap: 16px;
  width: 100%;
}
.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--foreground-primary);
}
.field input, .field select {
  height: 42px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 0 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
  width: 100%;
}
.field input:focus, .field select:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px #ff5c0015;
}
.quota-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quota-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.quota-tier {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
}
.quota-limit {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-secondary);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.cancel-btn {
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 8px 20px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
  cursor: pointer;
}
.save-btn {
  border-radius: var(--rounded-lg);
  background: var(--accent-primary);
  padding: 8px 20px;
  font-family: var(--font-body);
  font-size: 14px;
  color: #fff;
  border: none;
  cursor: pointer;
}
.save-btn:hover {
  background: var(--accent-hover);
}
</style>
