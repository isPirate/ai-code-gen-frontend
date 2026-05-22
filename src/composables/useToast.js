import { ref } from 'vue'

const messages = ref([])
let nextId = 0

function add(text, type = 'error', duration = 3000) {
  const id = nextId++
  messages.value.push({ id, text, type })
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
}

function remove(id) {
  messages.value = messages.value.filter(m => m.id !== id)
}

export function useToast() {
  return {
    messages,
    showError(text) { add(text, 'error') },
    showSuccess(text) { add(text, 'success') },
    remove,
  }
}
