import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuth } from './stores/auth'
import './style.css'

const app = createApp(App)
app.use(router)

// Restore session before mounting
const auth = useAuth()
auth.init().finally(() => {
  app.mount('#app')
})
