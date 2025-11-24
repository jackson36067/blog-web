export interface FavoriteInfo {
  id: number
  title: string
  abstract: string
  isDefault: boolean
  articleCount: number
  collectArticleIdList: number[]
}

export interface NewFavoriteParams {
  title: string
  abstract?: string
  isDefault: boolean
}

export interface FavoriteArticleInfo {
  id: number
  title: string
}

export interface UpdateFavoriteParams {
  title?: string
  abstract?: string
  isDefault: boolean
}

export interface MoveFavoriteArticleParams {
  sourceFavoriteId: number
  targetFavoriteId: number
  articleIds: number[]
}

export interface RemoveFavoriteArticleParmas {
  articleIds: number[]
}
