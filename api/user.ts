import { LoginFormProps } from '@/types/login'
import { RegisterFormProps } from '@/types/register'
import { UpdateUserInfoParams } from '@/types/user'
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
export const GetUserDataAPI = (params?: { username?: string }) => {
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

// 获取用户粉丝列表
export const GetUserFansListAPI = (params: {
  username: string
  page: number
  pageSize: number
}) => {
  return httpInstance({
    method: 'GET',
    url: '/user/follower',
    params,
  })
}

/**
 *
 * @param type 'in' 获取用户收到的评论, 'out' 获取用户发出的评论
 * @returns
 */
// 分页获取用户发布的评论/收到的评论
export const GetUserCommentAPI = (params: {
  page: number
  pageSize: number
  username: string
  type: 'in' | 'out'
}) => {
  return httpInstance({
    method: 'GET',
    url: '/user/comment',
    params,
  })
}

// 文件上传
export const UploadFileAPI = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return httpInstance({
    method: 'POST',
    url: '/user/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 通用修改用户字段函数
 * @param field 要修改的字段名，例如 'nickname'、'phone'、'birthday'
 * @param value 修改的值
 */
export const updateUserFieldAPI = async (
  userId: number,
  field: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) => {
  return httpInstance({
    method: 'PUT',
    url: '/user/update',
    data: {
      userId,
      [field]: value,
    },
  })
}
