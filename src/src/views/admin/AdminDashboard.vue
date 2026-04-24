<template>
  <div class="admin-page">
    <AdminSidebar activeItem="dashboard" />
    <div class="main">
      <div class="top-bar">
        <h1 class="top-title">Overview</h1>
        <div class="top-right">
          <span class="top-date">Apr 13, 2026</span>
          <div class="top-avatar"></div>
        </div>
      </div>
      <div class="content">
        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-label">Total Users</span>
            <span class="stat-value">5,847</span>
            <span class="stat-change positive">+12.5%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Active Projects</span>
            <span class="stat-value">12,439</span>
            <span class="stat-change positive">+8.2%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">AI Generations</span>
            <span class="stat-value">89,291</span>
            <span class="stat-change positive">+23.1%</span>
          </div>
        </div>
        <div class="bottom-row">
          <div class="chart-card">
            <div class="chart-header">
              <span class="chart-title">User Growth</span>
              <span class="chart-period">Last 7 days</span>
            </div>
            <div class="chart-area">
              <div class="bar" v-for="(h, i) in barHeights" :key="i" :style="{ height: h + '%' }">
                <span class="bar-label">{{ days[i] }}</span>
              </div>
            </div>
          </div>
          <div class="activity-card">
            <span class="activity-title">Recent Activity</span>
            <div class="activity-list">
              <div class="activity-item" v-for="a in activities" :key="a.id">
                <div class="activity-dot"></div>
                <div class="activity-info">
                  <span class="activity-action">{{ a.action }}</span>
                  <span class="activity-time">{{ a.time }}</span>
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
import { getActivities } from '../../api/mock'
import AdminSidebar from '../../components/shared/AdminSidebar.vue'

const activities = getActivities()
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const barHeights = [60, 45, 75, 55, 85, 70, 90]
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
.top-date {
  font-family: var(--font-caption);
  font-size: 12px;
  color: var(--foreground-muted);
}
.top-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-secondary);
}
.content {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
}
.stats-row {
  display: flex;
  gap: 20px;
}
.stat-card {
  flex: 1;
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.stat-label {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-secondary);
}
.stat-value {
  font-family: var(--font-body);
  font-size: 28px;
  font-weight: 700;
  color: var(--foreground-primary);
}
.stat-change {
  font-family: var(--font-caption);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: var(--rounded-md);
  width: fit-content;
}
.stat-change.positive {
  background: #E8F5E9;
  color: #2E7D32;
}
.bottom-row {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
}
.chart-card {
  flex: 1;
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chart-title {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--foreground-primary);
}
.chart-period {
  font-family: var(--font-caption);
  font-size: 12px;
  color: var(--foreground-muted);
}
.chart-area {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding-top: 20px;
}
.bar {
  flex: 1;
  background: var(--accent-primary);
  border-radius: 6px 6px 0 0;
  position: relative;
  min-height: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.bar-label {
  position: absolute;
  bottom: -20px;
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--foreground-muted);
}
.activity-card {
  width: 360px;
  border-radius: var(--rounded-xl);
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
}
.activity-title {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--foreground-primary);
}
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-secondary);
  flex-shrink: 0;
}
.activity-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.activity-action {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--foreground-primary);
}
.activity-time {
  font-family: var(--font-caption);
  font-size: 11px;
  color: var(--foreground-muted);
}
</style>
