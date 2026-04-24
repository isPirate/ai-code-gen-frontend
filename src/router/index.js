import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import TemplatesView from '../views/TemplatesView.vue'
import EditorView from '../views/EditorView.vue'
import SettingsView from '../views/SettingsView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import AdminUsersView from '../views/AdminUsersView.vue'
import AdminProjectsView from '../views/AdminProjectsView.vue'
import AdminSystemSettingsView from '../views/AdminSystemSettingsView.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingView, meta: { public: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { public: true } },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/templates', name: 'templates', component: TemplatesView, meta: { requiresAuth: true } },
  { path: '/editor', name: 'editor', component: EditorView, meta: { requiresAuth: true } },
  { path: '/settings', name: 'settings', component: SettingsView, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin-dashboard', component: AdminDashboardView, meta: { requiresAdmin: true } },
  { path: '/admin/users', name: 'admin-users', component: AdminUsersView, meta: { requiresAdmin: true } },
  { path: '/admin/projects', name: 'admin-projects', component: AdminProjectsView, meta: { requiresAdmin: true } },
  { path: '/admin/system', name: 'admin-system', component: AdminSystemSettingsView, meta: { requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  auth.hydrate()

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return auth.isAuthenticated ? { name: 'dashboard' } : { name: 'login' }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.public && auth.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return auth.isAdmin ? { name: 'admin-dashboard' } : { name: 'dashboard' }
  }

  return true
})

export default router
