export interface UserData {
  originArticle: number
  fans: number
  follow: number
  ip: string
  joinTime: string
  codeAge: number
  avatar: string
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
