import { defineStore } from 'pinia'
import * as api from '../mock/api'

const AUTH_KEY = 'codepilot-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null,
    hydrated: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    hydrate() {
      if (this.hydrated) return
      const raw = localStorage.getItem(AUTH_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        this.token = parsed.token
        this.user = parsed.user
      }
      this.hydrated = true
    },
    persist() {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ token: this.token, user: this.user }))
    },
    async login(credentials) {
      const result = await api.login(credentials)
      this.token = result.token
      this.user = result.user
      this.persist()
      return result
    },
    async register(payload) {
      const result = await api.register(payload)
      this.token = result.token
      this.user = result.user
      this.persist()
      return result
    },
    async updateProfile(payload) {
      const user = await api.updateProfile(payload)
      this.user = user
      this.persist()
      return user
    },
    async deleteProfile() {
      if (!this.user) return
      await api.deleteProfile(this.user.id)
      this.logout()
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem(AUTH_KEY)
    }
  }
})
