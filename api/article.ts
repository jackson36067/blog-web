import { GetArticleInfoParams, GetMyArticleInfoParams } from '@/types/article'
import httpInstance from '@/utils/http'

// 根据条件分页获取文章列表
export const GetArticleAPI = (params: GetArticleInfoParams) => {
  return httpInstance({
    method: 'GET',
    url: '/article/info',
    params,
  })
}

// 获取用户置顶文章列表
export const GetUserTopArticleListAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/article/top',
  })
}

// 获取文章热门标签以及随机分类
export const GetArticleHotTagsAndRandCategory = () => {
  return httpInstance({
    method: 'GET',
    url: '/article/meta',
  })
}

// 获取用户个人文章
export const GetMyArticleListAPI = (params: GetMyArticleInfoParams) => {
  return httpInstance({
    method: 'GET',
    url: '/article/my',
    params,
  })
}

// 统计用户文章的创作历程
export const GetMyArticleCreateProcessAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/article/statistic',
  })
}

// 清除用户的浏览历史记录
export const ClearUserBrowseHistoryAPI = () => {
  return httpInstance({
    method: 'DELETE',
    url: '/article/remove/browse',
  })
}

// 获取文章详情信息
export const GetArticleDetailAPI = (articleId: number) => {
  return httpInstance({
    method: 'GET',
    url: `/article/detail/${articleId}`,
  })
}

// 点赞/取消点赞文章
export const LikeArticleAPI = (articleId: number, isLike: boolean) => {
  return httpInstance({
    method: 'POST',
    url: `/article/like/${articleId}`,
    data: {
      isLike,
    },
  })
}

// 收藏文章
export const CollectArticleAPI = (articleId: number, favoriteId: number) => {
  return httpInstance({
    method: 'POST',
    url: `/article/collect/${articleId}`,
    data: {
      favoriteId,
    },
  })
}
