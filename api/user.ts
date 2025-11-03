import { LoginFormProps } from '@/types/login'
import { RegisterFormProps } from '@/types/register'
import httpInstance from '@/utils/http'

// 登录接口
export const LoginAPI = (data: LoginFormProps) => {
  return httpInstance({
    method: 'POST',
    url: '/login',
    data,
  })
}

// 发送邮箱验证码接口
export const SendEmailCodeAPI = (email: string) => {
  return httpInstance({
    method: 'GET',
    url: '/email/code',
    params: { email },
  })
}

// 注册接口
export const RegisterAPI = (data: RegisterFormProps) => {
  return httpInstance({
    method: 'POST',
    url: '/register',
    data,
  })
}

// 获取用户数据信息
export const GetUserDataAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/user/data',
  })
}

// 获取用户成就
export const GetUserAchievementAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/user/achievement',
  })
}

// 获取用户点赞文章列表
export const GetUserLikeArticleListAPI = (params: {
  page: number
  pageSize: number
}) => {
  return httpInstance({
    method: 'GET',
    url: '/user/likes',
    params,
  })
}
