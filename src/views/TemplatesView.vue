<script setup>
import { computed, onMounted, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { fetchTemplates } from '../mock/api'

const router = useRouter()
const templates = ref([])
const query = ref('')
const activeTab = ref('All')
const tabs = ['All', 'Dashboards', 'E-Commerce', 'Landing Pages', 'Blogs']
const filteredTemplates = computed(() => templates.value.filter((item) => {
  const matchQuery = item.name.toLowerCase().includes(query.value.toLowerCase())
  const matchTab = activeTab.value === 'All' || item.category === activeTab.value
  return matchQuery && matchTab
}))

onMounted(async () => {
  templates.value = await fetchTemplates()
})

function useTemplate(template) {
  router.push({ path: '/editor', query: { template: template.id } })
}
</script>

<template>
  <AppShell>
    <div class="top-bar">
      <h1>Templates</h1>
      <div class="top-actions">
        <label class="search-box compact"><Search :size="14" /><input v-model="query" type="text" placeholder="Search templates..." /></label>
      </div>
    </div>
    <div class="page-content">
      <div class="template-tabs">
        <button v-for="tab in tabs" :key="tab" class="template-tab" :class="{ active: activeTab === tab }" type="button" @click="activeTab = tab">{{ tab }}</button>
      </div>
      <div class="template-grid">
        <div v-for="template in filteredTemplates" :key="template.id" class="template-card">
          <div class="template-thumb"><span>{{ template.thumb }}</span></div>
          <div class="template-info">
            <strong>{{ template.name }}</strong>
            <span>{{ template.desc }}</span>
            <button class="ghost-btn tiny" type="button" @click="useTemplate(template)">Use</button>
          </div>
        </div>
      </div>
    </div>
  </AppShell>
</template>
