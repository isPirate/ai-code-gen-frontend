<template>
  <div class="settings-page">
    <UserSidebar activeItem="settings" :user="auth.user" />
    <div class="main">
      <div class="set-content">
        <div class="set-header">
          <h1 class="set-title">Settings</h1>
          <p class="set-desc">Manage your account and preferences</p>
        </div>

        <div class="set-tabs">
          <button class="set-tab active">
            <User :size="14" />
            <span>Profile</span>
          </button>
          <button class="set-tab">
            <Key :size="14" />
            <span>API Keys</span>
          </button>
          <button class="set-tab">
            <Shield :size="14" />
            <span>Security</span>
          </button>
        </div>

        <div class="set-form">
          <div class="avatar-section">
            <div class="avatar-circle">{{ initials }}</div>
            <div class="avatar-info">
              <span class="avatar-name">{{ auth.user?.name || 'User' }}</span>
              <span class="avatar-hint">Upload new avatar...</span>
            </div>
          </div>

          <div class="form-row">
            <div class="field">
              <label>Full Name</label>
              <input v-model="formName" type="text" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="formEmail" type="email" />
            </div>
          </div>

          <div class="field full">
            <label>Bio</label>
            <textarea v-model="formBio" rows="3"></textarea>
          </div>

          <div class="divider"></div>

          <div class="danger-zone">
            <h3 class="danger-title">Danger Zone</h3>
            <div class="danger-row">
              <div class="danger-info">
                <span>Delete your account</span>
                <span class="danger-desc">Once you delete your account, there is no going back.</span>
              </div>
              <button class="danger-btn">Delete Account</button>
            </div>
          </div>

          <div class="form-actions">
            <button class="cancel-btn">Cancel</button>
            <button class="save-btn" @click="saveSettings">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { User, Key, Shield } from 'lucide-vue-next'
import UserSidebar from '../components/shared/UserSidebar.vue'

const auth = useAuthStore()

const initials = computed(() => (auth.user?.name || 'U').charAt(0).toUpperCase())
const formName = ref(auth.user?.name || '')
const formEmail = ref(auth.user?.email || '')
const formBio = ref('')

function saveSettings() {
  if (auth.user) {
    auth.user.name = formName.value
    auth.user.email = formEmail.value
    localStorage.setItem('user', JSON.stringify(auth.user))
  }
}
</script>

<style scoped>
.settings-page {
  width: 1440px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--surface-secondary);
  min-width: 0;
}
.set-content {
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 800px;
}
.set-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.set-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  color: var(--foreground-primary);
}
.set-desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-secondary);
}
.set-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-subtle);
}
.set-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-muted);
  cursor: pointer;
  position: relative;
}
.set-tab.active {
  color: var(--accent-primary);
  font-weight: 600;
}
.set-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-primary);
}
.set-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 560px;
}
.avatar-section {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent-secondary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  flex-shrink: 0;
}
.avatar-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.avatar-name {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground-primary);
}
.avatar-hint {
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
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.field.full {
  width: 100%;
}
.field label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--foreground-primary);
}
.field input {
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
.field input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px #ff5c0015;
}
.field textarea {
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 10px 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
  resize: vertical;
  width: 100%;
}
.field textarea:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px #ff5c0015;
}
.divider {
  height: 1px;
  background: var(--border-subtle);
  width: 100%;
}
.danger-zone {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.danger-title {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: #D32F2F;
}
.danger-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.danger-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
}
.danger-desc {
  font-size: 13px;
  color: var(--foreground-secondary);
}
.danger-btn {
  border-radius: var(--rounded-lg);
  border: 1px solid #D32F2F;
  padding: 8px 16px;
  font-family: var(--font-body);
  font-size: 13px;
  color: #D32F2F;
  background: var(--surface-primary);
  cursor: pointer;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
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
