<template>
  <div class="login-page">
    <!-- Left Brand Panel -->
    <div class="brand-panel">
      <div class="brand-card">
        <span class="brand-logo">CodePilot</span>
        <h1 class="brand-title">Turn your ideas<br/>into reality with AI</h1>
        <p class="brand-desc">Build production-ready web applications<br/>without writing a single line of code.</p>
        <div class="code-window">
          <div class="code-dots"><span style="background:#FF5F57"></span><span style="background:#FEBC2E"></span><span style="background:#28C840"></span></div>
          <div class="code-line"><span class="kw">const</span> <span class="vr">app</span> = <span class="fn">createAI</span>()</div>
          <div class="code-line indent"><span class="vr">.describe</span>(<span class="str">"My App"</span>)</div>
          <div class="code-line indent"><span class="vr">.deploy</span>()</div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat"><span class="stat-val">10K+</span><span class="stat-label">Projects Built</span></div>
        <div class="stat"><span class="stat-val">5K+</span><span class="stat-label">Active Users</span></div>
        <div class="stat"><span class="stat-val">99.9%</span><span class="stat-label">Uptime</span></div>
      </div>
      <div class="deco deco-1"></div>
      <div class="deco deco-2"></div>
    </div>

    <!-- Right Form Panel -->
    <div class="form-panel">
      <div class="form-wrapper">
        <h2 class="form-title">Welcome back</h2>
        <p class="form-subtitle">Log in to your account to continue building</p>
        <div class="fields">
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
        <div class="meta-row">
          <label class="remember"><input type="checkbox" v-model="remember" /><span>Remember me</span></label>
          <a href="#" class="forgot">Forgot password?</a>
        </div>
        <button class="login-btn" @click="handleLogin">Log In</button>
        <div class="divider"><div class="divider-line"></div><span>or continue with</span><div class="divider-line"></div></div>
        <div class="oauth-row">
          <button class="oauth-btn" @click="handleOAuth('google')"><span class="g-icon">G</span><span>Google</span></button>
          <button class="oauth-btn" @click="handleOAuth('github')"><Github :size="18" /><span>GitHub</span></button>
        </div>
        <div class="form-footer"><span>Don't have an account?</span><router-link to="/register">Sign up</router-link></div>
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
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)

function handleLogin() {
  if (!email.value) return
  auth.login(email.value, password.value)
  router.push(auth.isAdmin ? '/admin' : '/dashboard')
}

function handleOAuth(provider) {
  const mockEmail = provider === 'google' ? 'user@gmail.com' : 'user@github.com'
  auth.login(mockEmail, '')
  router.push('/dashboard')
}
</script>

<style scoped>
.login-page { width:1440px; height:100vh; min-height:900px; display:flex; margin:0 auto; overflow:hidden; }
.brand-panel { width:560px; background:linear-gradient(135deg,#FF5C00,#E8491D,#D4370A); padding:60px 48px; display:flex; flex-direction:column; justify-content:space-between; gap:32px; position:relative; overflow:hidden; }
.brand-card { background:#ffffff0c; border-radius:24px; padding:40px; display:flex; flex-direction:column; gap:28px; box-shadow:0 4px 24px #00000020; }
.brand-logo { font-family:var(--font-heading); font-size:32px; font-weight:700; color:#fff; letter-spacing:-0.5px; }
.brand-title { font-family:var(--font-heading); font-size:40px; font-weight:700; color:#fff; letter-spacing:-0.5px; line-height:1.2; width:420px; }
.brand-desc { font-family:var(--font-body); font-size:16px; color:#ffffffaa; line-height:1.7; width:420px; }
.code-window { background:#ffffff15; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:8px; }
.code-dots { display:flex; gap:6px; margin-bottom:4px; }
.code-dots span { width:10px; height:10px; border-radius:50%; }
.code-line { font-family:'Geist Mono',monospace; font-size:13px; color:#ffffff80; }
.code-line.indent { padding-left:16px; }
.kw { color:#FF8533; } .vr { color:#c792ea; } .fn { color:#82aaff; } .str { color:#c3e88d; }
.stats-row { display:flex; gap:16px; position:relative; z-index:1; }
.stat { flex:1; background:#ffffff12; border-radius:16px; padding:16px 20px; display:flex; flex-direction:column; align-items:center; gap:12px; box-shadow:0 2px 12px #00000015; }
.stat-val { font-family:var(--font-body); font-size:24px; font-weight:700; color:#fff; }
.stat-label { font-family:var(--font-caption); font-size:12px; color:#ffffffaa; }
.deco { position:absolute; border-radius:50%; }
.deco-1 { width:320px; height:320px; background:radial-gradient(circle,#ffffff15,#ffffff05 70%,transparent); top:80px; left:-80px; opacity:.8; }
.deco-2 { width:200px; height:200px; background:radial-gradient(circle,#ffffff18,#ffffff06 60%,transparent); top:-40px; right:-40px; }
.form-panel { flex:1; background:linear-gradient(180deg,#fff,#fffbf7,#fff5ed); display:flex; justify-content:center; align-items:center; padding:60px 120px; position:relative; overflow:hidden; }
.form-wrapper { width:480px; display:flex; flex-direction:column; gap:28px; position:relative; z-index:1; }
.form-title { font-family:var(--font-heading); font-size:36px; font-weight:700; color:var(--foreground-primary); letter-spacing:-0.5px; }
.form-subtitle { font-family:var(--font-body); font-size:16px; color:var(--foreground-secondary); }
.fields { display:flex; flex-direction:column; gap:24px; }
.field { display:flex; flex-direction:column; gap:8px; width:100%; }
.field label { font-family:var(--font-body); font-size:13px; font-weight:500; }
.field input { height:42px; border-radius:var(--rounded-lg); border:1px solid var(--border-subtle); padding:0 12px; font-family:var(--font-body); font-size:14px; background:var(--surface-primary); width:100%; }
.field input:focus { border-color:var(--accent-primary); box-shadow:0 0 0 3px #ff5c0015; outline:none; }
.password-input { position:relative; }
.password-input input { width:100%; padding-right:40px; }
.eye-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; padding:0; display:flex; }
.meta-row { display:flex; justify-content:space-between; align-items:center; }
.remember { display:flex; align-items:center; gap:8px; font-family:var(--font-body); font-size:13px; color:var(--foreground-secondary); cursor:pointer; }
.remember input[type="checkbox"] { width:16px; height:16px; accent-color:var(--accent-primary); }
.forgot { font-family:var(--font-body); font-size:13px; color:var(--accent-primary); text-decoration:none; }
.login-btn { height:52px; border-radius:12px; background:var(--accent-primary); color:#fff; font-family:var(--font-body); font-size:16px; font-weight:700; cursor:pointer; border:none; box-shadow:0 4px 16px #ff5c0030; transition:background .15s; width:100%; }
.login-btn:hover { background:var(--accent-hover); }
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
.bg-deco-1 { width:300px; height:300px; background:radial-gradient(circle,#ff5c0008,#ff5c0003 60%,transparent); top:100px; right:80px; }
.bg-deco-2 { width:250px; height:250px; background:radial-gradient(circle,#ff5c0006,#ff5c0002 60%,transparent); bottom:100px; left:-40px; }
</style>
