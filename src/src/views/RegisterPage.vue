<template>
  <div class="register-page">
    <!-- Left Brand Panel -->
    <div class="brand-panel">
      <div class="brand-card">
        <span class="brand-logo">CodePilot</span>
        <h1 class="brand-title">Start building<br/>today, for free</h1>
        <p class="brand-desc">No credit card required. Get started<br/>with our generous free tier.</p>
      </div>
      <div class="testimonials">
        <div class="testimonial">
          <p class="test-quote">"CodePilot helped me launch my SaaS product in just 2 days. Incredible!"</p>
          <div class="test-author">
            <div class="test-avatar">S</div>
            <div class="test-info"><span class="test-name">Sarah Chen</span><span class="test-role">Product Manager</span></div>
          </div>
        </div>
        <div class="testimonial">
          <p class="test-quote">"We replaced 3 weeks of frontend work with a single afternoon of prompting."</p>
          <div class="test-author">
            <div class="test-avatar">M</div>
            <div class="test-info"><span class="test-name">Mike Rodriguez</span><span class="test-role">CTO</span></div>
          </div>
        </div>
      </div>
      <div class="deco deco-1"></div>
      <div class="deco deco-2"></div>
    </div>

    <!-- Right Form Panel -->
    <div class="form-panel">
      <div class="form-wrapper">
        <h2 class="form-title">Create your account</h2>
        <p class="form-subtitle">Start building with AI in seconds</p>
        <div class="fields">
          <div class="field"><label>Full Name</label><input v-model="name" type="text" placeholder="John Doe" /></div>
          <div class="field"><label>Email</label><input v-model="email" type="email" placeholder="you@example.com" /></div>
          <div class="field">
            <label>Password</label>
            <div class="password-input">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" />
              <button @click="showPassword = !showPassword" class="eye-btn">
                <Eye v-if="!showPassword" :size="16" color="var(--foreground-muted)" />
                <EyeOff v-else :size="16" color="var(--foreground-muted)" />
              </button>
            </div>
          </div>
        </div>
        <label class="terms"><input type="checkbox" v-model="agreed" /><span>I agree to the Terms of Service and Privacy Policy</span></label>
        <button class="register-btn" @click="handleRegister">Create Account</button>
        <div class="divider"><div class="divider-line"></div><span>or sign up with</span><div class="divider-line"></div></div>
        <div class="oauth-row">
          <button class="oauth-btn" @click="handleOAuth('google')"><span class="g-icon">G</span><span>Google</span></button>
          <button class="oauth-btn" @click="handleOAuth('github')"><Github :size="18" /><span>GitHub</span></button>
        </div>
        <div class="form-footer"><span>Already have an account?</span><router-link to="/login">Log in</router-link></div>
      </div>
      <div class="bg-deco bg-deco-1"></div>
      <div class="bg-deco bg-deco-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Eye, EyeOff, Github } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const agreed = ref(false)

function handleRegister() {
  if (!name.value || !email.value || !password.value) return
  auth.register(name.value, email.value, password.value)
  router.push(auth.isAdmin ? '/admin' : '/dashboard')
}

function handleOAuth(provider) {
  const mockEmail = provider === 'google' ? 'user@gmail.com' : 'user@github.com'
  auth.login(mockEmail, '')
  router.push('/dashboard')
}
</script>

