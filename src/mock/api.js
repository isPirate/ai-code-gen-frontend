import { editorPreview, initialManagedProjects, initialProjects, initialTemplates, initialUsers } from './data'

const STORAGE_KEY = 'codepilot-db'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function loadDb() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) return JSON.parse(raw)

  const seed = {
    users: [
      { id: 'seed-user', name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user', bio: 'Full-stack developer. Building cool things with AI.' },
      { id: 'seed-admin', name: 'Admin', email: 'admin@codepilot.ai', password: 'admin123456', role: 'admin', bio: 'Super Admin' }
    ],
    projects: initialProjects,
    templates: initialTemplates,
    usersTable: initialUsers,
    adminProjects: initialManagedProjects,
    systemSettings: { model: 'Claude Sonnet 4.6', maxTokens: '8192', quotas: { free: '10 / day', pro: '100 / day', enterprise: 'Unlimited' } },
    editor: editorPreview
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

function wait(result, timeout = 450) {
  return new Promise((resolve) => setTimeout(() => resolve(clone(result)), timeout))
}

export async function login(payload) {
  const db = loadDb()
  const user = db.users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase() && item.password === payload.password)
  if (!user) {
    throw new Error('邮箱或密码错误，请使用 `john@example.com / password123` 或 `admin@codepilot.ai / admin123456`。')
  }
  return wait({ token: `mock-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email, role: user.role, bio: user.bio } })
}

export async function register(payload) {
  const db = loadDb()
  const exists = db.users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase())
  if (exists) throw new Error('该邮箱已注册，请直接登录。')
  const newUser = { id: `user-${Date.now()}`, name: payload.name, email: payload.email, password: payload.password, role: 'user', bio: 'New builder exploring AI-generated apps.' }
  db.users.push(newUser)
  saveDb(db)
  return wait({ token: `mock-token-${newUser.id}`, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, bio: newUser.bio } })
}

export async function fetchDashboard() {
  return wait(loadDb().projects)
}

export async function fetchTemplates() {
  return wait(loadDb().templates)
}

export async function fetchEditorState() {
  return wait(loadDb().editor)
}

export async function sendEditorPrompt(prompt) {
  const db = loadDb()
  db.editor.messages.push({ id: `m-${Date.now()}`, role: 'user', label: 'You', text: prompt })
  db.editor.messages.push({ id: `m-${Date.now() + 1}`, role: 'assistant', label: 'CodePilot AI', text: 'Updated the preview based on your latest instruction.', list: '✓ Refined spacing in hero section\n✓ Added stronger CTA contrast\n✓ Improved responsive sidebar behavior' })
  db.editor.title = prompt.includes('landing') ? 'AI Landing Experience' : db.editor.title
  db.editor.code = `// Mock generated code\n// Latest prompt: ${prompt}\n${db.editor.code}`
  saveDb(db)
  return wait(db.editor, 600)
}

export async function updateProfile(payload) {
  const db = loadDb()
  const current = db.users.find((item) => item.id === payload.id)
  Object.assign(current, payload)
  saveDb(db)
  return wait({ id: current.id, name: current.name, email: current.email, role: current.role, bio: current.bio })
}

export async function deleteProfile(userId) {
  const db = loadDb()
  db.users = db.users.filter((user) => user.id !== userId)
  saveDb(db)
  return wait({ success: true })
}

export async function fetchAdminOverview() {
  return wait({ users: loadDb().usersTable, projects: loadDb().adminProjects, settings: loadDb().systemSettings })
}

export async function fetchAdminUsers() {
  return wait(loadDb().usersTable)
}

export async function fetchAdminProjects() {
  return wait(loadDb().adminProjects)
}

export async function fetchSystemSettings() {
  return wait(loadDb().systemSettings)
}

export async function updateSystemSettings(payload) {
  const db = loadDb()
  db.systemSettings = payload
  saveDb(db)
  return wait(db.systemSettings)
}
