import httpInstance from '@/utils/http'

// 获取分类列表
export const GetCategoryListAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/article/category/list',
  })
}
