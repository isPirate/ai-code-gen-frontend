const delay = (ms = 600) => new Promise(r => setTimeout(r, ms))

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user', avatar: null, bio: 'Full-stack developer building with AI', joinedAt: '2026-01-15' },
  { id: 2, name: 'Admin', email: 'admin@codepilot.io', password: 'admin123', role: 'admin', avatar: null, bio: 'Platform administrator', joinedAt: '2025-11-01' },
]

const projects = [
  { id: 1, userId: 1, name: 'SaaS Dashboard', description: 'Analytics dashboard with real-time charts', status: 'active', createdAt: '2026-03-10', updatedAt: '2026-05-01', template: 'Dashboard Pro' },
  { id: 2, userId: 1, name: 'E-Commerce Store', description: 'Online store with Stripe payments', status: 'active', createdAt: '2026-02-20', updatedAt: '2026-04-28', template: 'Shop Starter' },
  { id: 3, userId: 1, name: 'Blog Platform', description: 'Content management with MDX editor', status: 'draft', createdAt: '2026-04-05', updatedAt: '2026-04-25', template: 'Blog Kit' },
  { id: 4, userId: 1, name: 'Portfolio Site', description: 'Personal portfolio with 3D animations', status: 'active', createdAt: '2026-01-08', updatedAt: '2026-03-15', template: 'Portfolio Plus' },
  { id: 5, userId: 2, name: 'Admin Panel', description: 'Internal admin panel for user management', status: 'active', createdAt: '2026-03-01', updatedAt: '2026-05-05', template: 'Admin Pro' },
]

let nextId = 6

export const mockApi = {
  async login(email, password) {
    await delay()
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password')
    const { password: _, ...safe } = user
    localStorage.setItem('codepilot_user', JSON.stringify(safe))
    return { user: safe, token: 'mock-jwt-token-' + user.id }
  },

  async register(data) {
    await delay()
    if (users.find(u => u.email === data.email)) throw new Error('Email already registered')
    const user = { id: users.length + 1, ...data, role: 'user', avatar: null, bio: '', joinedAt: new Date().toISOString().split('T')[0] }
    users.push(user)
    const { password: _, ...safe } = user
    localStorage.setItem('codepilot_user', JSON.stringify(safe))
    return { user: safe, token: 'mock-jwt-token-' + user.id }
  },

  async logout() {
    await delay(300)
    localStorage.removeItem('codepilot_user')
  },

  async getCurrentUser() {
    await delay(300)
    const u = JSON.parse(localStorage.getItem('codepilot_user') || 'null')
    if (!u) throw new Error('Not authenticated')
    return u
  },

  async updateProfile(data) {
    await delay()
    const u = JSON.parse(localStorage.getItem('codepilot_user') || '{}')
    Object.assign(u, data)
    localStorage.setItem('codepilot_user', JSON.stringify(u))
    return u
  },

  async deleteAccount() {
    await delay()
    localStorage.removeItem('codepilot_user')
  },

  // Projects
  async getProjects(userId) {
    await delay()
    return projects.filter(p => p.userId === userId)
  },

  async getAllProjects() {
    await delay()
    return [...projects]
  },

  async createProject(data) {
    await delay()
    const project = { id: nextId++, ...data, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }
    projects.push(project)
    return project
  },

  async deleteProject(id) {
    await delay()
    const idx = projects.findIndex(p => p.id === id)
    if (idx >= 0) projects.splice(idx, 1)
  },

  // Admin: Users
  async getUsers() {
    await delay()
    return users.map(({ password: _, ...u }) => u)
  },

  async deleteUser(id) {
    await delay()
    const idx = users.findIndex(u => u.id === id)
    if (idx >= 0) users.splice(idx, 1)
  },

  // Templates
  async getTemplates() {
    await delay()
    return [
      { id: 1, name: 'Dashboard Pro', category: 'dashboard', description: 'Full-featured admin dashboard', users: 2340, rating: 4.8 },
      { id: 2, name: 'Shop Starter', category: 'ecommerce', description: 'E-commerce storefront with cart', users: 1890, rating: 4.7 },
      { id: 3, name: 'Blog Kit', category: 'blog', description: 'Content-first blog with CMS', users: 1560, rating: 4.6 },
      { id: 4, name: 'Portfolio Plus', category: 'portfolio', description: 'Showcase portfolio with effects', users: 980, rating: 4.9 },
      { id: 5, name: 'Landing Page Pro', category: 'landing', description: 'Conversion-optimized landing pages', users: 3200, rating: 4.8 },
      { id: 6, name: 'Admin Pro', category: 'admin', description: 'Complete admin panel solution', users: 1450, rating: 4.5 },
    ]
  },

  // Admin: Stats
  async getStats() {
    await delay()
    return {
      totalUsers: 12834,
      totalProjects: 45210,
      activeProjects: 38920,
      totalRevenue: 284500,
      userGrowth: [120, 180, 250, 310, 420, 530, 680, 820, 950, 1100, 1280, 1430],
      projectGrowth: [80, 150, 220, 300, 380, 460, 550, 640, 720, 810, 900, 980],
      recentActivity: [
        { id: 1, user: 'Alice Chen', action: 'created a new project', target: 'SaaS Dashboard', time: '2 minutes ago' },
        { id: 2, user: 'Bob Williams', action: 'deployed', target: 'E-Commerce Store', time: '15 minutes ago' },
        { id: 3, user: 'Carol Smith', action: 'updated settings for', target: 'Blog Platform', time: '1 hour ago' },
        { id: 4, user: 'Dave Johnson', action: 'registered a new account', target: '', time: '2 hours ago' },
        { id: 5, user: 'Eve Brown', action: 'exported code for', target: 'Portfolio Site', time: '3 hours ago' },
      ],
    }
  },
}
