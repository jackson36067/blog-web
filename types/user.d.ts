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
  followedId: number
  avatar: string
  username: string
  abstract: string
  isFollow: boolean
}
