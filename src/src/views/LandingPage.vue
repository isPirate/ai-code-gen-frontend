<template>
  <div class="landing">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="logo-link">
          <Sparkles :size="24" color="var(--accent-primary)" />
          <span class="logo-text">CodePilot</span>
        </router-link>
        <div class="nav-links">
          <a href="#features">Features</a>
          <router-link to="/templates">Templates</router-link>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </div>
      </div>
      <div class="nav-actions">
        <router-link to="/login" class="btn-outline">Log in</router-link>
        <router-link to="/register" class="btn-primary">Get Started</router-link>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <h1 class="hero-title">Build anything with AI</h1>
      <p class="hero-desc">Describe your idea in plain language. Get production-ready websites, apps, and tools in seconds.</p>

      <div class="prompt-box">
        <div class="prompt-inner">
          <div class="prompt-top">
            <div class="prompt-top-left">
              <span class="ai-dot"></span>
              <span class="ai-label">AI</span>
              <span class="prompt-placeholder">Describe what you want to build...</span>
            </div>
            <div class="prompt-top-right">
              <Paperclip :size="16" color="var(--foreground-muted)" />
            </div>
          </div>
          <div class="prompt-textarea">
            <textarea placeholder=""></textarea>
          </div>
          <div class="prompt-bottom">
            <div class="chips">
              <span class="chip">Landing Page</span>
              <span class="chip">Dashboard</span>
              <span class="chip">Mobile App</span>
            </div>
            <div class="prompt-hint">
              <Keyboard :size="14" color="var(--foreground-muted)" />
              <span>Ctrl + Enter</span>
            </div>
          </div>
        </div>
      </div>

      <div class="trust-row">
        <span>Free to start</span>
        <span class="dot"></span>
        <span>No credit card required</span>
        <span class="dot"></span>
        <span>Export full code</span>
      </div>
    </section>

    <!-- Mockup -->
    <section class="mockup-section">
      <div class="mockup-frame">
        <div class="mock-left">
          <div class="mock-header">
            <Sparkles :size="16" color="var(--accent-primary)" />
            <span>AI Chat</span>
            <MoreHorizontal :size="16" color="var(--foreground-muted)" style="margin-left:auto" />
          </div>
          <div class="mock-messages">
            <div class="msg ai">
              <div class="msg-avatar">AI</div>
              <div class="msg-bubble">I'll help you build an e-commerce dashboard...</div>
            </div>
            <div class="msg user">
              <div class="msg-bubble">Add a sales chart showing monthly revenue</div>
            </div>
            <div class="msg ai">
              <div class="msg-avatar">AI</div>
              <div class="msg-bubble">I've added a bar chart showing monthly revenue.</div>
            </div>
          </div>
          <div class="mock-input">
            <div class="mock-input-inner">
              <span class="mock-input-placeholder">Type a message...</span>
              <Send :size="14" color="var(--foreground-muted)" />
            </div>
          </div>
        </div>
        <div class="mock-right">
          <div class="mock-tabs">
            <span class="mock-tab active">Preview</span>
            <span class="mock-tab">Code</span>
            <span class="mock-tab">Files</span>
          </div>
          <div class="mock-content">
            <div class="mock-dots">
              <span style="background:#FF5F57"></span>
              <span style="background:#FEBC2E"></span>
              <span style="background:#28C840"></span>
            </div>
            <div class="mock-placeholder">
              <Monitor :size="48" color="#ffffff80" />
              <span style="color:#ffffff80;font-family:var(--font-body);font-size:13px">Live Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-section">
      <h2 class="how-title">How it works</h2>
      <div class="steps-row">
        <div class="step"><div class="step-num">1</div><h3 class="step-title">Describe</h3><p class="step-desc">Tell the AI what you want to build in plain language — features, style, layout, anything.</p></div>
        <div class="step"><div class="step-num">2</div><h3 class="step-title">Generate</h3><p class="step-desc">AI builds your app in seconds with real code, live preview, and full interactivity.</p></div>
        <div class="step"><div class="step-num">3</div><h3 class="step-title">Ship</h3><p class="step-desc">Deploy with one click, export the code, or keep iterating — it's all yours.</p></div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2 class="cta-title">Ready to create something?</h2>
      <p class="cta-desc">Join thousands of creators shipping real products with AI.</p>
      <router-link to="/register" class="cta-btn">Get Started — It's Free <ArrowRight :size="18" /></router-link>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo">CodePilot</span>
          <span class="footer-tagline">Build apps with AI, zero code required.</span>
        </div>
        <div class="footer-links">
          <div class="footer-col"><span class="col-title">Product</span><a href="#">Features</a><a href="#">Templates</a><a href="#">Pricing</a><a href="#">Changelog</a></div>
          <div class="footer-col"><span class="col-title">Resources</span><a href="#">Docs</a><a href="#">API</a><a href="#">Guides</a><a href="#">Blog</a></div>
          <div class="footer-col"><span class="col-title">Company</span><a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a><a href="#">Legal</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="copyright">© 2026 CodePilot. All rights reserved.</span>
        <div class="social"><Github :size="18" color="var(--foreground-muted)" /><Twitter :size="18" color="var(--foreground-muted)" /></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Sparkles, ArrowRight, Github, Twitter, Paperclip, Keyboard, Send, MoreHorizontal, Monitor } from 'lucide-vue-next'
