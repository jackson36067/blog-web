export interface UserData {
  originArticle: number
  fans: number
  follow: number
  ip: string
  joinTime: string
  codeAge: number
  username: string
  avatar: string
  sex: number
  abstract: string
  birthday: string
  hobbyTags: string[]
  publicFanList: boolean
  publicCollectList: boolean
  publicFollowList: boolean
  publicLikeList: boolean
  publicBrowseHistory: boolean
  publicPersonalList: boolean
  sinceLastUpdateUsernameDays: number
}

export interface UsreAchievementResponse {
  totalLikes: number
  totalComments: number
  totalCollects: number
}

export interface UserListResponse {
  id: number // 关注者id/粉丝id
  avatar: string
  username: string
  abstract: string
  isFollow: boolean
}

export interface UserCommentResponse {
  commentId: number
  articleId: number
  content: string
  title: string
  createdAt: string
}

export interface UpdateUserInfoParams {
  userId: number
  username?: string
  avatar?: string
  sex?: number
  abstract?: string
  birthday?: string
  hobbyTags?: string[]
  publicFanList?: boolean
  publicCollectList?: boolean
  publicFollowList?: boolean
}

export interface UserLoginLogResponse {
  id: number
  ip: string
  addr: string
  createdAt: string
}
