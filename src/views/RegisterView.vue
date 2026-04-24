<script setup>
import { reactive, ref } from 'vue'
import { Github, Sparkles, Eye } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const error = ref('')
const form = reactive({ name: 'John Doe', email: 'newuser@example.com', password: 'password123', agree: true })

async function submit() {
  if (!form.agree) {
    error.value = '请先同意 Terms of Service 和 Privacy Policy。'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await auth.register(form)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <section class="auth-brand register-brand">
      <div class="auth-card register-copy">
        <div class="brand-mark">CodePilot</div>
        <h1>Start building<br />today, for free</h1>
        <p>No credit card required. Get started<br />with our generous free tier.</p>
      </div>
      <div class="testimonial-card">
        <p>"CodePilot helped me launch my SaaS<br />product in just 2 days. Incredible!"</p>
        <div class="testimonial-author"><div class="avatar-sm"></div><div><strong>Sarah Chen</strong><span>Indie Developer</span></div></div>
      </div>
      <div class="testimonial-card">
        <p>"We replaced 3 weeks of frontend work with a single afternoon of prompting."</p>
        <div class="testimonial-author"><div class="avatar-sm"></div><div><strong>Marcus Rivera</strong><span>CTO at BuildFast</span></div></div>
      </div>
      <div class="floating-deco deco-d"></div>
      <div class="floating-deco deco-e"></div>
      <div class="floating-deco deco-f"></div>
    </section>

    <section class="auth-form-shell">
      <form class="auth-form register-form" @submit.prevent="submit">
        <h2>Create your account</h2>
        <p>Start building with AI in seconds</p>
        <label class="field-block"><span>Full Name</span><input v-model="form.name" class="field-input" type="text" placeholder="John Doe" /></label>
        <label class="field-block"><span>Email</span><input v-model="form.email" class="field-input" type="email" placeholder="you@example.com" /></label>
        <label class="field-block"><span>Password</span><div class="field-input icon-end"><input v-model="form.password" type="password" placeholder="Create a password (8+ chars)" /><Eye :size="18" /></div></label>
        <label class="terms-row"><input v-model="form.agree" type="checkbox" /><span>I agree to the Terms of Service and Privacy Policy</span></label>
        <button class="primary-btn auth-submit" :disabled="loading" type="submit">{{ loading ? 'Creating...' : 'Create Account' }}</button>
        <div class="oauth-divider"><span></span><em>or sign up with</em><span></span></div>
        <div class="oauth-row">
          <button class="ghost-btn oauth-btn" type="button"><Sparkles :size="14" />Google</button>
          <button class="ghost-btn oauth-btn" type="button"><Github :size="14" />GitHub</button>
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <div class="auth-footer-line"><span>Already have an account?</span><RouterLink to="/login">Log in</RouterLink></div>
      </form>
    </section>
  </div>
</template>