</script>

<style scoped>
.landing { width:100%; background:var(--surface-primary); display:flex; flex-direction:column; }
/* Navbar */
.navbar { height:64px; display:flex; align-items:center; justify-content:space-between; padding:0 80px; }
.nav-left { display:flex; align-items:center; gap:40px; }
.logo-link { display:flex; align-items:center; gap:8px; text-decoration:none; }
.logo-text { font-family:var(--font-heading); font-size:24px; font-weight:700; color:var(--accent-primary); }
.nav-links { display:flex; align-items:center; gap:32px; }
.nav-links a { font-family:var(--font-body); font-size:14px; color:var(--foreground-secondary); text-decoration:none; }
.nav-links a:hover { color:var(--foreground-primary); }
.nav-actions { display:flex; align-items:center; gap:12px; }
.btn-outline { font-family:var(--font-body); font-size:14px; color:var(--foreground-primary); border-radius:var(--rounded-lg); border:1px solid var(--border-subtle); padding:8px 20px; text-decoration:none; transition:background .15s; }
.btn-outline:hover { background:var(--surface-secondary); }
.btn-primary { font-family:var(--font-body); font-size:14px; font-weight:600; color:#fff; border-radius:var(--rounded-lg); background:var(--accent-primary); padding:8px 20px; text-decoration:none; transition:background .15s; }
.btn-primary:hover { background:var(--accent-hover); }

/* Hero */
.hero { display:flex; flex-direction:column; align-items:center; gap:48px; padding:100px 120px; }
.hero-title { font-family:var(--font-heading); font-size:72px; font-weight:700; color:var(--foreground-primary); text-align:center; }
.hero-desc { font-family:var(--font-body); font-size:20px; color:var(--foreground-secondary); text-align:center; line-height:1.5; }

/* Prompt Box */
.prompt-box { width:1100px; max-width:100%; padding:3px; border-radius:20px; background:linear-gradient(135deg,#FF5C00,#FFB366,#FF5C00); box-shadow:0 8px 40px #FF5C0022,0 32px 80px #FF5C0011; }
.prompt-inner { background:var(--surface-primary); border-radius:18px; padding:28px 32px; display:flex; flex-direction:column; gap:20px; }
.prompt-top { display:flex; align-items:center; justify-content:space-between; }
.prompt-top-left { display:flex; align-items:center; gap:12px; }
.ai-dot { width:10px; height:10px; border-radius:50%; background:#8B5CF6; }
.ai-label { font-family:var(--font-caption); font-size:10px; color:var(--accent-primary); background:#FFF5EE; border-radius:var(--rounded-full); padding:2px 8px; }
.prompt-placeholder { font-family:var(--font-body); font-size:14px; color:var(--foreground-muted); }
.prompt-textarea { width:100%; }
.prompt-textarea textarea { width:100%; height:96px; border:none; outline:none; resize:none; font-family:var(--font-body); font-size:14px; color:var(--foreground-primary); background:transparent; }
.prompt-bottom { display:flex; align-items:center; justify-content:space-between; }
.chips { display:flex; gap:8px; }
.chip { font-family:var(--font-caption); font-size:11px; color:var(--foreground-muted); background:var(--surface-secondary); border-radius:var(--rounded-full); padding:4px 10px; }
.prompt-hint { display:flex; align-items:center; gap:4px; font-family:var(--font-caption); font-size:11px; color:var(--foreground-muted); }

/* Trust */
.trust-row { display:flex; align-items:center; gap:32px; font-family:var(--font-body); font-size:14px; color:var(--foreground-muted); }
.dot { width:4px; height:4px; border-radius:50%; background:var(--foreground-muted); }

/* Mockup */
.mockup-section { padding:48px 120px 64px; }
.mockup-frame { border-radius:var(--rounded-xl); border:1px solid var(--border-subtle); box-shadow:0 4px 6px #00000008,0 16px 40px #00000012; background:var(--surface-secondary); height:560px; display:flex; overflow:hidden; }
.mock-left { width:360px; display:flex; flex-direction:column; border-right:1px solid var(--border-subtle); background:var(--surface-primary); }
.mock-header { height:44px; display:flex; align-items:center; gap:8px; padding:0 16px; border-bottom:1px solid var(--border-subtle); font-family:var(--font-body); font-size:14px; font-weight:600; }
.mock-messages { flex:1; padding:16px; display:flex; flex-direction:column; gap:14px; overflow:auto; }
.msg { display:flex; gap:8px; }
.msg.ai { align-items:flex-start; }
.msg.user { justify-content:flex-end; }
.msg-avatar { width:24px; height:24px; border-radius:50%; background:var(--accent-primary); color:#fff; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.msg-bubble { max-width:85%; padding:10px 14px; border-radius:12px; font-family:var(--font-body); font-size:13px; line-height:1.5; }
.msg.ai .msg-bubble { background:var(--surface-secondary); color:var(--foreground-primary); }
.msg.user .msg-bubble { background:var(--accent-primary); color:#fff; }
.mock-input { border-top:1px solid var(--border-subtle); padding:12px 16px; }
.mock-input-inner { display:flex; align-items:center; justify-content:space-between; background:var(--surface-secondary); border-radius:var(--rounded-lg); padding:8px 12px; }
.mock-input-placeholder { font-family:var(--font-body); font-size:13px; color:var(--foreground-muted); }
.mock-right { flex:1; display:flex; flex-direction:column; background:var(--surface-secondary); }
.mock-tabs { height:36px; display:flex; align-items:center; gap:16px; padding:0 14px; background:var(--surface-primary); border-bottom:1px solid var(--border-subtle); }
.mock-tab { font-family:var(--font-body); font-size:12px; color:var(--foreground-muted); }
.mock-tab.active { color:var(--foreground-primary); font-weight:500; }
.mock-content { flex:1; background:#1E1E2E; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }
.mock-dots { display:flex; gap:6px; margin-bottom:8px; }
.mock-dots span { width:10px; height:10px; border-radius:50%; }
.mock-placeholder { display:flex; flex-direction:column; align-items:center; gap:8px; }

/* How It Works */
.how-section { display:flex; flex-direction:column; align-items:center; gap:48px; padding:64px 120px; }
.how-title { font-family:var(--font-heading); font-size:36px; font-weight:700; text-align:center; }
.steps-row { display:flex; gap:32px; width:100%; }
.step { flex:1; display:flex; flex-direction:column; align-items:center; gap:20px; }
.step-num { width:48px; height:48px; border-radius:24px; background:var(--accent-primary); color:#fff; font-family:var(--font-body); font-size:20px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.step-title { font-family:var(--font-heading); font-size:24px; font-weight:700; text-align:center; }
.step-desc { font-family:var(--font-body); font-size:14px; color:var(--foreground-secondary); text-align:center; line-height:1.7; width:280px; }

/* CTA */
.cta-section { display:flex; flex-direction:column; align-items:center; gap:28px; padding:60px 80px; background:var(--surface-secondary); }
.cta-title { font-family:var(--font-heading); font-size:36px; font-weight:700; text-align:center; }
.cta-desc { font-family:var(--font-body); font-size:16px; color:var(--foreground-secondary); text-align:center; line-height:1.6; width:480px; }
.cta-btn { display:flex; align-items:center; gap:8px; border-radius:var(--rounded-full); background:var(--accent-primary); padding:14px 32px; font-family:var(--font-body); font-size:16px; font-weight:600; color:#fff; text-decoration:none; transition:background .15s; }
.cta-btn:hover { background:var(--accent-hover); }

/* Footer */
.footer { display:flex; flex-direction:column; gap:28px; padding:40px 80px; border-top:1px solid var(--border-subtle); }
.footer-top { display:flex; justify-content:space-between; }
.footer-brand { display:flex; flex-direction:column; gap:8px; }
.footer-logo { font-family:var(--font-heading); font-size:20px; font-weight:700; color:var(--accent-primary); }
.footer-tagline { font-family:var(--font-body); font-size:13px; color:var(--foreground-muted); }
.footer-links { display:flex; gap:64px; }
.footer-col { display:flex; flex-direction:column; gap:12px; }
.col-title { font-family:var(--font-body); font-size:13px; font-weight:500; }
.footer-col a { font-family:var(--font-body); font-size:13px; color:var(--foreground-muted); text-decoration:none; }
.footer-col a:hover { color:var(--foreground-primary); }
.footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:24px; border-top:1px solid var(--border-subtle); }
.copyright { font-family:var(--font-caption); font-size:12px; color:var(--foreground-muted); }
.social { display:flex; gap:16px; }
</style>
