<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Eye, Github, Sparkles } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: 'john@example.com',
  password: 'password123',
  remember: true
})

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(form)
    const redirect = route.query.redirect
    if (typeof redirect === 'string') router.push(redirect)
    else router.push(auth.isAdmin ? '/admin' : '/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function oauthLogin(provider) {
  form.email = provider === 'google' ? 'john@example.com' : 'admin@codepilot.ai'
  form.password = provider === 'google' ? 'password123' : 'admin123456'
  submit()
}
</script>

<template>
  <div class="auth-page">
    <section class="auth-brand login-brand">
      <div class="auth-card glass-card">
        <div class="brand-mark">CodePilot</div>
        <h1>Turn your ideas<br />into reality with AI</h1>
        <p>Build production-ready web applications<br />without writing a single line of code.</p>
        <div class="code-window">
          <div class="code-dots"><span></span><span></span><span></span></div>
          <div class="code-line"><span class="w80"></span><span class="w120"></span></div>
          <div class="code-line indent"><span class="w100"></span><span class="w60"></span></div>
          <div class="code-line"><span class="w50"></span><span class="w140"></span></div>
        </div>
      </div>
      <div class="auth-stats">
        <div class="auth-stat"><strong>10K+</strong><span>Projects Built</span></div>
        <div class="auth-stat"><strong>5K+</strong><span>Active Users</span></div>
        <div class="auth-stat"><strong>99.9%</strong><span>Uptime</span></div>
      </div>
      <div class="floating-deco deco-a"></div>
      <div class="floating-deco deco-b"></div>
      <div class="floating-deco deco-c"></div>
    </section>

    <section class="auth-form-shell">
      <form class="auth-form" @submit.prevent="submit">
        <h2>Welcome back</h2>
        <p>Log in to your account to continue building</p>
        <label class="field-block"><span>Email</span><input v-model="form.email" class="field-input" type="email" placeholder="you@example.com" /></label>
        <label class="field-block">
          <span>Password</span>
          <div class="field-input icon-end"><input v-model="form.password" type="password" placeholder="Enter your password" /><Eye :size="18" /></div>
        </label>
        <div class="auth-meta">
          <label class="remember-row"><input v-model="form.remember" type="checkbox" /><span>Remember me</span></label>
          <button class="link-btn" type="button">Forgot password?</button>
        </div>
        <button class="primary-btn auth-submit" :disabled="loading" type="submit">{{ loading ? 'Signing In...' : 'Log In' }}</button>
        <div class="oauth-divider"><span></span><em>or continue with</em><span></span></div>
        <div class="oauth-row">
          <button class="ghost-btn oauth-btn" type="button" @click="oauthLogin('google')"><Sparkles :size="14" />Google</button>
          <button class="ghost-btn oauth-btn" type="button" @click="oauthLogin('github')"><Github :size="14" />GitHub</button>
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <div class="auth-footer-line"><span>Don't have an account?</span><RouterLink to="/register">Sign up</RouterLink></div>
      </form>
    </section>
  </div>
</template>
