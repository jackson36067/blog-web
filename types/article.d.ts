export interface GetArticleInfoParams {
  page: number
  pageSize: number
  title?: string
  categoryId?: number
  tags?: string[]
  userId?: number
}

export interface ArtilceInfo {
  id: number
  title: string
  abstract: string
  content: string
  coverage?: string
  tags: stirng[]
  createdAt: string
  browseCount: number
  likeCount: number
  commentCount: number
  collectCount: number
  publicComment: boolean // 文章是否可以评论
}
