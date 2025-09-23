// 一些工具函数

/* ------------------------------- 用户路由组装 ------------------------------- */
export const transformRoutes = (routes) => {
  // 扫描 views 目录下所有 vue 文件
  const modules = import.meta.glob('@/views/**/*.vue')
  // 特殊组件单独定义
  const Layout = () => import('@/layout/Layout.vue')

  return routes.map(route => {
    const r = { ...route }

    // Layout 特殊处理
    if (r.component === 'Layout') {
      r.component = Layout
    } else {
      // 自定义组件路径: custom
      const compPath = `/src/views/custom/${r.component.replace(/^\//, '')}.vue`
      // console.log(compPath)
      // console.log(modules)
      if (modules[compPath]) {
        r.component = modules[compPath]
      } else {
        console.warn(`组件未找到: ${r.component}`)
        r.component = null
      }
    }

    if (r.children && r.children.length > 0) {
      r.children = transformRoutes(r.children)
    }

    return r
  })
}
/* ------------------------------- token 操作 ------------------------------- */
export const setToken = token => localStorage.setItem('token', token)
export const delToken = () => localStorage.removeItem('token')

/* ------------------------------- 用户可用路由 ------------------------------- */
export const loadRoutes = async (staticRoutes, userRoutes) => {
  // const routes = staticRoutes.filter(r => !r.meta.hidden)
  return [...staticRoutes.filter(r => r.name !== 'login'), ...userRoutes]
}