<style scoped>
.register-page { width:1440px; height:100vh; min-height:900px; display:flex; margin:0 auto; overflow:hidden; }
.brand-panel { width:560px; background:linear-gradient(160deg,#FF5C00,#E84A1A,#C73510,#A82808); padding:60px 48px; display:flex; flex-direction:column; justify-content:space-between; gap:32px; position:relative; overflow:hidden; }
.brand-card { background:#ffffff0c; border-radius:24px; padding:36px; display:flex; flex-direction:column; gap:24px; box-shadow:0 4px 24px #00000020; }
.brand-logo { font-family:var(--font-heading); font-size:32px; font-weight:700; color:#fff; letter-spacing:-0.5px; }
.brand-title { font-family:var(--font-heading); font-size:40px; font-weight:700; color:#fff; letter-spacing:-0.5px; line-height:1.2; width:420px; }
.brand-desc { font-family:var(--font-body); font-size:16px; color:#ffffffaa; line-height:1.7; width:420px; }
.testimonials { display:flex; flex-direction:column; gap:16px; position:relative; z-index:1; }
.testimonial { background:#ffffff10; border-radius:16px; padding:20px 24px; display:flex; flex-direction:column; gap:12px; box-shadow:0 2px 12px #00000012; }
.test-quote { font-family:var(--font-body); font-size:14px; color:#ffffffdd; line-height:1.6; width:400px; }
.test-author { display:flex; align-items:center; gap:12px; }
.test-avatar { width:28px; height:28px; border-radius:50%; background:#ffffff30; color:#fff; font-size:12px; font-weight:600; display:flex; align-items:center; justify-content:center; }
.test-info { display:flex; flex-direction:column; gap:2px; }
.test-name { font-family:var(--font-body); font-size:13px; font-weight:500; color:#fff; }
.test-role { font-family:var(--font-caption); font-size:12px; color:#ffffffaa; }
.deco { position:absolute; border-radius:50%; }
.deco-1 { width:280px; height:280px; background:radial-gradient(circle,#ffffff12,#ffffff04 70%,transparent); top:-60px; right:-40px; }
.deco-2 { width:220px; height:220px; background:radial-gradient(circle,#ffffff10,#ffffff03 60%,transparent); bottom:100px; left:-60px; }

.form-panel { flex:1; background:linear-gradient(180deg,#fff,#fffbf7,#fff5ed); display:flex; justify-content:center; align-items:center; padding:60px 120px; position:relative; overflow:hidden; }
.form-wrapper { width:480px; display:flex; flex-direction:column; gap:28px; position:relative; z-index:1; }
.form-title { font-family:var(--font-heading); font-size:36px; font-weight:700; color:var(--foreground-primary); letter-spacing:-0.5px; }
.form-subtitle { font-family:var(--font-body); font-size:16px; color:var(--foreground-secondary); }
.fields { display:flex; flex-direction:column; gap:20px; }
.field { display:flex; flex-direction:column; gap:6px; width:100%; }
.field label { font-family:var(--font-body); font-size:13px; font-weight:500; }
.field input { height:42px; border-radius:var(--rounded-lg); border:1px solid var(--border-subtle); padding:0 12px; font-family:var(--font-body); font-size:14px; background:var(--surface-primary); width:100%; }
.field input:focus { border-color:var(--accent-primary); box-shadow:0 0 0 3px #ff5c0015; outline:none; }
.password-input { position:relative; }
.password-input input { width:100%; padding-right:40px; }
.eye-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; padding:0; display:flex; }
.terms { display:flex; align-items:center; gap:8px; font-family:var(--font-body); font-size:12px; color:var(--foreground-secondary); cursor:pointer; }
.terms input[type="checkbox"] { width:16px; height:16px; accent-color:var(--accent-primary); }
.register-btn { height:52px; border-radius:12px; background:var(--accent-primary); color:#fff; font-family:var(--font-body); font-size:16px; font-weight:700; cursor:pointer; border:none; box-shadow:0 4px 16px #ff5c0030; transition:background .15s; width:100%; }
.register-btn:hover { background:var(--accent-hover); }
.divider { display:flex; align-items:center; gap:16px; padding:4px 0; width:100%; }
.divider-line { flex:1; height:1px; background:var(--border-subtle); }
.divider span { font-family:var(--font-caption); font-size:11px; color:var(--foreground-muted); white-space:nowrap; }
.oauth-row { display:flex; gap:16px; }
.oauth-btn { flex:1; height:44px; border-radius:10px; border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:center; gap:6px; font-family:var(--font-body); font-size:14px; cursor:pointer; background:var(--surface-primary); transition:background .15s; }
.oauth-btn:hover { background:var(--surface-secondary); }
.g-icon { width:18px; height:18px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; color:#4285F4; }
.form-footer { display:flex; justify-content:center; align-items:center; gap:4px; font-family:var(--font-body); font-size:13px; }
.form-footer span { color:var(--foreground-secondary); }
.form-footer a { color:var(--accent-primary); font-weight:600; text-decoration:none; }
.bg-deco { position:absolute; border-radius:50%; }
.bg-deco-1 { width:280px; height:280px; background:radial-gradient(circle,#ff5c0008,#ff5c0003 60%,transparent); top:80px; right:60px; }
.bg-deco-2 { width:220px; height:220px; background:radial-gradient(circle,#ff5c0006,#ff5c0002 60%,transparent); bottom:80px; left:-30px; }
</style>
