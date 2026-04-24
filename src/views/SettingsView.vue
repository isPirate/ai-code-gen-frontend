<script setup>
import { reactive, ref } from 'vue'
import AppShell from '../components/AppShell.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const saving = ref(false)
const message = ref('')
const form = reactive({
  name: auth.user?.name || 'John Doe',
  email: auth.user?.email || 'john@example.com',
  bio: auth.user?.bio || 'Full-stack developer. Building cool things with AI.'
})

async function save() {
  saving.value = true
  await auth.updateProfile({ id: auth.user.id, name: form.name, email: form.email, bio: form.bio })
  saving.value = false
  message.value = 'Profile saved.'
  setTimeout(() => (message.value = ''), 2000)
}

async function destroyAccount() {
  await auth.deleteProfile()
}
</script>

<template>
  <AppShell>
    <div class="page-content settings-wrap">
      <div class="settings-header"><h1>Settings</h1><p>Manage your account and preferences</p></div>
      <div class="settings-tabs">
        <button class="settings-tab active" type="button">Profile</button>
        <button class="settings-tab" type="button">API Keys</button>
        <button class="settings-tab" type="button">Security</button>
      </div>
      <div class="settings-form">
        <div class="avatar-section">
          <div class="avatar-circle"></div>
          <div class="avatar-copy"><button class="ghost-btn tiny" type="button">Change Avatar</button><span>JPG, PNG. Max 2MB.</span></div>
        </div>
        <div class="two-col-row">
          <label class="field-block"><span>Full Name</span><input v-model="form.name" class="field-input short" type="text" /></label>
          <label class="field-block"><span>Email</span><input v-model="form.email" class="field-input short" type="email" /></label>
        </div>
        <label class="field-block"><span>Bio</span><textarea v-model="form.bio" class="field-input bio"></textarea></label>
        <div class="divider-line"></div>
        <div class="danger-title">Danger Zone</div>
        <div class="danger-row">
          <div class="danger-copy"><strong>Delete your account permanently</strong><span>This action cannot be undone. All your data will be lost.</span></div>
          <button class="danger-btn" type="button" @click="destroyAccount">Delete Account</button>
        </div>
        <div class="form-actions"><button class="ghost-btn tiny" type="button">Cancel</button><button class="primary-btn tiny" :disabled="saving" type="button" @click="save">{{ saving ? 'Saving...' : 'Save Changes' }}</button></div>
        <p v-if="message" class="form-success">{{ message }}</p>
      </div>
    </div>
  </AppShell>
</template>
