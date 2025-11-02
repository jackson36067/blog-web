export interface GetArticleInfoParams {
  page: number
  pageSize: number
  title?: string
  categoryId?: number
  tags?: string[]
  userId?: number
}

export interface ArticleInfo {
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

export interface ArticleCategoryInfo {
  id: number
  title: string
}

export interface ArticleTagInfo {
  id: number
  title: string
  browseCount: string
}

export enum VisibilityRange {
  public = 0,
  fans = 1,
  private = 2,
}

export enum OrderBy {
  CreateAt = 'created_at',
  BorwseCount = 'browse_count',
}

export enum OrderType {
  DESC = 'desc',
  ASC = 'asc',
}

export interface GetMyArticleInfoParams {
  page: number
  pageSize: number
  visibility: number
  orderBy: string
  orderType: string
  startTime?: string
  endTime?: string
}

export interface ArticleMonthStatistic {
  month: number
  count: number // 该月发布文章数量
  startTime: string // 该月开始时间
  endTime: string // 该月结束时间
}

export interface ArticleYearStatistic {
  year: number
  totalCount: number // 该年发布文章数量
  months: ArticleMonthStatistic[]
}
