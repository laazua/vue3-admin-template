import request from '@/utils/request'


// 用户登录请求接口
export const loginApi = async (data) => {
  return request.post('/api/login', data)
}

// 用户信息请求接口
export const getUserInfo = async name => {
  return request.get(`/api/user/${name}`)
}