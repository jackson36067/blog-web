'use client'

import { ArticleInfo } from '@/types/article'
import Image from 'next/image'
import Icon from './Icon'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface ArticleProps {
  articleInfo: ArticleInfo
  className?: string
  showAuthor?: boolean
}
export default function Article({
  articleInfo,
  className,
  showAuthor,
}: ArticleProps) {
  const router = useRouter()
  return (
    <div className={cn('flex gap-4 my-6 cursor-pointer', className)}>
      {/* 封面图 */}
      <Image
        src={
          articleInfo.coverage
            ? articleInfo.coverage
            : `https://picsum.photos/120/80?random=${articleInfo.id}`
        }
        alt=""
        width={20}
        height={20}
        className="w-32 h-25 rounded-lg object-cover"
        loading="eager"
      />

      {/* 内容 */}
      <div className="flex flex-col flex-1 space-y-2">
        {/* 用户头像 + 名字（放最上面，信息权重最高） */}
        {showAuthor && (
          <div
            className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-[#F53F3F]!"
            onClick={() => router.push(`/my?username=${articleInfo.username}`)}
          >
            <Image
              src={
                articleInfo.avatar ?? 'https://picsum.photos/120/80?random=2'
              }
              alt="avatar"
              width={32}
              height={32}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium">
              {articleInfo.username ?? '未命名用户'}
            </span>
          </div>
        )}

        {/* 标题（视觉主角） */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight">
          {articleInfo.title}
        </h3>

        {/* 摘要 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {articleInfo.abstract}
        </p>

        {/* 标签：小红书风小圆角标签 */}
        <div className="flex flex-wrap gap-2">
          {articleInfo.tags.map((item, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-[#FFF2F2] dark:bg-gray-500/40 rounded-full text-[#FF4D4F] dark:text-gray-100 text-xs"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* 底部所有统计信息 */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1">
          <div className="flex items-center gap-1">
            <Icon icon="iconoir:clock" size={14} />
            <span>{articleInfo.createdAt}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="tdesign:browse" size={14} />
            <span>{articleInfo.browseCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="iconamoon:like-thin" size={14} />
            <span>{articleInfo.likeCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="material-symbols-light:comment-outline" size={14} />
            <span>{articleInfo.commentCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="material-symbols:star" size={14} />
            <span>{articleInfo.collectCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
