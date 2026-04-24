<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, ArrowUp, Github, Globe, LayoutDashboard, ShoppingCart, Sparkles, Twitter } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const prompt = ref('Build a modern project management tool with a Kanban board, real-time team collaboration, file sharing, and a clean dark-mode UI. Include user authentication and role-based access control.')

function startBuilding() {
  if (auth.isAuthenticated) return router.push('/editor')
  router.push('/register')
}

function goLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="landing-page">
    <section class="landing-navbar">
      <div class="brand-inline">
        <Sparkles :size="24" class="accent-text" />
        <span class="brand-name-lg">CodePilot</span>
      </div>
      <div class="landing-links">
        <span>Features</span>
        <span>Templates</span>
        <span>Pricing</span>
        <span>Docs</span>
      </div>
      <div class="landing-actions">
        <button class="ghost-btn small" type="button" @click="goLogin">Log in</button>
        <button class="primary-btn small" type="button" @click="startBuilding">Get Started</button>
      </div>
    </section>

    <section class="landing-hero">
      <h1>Build anything with AI</h1>
      <p>Describe your idea in plain language. Get production-ready websites, apps, and tools in seconds.</p>
      <div class="prompt-shell">
        <div class="prompt-box">
          <div class="prompt-top">
            <div class="prompt-avatar"><Sparkles :size="20" /></div>
            <span class="prompt-label">What do you want to create?</span>
            <button class="prompt-send" type="button" @click="startBuilding"><ArrowUp :size="22" /></button>
          </div>
          <textarea v-model="prompt" class="prompt-area"></textarea>
          <div class="prompt-bottom">
            <div class="prompt-tags">
              <span class="prompt-tag"><LayoutDashboard :size="14" /> Dashboard</span>
              <span class="prompt-tag"><ShoppingCart :size="14" /> E-Commerce</span>
              <span class="prompt-tag"><Globe :size="14" /> Landing Page</span>
            </div>
            <span class="prompt-footnote">Press Enter to generate</span>
          </div>
        </div>
      </div>
      <div class="trust-row">
        <span>Free to start</span>
        <span class="trust-dot"></span>
        <span>No credit card required</span>
        <span class="trust-dot"></span>
        <span>Export full code</span>
      </div>
    </section>

    <section class="landing-mockup">
      <div class="product-mock">
        <div class="product-chat">
          <div class="mock-chat-head">
            <div class="mock-pill dark"></div>
            <span>AI Chat</span>
          </div>
          <div class="mock-messages">
            <div class="mock-message user">Build a responsive store dashboard with KPI cards.</div>
            <div class="mock-message ai">Generating layout, charts, and order tables...</div>
            <div class="mock-message ai strong">Preview ready. You can keep iterating.</div>
          </div>
          <div class="mock-input">
            <span>Ask AI to modify...</span>
            <button class="mini-send" type="button"><ArrowUp :size="16" /></button>
          </div>
        </div>
        <div class="product-right">
          <div class="mock-tabs">
            <span class="mock-tab active">Preview</span>
            <span class="mock-tab">Code</span>
            <span class="mock-tab">Files</span>
          </div>
          <div class="mock-preview">
            <div class="mock-preview-sidebar">
              <div class="mock-side-title">DASHKIT</div>
              <div class="mock-side-item active">Overview</div>
              <div class="mock-side-item">Orders</div>
              <div class="mock-side-item">Analytics</div>
              <div class="mock-side-item">Customers</div>
            </div>
            <div class="mock-preview-main">
              <div class="mock-kpis">
                <div class="mock-kpi"><div>Revenue</div><strong>$32,450</strong><small>+12.5% from last month</small></div>
                <div class="mock-kpi"><div>Orders</div><strong>1,284</strong><small>+8.2% from last month</small></div>
                <div class="mock-kpi"><div>Customers</div><strong>3,672</strong><small>+23.1% from last month</small></div>
              </div>
              <div class="mock-chart">
                <div class="mock-chart-title">Sales Overview</div>
                <div class="mock-bars">
                  <span style="height: 30px"></span><span style="height: 50px"></span><span style="height: 40px"></span><span style="height: 70px"></span>
                  <span style="height: 55px"></span><span style="height: 60px"></span><span style="height: 35px"></span><span style="height: 45px"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>How it works</h2>
      <div class="steps-row">
        <div class="step-card"><div class="step-num">1</div><h3>Describe</h3><p>Tell the AI what you want to build in plain language — features, style, layout, anything.</p></div>
        <div class="step-card"><div class="step-num">2</div><h3>Generate</h3><p>AI builds your app in seconds with real code, live preview, and full interactivity.</p></div>
        <div class="step-card"><div class="step-num">3</div><h3>Ship</h3><p>Deploy with one click, export the code, or keep iterating — it's all yours.</p></div>
      </div>
    </section>

    <section class="landing-cta">
      <h2>Ready to create something?</h2>
      <p>Join thousands of creators shipping real products with AI.</p>
      <button class="primary-btn cta-round" type="button" @click="startBuilding">Get Started — It's Free <ArrowRight :size="18" /></button>
    </section>

    <footer class="landing-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-name">CodePilot</div>
          <p>Build apps with AI, zero code required.</p>
        </div>
        <div class="footer-columns">
          <div class="footer-col"><strong>Product</strong><span>Features</span><span>Templates</span><span>Pricing</span></div>
          <div class="footer-col"><strong>Company</strong><span>About</span><span>Blog</span><span>Careers</span></div>
          <div class="footer-col"><strong>Resources</strong><span>Docs</span><span>Support</span><span>API</span></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CodePilot. All rights reserved.</span>
        <div class="footer-social"><Github :size="18" /><Twitter :size="18" /></div>
      </div>
    </footer>
  </div>
</template>
