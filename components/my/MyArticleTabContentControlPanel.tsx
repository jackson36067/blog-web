'use client'

import { cn } from '@/lib/utils'
import Icon from '../Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import { ArticleYearStatistic } from '@/types/article'

interface MyArticleTabContentControlPanelProps {
  visibility: number
  setVibility: (visibility: number) => void
  orderBy: string
  setOrderBy: (orderBy: string) => void
  articleStatistic: ArticleYearStatistic[]
  setArticleCreateTimeRange: (startTime: string, endTime: string) => void
}

export default function MyArticleTabContentControlPanel({
  visibility,
  setVibility,
  orderBy,
  setOrderBy,
  articleStatistic,
  setArticleCreateTimeRange,
}: MyArticleTabContentControlPanelProps) {
  const [openVisibilityRange, setOpenVisibilityRange] = useState<boolean>(false)
  const [openCreateProcess, setOpenCreateProcess] = useState<boolean>(false)
  const [selectArticleMonth, setSelectArticleMonth] = useState<number>(0)
  const [selectArticleYear, setSelectArticleYear] = useState<number>(0)
  const [createProcessTitle, setCreateProcessTitle] =
    useState<string>('创作历程')
  const handleSelectArticleMonth = (
    startTime: string,
    endTime: string,
    month: number,
    year: number,
    createProcessTitle: string,
  ) => {
    setArticleCreateTimeRange(startTime, endTime)
    setSelectArticleMonth(month)
    setOpenCreateProcess(false)
    setSelectArticleYear(year)
    setCreateProcessTitle(createProcessTitle)
  }
  return (
    <div>
      <div className="flex items-center gap-20 border-b border-solid border-gray-200 dark:border-gray-200/10 px-2 pt-1 pb-2">
        <div>
          <DropdownMenu
            open={openVisibilityRange}
            onOpenChange={setOpenVisibilityRange}
            modal={false}
          >
            <DropdownMenuTrigger>
              <div className="flex items-center text-[14px] text-[#FC5531]">
                <p>{visibility === 0 ? '全部可见' : '仅我可见'}</p>
                <Icon
                  icon={
                    openVisibilityRange
                      ? 'iconamoon:arrow-up-2-thin'
                      : 'iconamoon:arrow-down-2'
                  }
                  size={18}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setVibility(0)
                  }}
                >
                  全部可见
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setVibility(2)
                  }}
                >
                  仅我可见
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={cn(
            'flex items-center text-[14px] cursor-pointer',
            orderBy === 'created_at' && 'text-[#FC5531]',
          )}
          onClick={() => {
            setOrderBy('created_at')
          }}
        >
          <p>按发布时间</p>
          <Icon icon="bx:sort" size={14} />
        </div>
        <div
          className={cn(
            'flex items-center text-[14px] cursor-pointer',
            orderBy === 'browse_count' && 'text-[#FC5531]',
          )}
          onClick={() => {
            setOrderBy('browse_count')
          }}
        >
          <p>按访问量</p>
          <Icon icon="bx:sort" size={14} />
        </div>
        <div>
          <DropdownMenu
            open={openCreateProcess}
            onOpenChange={setOpenCreateProcess}
            modal={false}
          >
            <DropdownMenuTrigger>
              <div
                className={cn(
                  'flex items-center text-[14px]',
                  selectArticleMonth && 'text-[#FC5531]',
                )}
              >
                <p>{createProcessTitle}</p>
                <Icon
                  icon={
                    openCreateProcess
                      ? 'iconamoon:arrow-up-2-thin'
                      : 'iconamoon:arrow-down-2'
                  }
                  size={18}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60! px-0! py-0! box-border">
              <div>
                <div
                  className={cn(
                    'flex justify-between py-2 px-6 text-[14px] text-gray-500 border-b border-gray-200 border-solid hover:bg-[#f5f6f7] hover:rounded-[2px] dark:hover:bg-[#212121]',
                    !selectArticleMonth && 'text-[#FC5531]',
                  )}
                  onClick={() =>
                    handleSelectArticleMonth('', '', 0, 0, '创作历程')
                  }
                >
                  <p>全部</p>
                  <p>
                    {articleStatistic.reduce((accumulator, currentValue) => {
                      return currentValue.totalCount + accumulator
                    }, 0)}
                    篇
                  </p>
                </div>
                {articleStatistic.map((year, index) => {
                  return (
                    <div key={index}>
                      <div className="py-2 px-6 text-[12px] text-gray-500">
                        <p>
                          {year.year}年{'('}
                          {year.totalCount}
                          {'篇)'}
                        </p>
                      </div>
                      <div className="flex flex-col pb-2 border-b border-solid border-gray-200">
                        {year.months.map((month, index) => {
                          return (
                            <div
                              key={index}
                              className={cn(
                                'flex justify-between w-full py-2 px-6 text-[14px] text-black dark:text-white hover:bg-[#f5f6f7] hover:rounded-[2px] dark:hover:bg-[#212121]',
                                selectArticleMonth === month.month &&
                                  selectArticleYear === year.year &&
                                  'text-[#FC5531]',
                              )}
                              onClick={() =>
                                handleSelectArticleMonth(
                                  month.startTime,
                                  month.endTime,
                                  month.month,
                                  year.year,
                                  `${year.year}/${month.month}月${month.count}篇`,
                                )
                              }
                            >
                              <p>{month.month}月</p>
                              <p>{month.count} 篇</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
