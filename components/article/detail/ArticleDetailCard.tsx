/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import 'highlight.js/styles/github-dark.css'
import { ArticleInfo } from '@/types/article'
import hljs from 'highlight.js'
import parse, { domToReact } from 'html-react-parser'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon'
import useUserStore from '@/stores/UserStore'
import { CollectArticleAPI, LikeArticleAPI } from '@/api/article'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CollectFavoriteDialogContent from './CollectFavoriteDialogContent'
import { FavoriteInfo } from '@/types/favorite'
import { GetUserFavoriteListAPI } from '@/api/favorite'
import { UpdateFollowAPI } from '@/api/user'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import CommentDrawerContent from './CommentDrawerContent'

export default function ArticleDetailCard({
  articleInfo,
  reFreshArticleInfoAction,
}: {
  articleInfo: ArticleInfo | null
  reFreshArticleInfoAction: () => void
}) {
  const { userInfo } = useUserStore()
  const router = useRouter()
  // 文章大纲
  const tocRef = useRef<{ id: string; text: string }[]>([])
  // 收藏夹列表
  const [userFavorites, setUserFavorites] = useState<FavoriteInfo[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  // 高亮显示代码
  useEffect(() => {
    hljs.highlightAll()
  }, [articleInfo?.content])
  // 每次内容变时清空 toc
  useEffect(() => {
    tocRef.current = []
  }, [articleInfo?.content])
  // 点赞/取消点赞文章
  const handleLikeArticle = async (articleId: number, isLike: boolean) => {
    if (userInfo.userId == 0) {
      toast.info('请先登录!')
      return
    }
    await LikeArticleAPI(articleId, isLike)
    // 重新获取文章详情
    reFreshArticleInfoAction()
  }

  // 获取收藏夹列表
  const getUserFavorites = useCallback(async () => {
    const res = await GetUserFavoriteListAPI({
      username: userInfo.username,
    })
    setUserFavorites(res.data)
  }, [userInfo.username])

  useEffect(() => {
    if (userFavorites.length !== 0) {
      return
    }
    if (openDialog) {
      getUserFavorites()
    }
  }, [userInfo.username, openDialog, userFavorites.length, getUserFavorites])

  // 收藏文章
  const handleCollectArticle = async (item: FavoriteInfo) => {
    if (userInfo.userId == 0) {
      toast.info('请先登录!')
      return
    }
    if (item.collectArticleIdList.includes(articleInfo?.id || 0)) {
      return
    }
    await CollectArticleAPI(articleInfo!.id, item.id)
    // 重新获取用户收藏夹列表
    getUserFavorites()
    setOpenDialog(false)
    reFreshArticleInfoAction()
  }

  const handleNewFavorite = () => {
    getUserFavorites()
  }

  // 更改是否关注用户
  const handleUpdateFollowUser = async (
    followedId: number,
    isFollow: boolean,
  ) => {
    await UpdateFollowAPI(followedId, isFollow)
    reFreshArticleInfoAction()
  }

  return (
    <div className="flex gap-4">
      {openDialog && <div className="fixed inset-0 bg-black/50 z-40" />}
      {/* 目录 */}
      <div className="w-60 sticky top-20 h-fit bg-gray-50 dark:bg-[#121212] p-4 rounded-lg shadow">
        <h3 className="font-bold mb-3 text-lg">目录</h3>
        <ul className="space-y-2 truncate">
          {tocRef.current.map(item => (
            <li key={item.id}>
              <button
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }}
                className="text-[#1d98d1] cursor-pointer"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 文章内容 */}
      <div className="flex-1 bg-white dark:bg-[#212121] pt-4 rounded-lg relative">
        <div className="px-6">
          <h1 className="text-3xl font-bold">{articleInfo?.title}</h1>
          <div className="flex justify-between items-center my-4 text-[12px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <p>于{articleInfo?.createdAt}发布</p>
              <p>·</p>
              <p>{articleInfo?.username}</p>
              <p>·</p>
              <p>{articleInfo?.browseCount}阅读</p>
            </div>
            {articleInfo?.userId === userInfo.userId && (
              <p className="cursor-pointer hover:text-[#fc5531]">编辑</p>
            )}
          </div>
          <div className="flex my-4 text-[14px] text-[#999aaa]">
            文章标签：
            <ul className="flex gap-3">
              {articleInfo?.tags.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-blue-600 dark:text-blue-300 cursor-pointer"
                    onClick={() => router.push(`/tag?title=${item}`)}
                  >
                    #{item}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex items-start gap-2 p-2 bg-[linear-gradient(99deg,rgba(255,91,145,0.05)_2%,rgba(63,169,245,0.05)_51.48%,rgba(58,175,246,0.05)_57.25%,rgba(46,193,248,0.05)_65.5%,rgba(25,222,251,0.05)_74.57%,rgba(0,255,255,0.05)_82.82%)] text-[14px]">
            <Image
              src="/images/abstract.png"
              alt=""
              width={16}
              height={5}
              className="w-[53px] h-5"
            />
            <p className="flex-1 break-all text-[#666]">
              {articleInfo?.abstract || ''}
            </p>
          </div>
          {parse(articleInfo?.content || '', {
            replace: (domNode: any) => {
              //  1. 给所有 h2 自动添加 id（用于目录跳转)
              if (domNode.name === 'h2') {
                const rawText = domNode.children?.[0]?.data || ''
                const safeId = rawText.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
                domNode.attribs = domNode.attribs || {}
                domNode.attribs.id = safeId
                // 存入 tocRef
                if (tocRef.current.findIndex(i => i.id === safeId) === -1) {
                  tocRef.current.push({
                    id: safeId,
                    text: rawText,
                  })
                }
                return domToReact(domNode)
              }
              // 2. 自定义 pre 代码块，添加复制按钮
              if (domNode.name === 'pre') {
                const codeNode = domNode.children?.find(
                  (c: any) => c.name === 'code',
                )
                const codeText = codeNode?.children?.[0]?.data || ''
                return (
                  <div className="relative group my-4">
                    {/* 复制按钮 */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(codeText)
                        toast.info('代码复制成功')
                      }}
                      className="
                    absolute right-2 top-2 opacity-0 group-hover:opacity-100 
                    transition bg-[#212121] dark:bg-white/40
                    text-white dark:text-black px-2 py-1 text-xs rounded
                  "
                    >
                      复制
                    </button>

                    {/* 原本你的 pre → 保留所有 Tailwind class，不动 */}
                    <pre className={cn(domNode.attribs?.class, 'bg-[#0d1117]')}>
                      {domToReact(domNode.children)}
                    </pre>
                  </div>
                )
              }
            },
          })}
        </div>
        {/* 文章其他信息 */}
        <div className="flex justify-between sticky left-0 bottom-0 px-6 py-[17px] z-20 bg-white dark:bg-[#212121] w-full border-y border-y-solid border-y-gray-300 dark:border-y-gray-300/20">
          <div className="flex items-center gap-3">
            <Image
              src={
                articleInfo?.avatar || 'https://picsum.photos/120/80?random=1'
              }
              alt=""
              width={8}
              height={8}
              className="w-8 h-8 rounded-full"
            />
            <h2 className="font-bold">{articleInfo?.username}</h2>
            {articleInfo?.userId != userInfo.userId && (
              <p
                className="text-[14px] text-[#555666] dark:text-white rounded-2xl px-4 py-1 border border-solid border-[#ccccd8] cursor-pointer"
                onClick={() =>
                  handleUpdateFollowUser(
                    articleInfo!.userId,
                    articleInfo!.isFollow,
                  )
                }
              >
                {articleInfo?.isFollow ? '已关注' : '关注'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 text-[#989aa9]">
            <div
              className={cn(
                'flex items-center gap-1 cursor-pointer',
                articleInfo?.isLike && 'text-[#fc5531]!',
              )}
              onClick={() =>
                handleLikeArticle(articleInfo!.id, articleInfo!.isLike)
              }
            >
              <Icon icon="mdi:like" />
              <p>{articleInfo?.likeCount}</p>
            </div>
            <Dialog
              modal={false}
              open={openDialog}
              onOpenChange={setOpenDialog}
            >
              <DialogTrigger>
                <div
                  className={cn(
                    'flex items-center gap-1 cursor-pointer',
                    articleInfo?.isCollect && 'text-[#fc5531]!',
                  )}
                >
                  <Icon icon="solar:star-bold" />
                  <p>{articleInfo?.collectCount}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">添加收藏夹</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <CollectFavoriteDialogContent
                  articleId={articleInfo?.id || 0}
                  userFavorites={userFavorites}
                  handleCollectArticleAction={handleCollectArticle}
                  handelNewFavoriteAction={handleNewFavorite}
                />
              </DialogContent>
            </Dialog>
            <Drawer
              direction="right"
              open={openDrawer}
              onOpenChange={setOpenDrawer}
            >
              <DrawerTrigger>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Icon icon="ic:baseline-comment" />
                  <p>{articleInfo?.commentCount}</p>
                </div>
              </DrawerTrigger>
              <DrawerContent className="max-w-130!">
                <DrawerHeader>
                  <DrawerTitle>评论</DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                  <CommentDrawerContent
                    articleUserId={articleInfo?.userId || 0}
                    comments={articleInfo?.comments || []}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        {/* 文章评论 */}
        <div className="flex gap-6 px-6 py-[17px] text-[#989aa9]">
          <div className="flex-1 flex gap-4 items-center">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setOpenDrawer(true)
              }}
            >
              <p>{articleInfo?.commentCount} 条评论</p>
              <Icon icon="iconamoon:arrow-right-2-thin" size={22} />
            </div>
            {articleInfo?.comments != null &&
              articleInfo.comments.length > 0 && (
                <div className="flex-1 flex gap-2 items-center text-[14px] w-200">
                  <Image
                    src={
                      articleInfo.comments[0].avatar ||
                      'https://picsum.photos/120/80?random=1'
                    }
                    alt=""
                    width={8}
                    height={8}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{articleInfo.comments[0].username}</p>
                  <p className="flex-1 text-black dark:text-white truncate">
                    {articleInfo.comments[0].content}
                  </p>
                </div>
              )}
          </div>

          {articleInfo?.publicComment && (
            <button
              className="w-20 h-8 text-[14px] bg-[#fc5531] text-white rounded-2xl cursor-pointer"
              onClick={() => {
                setOpenDrawer(true)
              }}
            >
              写评论
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
