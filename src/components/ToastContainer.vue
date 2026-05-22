<template>
  <Teleport to="body">
    <div class="fixed top-[20px] right-[20px] z-[9999] flex flex-col gap-[8px] pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="pointer-events-auto flex items-center gap-[10px] px-[14px] py-[10px] rounded-[10px] shadow-lg font-body text-[13px] min-w-[280px] max-w-[420px] cursor-pointer"
          :class="msg.type === 'error'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'"
          @click="remove(msg.id)"
        >
          <AlertCircle v-if="msg.type === 'error'" :size="16" class="flex-shrink-0" />
          <CheckCircle v-else :size="16" class="flex-shrink-0" />
          <span class="flex-1">{{ msg.text }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { AlertCircle, CheckCircle } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

const { messages, remove } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.25s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
