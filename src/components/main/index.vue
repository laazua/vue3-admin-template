<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  flex: 1;
  padding: 16px;
  background: #f0f2f5;
  overflow: auto;
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.2s ease;
}
.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>