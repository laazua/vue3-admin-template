<template>
  <div class="layout-container">
    
    <!-- 顶部导航 -->
    <Navbar class="navbar" />

    <!-- 主体区域：左侧 Sidebar + 右侧 Main -->
    <div class="body-container">
      <Siderbar class="siderbar" />
      <div class="main-container">
        <MainApp class="app-main" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/navbar/index.vue'
import Siderbar from '@/components/siderbar/index.vue'
import MainApp from '@/components/main/index.vue'
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid #eee;
  background: #304156;
}

.body-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.siderbar {
  width: 200px;
  background: #304156;
  overflow-y: auto;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-app {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
  padding: 16px;
}
</style>