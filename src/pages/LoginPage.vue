<template>
  <div class="flex w-full h-screen bg-[var(--surface-primary)]">
    <!-- Brand Panel -->
    <div class="relative flex flex-col justify-between gap-[32px] w-[560px] h-full p-[60px_48px] bg-gradient-to-br from-[var(--accent-primary)] via-[#E8491D] to-[#D4370A] overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute w-[320px] h-[320px] rounded-full bg-gradient-radial from-white/15 to-transparent opacity-80" style="top:80px;left:-80px"></div>
      <div class="absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/18 to-transparent" style="top:-40px;left:360px"></div>
      <div class="absolute w-[160px] h-[160px] rounded-full bg-gradient-radial from-white/12 to-transparent" style="top:500px;left:400px"></div>
      <div class="absolute w-[100px] h-[100px] rounded-[24px] bg-white/10 rotate-[15deg]" style="top:380px;left:60px"></div>
      <div class="absolute w-[60px] h-[60px] rounded-[16px] bg-white/8 -rotate-[20deg]" style="top:680px;left:340px"></div>
      <div class="absolute w-[80px] h-[80px] rounded-[20px] bg-white/10 rotate-[30deg]" style="top:640px;left:-20px"></div>
      <div class="absolute w-[8px] h-[8px] rounded-full bg-white/25" style="top:160px;left:120px"></div>
      <div class="absolute w-[6px] h-[6px] rounded-full bg-white/20" style="top:320px;left:440px"></div>
      <div class="absolute w-[10px] h-[10px] rounded-full bg-white/15" style="top:720px;left:300px"></div>
      <div class="absolute w-[5px] h-[5px] rounded-full bg-white/20" style="top:560px;left:480px"></div>
      <div class="absolute w-[7px] h-[7px] rounded-full bg-white/15" style="top:500px;left:30px"></div>
      <div class="absolute w-[120px] h-[120px] rounded-full border border-white/15" style="top:200px;left:420px"></div>
      <div class="absolute w-[180px] h-[180px] rounded-full border border-white/10" style="top:300px;left:-40px"></div>

      <!-- Content -->
      <div class="relative flex flex-col gap-[28px] bg-white/5 rounded-[24px] p-[40px] shadow-[0_4px_24px_#00000020]">
        <span class="font-heading text-[32px] font-bold text-white tracking-[-0.5px]">CodePilot</span>
        <h2 class="font-heading text-[40px] font-bold text-white leading-[1.2] tracking-[-0.5px] max-w-[420px]">
          Turn your ideas<br/>into reality with AI
        </h2>
        <p class="font-body text-[16px] text-white/70 leading-[1.7] max-w-[420px]">
          Build production-ready web applications<br/>without writing a single line of code.
        </p>
        <!-- Code Window Decoration -->
        <div class="flex flex-col gap-[8px] w-full bg-white/8 rounded-[12px] p-[16px]">
          <div class="flex gap-[6px]">
            <span class="w-[10px] h-[10px] rounded-full bg-white/30"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-white/30"></span>
            <span class="w-[10px] h-[10px] rounded-full bg-white/30"></span>
          </div>
          <div class="flex flex-col gap-[6px] mt-[8px]">
            <div class="h-[4px] rounded-full bg-white/15 w-full"></div>
            <div class="h-[4px] rounded-full bg-white/10 w-3/4"></div>
            <div class="h-[4px] rounded-full bg-white/15 w-5/6"></div>
            <div class="h-[4px] rounded-full bg-white/10 w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="relative flex gap-[16px] w-full">
        <div v-for="stat in stats" :key="stat.label" class="flex items-center justify-center gap-[12px] flex-1 bg-white/7 rounded-[16px] p-[16px_20px] shadow-[0_2px_12px_#00000015]">
          <span class="font-heading text-[28px] font-bold text-white">{{ stat.value }}</span>
          <span class="font-body text-[13px] text-white/60">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Login Form -->
    <div class="relative flex items-center justify-center flex-1 h-full p-[60px_120px] overflow-hidden bg-gradient-to-t from-[#FFF5ED] via-[#FFFBF7] to-white">
      <!-- Bg Decorations -->
      <div class="absolute w-[300px] h-[300px] rounded-full bg-gradient-radial from-[#FF5C0008] to-transparent" style="top:100px;right:20px"></div>
      <div class="absolute w-[250px] h-[250px] rounded-full bg-gradient-radial from-[#FF5C0006] to-transparent" style="bottom:100px;left:-40px"></div>
      <div class="absolute w-[60px] h-[60px] rounded-[14px] bg-[#FF5C0006] rotate-[20deg]" style="top:450px;right:50px"></div>
      <div class="absolute w-[6px] h-[6px] rounded-full bg-[#FF5C0015]" style="top:350px;right:50%"></div>
      <div class="absolute w-[8px] h-[8px] rounded-full bg-[#FF5C0012]" style="top:200px;left:80px"></div>
      <div class="absolute w-[40px] h-[40px] rounded-[10px] bg-[#FF5C0005] -rotate-[15deg]" style="bottom:100px;left:30px"></div>

      <div class="flex flex-col gap-[28px] w-full max-w-[480px]">
        <div>
          <h1 class="font-heading text-[36px] font-bold text-[var(--foreground-primary)] tracking-[-0.5px]">Welcome back</h1>
          <p class="font-body text-[16px] text-[var(--foreground-secondary)] mt-[4px]">Log in to your account to continue building</p>
        </div>

        <!-- Form Fields -->
        <div class="flex flex-col gap-[24px] w-full">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors"
            />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Password</label>
            <div class="flex items-center justify-between h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] transition-colors">
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Enter your password"
                class="flex-1 font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent"
              />
              <button @click="showPass = !showPass" class="text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)]">
                <span class="material-symbols-outlined text-[18px]">{{ showPass ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between w-full">
          <label class="flex items-center gap-[8px] cursor-pointer">
            <input type="checkbox" v-model="remember" class="w-[16px] h-[16px] rounded-[4px] accent-[var(--accent-primary)]" />
            <span class="font-body text-[13px] text-[var(--foreground-secondary)]">Remember me</span>
          </label>
          <a href="#" class="font-body text-[13px] font-medium text-[var(--accent-primary)] hover:underline">Forgot password?</a>
        </div>

        <!-- Login Button -->
        <button
          @click="handleLogin"
          :disabled="loading"
          class="flex items-center justify-center h-[52px] w-full rounded-[12px] bg-[var(--accent-primary)] font-body text-[16px] text-white font-bold hover:bg-[var(--accent-hover)] transition-colors shadow-[0_4px_16px_#FF5C0030] disabled:opacity-60"
        >
          {{ loading ? 'Logging in...' : 'Log in' }}
        </button>

        <!-- Error -->
        <p v-if="error" class="font-body text-[13px] text-red-500 text-center">{{ error }}</p>

        <!-- OAuth Divider -->
        <div class="flex items-center gap-[16px] w-full py-[4px]">
          <div class="flex-1 h-[1px] bg-[var(--border-subtle)]"></div>
          <span class="font-caption text-[11px] text-[var(--foreground-muted)]">or continue with</span>
          <div class="flex-1 h-[1px] bg-[var(--border-subtle)]"></div>
        </div>

        <!-- OAuth Buttons -->
        <div class="flex gap-[16px] w-full">
          <button class="flex items-center justify-center gap-[6px] h-[44px] flex-1 rounded-[10px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <span class="material-symbols-outlined text-[14px]">mail</span>
            Google
          </button>
          <button class="flex items-center justify-center gap-[6px] h-[44px] flex-1 rounded-[10px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <svg class="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <!-- Footer Link -->
        <p class="flex items-center justify-center gap-[4px] w-full font-body text-[13px]">
          <span class="text-[var(--foreground-secondary)]">Don't have an account?</span>
          <router-link to="/register" class="font-semibold text-[var(--accent-primary)] hover:underline">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockApi } from '../api/mock.js'

const router = useRouter()
const email = ref('john@example.com')
const password = ref('password123')
const showPass = ref(false)
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const stats = [
  { value: '50K+', label: 'Users' },
  { value: '120K+', label: 'Apps Built' },
  { value: '4.9', label: 'Rating' },
]

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  loading.value = true
  try {
    await mockApi.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
