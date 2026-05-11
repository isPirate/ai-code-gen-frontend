<template>
  <header class="flex items-center justify-between h-[64px] px-[80px] w-full">
    <!-- Logo -->
    <div class="flex items-center gap-[10px]">
      <span class="material-symbols-outlined text-[24px] text-[var(--accent-primary)]">sparkles</span>
      <span class="font-heading text-[24px] font-bold text-[var(--accent-primary)]">CodePilot</span>
    </div>

    <!-- Nav Links -->
    <div class="flex items-center gap-[32px]">
      <a href="#features" class="font-body text-[14px] text-[var(--foreground-secondary)] hover:text-[var(--foreground-primary)] transition-colors">Features</a>
      <a href="#templates" class="font-body text-[14px] text-[var(--foreground-secondary)] hover:text-[var(--foreground-primary)] transition-colors">Templates</a>
      <a href="#pricing" class="font-body text-[14px] text-[var(--foreground-secondary)] hover:text-[var(--foreground-primary)] transition-colors">Pricing</a>
      <a href="#docs" class="font-body text-[14px] text-[var(--foreground-secondary)] hover:text-[var(--foreground-primary)] transition-colors">Docs</a>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-[12px]">
      <router-link to="/login" class="flex items-center px-[20px] py-[8px] rounded-[8px] border border-[var(--border-subtle)] font-body text-[14px] text-[var(--foreground-primary)] hover:bg-[var(--surface-secondary)] transition-colors">
        Log in
      </router-link>
      <router-link to="/register" class="flex items-center px-[20px] py-[8px] rounded-[8px] bg-[var(--accent-primary)] font-body text-[14px] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors">
        Get Started
      </router-link>
    </div>
  </header>
</template>
