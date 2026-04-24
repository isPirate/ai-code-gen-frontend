<template>
  <div class="admin-page">
    <AdminSidebar activeItem="users" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">User Management</h1>
        <div class="top-right">
          <div class="search-box">
            <Search :size="16" color="var(--foreground-muted)" />
            <input v-model="search" placeholder="Search users..." />
          </div>
          <button class="filter-btn">
            <SlidersHorizontal :size="14" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <div class="table-header">
            <span class="col col-user">User</span>
            <span class="col col-email">Email</span>
            <span class="col col-role">Role</span>
            <span class="col col-status">Status</span>
            <span class="col col-joined">Joined</span>
            <span class="col col-actions">Actions</span>
          </div>
          <div class="table-row" v-for="u in filteredUsers" :key="u.id">
            <div class="col col-user">
              <div class="user-cell">
                <div class="user-avatar">{{ u.name.charAt(0) }}</div>
                <span>{{ u.name }}</span>
              </div>
            </div>
            <span class="col col-email">{{ u.email }}</span>
            <span class="col col-role">{{ u.role }}</span>
            <div class="col col-status">
              <span class="status-dot" :class="u.status.toLowerCase()"></span>
              <span>{{ u.status }}</span>
            </div>
            <span class="col col-joined">{{ u.joined }}</span>
            <span class="col col-actions"><MoreHorizontal :size="16" color="var(--foreground-muted)" /></span>
          </div>
        </div>
        <div class="pagination">
          <span class="page-info">Showing 1-4 of 5,847 users</span>
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
import { getUsers } from '../../api/mock'
import { Search, SlidersHorizontal, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import AdminSidebar from '../../components/shared/AdminSidebar.vue'

const users = getUsers()
const search = ref('')

const filteredUsers = computed(() => {
  if (!search.value) return users
  return users.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
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
.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--rounded-lg);
  border: 1px solid var(--border-subtle);
  padding: 6px 12px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-primary);
  background: var(--surface-primary);
  cursor: pointer;
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
.col-user { flex: 1; min-width: 0; }
.col-email { width: 200px; color: var(--foreground-secondary); }
.col-role { width: 120px; }
.col-status { width: 100px; }
.col-joined { width: 120px; color: var(--foreground-secondary); }
.col-actions { width: 80px; justify-content: center; }
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent-secondary);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.status-dot.active { background: #4CAF50; }
.status-dot.inactive { background: #BDBDBD; }
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
