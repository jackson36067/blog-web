export interface CommentResponse {
  id: number
  userId: number
  avatar: string
  username: string
  content: string
  likeCount: number
  isLike: boolean
  rootCommentId: number
  subComment: CommentResponse[]
  createTime: string
  replyToUsername: string
}

export interface PublishCommentRequestParams {
  content: string
  commentArticleId: number
  parentCommentId?: number
  rootCommentId?: number
  replyToUserId?: number
}
