export interface LoginFormProps {
  loginType: number // 1: 用户名密码登录, 2: 邮箱登录
  username?: string
  password?: string
  email?: string
  emailCode?: string
}

export interface LoginResponse {
  userId: number
  username: string
  nickname: string
  avatar: string
  token: string
  email: string
  codeAge: number
  fans: number
  following: number
  articleLikes: number
}
