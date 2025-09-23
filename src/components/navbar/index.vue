<template>
  <div class="navbar">
    <div class="left">
      <span class="logo">
        vue3-admin-template
      </span>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo?.name || '用户' }}
          <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}

</script>

<style scoped>
.navbar {
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}

.left {
  display: flex;
}

.logo {
  font-weight: bold;
  color: #fff;
}

.el-dropdown-link {
  color: #fff;
}

</style>