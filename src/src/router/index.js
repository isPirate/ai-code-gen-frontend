import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Landing', component: () => import('../views/LandingPage.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginPage.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterPage.vue') },
  {
    path: '/dashboard', name: 'Dashboard', component: () => import('../views/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/templates', name: 'Templates', component: () => import('../views/TemplatesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/editor/:id', name: 'Editor', component: () => import('../views/EditorPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings', name: 'Settings', component: () => import('../views/SettingsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin', name: 'AdminDashboard', component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/users', name: 'AdminUsers', component: () => import('../views/admin/AdminUsers.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/projects', name: 'AdminProjects', component: () => import('../views/admin/AdminProjects.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/settings', name: 'AdminSettings', component: () => import('../views/admin/AdminSettings.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/dashboard')
  }
  if ((to.path === '/login' || to.path === '/register') && user) {
    return next('/dashboard')
  }
  next()
})

export default router
