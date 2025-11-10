import httpInstance from '@/utils/http'

export const GetArticleTagListAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/article/tag/list',
  })
}
