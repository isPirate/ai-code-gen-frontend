<template>
  <div class="project-card" @click="$emit('click')">
    <div class="thumbnail">
      <LayoutDashboard v-if="project.status === 'active'" :size="48" color="var(--accent-secondary)" />
      <FileText v-else-if="project.status === 'draft'" :size="48" color="var(--foreground-muted)" />
      <Archive v-else :size="48" color="var(--foreground-muted)" />
    </div>
    <div class="content">
      <div class="name">{{ project.name }}</div>
      <div class="desc">{{ project.description }}</div>
      <div class="footer">
        <span class="date">{{ project.updatedAt }}</span>
        <span class="status" :class="project.status">{{ project.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LayoutDashboard, FileText, Archive } from 'lucide-vue-next'

defineProps({
  project: { type: Object, required: true },
})
defineEmits(['click'])
</script>

<style scoped>
.project-card {
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
}
.project-card:hover {
  box-shadow: 0 4px 12px #0000000a;
  transform: translateY(-1px);
}
.thumbnail {
  height: 200px;
  background: var(--surface-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.name {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground-primary);
}
.desc {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
  line-height: 1.5;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}
.date {
  font-family: var(--font-caption);
  font-size: 12px;
  color: var(--foreground-muted);
}
.status {
  font-family: var(--font-caption);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: var(--rounded-md);
  background: var(--surface-secondary);
  color: var(--foreground-secondary);
  text-transform: capitalize;
}
.status.active {
  background: #E8F5E9;
  color: #2E7D32;
}
.status.draft {
  background: #FFF3E0;
  color: #E65100;
}
.status.archived {
  background: var(--surface-secondary);
  color: var(--foreground-muted);
}
</style>
