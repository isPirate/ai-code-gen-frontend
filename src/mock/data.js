export const initialProjects = [
  { id: 'p1', name: 'E-Commerce Dashboard', updatedAt: 'Updated 2h ago', status: 'Deployed', tone: 'orange', description: 'Revenue cards, order list, marketing chart' },
  { id: 'p2', name: 'SaaS Landing Page', updatedAt: 'Updated 1d ago', status: 'Draft', tone: 'lavender', description: 'Pricing, testimonials, animated hero' },
  { id: 'p3', name: 'Tech Blog Platform', updatedAt: 'Updated 3d ago', status: 'Deployed', tone: 'charcoal', description: 'CMS, categories, markdown editor' },
  { id: 'p4', name: 'Personal Portfolio', updatedAt: 'Updated 5d ago', status: 'Draft', tone: 'sunset', description: 'Case studies, gallery, contact form' }
]

export const initialTemplates = [
  { id: 't1', name: 'Admin Dashboard', category: 'Dashboards', desc: 'Analytics & monitoring', thumb: 'Admin Dashboard' },
  { id: 't2', name: 'Online Store', category: 'E-Commerce', desc: 'Product catalog & cart', thumb: 'Online Store' },
  { id: 't3', name: 'SaaS Landing', category: 'Landing Pages', desc: 'Pricing & testimonials', thumb: 'SaaS Landing' },
  { id: 't4', name: 'Blog Platform', category: 'Blogs', desc: 'CMS & content editor', thumb: 'Blog Platform' },
  { id: 't5', name: 'Portfolio', category: 'Landing Pages', desc: 'Personal showcase', thumb: 'Portfolio' },
  { id: 't6', name: 'Task Manager', category: 'Dashboards', desc: 'Kanban & collaboration', thumb: 'Task Manager' }
]

export const initialUsers = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', projects: 24, status: 'Active' },
  { id: 'u2', name: 'Mike Liu', email: 'mike@example.com', role: 'User', projects: 12, status: 'Active' },
  { id: 'u3', name: 'Anna Park', email: 'anna@example.com', role: 'User', projects: 8, status: 'Active' },
  { id: 'u4', name: 'Tom Wang', email: 'tom@example.com', role: 'User', projects: 3, status: 'Disabled' }
]

export const initialManagedProjects = [
  { id: 'ap1', name: 'E-Commerce Dashboard', owner: 'Sarah Chen', status: 'Deployed', createdAt: 'Apr 12, 2026' },
  { id: 'ap2', name: 'ShopVista Store', owner: 'Mike Liu', status: 'Draft', createdAt: 'Apr 11, 2026' },
  { id: 'ap3', name: 'InsightBoard Analytics', owner: 'Anna Park', status: 'Deployed', createdAt: 'Apr 10, 2026' },
  { id: 'ap4', name: 'Personal Portfolio', owner: 'Tom Wang', status: 'Archived', createdAt: 'Apr 8, 2026' }
]

export const editorPreview = {
  title: 'E-Commerce Dashboard',
  messages: [
    { id: 'm1', role: 'user', label: 'You', text: 'Build a modern e-commerce dashboard with:\n- Sales analytics charts\n- Order list table\n- Revenue cards\n- Dark sidebar' },
    { id: 'm2', role: 'assistant', label: 'CodePilot AI', text: "I've built your e-commerce dashboard! Here's what I created:", list: '✓ Responsive sidebar with navigation\n✓ Revenue cards with KPI metrics\n✓ Interactive sales chart\n✓ Recent orders table' }
  ],
  code: `export default function Dashboard() {\n  return (\n    <main className="dashboard">\n      <aside className="sidebar" />\n      <section className="content">\n        <MetricCard title="Revenue" value="$32,450" />\n        <SalesOverview />\n        <RecentOrders />\n      </section>\n    </main>\n  )\n}`,
  files: ['src/App.vue', 'src/components/Sidebar.vue', 'src/components/MetricCard.vue', 'src/views/DashboardView.vue'],
  metrics: [
    { label: 'Revenue', value: '$32,450', delta: '+12.5% from last month' },
    { label: 'Orders', value: '1,284', delta: '+8.2% from last month' },
    { label: 'Customers', value: '3,672', delta: '+23.1% from last month' }
  ],
  orders: [
    ['#1024', 'Alice Wang', '$129.00', 'Paid'],
    ['#1023', 'Bob Smith', '$84.50', 'Pending'],
    ['#1022', 'Clara Lee', '$256.00', 'Paid']
  ]
}
