<script setup>
import { computed, onMounted, ref } from 'vue'
import { MoreHorizontal, Search, Sparkles } from 'lucide-vue-next'
import AppShell from '../components/AppShell.vue'
import { fetchAdminProjects } from '../mock/api'

const projects = ref([])
const query = ref('')
const filteredProjects = computed(() => projects.value.filter((project) => project.name.toLowerCase().includes(query.value.toLowerCase())))

onMounted(async () => {
  projects.value = await fetchAdminProjects()
})
</script>

<template>
  <AppShell admin>
    <div class="top-bar">
      <h1>Project Management</h1>
      <div class="top-actions"><label class="search-box compact users"><Search :size="14" /><input v-model="query" type="text" placeholder="Search projects..." /></label></div>
    </div>
    <div class="page-content">
      <div class="table-card">
        <div class="table-head projects-table"><span style="width: 260px">Project</span><span style="width: 160px">Owner</span><span style="width: 100px">Status</span><span style="width: 120px">Created</span><span style="width: 80px">Actions</span></div>
        <div v-for="project in filteredProjects" :key="project.id" class="table-row projects-table">
          <div class="project-name-cell" style="width: 260px"><div class="project-icon"><Sparkles :size="16" /></div><strong>{{ project.name }}</strong></div>
          <span style="width: 160px">{{ project.owner }}</span>
          <span style="width: 100px"><em class="status-pill" :class="project.status.toLowerCase()">{{ project.status }}</em></span>
          <span style="width: 120px">{{ project.createdAt }}</span>
          <span style="width: 80px"><MoreHorizontal :size="16" /></span>
        </div>
      </div>
      <div class="pagination-row">
        <span>Showing 1-4 of 12,439 projects</span>
        <div class="pagination-buttons"><button class="page-btn" type="button">‹</button><button class="page-btn active" type="button">1</button><button class="page-btn" type="button">2</button><button class="page-btn" type="button">3</button><span class="page-dots">...</span><button class="page-btn" type="button">311</button><button class="page-btn" type="button">›</button></div>
      </div>
    </div>
  </AppShell>
</template>
