<script setup>
import { ArrowUpRight, Folder, Sparkles, Users } from 'lucide-vue-next'
import AppShell from '../components/AppShell.vue'
</script>

<template>
  <AppShell admin>
    <div class="top-bar">
      <h1>Overview</h1>
      <div class="top-avatar-wrap"><span class="caption-text">Apr 13, 2026</span><div class="tiny-avatar"></div></div>
    </div>
    <div class="admin-content">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon"><Users :size="20" /></div><strong>5,847</strong><span>Total Users</span><div class="trend positive"><ArrowUpRight :size="14" />+12.5% this month</div></div>
        <div class="stat-card"><div class="stat-icon"><Folder :size="20" /></div><strong>12,439</strong><span>Total Projects</span><div class="trend positive"><ArrowUpRight :size="14" />+8.3% this month</div></div>
        <div class="stat-card"><div class="stat-icon"><Sparkles :size="20" /></div><strong>284K</strong><span>AI Generations</span><div class="trend positive"><ArrowUpRight :size="14" />+22.1% this month</div></div>
      </div>
      <div class="admin-bottom">
        <div class="chart-card">
          <strong>User Growth</strong>
          <div class="admin-bars"><span style="height: 40px"></span><span style="height: 65px"></span><span style="height: 50px"></span><span style="height: 85px"></span><span style="height: 70px"></span><span style="height: 95px"></span><span style="height: 60px"></span></div>
          <div class="chart-labels"><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></div>
        </div>
        <div class="activity-card">
          <strong>Recent Activity</strong>
          <div class="activity-row"><span class="dot"></span><span>New user registered</span><em>2m ago</em></div>
          <div class="activity-row"><span class="dot"></span><span>Project deployed</span><em>15m ago</em></div>
          <div class="activity-row"><span class="dot"></span><span>AI generation completed</span><em>32m ago</em></div>
          <div class="activity-row"><span class="dot"></span><span>User account disabled</span><em>1h ago</em></div>
        </div>
      </div>
    </div>
  </AppShell>
</template>
