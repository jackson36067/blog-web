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
export const GetUserDataAPI = (params: { username: string }) => {
  return httpInstance({
    method: 'GET',
    url: '/user/data',
    params,
  })
}

// 获取用户成就
export const GetUserAchievementAPI = (params: { username: string }) => {
  return httpInstance({
    method: 'GET',
    url: '/user/achievement',
    params,
  })
}

// 获取用户点赞文章列表
export const GetUserLikeArticleListAPI = (params: {
  username: string
  page: number
  pageSize: number
}) => {
  return httpInstance({
    method: 'GET',
    url: '/user/likes',
    params,
  })
}

// 获取用户浏览历史文章
export const GetUserBrowseHistoryAPI = (params: { username: string }) => {
  return httpInstance({
    method: 'GET',
    url: '/user/browse/history',
    params,
  })
}

// 获取用户关注列表
export const GetUserFollowedListAPI = (params: {
  username: string
  page: number
  pageSize: number
}) => {
  return httpInstance({
    method: 'GET',
    url: '/user/followed',
    params,
  })
}

// 更改用户关注状态(关注用户/取消关注用户)
export const UpdateFollowAPI = (followedId: number, isFollow: boolean) => {
  return httpInstance({
    method: 'POST',
    url: `/user/follow/${followedId}`,
    data: {
      isFollow,
    },
  })
}
