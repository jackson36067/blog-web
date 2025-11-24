'use client'

import EmojiPicker from '@/components/EmojiPicker'
import Icon from '@/components/Icon'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CommentResponse } from '@/types/comment'
import Image from 'next/image'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import useUserStore from '@/stores/UserStore'
import { cn } from '@/lib/utils'

export default function CommentDrawerContent({
  articleUserId,
  comments,
}: {
  articleUserId: number
  comments: CommentResponse[]
}) {
  return (
    <div>
      <CommentInput inputPlaceholder="欢迎高质量评论，低质量评论会被折叠" />
      <CommentList comments={comments} articleUserId={articleUserId} />
    </div>
  )
}

function CommentList({
  comments,
  articleUserId,
}: {
  comments: CommentResponse[]
  articleUserId: number
}) {
  // 用 Set 存已展开的顶级评论 id
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  // 如果 comments 来源会变（例如异步加载），可在这里重置已展开状态（可选）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpandedIds(new Set())
  }, [comments])

  const toggleExpand = (id: number) => {
    // 注意：不要直接修改现有 Set，要创建新 Set 触发更新
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mt-6">
      {comments.length > 0 && (
        <div>
          {comments.map(comment => {
            const isExpanded = expandedIds.has(comment.id)
            const sub = comment.subComment || []

            return (
              <div key={comment.id} className="mt-4">
                <CommentItem item={comment} articleUserId={articleUserId} />

                <div className="pl-8">
                  {/* 展示子评论：展开则全部，否则只展示第一个 */}
                  {sub.length > 0 && (
                    <div className="mt-4">
                      {(isExpanded ? sub : [sub[0]]).map(
                        (child: CommentResponse) => (
                          <div key={child.id} className="mt-3">
                            <CommentItem
                              item={child}
                              articleUserId={articleUserId}
                              replyTo={child.replyToUsername}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* 展开/收起 控制 */}
                  {sub.length > 1 && (
                    <div
                      className="flex items-center gap-1 mt-2 ml-8 text-[14px] text-[#777888] cursor-pointer"
                      onClick={() => toggleExpand(comment.id)}
                    >
                      {isExpanded ? (
                        <>
                          <p>收起</p>
                          <Icon icon="ep:arrow-up" size={16} />
                        </>
                      ) : (
                        <>
                          <p>查看全部{sub.length}条回复</p>
                          <Icon icon="ep:arrow-down" size={16} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CommentItem({
  item,
  articleUserId,
  replyTo,
}: {
  item: CommentResponse
  articleUserId: number
  replyTo?: string
}) {
  const [showReply, setShowReply] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { userInfo } = useUserStore()

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowReply(false)
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])

  return (
    <div key={item.id} className="flex items-start gap-2 group" ref={ref}>
      <Image
        src={item.avatar || 'https://picsum.photos/120/80?random=1'}
        alt=""
        width={8}
        height={8}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-[#777888]">
          <div className="flex items-end gap-2">
            <p>{item.username}</p>
            {replyTo != null && replyTo != '' && (
              <div className="flex items-end gap-2">
                <p>回复</p>
                <p>{replyTo}</p>
              </div>
            )}
            <p className="text-[14px]">{item.createTime}</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100">
              <HoverCard>
                <HoverCardTrigger>
                  <Icon icon="lsicon:more-filled" className="cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className="w-24! px-0! py-0">
                  <div className="py-1 bg-white dark:bg-[#212121]">
                    {articleUserId === userInfo.userId && (
                      <p className="py-1 text-center hover:bg-[#f7f7fc] dark:hover:bg-[#2a2d34] cursor-pointer">
                        删除
                      </p>
                    )}
                    <p className="py-1 text-center hover:bg-[#f7f7fc] dark:hover:bg-[#2a2d34] cursor-pointer">
                      复制
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div className="flex items-center cursor-pointer text-[14px]">
                <Icon icon="iconamoon:comment-thin" size={18} />
                <p onClick={() => setShowReply(!showReply)}>
                  {showReply ? '收起' : '回复'}
                </p>
              </div>
            </div>
            <Icon
              icon="streamline:like-1"
              className="cursor-pointer"
              size={18}
            />
          </div>
        </div>
        <p className="">{item.content}</p>
        {showReply && (
          <CommentInput
            inputPlaceholder={`回复：${item.username}`}
            inputHeight={30}
          />
        )}
      </div>
    </div>
  )
}

function CommentInput({
  inputPlaceholder,
  inputHeight,
}: {
  inputPlaceholder: string
  inputHeight?: number
}) {
  // 控制是否展示表情选择器
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [comment, setComment] = useState<string>('')
  const emojiRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // 选择表情
  const handleSelectedEmoji = (emoji: string) => {
    setComment(comment + emoji)
    setShowEmojiPicker(false)
  }
  return (
    <div className="bg-[#f7f9fb] dark:bg-[#1e1e1e] px-1 pt-2 pb-4 rounded-lg">
      <Textarea
        className={cn(
          'h-40 border-none! shadow-none! bg-[#f7f9fb] dark:bg-[#1e1e1e]',
          `h-[${inputHeight}]!`,
        )}
        placeholder={inputPlaceholder}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <div className="flex justify-between items-center mt-4 text-[12px] text-[#999aaa] px-3">
        <p>
          还可以输入
          <span className="text-[#222226] dark:text-white">
            {1000 - comment.length}
          </span>
          字
        </p>
        <div className="flex items-center gap-2">
          <div className="relative" ref={emojiRef}>
            <Icon
              icon="ri:emotion-normal-line"
              size={22}
              hanldeOnClick={() => setShowEmojiPicker(true)}
              className="cursor-pointer"
            />
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full translate-y-2 -right-10 mt-1 
                     w-70 h-40 overflow-y-auto bg-white dark:bg-[#212121] shadow-md rounded-lg z-50"
                >
                  <EmojiPicker
                    onSelectedEmoji={emoji => handleSelectedEmoji(emoji)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="px-4 py-px text-white bg-[#fc5531] dark:bg-[#e04728] rounded-2xl text-[14px] cursor-pointer">
            评论
          </div>
        </div>
      </div>
    </div>
  )
}
