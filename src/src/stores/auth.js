import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(email, password) {
    // Mock: check stored users first
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    const found = users.find(u => u.email === email)
    if (found) {
      user.value = found
    } else {
      // Auto-create user
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'user'
      user.value = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role,
      }
    }
    localStorage.setItem('user', JSON.stringify(user.value))
    return user.value
  }

  function register(name, email, password) {
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user'
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
    }
    // Store in mock users
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    users.push(newUser)
    localStorage.setItem('mockUsers', JSON.stringify(users))

    user.value = newUser
    localStorage.setItem('user', JSON.stringify(user.value))
    return user.value
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, isAdmin, login, register, logout }
})
