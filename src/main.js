import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuth } from './stores/auth'
import './style.css'

const app = createApp(App)

// Restore session before installing the router: app.use(router) kicks off the initial
// navigation, whose auth guard would otherwise see user=null and bounce protected
// routes (e.g. /editor → /login → /dashboard) on hard refresh.
const auth = useAuth()
auth.init().finally(() => {
  app.use(router)
  app.mount('#app')
})
