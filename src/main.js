import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import { useUserStore } from './store/user'


const app = createApp(App)
// 创建 Pinia 实例
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
// 挂载 Pinia
app.use(pinia)
// 挂载 ElementPlus
app.use(ElementPlus)
// 全局注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载路由
app.use(router)

// 初始化用户状态和动态路由
const userStore = useUserStore()
userStore.initialize()

app.mount('#app')