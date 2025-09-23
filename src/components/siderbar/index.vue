<template>
  <el-menu
    class="siderbar"
    router
    :unique-opened="true"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    >
      <SiderItem v-for="item in routes" :key="item.path || item.name" :item="item" />
  </el-menu>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import SiderItem from '@/components/items'
import { useUserStore } from '@/store/user'


const routes = ref([])

onMounted(async () => {
  const userStore = useUserStore()
  routes.value = await userStore.getMenuRoute()
  // console.log("xxxxxx", JSON.stringify(routes.value))
})
</script>