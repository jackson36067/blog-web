'use client'

import 'highlight.js/styles/github-dark.css'
import { ArticleInfo, TocItem } from '@/types/article'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon'
import useUserStore from '@/stores/UserStore'
import {
  CollectArticleAPI,
  GetArticleCommentAPI,
  LikeArticleAPI,
} from '@/api/article'
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
import { CommentResponse } from '@/types/comment'
import { ChevronDown, ChevronRight } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import { useTheme } from 'next-themes'

export default function ArticleDetailCard({
  articleInfo,
  reFreshArticleInfoAction,
}: {
  articleInfo: ArticleInfo | null
  reFreshArticleInfoAction: () => void
}) {
  const { userInfo } = useUserStore()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [userFavorites, setUserFavorites] = useState<FavoriteInfo[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [comments, setComments] = useState<CommentResponse[]>([])
  const [page, setPage] = useState<number>(1)
  const needRefreshRef = useRef(false)
  const [toc, setToc] = useState<TocItem[]>([])
  const [mounted, setMounted] = useState(false)

  // 避免首次 hydration 主题不一致
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // 匹配MDEditor.Markdown解析器的标题锚点
  function slugify(text: string) {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  // 匹配文章目录
  useEffect(() => {
    if (!articleInfo?.content) return

    const tempToc: TocItem[] = []
    const content = articleInfo.content

    // 1. 找出所有 fenced code block
    const codeBlockRanges: Array<[number, number]> = []
    const codeBlockRegex = /```[\s\S]*?```/gm
    let cbMatch
    // 获取所有代码块内容
    while ((cbMatch = codeBlockRegex.exec(content)) !== null) {
      codeBlockRanges.push([cbMatch.index, cbMatch.index + cbMatch[0].length])
    }

    const isInCodeBlock = (index: number) =>
      codeBlockRanges.some(([start, end]) => index >= start && index <= end)

    // 2. 匹配标题
    const headingRegex = /^#{1,6}\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const rawLine = match[0]
      const text = match[1].trim()
      const index = match.index

      // 排除代码块内容
      if (isInCodeBlock(index)) continue

      // 排除 shell 注释（# 开头，后面跟非字母数字中文）
      if (/^#\s*[-/*.+]/.test(rawLine)) continue

      const level = rawLine.match(/^#+/)![0].length
      const id = slugify(text)
      tempToc.push({ id, text, level })
    }
    // 生成目录数据
    const tocData = generateToc(tempToc)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToc(tocData)
  }, [articleInfo?.content])

  // 点赞文章
  const handleLikeArticle = async (articleId: number, isLike: boolean) => {
    if (userInfo.userId == 0) {
      toast.info('请先登录!')
      return
    }
    await LikeArticleAPI(articleId, isLike)
    reFreshArticleInfoAction()
  }

  // 获取用户收藏夹列表
  const getUserFavorites = useCallback(async () => {
    const res = await GetUserFavoriteListAPI({ username: userInfo.username })
    setUserFavorites(res.data)
  }, [userInfo.username])

  // 打开弹装执行获取收藏夹列表函数
  useEffect(() => {
    if (userFavorites.length !== 0) return
    if (openDialog) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserFavorites()
    }
  }, [userInfo.username, openDialog, userFavorites.length, getUserFavorites])

  // 收藏文章
  const handleCollectArticle = async (item: FavoriteInfo) => {
    if (userInfo.userId == 0) {
      toast.info('请先登录!')
      return
    }
    if (item.collectArticleIdList.includes(articleInfo?.id || 0)) return
    await CollectArticleAPI(articleInfo!.id, item.id)
    getUserFavorites()
    setOpenDialog(false)
    reFreshArticleInfoAction()
  }

  // 新建收藏夹
  const handleNewFavorite = () => {
    getUserFavorites()
  }

  // 关注/取消关注用户
  const handleUpdateFollowUser = async (
    followedId: number,
    isFollow: boolean,
  ) => {
    await UpdateFollowAPI(followedId, isFollow)
    reFreshArticleInfoAction()
  }

  // 分页获取文章评论
  const fetchComments = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    async (reset = false, specifyPage?: number) => {
      const currentPage = reset ? 1 : specifyPage ?? page
      const res = await GetArticleCommentAPI(
        currentPage,
        10,
        articleInfo?.id || 0,
      )
      if (reset) {
        setComments(res.data)
        setPage(1)
      } else {
        setComments(prev => [...prev, ...res.data])
      }
    },
    [articleInfo?.id, page],
  )

  // 打开弹窗调用分页获取文章评论函数
  useEffect(() => {
    if (!openDrawer) return
    // 用于对评论操作时刷新评论
    if (needRefreshRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchComments(true)
      needRefreshRef.current = false
      return
    }
    if (comments.length === 0) fetchComments(true)
  }, [comments.length, fetchComments, openDrawer])

  // page变化后获取文章评论
  useEffect(() => {
    if (!openDrawer) return
    if (page === 1) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments()
  }, [fetchComments, openDrawer, page])

  return (
    <div className="flex gap-4">
      {openDialog && <div className="fixed inset-0 bg-black/50 z-40" />}
      {/* 目录 */}
      <div className="flex-1 sticky top-20 h-fit bg-gray-50 dark:bg-[#121212] p-4 rounded-lg shadow">
        <h3 className="font-bold mb-3 text-lg">目录</h3>
        <TocList toc={toc} />
      </div>

      {/* 文章内容 */}
      <div className="max-w-[1150px] min-w-[1050px] bg-white dark:bg-[#212121] pt-4 rounded-lg relative">
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
              {articleInfo?.tags.map((item, index) => (
                <li
                  key={index}
                  className="text-blue-600 dark:text-blue-300 cursor-pointer"
                  onClick={() => router.push(`/tag?title=${item}`)}
                >
                  #{item}
                </li>
              ))}
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
          {/* --- 内容渲染 --- */}
          {!mounted ? (
            <div className="wmde-markdown-var" data-color-mode="light" />
          ) : (
            <div
              data-color-mode={resolvedTheme}
              className="wmde-markdown-var my-4"
            >
              <MDEditor.Markdown
                source={articleInfo?.content}
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          )}
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
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() =>
                router.push(`/my?username=${articleInfo?.username}`)
              }
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
                  <p>{articleInfo?.totalComment || 0}</p>
                </div>
              </DrawerTrigger>
              <DrawerContent className="max-w-130! overflow-y-auto overflow-x-hidden">
                <DrawerHeader>
                  <DrawerTitle>评论</DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-8">
                  <CommentDrawerContent
                    articleInfo={articleInfo}
                    comments={comments}
                    reFreshArticleCommentAction={() => {
                      fetchComments(true)
                      reFreshArticleInfoAction()
                    }}
                    getMoreCommentsAction={() => setPage(prev => prev + 1)}
                    clearCommentsAction={() => {
                      needRefreshRef.current = true
                    }}
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
              onClick={() => setOpenDrawer(true)}
            >
              <p>{articleInfo?.totalComment || 0} 条评论</p>
              <Icon icon="iconamoon:arrow-right-2-thin" size={22} />
            </div>
            {articleInfo?.comment != null && (
              <div className="flex-1 flex gap-2 items-center text-[14px] w-200">
                <Image
                  src={
                    articleInfo.comment.avatar ||
                    'https://picsum.photos/120/80?random=1'
                  }
                  alt=""
                  width={8}
                  height={8}
                  className="w-8 h-8 rounded-full"
                />
                <p>{articleInfo.comment.username}</p>
                <p className="flex-1 text-black dark:text-white truncate">
                  {articleInfo.comment.content}
                </p>
              </div>
            )}
          </div>

          {articleInfo?.publicComment && (
            <button
              className="w-20 h-8 text-[14px] bg-[#fc5531] text-white rounded-2xl cursor-pointer"
              onClick={() => setOpenDrawer(true)}
            >
              写评论
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// 生成树状目录
function generateToc(
  headings: { id: string; text: string; level: number }[],
): TocItem[] {
  const toc: TocItem[] = []
  const stack: TocItem[] = []
  headings.forEach(h => {
    const item: TocItem = { ...h, children: [] }

    while (stack.length && h.level <= stack[stack.length - 1].level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(item)
    } else {
      stack[stack.length - 1].children!.push(item)
    }

    stack.push(item)
  })
  return toc
}

// 目录组件
function TocList({ toc }: { toc: TocItem[] }) {
  return (
    <ul className="space-y-1 w-full">
      {toc.map(item => (
        <TocNode key={item.id} item={item} />
      ))}
    </ul>
  )
}

// 目录树点
function TocNode({ item }: { item: TocItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  let paddingLeft = `${(item.level - 1) * 32}px`
  if (hasChildren) {
    paddingLeft = `${(item.level - 1) * 32 - 18}px`
  }

  return (
    <li>
      <div className="flex items-center gap-1" style={{ paddingLeft }}>
        {hasChildren && (
          <span
            className="cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        <a
          href={`#${item.id}`}
          className="text-blue-600 dark:text-blue-300 hover:underline"
        >
          {item.text}
        </a>
      </div>
      {hasChildren && isOpen && <TocList toc={item.children!} />}
    </li>
  )
}
