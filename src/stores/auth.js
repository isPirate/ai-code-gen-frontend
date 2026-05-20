import { ref, computed } from 'vue'
import { api } from '../api/client'

const STORAGE_KEY = 'codepilot_user'

const user = ref(null)
const loading = ref(false)

async function login(userAccount, userPassword) {
  const u = await api.login(userAccount, userPassword)
  user.value = u
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  return u
}

async function register(userAccount, userPassword, checkPassword) {
  await api.register(userAccount, userPassword, checkPassword)
  try {
    const u = await api.login(userAccount, userPassword)
    user.value = u
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    return u
  } catch {
    throw new Error('注册成功但自动登录失败，请手动登录')
  }
}

async function logout() {
  try { await api.logout() } catch {}
  user.value = null
  localStorage.removeItem(STORAGE_KEY)
}

async function fetchCurrentUser() {
  loading.value = true
  try {
    const u = await api.getLoginUser()
    user.value = u
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    return u
  } catch {
    // Server verification failed — clear auth state so router guards block protected pages
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
    return null
  } finally {
    loading.value = false
  }
}

// Server-side session verification (called once at app boot)
async function init() {
  await fetchCurrentUser()
}

export function useAuth() {
  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.userRole === 'admin')

  return {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    logout,
    fetchCurrentUser,
    init,
  }
}
