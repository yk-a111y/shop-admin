import router from '@/router/index'
import { store } from '@/store'
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 统一设置用户token
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing: boolean = false
request.interceptors.response.use(response => {
  const status = response.data.status
  // 1. 正确情况
  if (status === 200 || !status) {
    return response
  }
  // 2. 错误情况: 如token无效
  if (status === 410000) {
    if (isRefreshing) return
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以选择停留在此页面，或确认重新登陆', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 2.1 token过期: 清除过期token
      store.commit('setUser', null)
      // 2.2 跳转登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
  }
  // 3. 其他错误: 如参数错误
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  // // 返回的状态码是自定义的，http一直是200，故在此书写登录失败的逻辑
  // if (response.data.status && response.data.status !== 200) {
  //   ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  //   // 手动返回Promise异常，防止后续代码执行，如: 登录失败后依旧跳转到首页
  //   return Promise.reject(response.data)
  // }
  // 内部消化掉这个业务异常
  return Promise.reject(response)
}, err => {
  return Promise.reject(err)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
