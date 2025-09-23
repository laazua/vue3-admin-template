<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">欢迎登录</h2>

      <el-form 
        :model="form"
        :rules="rules"
        ref="loginForm"
        @keyup.enter="handleLogin">

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            size="large"
            clearable
          >
            <template #prefix>
              <User class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            size="large"
            show-password
            clearable
          >
            <template #prefix>
              <Lock class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import router from '@/router'

const loading = ref(false)
const loginForm = ref(null)
const form = reactive({username: '', password: ''})
const rules = {
username: [{ required: true, message: '请输入用户', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度必须在 6 到 20 个字符之间', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (loading.value) return
  loginForm.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.warning('请填写完整信息')
      return
    }

    loading.value = true
    try {
      const userStore = useUserStore()
      const success = await userStore.login(form)
      if (success) {
        ElMessage.success('登录成功')
        // 等待状态更新完成
        await nextTick()
        // 确保路由跳转时 Pinia 状态已经生效
        router.replace({ path: '/home' })
      } else {
        ElMessage.error('用户名或密码错误')
      }
    } catch (err) {
      console.error(err)
      ElMessage.error('登录失败，请重试')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}

.title {
  text-align: center;
  margin-bottom: 35px;
  font-weight: bold;
  font-size: 28px;
  color: #333;
}

.el-input {
  border-radius: 10px;
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #999;
}

.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-size: 18px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
}
</style>