<script setup>
import AppSidebar from './AppSidebar.vue'

defineProps({
  admin: { type: Boolean, default: false }
})
</script>

<template>
  <div class="app-shell">
    <AppSidebar :admin="admin" />
    <main class="app-shell-main">
      <slot />
    </main>
  </div>
</template>
