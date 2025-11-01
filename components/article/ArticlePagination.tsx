'use client'

import { GetArticleAPI } from '@/api/article'
import { ArtilceInfo, GetArticleInfoParams } from '@/types/article'
import { useEffect, useState } from 'react'
import SearchInput from '../SearchInput'
import Image from 'next/image'
import Icon from '../Icon'
import Pagination from '../Pagination'

export default function ArticlePagination() {
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
  )
}
