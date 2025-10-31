import { GetArticleInfoParams } from '@/types/article'
import httpInstance from '@/utils/http'

// 根据条件分页获取文章列表
export const GetArticleAPI = (params: GetArticleInfoParams) => {
  return httpInstance({
    method: 'GET',
    url: '/article/info',
    params,
  })
}
