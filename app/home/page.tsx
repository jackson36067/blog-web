'use client'

import { GetArticleAPI } from '@/api/article'
import Icon from '@/components/Icon'
import Pagination from '@/components/Pagination'
import LovePointer from '@/components/pointer'
import SearchInput from '@/components/SearchInput'
import { ArtilceInfo, GetArticleInfoParams } from '@/types/article'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [articleInfo, setArticleInfo] = useState<ArtilceInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(5)
  const [title, setTitle] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const getHomeArtilceList = async () => {
      const params: GetArticleInfoParams = {
        page,
        pageSize: 5,
      }

      if (title !== '') {
        params.title = title
      }
      const res = await GetArticleAPI(params)
      setArticleInfo(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getHomeArtilceList()
  }, [page, title])

  return (
    <div className="min-h-screen bg-[#f0eeee] dark:bg-[#0a0a0a] p-6">
      <div className="max-w-[1200px] mx-auto flex gap-6">
        <LovePointer />
        {/* 左侧主内容 */}
        <div className="flex-1 space-y-6">
          {/* 文章列表 */}
          <div className="space-y-4 bg-white dark:bg-[#212121] shadow rounded-lg p-3">
            <div className="flex justify-between items-center border-b border-solid border-b-gray-200 pb-4">
              <p className="font-bold text-[16px]">文章列表</p>
              <SearchInput value={title} onValueChange={setTitle} />
            </div>
            {articleInfo.map(item => (
              <div key={item.id} className="flex gap-4 my-6">
                <Image
                  src={
                    item.coverage
                      ? item.coverage
                      : `https://picsum.photos/120/80?random=${item.id}`
                  }
                  alt=""
                  width={20}
                  height={20}
                  className="w-32 h-25"
                  loading="eager"
                />
                <div className="flex flex-col justify-between flex-1 space-y-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.abstract}
                  </p>
                  <div className="flex gap-2 items-center text-[12px] text-gray-500 dark:text-gray-400 py-0.5">
                    {item.tags.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-[#FFECE8] dark:bg-gray-500/50 rounded text-[#F53F3F] dark:text-gray-100"
                        >
                          {item}
                        </span>
                      )
                    })}

                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="iconoir:clock"
                        className="text-inherit"
                        size={14}
                      />
                      <span>{item.createdAt}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="tdesign:browse"
                        className="text-inherit"
                        size={14}
                      />
                      <span>{item.browseCount}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="iconamoon:like-thin"
                        className="text-inherit"
                        size={14}
                      />
                      <span>{item.likeCount}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="material-symbols-light:comment-outline"
                        className="text-inherit"
                        size={14}
                      />
                      <span>{item.commentCount}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon
                        icon="material-symbols:star"
                        className="text-inherit"
                        size={14}
                      />
                      <span>{item.collectCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* 右侧侧边栏 */}
        <div className="w-[300px] space-y-6">
          {/* 置顶文章 */}
          <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              置顶文章
            </h3>
          </div>

          {/* 个人介绍 */}
          <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              个人介绍
            </h3>
            <div className="space-y-2 text-[#212121] dark:text-gray-100">
              <p>NAME: Jackson</p>
              <p>JOB: 大一新生</p>
              <div className="flex gap-2">
                <img src="https://via.placeholder.com/60" alt="QQ" />
                <img src="https://via.placeholder.com/60" alt="微信" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {['go', 'python', 'gorm', 'typescript'].map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#f2f3f5] dark:bg-gray-500/50 rounded text-sm text-gray-900 dark:text-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
