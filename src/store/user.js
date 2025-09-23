import { defineStore } from "pinia"
import { loginApi, getUserInfo } from "@/api/user"
import router from "@/router"
import { staticRoutes } from "@/router"
import { delToken, setToken, transformRoutes, loadRoutes } from "@/utils/comm"

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userInfo: null,
    isLogin: false,
  }),
  getters: {
    username: (state) => state.userInfo?.name || '',
    isAuthenticated: (state) => !!state.token,
    
    // 动态生成 userRoutes，每次访问都会根据 userInfo.routes 计算
    userRoutes: (state) => {
      return state.userInfo?.routes ? transformRoutes(state.userInfo.routes) : []
    },
  },
  actions: {
    // 登录
    async login(data) {
      try {
        const res = await loginApi(data)
        const { username } = data
        this.token = res.data.token
        if (this.token) setToken(this.token)
        await this.fetchUserInfo(username)
        return true
      } catch (error) {
        return false
      }
    },

    // 获取用户信息
    async fetchUserInfo(username) {
      const res = await getUserInfo(username)
      this.userInfo = res.data
    },

    // 获取菜单路由
    async getMenuRoute() {
      return await loadRoutes(staticRoutes, this.userRoutes)
    },

    // 退出登录
    async logout() {
      delToken()
      this.token = null
      this.userInfo = null
      this.isLogin = false
    },

    // 页面刷新或应用初始化时调用
    initialize() {
      if (this.token && this.userInfo) {
        // 用户信息存在，动态注册路由
        this.userRoutes.forEach(route => {
          router.addRoute(route)
        })
        this.isLogin = false
      }
    },
  },

  persist: {
    storage: localStorage,   // 持久化 token 和 userInfo
    paths: ['token', 'userInfo'],
  },
})
