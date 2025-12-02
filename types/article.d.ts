import { CommentResponse } from './comment'

export interface GetArticleInfoParams {
  page: number
  pageSize: number
  title?: string
  categoryTitle?: string
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
  userId: number
  username: string
  avatar: string
  isLike: boolean
  isCollect: boolean
  isFollow: boolean
  comment: CommentResponse
  totalComment: number
  totalRootComment: number
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
  username: string
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

export interface BrowseArticleHistoryGroup {
  groupTime: string // 今日、昨天、MM-dd 或 yyyy-MM-dd
  articles: ArticleInfo[]
}

export interface CreateArticleParams {
  title: string
  abstract: string
  content: string
  categoryName: string
  tags: string[]
  coverage?: string
  status: number // 1.草稿 2.审核中 3.发布
  visibility: 0 | 1 | 2 // 0.所有人可见 1.仅粉丝可见 2.仅自己可见
  publicComment: boolean // 0.公开评论 1.不允许评论
}

export interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}
