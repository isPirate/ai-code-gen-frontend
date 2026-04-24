<template>
  <div class="admin-page">
    <AdminSidebar activeItem="projects" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">Project Management</h1>
        <div class="top-right">
          <div class="search-box">
            <Search :size="16" color="var(--foreground-muted)" />
            <input v-model="search" placeholder="Search projects..." />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <div class="table-header">
            <span class="col col-project">Project</span>
            <span class="col col-owner">Owner</span>
            <span class="col col-status">Status</span>
            <span class="col col-created">Created</span>
            <span class="col col-actions">Actions</span>
          </div>
          <div class="table-row" v-for="p in filteredProjects" :key="p.id">
            <span class="col col-project">{{ p.name }}</span>
            <span class="col col-owner">{{ p.owner }}</span>
            <div class="col col-status">
              <span class="status-dot" :class="p.status.toLowerCase()"></span>
              <span>{{ p.status }}</span>
            </div>
            <span class="col col-created">{{ p.created }}</span>
            <span class="col col-actions"><MoreHorizontal :size="16" color="var(--foreground-muted)" /></span>
          </div>
        </div>
        <div class="pagination">
          <span class="page-info">Showing 1-4 of 12,439 projects</span>
          <div class="page-buttons">
            <button class="page-btn"><ChevronLeft :size="14" /></button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn"><ChevronRight :size="14" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAdminProjects } from '../../api/mock'
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import AdminSidebar from '../../components/shared/AdminSidebar.vue'

const projects = getAdminProjects()
const search = ref('')

const filteredProjects = computed(() => {
  if (!search.value) return projects
  return projects.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.admin-page {
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
.top-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  width: 240px;
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
.content {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
}
.table {
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}
.table-header {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  background: var(--surface-secondary);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: var(--foreground-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.table-row {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 20px;
  border-top: 1px solid var(--border-subtle);
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--foreground-primary);
}
.col { display: flex; align-items: center; gap: 6px; }
.col-project { flex: 1; min-width: 0; font-weight: 500; }
.col-owner { width: 160px; color: var(--foreground-secondary); }
.col-status { width: 100px; }
.col-created { width: 120px; color: var(--foreground-secondary); }
.col-actions { width: 80px; justify-content: center; }
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.status-dot.active { background: #4CAF50; }
.status-dot.draft { background: #FF9800; }
.status-dot.deployed { background: #2196F3; }
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-info {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--foreground-muted);
}
.page-buttons {
  display: flex;
  gap: 4px;
}
.page-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--rounded-md);
  border: 1px solid var(--border-subtle);
  background: var(--surface-primary);
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-btn.active {
  background: var(--accent-primary);
  color: #fff;
  border-color: var(--accent-primary);
}
</style>
