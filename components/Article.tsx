'use client'

import { ArticleInfo } from '@/types/article'
import Image from 'next/image'
import Icon from './Icon'

interface ArticleProps {
  articleInfo: ArticleInfo
}
export default function Article({ articleInfo }: ArticleProps) {
  return (
    <div className="flex gap-4 my-6">
      <Image
        src={
          articleInfo.coverage
            ? articleInfo.coverage
            : `https://picsum.photos/120/80?random=${articleInfo.id}`
        }
        alt=""
        width={20}
        height={20}
        className="w-32 h-25"
        loading="eager"
      />
      <div className="flex flex-col justify-between flex-1 space-y-1">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
          {articleInfo.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {articleInfo.abstract}
        </p>
        <div className="flex gap-2 items-center text-[12px] text-gray-500 dark:text-gray-400 py-0.5">
          {articleInfo.tags.map((item, index) => {
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
            <Icon icon="iconoir:clock" className="text-inherit" size={14} />
            <span>{articleInfo.createdAt}</span>
          </div>
          <div className="flex gap-1 items-center">
            <Icon icon="tdesign:browse" className="text-inherit" size={14} />
            <span>{articleInfo.browseCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <Icon
              icon="iconamoon:like-thin"
              className="text-inherit"
              size={14}
            />
            <span>{articleInfo.likeCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <Icon
              icon="material-symbols-light:comment-outline"
              className="text-inherit"
              size={14}
            />
            <span>{articleInfo.commentCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <Icon
              icon="material-symbols:star"
              className="text-inherit"
              size={14}
            />
            <span>{articleInfo.collectCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
