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
