<script setup>
import { onMounted, ref, computed } from 'vue'
import { Plus, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { fetchDashboard } from '../mock/api'

const router = useRouter()
const projects = ref([])
const query = ref('')
const filteredProjects = computed(() => projects.value.filter((project) => project.name.toLowerCase().includes(query.value.toLowerCase())))

onMounted(async () => {
  projects.value = await fetchDashboard()
})

function openProject(project) {
  router.push({ path: '/editor', query: { project: project.id } })
}
</script>

<template>
  <AppShell>
    <div class="top-bar">
      <h1>My Projects</h1>
      <div class="top-actions">
        <label class="search-box compact"><Search :size="16" /><input v-model="query" type="text" placeholder="Search projects..." /></label>
        <button class="primary-btn small squareish" type="button" @click="router.push('/editor')"><Plus :size="16" />New Project</button>
      </div>
    </div>
    <div class="dashboard-content">
      <div class="project-grid">
        <button v-for="project in filteredProjects" :key="project.id" class="project-card" type="button" @click="openProject(project)">
          <div class="project-thumb" :class="project.tone"><span>{{ project.name }}</span></div>
          <div class="project-info">
            <strong>{{ project.name }}</strong>
            <div class="project-meta"><span>{{ project.updatedAt }}</span><em :class="project.status.toLowerCase()">{{ project.status }}</em></div>
          </div>
        </button>
        <button class="project-card project-new" type="button" @click="router.push('/editor')"><Plus :size="32" /><span>Create New Project</span></button>
      </div>
    </div>
  </AppShell>
</template>
