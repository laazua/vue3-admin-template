import { useUserStore } from "@/store/user"
import { createRouter, createWebHashHistory } from "vue-router"


export const staticRoutes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '首页', icon: 'Grid' }
    }]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
})


// 路由守卫
router.beforeEach(async (to, _form) => {
  const userStore = useUserStore()

  if (!userStore.token && to.path !== '/login')  return { path: '/login'}
  if (userStore.token && to.path === '/login') return { path: '/home' }
  // 动态添加用户路由
  if (userStore.token && userStore.userRoutes && !userStore.isLogin) {
    // console.log('动态注册路由', userStore.userRoutes)
    userStore.userRoutes.forEach(route => router.addRoute(route))
    userStore.isLogin = true
    // 只在动态路由添加后做一次 replace，防止死循环
    return { ...to, replace: true }
  }
  return true
})

export default router