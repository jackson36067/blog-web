import {
  MoveFavoriteArticleParams,
  NewFavoriteParams,
  RemoveFavoriteArticleParmas,
  UpdateFavoriteParams,
} from '@/types/favorite'
import httpInstance from '@/utils/http'

// 获取用户收藏夹列表
export const GetUserFavoriteListAPI = (params: { username: string }) => {
  return httpInstance({
    method: 'GET',
    url: '/favorite/list',
    params,
  })
}

// 新建收藏夹
export const NewFavoriteAPI = (data: NewFavoriteParams) => {
  return httpInstance({
    method: 'POST',
    url: '/favorite/new',
    data,
  })
}

// 获取收藏夹博文
export const GetFavoriteArticleListAPI = (favoriteId: number) => {
  return httpInstance({
    method: 'GET',
    url: `/favorite/articles/${favoriteId}`,
  })
}

// 修改收藏夹基本信息
export const UpdateFavoriteInfoAPI = (
  favoriteId: number,
  data: UpdateFavoriteParams,
) => {
  return httpInstance({
    method: 'PUT',
    url: `/favorite/update/${favoriteId}`,
    data,
  })
}

// 移动收藏夹文章
export const MoveFavoriteArticlesAPI = (data: MoveFavoriteArticleParams) => {
  return httpInstance({
    method: 'PUT',
    url: '/favorite/move',
    data,
  })
}

// 移除收藏夹文章
export const RemoveFavoriteArticleAPI = (
  favoriteId: number,
  data: RemoveFavoriteArticleParmas,
) => {
  return httpInstance({
    method: 'DELETE',
    url: `/favorite/remove/${favoriteId}`,
    data,
  })
}

// 删除收藏夹
export const DeleteFavoriteAPI = (favoriteId: number) => {
  return httpInstance({
    method: 'DELETE',
    url: `/favorite/delete/${favoriteId}`,
  })
}
