import { PublishCommentRequestParams } from '@/types/comment'
import httpInstance from '@/utils/http'

// 发布评论接口
export const PublishCommentAPI = (params: PublishCommentRequestParams) => {
  const data: PublishCommentRequestParams = {
    content: params.content,
    commentArticleId: params.commentArticleId,
  }
  if (params.parentCommentId) {
    data.parentCommentId = params.parentCommentId
    data.rootCommentId = params.rootCommentId
    data.replyToUserId = params.replyToUserId
  }
  return httpInstance({
    method: 'POST',
    url: '/comment/publish',
    data,
  })
}

// 点赞评论接口
export const LikeCommentAPI = (commentId: number, isLike: boolean) => {
  return httpInstance({
    method: 'POST',
    url: `/comment/like/${commentId}`,
    data: {
      isLike,
    },
  })
}

// 删除评论接口
export const DeleteCommentAPI = (commentId: number, isRoot: boolean) => {
  return httpInstance({
    method: 'DELETE',
    url: `/comment/delete/${commentId}`,
    data: {
      isRoot,
    },
  })
}
