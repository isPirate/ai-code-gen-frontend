<template>
  <div class="templates-page">
    <UserSidebar activeItem="templates" :user="auth.user" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">Templates</h1>
      </div>
      <div class="content">
        <div class="categories">
          <button
            v-for="cat in categories"
            :key="cat"
            class="cat-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
        <div class="grid">
          <div class="grid-row">
            <div
              v-for="t in filteredTemplates.slice(0, 3)"
              :key="t.id"
              class="template-card"
              @click="router.push(`/editor/new?template=${t.id}`)"
            >
              <div class="thumb">
                <component :is="getIcon(t.icon)" :size="48" color="var(--accent-secondary)" />
              </div>
              <div class="card-content">
                <div class="card-name">{{ t.name }}</div>
                <div class="card-desc">{{ t.description }}</div>
                <div class="card-footer">
                  <span class="card-badge">{{ t.category }}</span>
                  <span class="card-link">Use Template</span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-row">
            <div
              v-for="t in filteredTemplates.slice(3, 6)"
              :key="t.id"
              class="template-card"
              @click="router.push(`/editor/new?template=${t.id}`)"
            >
              <div class="thumb">
                <component :is="getIcon(t.icon)" :size="48" color="var(--accent-secondary)" />
              </div>
              <div class="card-content">
                <div class="card-name">{{ t.name }}</div>
                <div class="card-desc">{{ t.description }}</div>
                <div class="card-footer">
                  <span class="card-badge">{{ t.category }}</span>
                  <span class="card-link">Use Template</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getTemplates } from '../api/mock'
import { Layout, BarChart3, ShoppingCart, Briefcase, Kanban, Smartphone } from 'lucide-vue-next'
import UserSidebar from '../components/shared/UserSidebar.vue'

const router = useRouter()
const auth = useAuthStore()
const templates = getTemplates()
const activeCategory = ref('All')

const categories = ['All', 'Landing Pages', 'Dashboards', 'E-Commerce', 'Mobile Apps', 'SaaS']

const filteredTemplates = computed(() => {
  if (activeCategory.value === 'All') return templates
  return templates.filter(t => t.category === activeCategory.value)
})

const iconMap = { layout: Layout, 'bar-chart-3': BarChart3, 'shopping-cart': ShoppingCart, briefcase: Briefcase, kanban: Kanban, smartphone: Smartphone }
function getIcon(name) {
  return iconMap[name] || Layout
}
</script>

<style scoped>
.templates-page {
  width: 1440px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.top-bar {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: var(--surface-primary);
  border-bottom: 1px solid var(--border-subtle);
}
.top-title {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground-primary);
}
.content {
  flex: 1;
  padding: 40px;
  overflow: auto;
  background: var(--surface-secondary);
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cat-btn {
  border-radius: var(--rounded-full);
  border: 1px solid var(--border-subtle);
  background: var(--surface-primary);
  padding: 8px 16px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
  cursor: pointer;
  transition: all 0.15s;
}
.cat-btn:hover {
  background: var(--surface-secondary);
}
.cat-btn.active {
  background: var(--accent-primary);
  color: #fff;
  border-color: var(--accent-primary);
}
.grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.grid-row {
  display: flex;
  gap: 20px;
}
.template-card {
  flex: 1;
  min-width: 0;
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
}
.template-card:hover {
  box-shadow: 0 4px 12px #0000000a;
  transform: translateY(-1px);
}
.thumb {
  height: 180px;
  background: var(--surface-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-name {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--foreground-primary);
}
.card-desc {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
  line-height: 1.5;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-badge {
  font-family: var(--font-caption);
  font-size: 11px;
  color: var(--foreground-muted);
  background: var(--surface-secondary);
  border-radius: var(--rounded-md);
  padding: 4px 8px;
}
.card-link {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-primary);
}
</style>
