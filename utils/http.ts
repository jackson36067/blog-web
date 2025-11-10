import axios from 'axios'
import { toast } from 'sonner'
import useMemberStore from '@/stores/UserStore'
import qs from 'qs'

const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  // 这里全局设置 params 序列化方式 (去除传递param方式的参数中数组参数自动带上[])
  paramsSerializer: params => qs.stringify(params, { indices: false }),
})

// 请求拦截
httpInstance.interceptors.request.use(
  config => {
    const urls = ['/login']
    if (!urls.includes(config.url!)) {
      const token: string = useMemberStore.getState().userInfo.token || ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截
httpInstance.interceptors.response.use(
  config => {
    if (config.data.message) toast.success(config.data.message)
    return config.data
  },
  error => {
    if (error.response.data.code === 401 || error.response.data.code === 403) {
      useMemberStore.getState().clearUserInfo()
    }
    const errorMsg: string = error.response.data.message || '请求失败'
    console.error('HTTP Error:', error)
    toast.error(errorMsg)
    return Promise.reject(error)
  },
)

export default httpInstance
