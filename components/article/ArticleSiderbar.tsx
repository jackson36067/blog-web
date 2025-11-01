import {
  GetArticleHotTagsAndRandCategory,
  GetUserTopArticleListAPI,
} from '@/api/article'
import useLoginPopupStatusStore from '@/stores/LoginPopupStatusStore'
import useUserStore from '@/stores/UserStore'
import {
  ArticleCategoryInfo,
  ArticleTagInfo,
  ArtilceInfo,
} from '@/types/article'
import { useEffect, useState } from 'react'

export default function ArticleSiderbar() {
  const { setOpen } = useLoginPopupStatusStore()
  const { userInfo } = useUserStore()
  const [topArtilceList, setTopArticleList] = useState<ArtilceInfo[]>([])
  const [tags, setTags] = useState<ArticleTagInfo[]>([])
  const [categorys, setCategorys] = useState<ArticleCategoryInfo[]>([])
  // 获取用户置顶文章
  useEffect(() => {
    // 没有登录不要发送请求
    if (!userInfo.token) {
      return
    }
    const getUserTopArticleList = async () => {
      const res = await GetUserTopArticleListAPI()
      setTopArticleList(res.data)
    }
    getUserTopArticleList()
  }, [userInfo.token])

  useEffect(() => {
    const getHotArticleTagAndCategoryList = async () => {
      const res = await GetArticleHotTagsAndRandCategory()
      setTags(res.data.articleTags)
      setCategorys(res.data.articleCategories)
    }
    getHotArticleTagAndCategoryList()
  }, [])
  return (
    <div className="w-[320px] space-y-6">
      {/* 置顶文章 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          置顶文章
        </h3>
        <div>
          {userInfo.token ? (
            <div className="flex flex-col gap-1">
              {topArtilceList.map(item => {
                return (
                  <div key={item.id}>
                    <a className="text-[14px] text-[#1d98d1]">{item.title}</a>
                  </div>
                )
              })}
            </div>
          ) : (
            <a
              className="text-[#1d98d1] text-[14px]"
              onClick={() => {
                setOpen(true)
              }}
            >
              登录查看置顶文章
            </a>
          )}
        </div>
      </div>

      {/* 个人介绍 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          个人介绍
        </h3>
        <div className="space-y-2 text-[#1d98d1] dark:text-gray-100 text-[14px]">
          <p>NAME: Jackson</p>
          <p>JOB: 大一新生</p>
        </div>
      </div>

      {/* 标签 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          标签
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-[#FFECE8] dark:bg-gray-500/50 rounded text-sm text-[#F53F3F] dark:text-gray-100"
            >
              {tag.title}
            </span>
          ))}
        </div>
      </div>

      {/* 分类 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          分类
        </h3>
        <div className="flex flex-wrap gap-2">
          {categorys.map(tag => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-[#FFECE8] dark:bg-gray-500/50 rounded text-sm text-[#F53F3F] dark:text-gray-100"
            >
              {tag.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
