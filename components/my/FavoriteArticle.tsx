'use client'

import { FavoriteArticleInfo, FavoriteInfo } from '@/types/favorite'
import Icon from '../Icon'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import NewFavoriteDialogContent from './NewFavoriteDialogContent'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Checkbox } from '../ui/checkbox'
import { MoveArticleDialogContent } from './MoveArticleDialogContent'
import { toast } from 'sonner'
import {
  DeleteFavoriteAPI,
  MoveFavoriteArticlesAPI,
  RemoveFavoriteArticleAPI,
} from '@/api/favorite'

interface FavoriteArticleProps {
  favoriteList: FavoriteInfo[]
  selectedFavorite: FavoriteInfo | undefined
  favoriteArticles: FavoriteArticleInfo[]
  reGetFavoriteList: () => void
  reGetFavoriteArticleList: () => void
  clearSelectedFavorite: () => void
}

export default function FavoriteArticle({
  favoriteList,
  selectedFavorite,
  favoriteArticles,
  reGetFavoriteList,
  reGetFavoriteArticleList,
  clearSelectedFavorite,
}: FavoriteArticleProps) {
  // 控制更新收藏夹基本信息弹窗
  const [openUpdateInfoDialog, setOpenUpdateInfoDialog] =
    useState<boolean>(false)
  // 控制移动收藏夹博文弹窗
  const [openMoveArticleDialog, setOpenMoveArticleDialog] =
    useState<boolean>(false)
  // 是否展示多选框(点击批量移动改变)
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false)
  // 多选框选择的博文id列表
  const [selectedFavoriteArticleIds, setSelectedFavoriteArticleIds] = useState<
    number[]
  >([])
  // 博文移动到的目的地收藏夹id
  const [moveDestFavorite, setMoveDestFavorite] = useState<number>(0)

  // 如果切换了选择的收藏夹, 需要关闭多选框
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowCheckBox(false)
  }, [selectedFavorite])

  // 点击确认按钮,确认更改收藏夹基本信息
  const handleCloseDialog = () => {
    setOpenUpdateInfoDialog(false)
    // 重新获取收藏夹信息
    reGetFavoriteList()
  }

  // 点击全选按钮
  const handleAllChecked = (checked: boolean) => {
    if (checked) {
      setSelectedFavoriteArticleIds(favoriteArticles.map(item => item.id))
    } else {
      setSelectedFavoriteArticleIds([])
    }
  }

  // 点击checkbox单选
  const handleCheckArticle = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedFavoriteArticleIds([...selectedFavoriteArticleIds, id])
    } else {
      setSelectedFavoriteArticleIds(
        selectedFavoriteArticleIds.filter(item => item != id),
      )
    }
  }

  // 移动博文至指定收藏夹
  const handleMoveArticle = async () => {
    // 没有选择收藏夹
    if (moveDestFavorite === 0) {
      toast.info('请选择要移动到的收藏夹')
      return
    }
    // 没有选择移动的文章
    if (selectedFavoriteArticleIds.length <= 0) {
      toast.info('请选择要移动的博文内容')
      setOpenMoveArticleDialog(false)
      // 注意要重置选择的收藏夹
      setMoveDestFavorite(0)
      return
    }
    // 移动的收藏夹为当前收藏夹
    if (selectedFavorite!.id === moveDestFavorite) {
      toast.info('文件已在收藏夹中')
      return
    }
    // 发送请求
    await MoveFavoriteArticlesAPI({
      sourceFavoriteId: selectedFavorite!.id,
      targetFavoriteId: moveDestFavorite,
      articleIds: selectedFavoriteArticleIds,
    })
    setOpenMoveArticleDialog(false)
    // 重置收藏夹
    setMoveDestFavorite(0)
    // 重置选中的文章
    setSelectedFavoriteArticleIds([])
    // 重新获取收藏夹列表以及收藏夹文章列表
    reGetFavoriteList()
    reGetFavoriteArticleList()
  }

  // 从收藏夹中移除博文
  const handleRemoveFavoriteArticle = async (articleIds: number[]) => {
    if (articleIds.length <= 0) {
      toast.info('请选择要取消收藏的博文内容')
      return
    }
    await RemoveFavoriteArticleAPI(selectedFavorite!.id, {
      articleIds,
    })
    // 清空选择的收藏夹博文列表
    setSelectedFavoriteArticleIds([])
    // 重新获取收藏夹博文列表
    reGetFavoriteArticleList()
  }

  // 删除收藏夹
  const handleDeleteFavorite = async () => {
    // 调用删除收藏夹请求
    await DeleteFavoriteAPI(selectedFavorite!.id)
    // 清除选择的收藏夹信息(获取收藏夹列表需要重新获取并选择一个默认的收藏夹)
    clearSelectedFavorite()
  }

  return (
    selectedFavorite && (
      <div className="flex flex-col gap-1 mt-2 flex-1">
        {(openUpdateInfoDialog || openMoveArticleDialog) && (
          <div className="fixed inset-0 bg-black/50 z-40" />
        )}
        <div className="flex flex-col gap-3 pb-3 border-b border-solid border-gray-200">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-gray-500">
              <p>名称:</p>
              <p>{selectedFavorite.title}</p>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-[#F53F3F] border border-solid border-[#fbe3e4] rounded-xl py-1 px-2">
              <Icon icon="streamline:move-left" size={14} />
              <p>可拖拽博文至其他收藏夹进行分类修改</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-gray-500">
              <p>描述:</p>
              <p>{selectedFavorite.abstract}</p>
            </div>
            {!showCheckBox ? (
              <div className="flex gap-2 items-center">
                <Dialog
                  open={openUpdateInfoDialog}
                  onOpenChange={setOpenUpdateInfoDialog}
                  modal={false}
                >
                  <DialogTrigger asChild>
                    <div className="border-r border-solid border-gray-200">
                      <Button variant="link" className="text-[#1d98d1]">
                        修改信息
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>更新收藏夹信息</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <NewFavoriteDialogContent
                      closeNewFavoriteDialog={handleCloseDialog}
                      title={selectedFavorite.title}
                      abstarct={selectedFavorite.abstract}
                      isDefault={selectedFavorite.isDefault}
                      operateType="update"
                      favoriteId={selectedFavorite.id}
                    />
                  </DialogContent>
                </Dialog>
                <div className="border-r border-solid border-gray-200">
                  <Button
                    variant="link"
                    className="text-[#1d98d1]"
                    onClick={() => handleDeleteFavorite()}
                  >
                    删除收藏夹
                  </Button>
                </div>
                <div
                  className={cn(
                    !selectedFavorite.isDefault &&
                      'border-r border-solid border-gray-200',
                  )}
                >
                  <Button
                    variant="link"
                    className="text-[#1d98d1]"
                    onClick={() => {
                      setShowCheckBox(true)
                    }}
                  >
                    批量移动
                  </Button>
                </div>
                {!selectedFavorite.isDefault && (
                  <Button variant="link" className="text-[#1d98d1]">
                    设为默认
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="border-r border-solid border-gray-200">
                  <Button
                    variant="link"
                    className="text-[#1d98d1]"
                    onClick={() =>
                      handleRemoveFavoriteArticle(selectedFavoriteArticleIds)
                    }
                  >
                    取消收藏
                  </Button>
                </div>
                <Dialog
                  open={openMoveArticleDialog}
                  onOpenChange={setOpenMoveArticleDialog}
                  modal={false}
                >
                  <DialogTrigger asChild>
                    <div className="border-r border-solid border-gray-200">
                      <Button variant="link" className="text-[#1d98d1]">
                        移至其他收藏夹
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[400px]">
                    <DialogHeader>
                      <DialogTitle>移动至其他收藏夹</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <MoveArticleDialogContent
                      favoriteList={favoriteList}
                      selectMoveFavorite={setMoveDestFavorite}
                    />
                    <DialogFooter>
                      <button
                        className="border px-3 py-1 rounded"
                        onClick={() => setOpenMoveArticleDialog(false)}
                      >
                        取消
                      </button>
                      <button
                        className="bg-[#fc5531] text-white px-3 py-1 rounded"
                        onClick={handleMoveArticle}
                      >
                        确定
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div>
                  <Button
                    variant="link"
                    className="text-[#1d98d1]"
                    onClick={() => {
                      setShowCheckBox(false)
                      // 退出清空选择收藏夹博文
                      setSelectedFavoriteArticleIds([])
                    }}
                  >
                    退出
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showCheckBox && (
          <div className="flex items-center gap-2 mt-2 py-2 pl-2 pr-2 rounded-[3px] hover:shadow text-[#555666] text-[14px]">
            <Checkbox
              className="border-[#999]!"
              checked={
                selectedFavoriteArticleIds.length === favoriteArticles.length
              }
              onCheckedChange={checked => handleAllChecked(checked === true)}
            />
            全选
          </div>
        )}
        {favoriteArticles.length > 0 ? (
          <div className="w-full">
            {favoriteArticles.map(item => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between mt-2 py-3 pl-2 pr-2 border border-[#ededed] border-solid rounded-[3px] hover:shadow hover:text-[#F53F3F] text-[#555666]"
                >
                  <div className="flex items-center gap-2">
                    {showCheckBox && (
                      <Checkbox
                        checked={selectedFavoriteArticleIds.includes(item.id)}
                        onCheckedChange={checked =>
                          handleCheckArticle(checked === true, item.id)
                        }
                        className="border-[#999]!"
                      />
                    )}
                    <p className="px-[7px] border border-gray-200 border-solid text-[12px] rounded-[3px] text-gray-400">
                      BLOG
                    </p>
                    <p className="text-inherit cursor-pointer text-[14px]">
                      {item.title}
                    </p>
                  </div>
                  {!showCheckBox && (
                    <div className="cursor-pointer">
                      <Button
                        variant="link"
                        className="text-[#1d98d1]"
                        onClick={() => handleRemoveFavoriteArticle([item.id])}
                      >
                        移除
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-10 text-[#1d98d1]">
            收藏夹暂无博文
          </div>
        )}
      </div>
    )
  )
}
