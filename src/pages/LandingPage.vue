<template>
  <div class="flex flex-col w-full bg-[var(--surface-primary)]">
    <Navbar />

    <!-- Hero Section -->
    <section class="flex flex-col items-center gap-[48px] w-full py-[100px] px-[120px]">
      <h1 class="font-heading text-[72px] font-bold text-[var(--foreground-primary)] text-center leading-[1.1]">
        Build anything with AI
      </h1>
      <p class="font-body text-[20px] text-[var(--foreground-secondary)] text-center leading-[1.5] max-w-[700px]">
        Describe your idea in plain language. Get production-ready websites, apps, and tools in seconds.
      </p>

      <!-- Prompt Box -->
      <div class="flex flex-col w-[1100px] max-w-full p-[3px] rounded-[20px] bg-gradient-to-br from-[var(--accent-primary)] via-[#FFB366] to-[var(--accent-primary)] shadow-[0_8px_40px_#FF5C0022,0_32px_80px_#FF5C0011]">
        <div class="flex flex-col gap-[20px] w-full bg-white rounded-[18px] p-[28px_32px]">
          <textarea
            v-model="prompt"
            placeholder="Describe the app you want to build..."
            class="w-full min-h-[80px] font-body text-[18px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] resize-none outline-none bg-transparent"
            @keydown.enter.exact="handleGenerate"
          ></textarea>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[12px]">
              <button class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
                <Paperclip :size="16" />
                Attach
              </button>
              <button class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[13px] text-[var(--foreground-secondary)] hover:bg-[var(--surface-secondary)] transition-colors">
                <Code :size="16" />
                Stack
              </button>
            </div>
            <button @click="handleGenerate" class="flex items-center gap-[8px] px-[20px] py-[10px] rounded-[12px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
              <span>Generate</span>
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>
      </div>

      <!-- Login Prompt Modal -->
      <div v-if="showLoginPrompt" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showLoginPrompt = false">
        <div class="bg-white rounded-[16px] p-[32px] w-[420px] shadow-xl text-center">
          <Sparkles :size="40" class="text-[var(--accent-primary)] mx-auto mb-[16px]" />
          <h3 class="font-heading text-[22px] font-bold text-[var(--foreground-primary)] mb-[8px]">Ready to build?</h3>
          <p class="font-body text-[14px] text-[var(--foreground-secondary)] mb-[24px]">
            Sign up or log in to start generating apps with AI.
          </p>
          <div class="flex gap-[12px] justify-center">
            <router-link to="/login" class="px-[24px] py-[10px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors">Log in</router-link>
            <router-link to="/register" class="px-[24px] py-[10px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">Get Started</router-link>
          </div>
        </div>
      </div>

      <!-- Trust Row -->
      <div class="flex items-center gap-[32px]">
        <span class="font-body text-[14px] text-[var(--foreground-muted)]">Free to start</span>
        <span class="w-[4px] h-[4px] rounded-full bg-[var(--foreground-muted)]"></span>
        <span class="font-body text-[14px] text-[var(--foreground-muted)]">No credit card required</span>
        <span class="w-[4px] h-[4px] rounded-full bg-[var(--foreground-muted)]"></span>
        <span class="font-body text-[14px] text-[var(--foreground-muted)]">Export full code</span>
      </div>
    </section>

    <!-- Product Mockup -->
    <section class="flex flex-col items-center gap-[16px] w-full pt-[48px] px-[120px] pb-[64px]">
      <div class="flex w-full h-[560px] rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] overflow-hidden shadow-[0_4px_6px_#00000008,0_16px_40px_#00000012]">
        <div class="flex flex-col w-[360px] bg-white border-r border-[var(--border-subtle)]">
          <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] gap-[8px]">
            <Sparkles :size="18" class="text-[var(--accent-primary)]" />
            <span class="font-body text-[14px] font-medium text-[var(--foreground-primary)]">AI Chat</span>
          </div>
          <div class="flex flex-col gap-[16px] p-[16px] flex-1 overflow-auto">
            <div class="flex gap-[8px]">
              <div class="w-[28px] h-[28px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                <Sparkles :size="14" class="text-white" />
              </div>
              <div class="bg-[var(--surface-secondary)] rounded-[12px] rounded-tl-[4px] p-[10px_14px] font-body text-[13px] text-[var(--foreground-primary)] leading-relaxed max-w-[260px]">
                What kind of app would you like to build today?
              </div>
            </div>
            <div class="flex gap-[8px] justify-end">
              <div class="bg-[var(--accent-primary)] rounded-[12px] rounded-tr-[4px] p-[10px_14px] font-body text-[13px] text-white leading-relaxed max-w-[260px]">
                I want a modern SaaS dashboard with analytics
              </div>
            </div>
            <div class="flex gap-[8px]">
              <div class="w-[28px] h-[28px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                <Sparkles :size="14" class="text-white" />
              </div>
              <div class="bg-[var(--surface-secondary)] rounded-[12px] rounded-tl-[4px] p-[10px_14px] font-body text-[13px] text-[var(--foreground-primary)] leading-relaxed max-w-[260px]">
                Here's your dashboard! I've added analytics charts, user metrics, and a sidebar navigation.
              </div>
            </div>
          </div>
          <div class="flex items-center gap-[8px] p-[12px_16px] border-t border-[var(--border-subtle)]">
            <input placeholder="Type your message..." class="flex-1 font-body text-[13px] text-[var(--foreground-primary)] placeholder-[var(--foreground-muted)] outline-none bg-transparent" />
            <button class="w-[32px] h-[32px] rounded-[8px] bg-[var(--accent-primary)] flex items-center justify-center">
              <ArrowUp :size="16" class="text-white" />
            </button>
          </div>
        </div>
        <div class="flex flex-col flex-1 bg-[var(--surface-secondary)]">
          <div class="flex items-center h-[48px] px-[16px] border-b border-[var(--border-subtle)] bg-white gap-[16px]">
            <div class="flex items-center gap-[8px]">
              <span class="w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></span>
              <span class="w-[10px] h-[10px] rounded-full bg-[#FFBC2E]"></span>
              <span class="w-[10px] h-[10px] rounded-full bg-[#28CA41]"></span>
            </div>
            <div class="flex items-center gap-[8px]">
              <span class="px-[10px] py-[4px] rounded-[6px] bg-[var(--surface-secondary)] font-body text-[12px] font-medium text-[var(--foreground-primary)]">Preview</span>
              <span class="px-[10px] py-[4px] rounded-[6px] font-body text-[12px] text-[var(--foreground-muted)]">Code</span>
              <span class="px-[10px] py-[4px] rounded-[6px] font-body text-[12px] text-[var(--foreground-muted)]">Files</span>
            </div>
          </div>
          <div class="flex-1 p-[24px] flex items-center justify-center">
            <div class="w-full max-w-[700px] bg-white rounded-[12px] border border-[var(--border-subtle)] shadow-sm overflow-hidden">
              <div class="flex h-[44px] border-b border-[var(--border-subtle)]">
                <div class="flex items-center gap-[8px] px-[16px] border-b-[2px] border-[var(--accent-primary)]">
                  <span class="font-body text-[13px] font-medium text-[var(--accent-primary)]">Overview</span>
                </div>
                <div class="flex items-center gap-[8px] px-[16px]"><span class="font-body text-[13px] text-[var(--foreground-muted)]">Analytics</span></div>
                <div class="flex items-center gap-[8px] px-[16px]"><span class="font-body text-[13px] text-[var(--foreground-muted)]">Reports</span></div>
              </div>
              <div class="p-[20px] grid grid-cols-4 gap-[16px]">
                <div v-for="i in 4" :key="i" class="bg-[var(--surface-secondary)] rounded-[8px] p-[14px]">
                  <div class="w-full h-[8px] rounded-full bg-[#E5E7EB] mb-[8px]"></div>
                  <div class="w-2/3 h-[12px] rounded-full bg-[#D1D5DB] mb-[4px]"></div>
                  <div class="w-1/3 h-[8px] rounded-full bg-[#E5E7EB]"></div>
                </div>
              </div>
              <div class="px-[20px] pb-[20px]">
                <div class="w-full h-[160px] rounded-[8px] bg-[var(--surface-secondary)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="flex flex-col items-center gap-[48px] w-full py-[64px] px-[120px]">
      <h2 class="font-heading text-[36px] font-bold text-[var(--foreground-primary)] text-center">How it works</h2>
      <div class="flex gap-[32px] w-full">
        <div v-for="(step, i) in steps" :key="i" class="flex flex-col items-center gap-[20px] flex-1">
          <div class="w-[64px] h-[64px] rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
            <span class="font-heading text-[28px] font-bold text-white">{{ i + 1 }}</span>
          </div>
          <h3 class="font-heading text-[20px] font-bold text-[var(--foreground-primary)] text-center">{{ step.title }}</h3>
          <p class="font-body text-[15px] text-[var(--foreground-secondary)] text-center leading-relaxed max-w-[280px]">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="flex flex-col items-center gap-[28px] w-full bg-[var(--surface-secondary)] py-[60px] px-[80px]">
      <h2 class="font-heading text-[36px] font-bold text-[var(--foreground-primary)] text-center">Ready to create something?</h2>
      <p class="font-body text-[16px] text-[var(--foreground-secondary)] text-center leading-[1.6] max-w-[480px]">
        Join thousands of creators shipping real products with AI.
      </p>
      <router-link to="/register" class="flex items-center gap-[8px] px-[32px] py-[14px] rounded-full bg-[var(--accent-primary)] font-body text-[16px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
        Get Started — It's Free
        <ArrowRight :size="18" />
      </router-link>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { Sparkles, Paperclip, Code, ArrowRight, ArrowUp } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const router = useRouter()
const auth = useAuth()
const prompt = ref('')
const showLoginPrompt = ref(false)

const steps = [
  { title: 'Describe your idea', desc: 'Tell the AI what you want to build using natural language. No coding required.' },
  { title: 'AI generates it', desc: 'Watch as the AI creates your app in real-time with production-quality code.' },
  { title: 'Deploy & share', desc: 'One-click deploy to production. Export full code anytime you want.' },
]

function handleGenerate() {
  if (auth.isAuthenticated.value) {
    router.push({ path: '/editor', query: { prompt: prompt.value } })
  } else {
    showLoginPrompt.value = true
  }
}
</script>
