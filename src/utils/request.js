// http接口请求响应封装
import axios from "axios"
import { ElMessage } from "element-plus"

const service = axios.create({
  timeout: 6000,
  baseURL: import.meta.env.VITE_BASE_URL
})


// 请求拦截处理
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


// 响应拦截处理
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log("request, 后端接口数据: ", res)
    // 做一些其他的数据处理: TODO
    // ...
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || '后端接口数据异常',
        type: 'error',
        duration: 6000,
      })
      return Promise.reject(new Error(res.message || '后端接口数据异常'))
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service