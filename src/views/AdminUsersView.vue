<script setup>
import { computed, onMounted, ref } from 'vue'
import { Filter, MoreHorizontal, Search } from 'lucide-vue-next'
import AppShell from '../components/AppShell.vue'
import { fetchAdminUsers } from '../mock/api'

const users = ref([])
const query = ref('')
const filteredUsers = computed(() => users.value.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.value.toLowerCase())))

onMounted(async () => {
  users.value = await fetchAdminUsers()
})
</script>

<template>
  <AppShell admin>
    <div class="top-bar">
      <h1>User Management</h1>
      <div class="top-actions">
        <label class="search-box compact users"><Search :size="14" /><input v-model="query" type="text" placeholder="Search users..." /></label>
        <button class="ghost-btn tiny" type="button"><Filter :size="14" />Filter</button>
      </div>
    </div>
    <div class="page-content">
      <div class="table-card">
        <div class="table-head users-table"><span style="width: 240px">User</span><span class="flex-col">Email</span><span style="width: 100px">Role</span><span style="width: 80px">Projects</span><span style="width: 80px">Status</span><span style="width: 80px">Actions</span></div>
        <div v-for="user in filteredUsers" :key="user.id" class="table-row users-table">
          <div class="user-cell" style="width: 240px"><div class="row-avatar"></div><strong>{{ user.name }}</strong></div>
          <span class="flex-col">{{ user.email }}</span>
          <span style="width: 100px">{{ user.role }}</span>
          <span style="width: 80px">{{ user.projects }}</span>
          <span style="width: 80px"><em class="status-pill" :class="user.status.toLowerCase()">{{ user.status }}</em></span>
          <span style="width: 80px"><MoreHorizontal :size="16" /></span>
        </div>
      </div>
      <div class="pagination-row">
        <span>Showing 1-4 of 5,847 users</span>
        <div class="pagination-buttons"><button class="page-btn" type="button">‹</button><button class="page-btn active" type="button">1</button><button class="page-btn" type="button">2</button><button class="page-btn" type="button">3</button><span class="page-dots">...</span><button class="page-btn" type="button">146</button><button class="page-btn" type="button">›</button></div>
      </div>
    </div>
  </AppShell>
</template>
