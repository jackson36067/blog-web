'use client'

import { useCallback, useEffect, useState } from 'react'
import FavoriteList from './FavoriteList'
import { FavoriteArticleInfo, FavoriteInfo } from '@/types/favorite'
import {
  GetFavoriteArticleListAPI,
  GetUserFavoriteListAPI,
} from '@/api/favorite'
import FavoriteArticle from './FavoriteArticle'

export default function MyCollectTabContent() {
  const [favoriteList, setFavoriteList] = useState<FavoriteInfo[]>([])
  // 保存选中的收藏夹, 刚开始为默认收藏夹
  const [selectedFavorite, setSelectedFavorite] = useState<
    FavoriteInfo | undefined
  >(undefined)
  // 收藏夹博文列表
  const [favoriteArticles, setFavoriteArticles] = useState<
    FavoriteArticleInfo[]
  >([])

  // 获取用户收藏夹列表
  const getUserFavoriteList = useCallback(async () => {
    const res = await GetUserFavoriteListAPI()
    const favoriteList: FavoriteInfo[] = res.data
    setFavoriteList(favoriteList)
    if (!selectedFavorite) {
      setSelectedFavorite(favoriteList.find(item => item.isDefault))
    }
  }, [selectedFavorite])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserFavoriteList()
  }, [getUserFavoriteList])

  // 获取收藏夹博文列表
  const getFavoriteArticleList = useCallback(async () => {
    if (!selectedFavorite) {
      return
    }
    const res = await GetFavoriteArticleListAPI(selectedFavorite.id)
    setFavoriteArticles(res.data)
  }, [selectedFavorite])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFavoriteArticleList()
  }, [getFavoriteArticleList])
  // 点击收藏夹切换选择的收藏夹
  const handleChangeSelectedFavorite = (favorite: FavoriteInfo) => {
    if (favorite.id === selectedFavorite?.id) {
      return
    }
    setSelectedFavorite(favorite)
  }
  // 删除收藏夹时把选择收藏夹设置为空
  const handleClearSelectdFavorite = () => {
    setSelectedFavorite(undefined)
  }
  return (
    <div className="flex gap-5 min-h-[500px] h-[500px]">
      <FavoriteList
        favoriteList={favoriteList}
        selectedFavorite={selectedFavorite}
        reGetFavoriteList={getUserFavoriteList}
        changeSelectedFavorite={handleChangeSelectedFavorite}
        reGetFavoriteArticleList={getFavoriteArticleList}
      />
      <FavoriteArticle
        favoriteList={favoriteList}
        selectedFavorite={selectedFavorite}
        favoriteArticles={favoriteArticles}
        reGetFavoriteList={getUserFavoriteList}
        reGetFavoriteArticleList={getFavoriteArticleList}
        clearSelectedFavorite={handleClearSelectdFavorite}
      />
    </div>
  )
}
