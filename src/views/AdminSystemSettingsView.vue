<script setup>
import { onMounted, reactive, ref } from 'vue'
import AppShell from '../components/AppShell.vue'
import { fetchSystemSettings, updateSystemSettings } from '../mock/api'

const loaded = ref(false)
const saving = ref(false)
const saved = ref(false)
const form = reactive({ model: '', maxTokens: '', quotas: { free: '', pro: '', enterprise: '' } })

onMounted(async () => {
  const data = await fetchSystemSettings()
  Object.assign(form, data)
  loaded.value = true
})

async function save() {
  saving.value = true
  await updateSystemSettings(form)
  saving.value = false
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>

<template>
  <AppShell admin>
    <div class="top-bar"><h1>System Settings</h1></div>
    <div v-if="loaded" class="page-content system-settings">
      <div class="settings-card">
        <strong>AI Model Configuration</strong>
        <p>Configure the AI models used for code generation</p>
        <div class="two-col-row">
          <label class="field-block"><span>Default Model</span><input v-model="form.model" class="field-input short" type="text" /></label>
          <label class="field-block"><span>Max Tokens</span><input v-model="form.maxTokens" class="field-input short" type="text" /></label>
        </div>
      </div>
      <div class="settings-card">
        <strong>Usage Quotas</strong>
        <p>Set generation limits per user tier</p>
        <div class="quota-row">
          <div class="quota-item"><span>Free Tier</span><input v-model="form.quotas.free" class="quota-input" type="text" /></div>
          <div class="quota-item"><span>Pro Tier</span><input v-model="form.quotas.pro" class="quota-input" type="text" /></div>
          <div class="quota-item"><span>Enterprise</span><input v-model="form.quotas.enterprise" class="quota-input" type="text" /></div>
        </div>
      </div>
      <div class="form-actions"><button class="ghost-btn tiny" type="button">Cancel</button><button class="primary-btn tiny" :disabled="saving" type="button" @click="save">{{ saving ? 'Saving...' : 'Save Changes' }}</button></div>
      <p v-if="saved" class="form-success">System settings updated.</p>
    </div>
  </AppShell>
</template>
