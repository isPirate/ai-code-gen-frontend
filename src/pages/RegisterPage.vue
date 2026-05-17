<template>
  <div class="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden bg-[var(--surface-primary)]">
    <!-- Brand Panel -->
    <div class="relative flex flex-col justify-between gap-[24px] lg:gap-[32px] w-full lg:w-[560px] h-full p-[32px_24px] lg:p-[60px_48px] bg-gradient-to-br from-[var(--accent-primary)] via-[#E84A1A] to-[#A82808] overflow-hidden">
      <div class="absolute pointer-events-none w-[280px] h-[280px] rounded-full bg-gradient-radial from-white/18 to-transparent" style="top:-60px;right:-20px"></div>
      <div class="absolute pointer-events-none w-[220px] h-[220px] rounded-full bg-gradient-radial from-white/16 to-transparent" style="top:400px;left:-60px"></div>
      <div class="absolute pointer-events-none w-[180px] h-[180px] rounded-full bg-gradient-radial from-white/14 to-transparent" style="top:550px;right:-20px"></div>
      <div class="absolute pointer-events-none w-[90px] h-[90px] rounded-[20px] bg-white/8 rotate-[25deg]" style="top:200px;left:60px"></div>
      <div class="absolute pointer-events-none w-[70px] h-[70px] rounded-[16px] bg-white/6 -rotate-[15deg]" style="top:350px;right:20px"></div>
      <div class="absolute pointer-events-none w-[50px] h-[50px] rounded-[12px] bg-white/10 rotate-[35deg]" style="top:120px;right:10px"></div>
      <div class="absolute pointer-events-none w-[8px] h-[8px] rounded-full bg-white/20" style="top:100px;left:140px"></div>
      <div class="absolute pointer-events-none w-[6px] h-[6px] rounded-full bg-white/15" style="top:480px;right:20px"></div>
      <div class="absolute pointer-events-none w-[10px] h-[10px] rounded-full bg-white/15" style="top:700px;left:80px"></div>
      <div class="absolute pointer-events-none w-[5px] h-[5px] rounded-full bg-white/20" style="top:280px;right:20px"></div>
      <div class="absolute pointer-events-none w-[7px] h-[7px] rounded-full bg-white/12" style="top:800px;left:280px"></div>
      <div class="absolute pointer-events-none w-[140px] h-[140px] rounded-full border border-white/12" style="top:150px;left:-30px"></div>
      <div class="absolute pointer-events-none w-[100px] h-[100px] rounded-full border border-white/10" style="top:650px;right:10px"></div>

      <div class="relative flex flex-col gap-[20px] lg:gap-[24px] bg-white/5 rounded-[24px] p-[24px] lg:p-[36px] shadow-[0_4px_24px_#00000020]">
        <span class="font-heading text-[32px] font-bold text-white tracking-[-0.5px]">CodePilot</span>
        <h2 class="font-heading text-[28px] lg:text-[40px] font-bold text-white leading-[1.2] tracking-[-0.5px] max-w-[420px]">
          Start building<br/>today, for free
        </h2>
        <p class="font-body text-[14px] lg:text-[16px] text-white/70 leading-[1.7] max-w-[420px]">
          No credit card required. Get started<br/>with our generous free tier.
        </p>
      </div>

      <div class="relative hidden lg:flex flex-col gap-[16px] w-full">
        <div class="flex flex-col gap-[12px] bg-white/6 rounded-[16px] p-[20px_24px] shadow-[0_2px_12px_#00000012]">
          <p class="font-body text-[14px] text-white/87 leading-[1.6] max-w-[400px]">
            "CodePilot helped me launch my SaaS<br/>product in just 2 days. Incredible!"
          </p>
          <div class="flex items-center gap-[12px]">
            <div class="w-[36px] h-[36px] rounded-full bg-white/20"></div>
            <div class="flex flex-col gap-[2px]">
              <span class="font-body text-[13px] font-medium text-white/90">Sarah Chen</span>
              <span class="font-caption text-[11px] text-white/50">Founder, SaaS Inc.</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[12px] bg-white/6 rounded-[16px] p-[20px_24px] shadow-[0_2px_12px_#00000012]">
          <p class="font-body text-[14px] text-white/87 leading-[1.6] max-w-[400px]">
            "We replaced 3 weeks of frontend work with a single afternoon of prompting."
          </p>
          <div class="flex items-center gap-[12px]">
            <div class="w-[36px] h-[36px] rounded-full bg-white/20"></div>
            <div class="flex flex-col gap-[2px]">
              <span class="font-body text-[13px] font-medium text-white/90">Marcus Rivera</span>
              <span class="font-caption text-[11px] text-white/50">Tech Lead, BigCorp</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Form -->
    <div class="relative flex items-center justify-center flex-1 h-full p-[32px_24px] lg:p-[60px_120px] overflow-hidden bg-gradient-to-t from-[#FFF5ED] via-[#FFFBF7] to-white">
      <div class="absolute pointer-events-none w-[280px] h-[280px] rounded-full bg-gradient-radial from-[#FF5C0008] to-transparent" style="top:80px;right:40px"></div>
      <div class="absolute pointer-events-none w-[220px] h-[220px] rounded-full bg-gradient-radial from-[#FF5C0006] to-transparent" style="bottom:100px;left:-30px"></div>
      <div class="absolute pointer-events-none w-[50px] h-[50px] rounded-[12px] bg-[#FF5C0006] -rotate-[20deg]" style="top:420px;right:20px"></div>
      <div class="absolute pointer-events-none w-[7px] h-[7px] rounded-full bg-[#FF5C0015]" style="top:300px;right:40%"></div>
      <div class="absolute pointer-events-none w-[9px] h-[9px] rounded-full bg-[#FF5C0012]" style="top:180px;left:60px"></div>
      <div class="absolute pointer-events-none w-[35px] h-[35px] rounded-[8px] bg-[#FF5C0005] rotate-[25deg]" style="bottom:80px;right:20px"></div>

      <div class="flex flex-col gap-[28px] w-full max-w-[480px]">
        <div>
          <h1 class="font-heading text-[28px] lg:text-[36px] font-bold text-[var(--foreground-primary)] tracking-[-0.5px]">Create your account</h1>
          <p class="font-body text-[14px] lg:text-[16px] text-[var(--foreground-secondary)] mt-[4px]">Start building with AI in seconds</p>
        </div>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-[20px] w-full">
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Account</label>
            <input v-model="userAccount" type="text" placeholder="Choose an account name" class="w-full h-[44px] px-[14px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-colors" />
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Password</label>
            <div class="flex items-center h-[44px] rounded-[8px] border border-[var(--border-subtle)] focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] transition-colors overflow-hidden">
              <input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="Create a password" class="flex-1 h-full px-[14px] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
              <button type="button" @click="showPass = !showPass" class="flex-shrink-0 h-full px-[10px] flex items-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <EyeOff v-if="showPass" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-[6px]">
            <label class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Confirm Password</label>
            <div class="flex items-center h-[44px] rounded-[8px] border border-[var(--border-subtle)] focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] transition-colors overflow-hidden">
              <input v-model="checkPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Confirm your password" class="flex-1 h-full px-[14px] font-body text-[14px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
              <button type="button" @click="showConfirm = !showConfirm" class="flex-shrink-0 h-full px-[10px] flex items-center text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer">
                <EyeOff v-if="showConfirm" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
          </div>

          <label class="flex items-center gap-[8px] cursor-pointer">
            <input type="checkbox" v-model="agreeTerms" class="w-[16px] h-[16px] rounded-[4px] accent-[var(--accent-primary)]" />
            <span class="font-body text-[12px] text-[var(--foreground-secondary)]">I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button
            type="submit"
            :disabled="loading"
            class="flex items-center justify-center h-[52px] w-full rounded-[12px] bg-[var(--accent-primary)] font-body text-[16px] text-white font-bold hover:bg-[var(--accent-hover)] transition-colors shadow-[0_4px_16px_#FF5C0030] disabled:opacity-60"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>

          <p v-if="error" class="font-body text-[13px] text-red-500 text-center">{{ error }}</p>
        </form>

        <div class="flex items-center gap-[16px] w-full py-[4px]">
          <div class="flex-1 h-[1px] bg-[var(--border-subtle)]"></div>
          <span class="font-caption text-[11px] text-[var(--foreground-muted)]">or sign up with</span>
          <div class="flex-1 h-[1px] bg-[var(--border-subtle)]"></div>
        </div>

        <div class="flex gap-[16px] w-full">
          <button class="flex items-center justify-center gap-[6px] h-[44px] flex-1 rounded-[10px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <svg class="w-[14px] h-[14px]" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button class="flex items-center justify-center gap-[6px] h-[44px] flex-1 rounded-[10px] border border-[var(--border-subtle)] font-body text-[12px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
            <svg class="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <p class="flex items-center justify-center gap-[4px] w-full font-body text-[13px]">
          <span class="text-[var(--foreground-secondary)]">Already have an account?</span>
          <router-link to="/login" class="font-semibold text-[var(--accent-primary)] hover:underline">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const router = useRouter()
const auth = useAuth()

onMounted(() => {
  if (auth.isAuthenticated.value) {
    router.replace(auth.isAdmin.value ? '/admin' : '/dashboard')
  }
})

const userAccount = ref('')
const password = ref('')
const checkPassword = ref('')
const showPass = ref(false)
const showConfirm = ref(false)
const agreeTerms = ref(false)
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
  if (!userAccount.value || !password.value || !checkPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }
  if (password.value !== checkPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (!agreeTerms.value) {
    error.value = 'Please agree to the Terms of Service'
    return
  }
  loading.value = true
  try {
    const user = await auth.register(userAccount.value, password.value, checkPassword.value)
    if (user.userRole === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/dashboard')
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
