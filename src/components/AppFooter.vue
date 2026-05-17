<template>
  <footer class="flex flex-col gap-[28px] w-full border-t border-[var(--border-subtle)] px-[80px] py-[40px]">
    <div class="flex justify-between w-full">
      <div class="flex flex-col gap-[8px]">
        <div class="flex items-center gap-[10px]">
          <Sparkles :size="24" class="text-[var(--accent-primary)]" />
          <span class="font-heading text-[20px] font-bold text-[var(--foreground-primary)]">CodePilot</span>
        </div>
        <p class="font-body text-[13px] text-[var(--foreground-muted)] leading-relaxed max-w-[280px]">
          AI-powered zero-code platform. Turn your ideas into production-ready applications.
        </p>
      </div>
      <div class="flex gap-[64px]">
        <div class="flex flex-col gap-[8px]">
          <span class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Product</span>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Features</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Featured</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Pricing</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Changelog</a>
        </div>
        <div class="flex flex-col gap-[8px]">
          <span class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Resources</span>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Documentation</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">API Reference</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Tutorials</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Blog</a>
        </div>
        <div class="flex flex-col gap-[8px]">
          <span class="font-body text-[13px] font-medium text-[var(--foreground-primary)]">Company</span>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">About</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Careers</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Privacy</a>
          <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Terms</a>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between w-full pt-[24px] border-t border-[var(--border-subtle)]">
      <span class="font-caption text-[12px] text-[var(--foreground-muted)]">&copy; 2026 CodePilot. All rights reserved.</span>
      <div class="flex items-center gap-[16px]">
        <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Twitter</a>
        <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">GitHub</a>
        <a href="#" class="font-body text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground-primary)] transition-colors">Discord</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Sparkles } from 'lucide-vue-next'
</script>
