export interface CommentResponse {
  id: number
  userId: number
  avatar: string
  username: string
  content: string
  likeCount: number
  rootCommentId: number
  subComment: CommentResponse[]
  createTime: string
  replyToUsername: string
}
