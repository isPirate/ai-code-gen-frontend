import { reactive } from 'vue'

const defaultProjects = [
  { id: '1', name: 'E-Commerce Dashboard', description: 'Modern analytics dashboard with real-time charts', updatedAt: '2 hours ago', status: 'active' },
  { id: '2', name: 'SaaS Landing Page', description: 'High-converting landing page with pricing section', updatedAt: '1 day ago', status: 'active' },
  { id: '3', name: 'Portfolio Website', description: 'Personal portfolio with project showcase', updatedAt: '3 days ago', status: 'draft' },
  { id: '4', name: 'Blog Platform', description: 'Full-featured blog with CMS and comments', updatedAt: '1 week ago', status: 'active' },
  { id: '5', name: 'Task Manager', description: 'Kanban-style task management application', updatedAt: '2 weeks ago', status: 'archived' },
  { id: '6', name: 'Restaurant Menu', description: 'Interactive menu with ordering system', updatedAt: '3 weeks ago', status: 'draft' },
]

const defaultTemplates = [
  { id: 't1', name: 'SaaS Landing Page', description: 'Modern landing page with hero, features, and pricing', category: 'Landing Pages', icon: 'layout' },
  { id: 't2', name: 'Analytics Dashboard', description: 'Real-time data visualization dashboard', category: 'Dashboards', icon: 'bar-chart-3' },
  { id: 't3', name: 'E-Commerce Store', description: 'Full online store with cart and checkout', category: 'E-Commerce', icon: 'shopping-cart' },
  { id: 't4', name: 'Portfolio Website', description: 'Clean portfolio to showcase your work', category: 'Landing Pages', icon: 'briefcase' },
  { id: 't5', name: 'Project Manager', description: 'Task management with team collaboration', category: 'SaaS', icon: 'kanban' },
  { id: 't6', name: 'Mobile App UI', description: 'Mobile-first app interface with navigation', category: 'Mobile Apps', icon: 'smartphone' },
]

const defaultAdminUsers = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active', joined: 'Mar 15' },
  { id: 'u2', name: 'Mike Rodriguez', email: 'mike@example.com', role: 'User', status: 'Active', joined: 'Mar 18' },
  { id: 'u3', name: 'Emily Watson', email: 'emily@example.com', role: 'User', status: 'Inactive', joined: 'Mar 22' },
  { id: 'u4', name: 'James Park', email: 'james@example.com', role: 'Editor', status: 'Active', joined: 'Apr 1' },
]

const defaultAdminProjects = [
  { id: 'p1', name: 'E-Commerce Store', owner: 'Sarah Chen', status: 'Active', created: 'Mar 20' },
  { id: 'p2', name: 'Blog Platform', owner: 'Mike Rodriguez', status: 'Draft', created: 'Mar 25' },
  { id: 'p3', name: 'Portfolio Site', owner: 'Emily Watson', status: 'Deployed', created: 'Apr 1' },
  { id: 'p4', name: 'Dashboard App', owner: 'James Park', status: 'Active', created: 'Apr 5' },
]

const defaultActivities = [
  { id: 'a1', action: 'New user registered', time: '2 min ago' },
  { id: 'a2', action: 'Project deployed to production', time: '15 min ago' },
  { id: 'a3', action: 'New template created', time: '1 hour ago' },
  { id: 'a4', action: 'API key generated', time: '3 hours ago' },
  { id: 'a5', action: 'User upgraded to Pro plan', time: '5 hours ago' },
]

export function getProjects() {
  return reactive([...defaultProjects])
}

export function getTemplates() {
  return reactive([...defaultTemplates])
}

export function getUsers() {
  return reactive([...defaultAdminUsers])
}

export function getAdminProjects() {
  return reactive([...defaultAdminProjects])
}

export function getActivities() {
  return reactive([...defaultActivities])
}
