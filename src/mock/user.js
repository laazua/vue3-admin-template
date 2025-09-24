// 用户相关的mock接口数据

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const {username, password} = body
      if (username === 'admin' && password === '123456') {
        return { code: 20000, message: '登录成功', data: { token: 'vue3-admin-template', username: 'admin' } }
      }
      return { code: 40000, message: '登录失败', data: null }
    }
  },
  {
    // 这里的url路径模拟匹配请求: `/api/user/${name}`
    url: '/api/user/admin',
    method: 'get',
    response: ({ body }) => {
      // 后端这里要根据请求的路径参数name进行数据库用户信息查询,
      // 然后返回对应的用户信息
      const userInfo = {
        name: 'admin',
        roles: ['admin'],
        email: 'admin@test.com',
        routes: [
          {
            path: '/system',
            name: 'system',
            component: 'Layout',
            redirect: '/system/menu',
            meta: { title: '系统管理', icon: 'Tools' },
            children: [
              {
                path: 'role',
                name: 'role',
                component: 'Role',
                meta: { title: '角色管理', icon: 'Avatar' }
              },
              {
                path: 'menu',
                name: 'menu',
                component: 'Menu',
                meta: { title: '菜单管理', icon: 'Menu' }
              }
            ]
          }
        ]
      }
      return { code: 20000, message: '查询用户信息成功', data: userInfo }
    }
  }
]