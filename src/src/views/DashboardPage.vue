<template>
  <div class="dashboard-page">
    <UserSidebar activeItem="dashboard" :user="auth.user" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">My Projects</h1>
        <div class="top-actions">
          <div class="search-box">
            <Search :size="16" color="var(--foreground-muted)" />
            <input v-model="search" placeholder="Search projects..." />
          </div>
          <router-link to="/editor/new" class="new-btn">
            <Plus :size="16" color="#fff" />
            <span>New Project</span>
          </router-link>
        </div>
      </div>
      <div class="content">
        <div class="grid">
          <div class="grid-row">
            <ProjectCard
              v-for="p in filteredProjects.slice(0, 3)"
              :key="p.id"
              :project="p"
              @click="router.push(`/editor/${p.id}`)"
            />
          </div>
          <div class="grid-row">
            <ProjectCard
              v-for="p in filteredProjects.slice(3, 6)"
              :key="p.id"
              :project="p"
              @click="router.push(`/editor/${p.id}`)"
            />
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
import { getProjects } from '../api/mock'
import { Search, Plus } from 'lucide-vue-next'
import UserSidebar from '../components/shared/UserSidebar.vue'
import ProjectCard from '../components/shared/ProjectCard.vue'

const router = useRouter()
const auth = useAuthStore()
const projects = getProjects()
const search = ref('')

const filteredProjects = computed(() => {
  if (!search.value) return projects
  return projects.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.dashboard-page {
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
  justify-content: space-between;
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
.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  width: 220px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 0 12px;
  background: var(--surface-primary);
}
.search-box input {
  flex: 1;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-primary);
}
.search-box input::placeholder {
  color: var(--foreground-muted);
}
.new-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--rounded-lg);
  background: var(--accent-primary);
  padding: 8px 16px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  transition: background 0.15s;
}
.new-btn:hover {
  background: var(--accent-hover);
}
.content {
  flex: 1;
  padding: 40px;
  overflow: auto;
  background: var(--surface-secondary);
}
.grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
}
.grid-row {
  display: flex;
  gap: 20px;
}
.grid-row > * {
  flex: 1;
  min-width: 0;
}
</style>
