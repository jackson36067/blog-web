'use client'

import {
  ArticleInfo,
  ArticleYearStatistic,
  GetMyArticleInfoParams,
} from '@/types/article'
import { useEffect, useState } from 'react'
import Article from '../Article'
import {
  GetMyArticleCreateProcessAPI,
  GetMyArticleListAPI,
} from '@/api/article'
import Pagination from '../Pagination'
import MyArticleTabContentControlPanel from './MyArticleTabContentControlPanel'
import { useSearchParams } from 'next/navigation'

export default function MyArticleTabContent() {
  const username = useSearchParams().get('username')
  const [myArticleList, setMyArticleList] = useState<ArticleInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(5)
  const [page, setPage] = useState<number>(1)
  const [visibility, setVisiblity] = useState(0)
  const [orderBy, setOrderBy] = useState('created_at')
  const [orderType, setOrderType] = useState('desc')
  const [articleStatistic, setArticleStatistic] = useState<
    ArticleYearStatistic[]
  >([])
  const [articleCreatedStartTime, setArticleCreatedStartTime] =
    useState<string>('')
  const [articleCreatedEndTime, setArticleCreatedEndTime] = useState<string>('')
  useEffect(() => {
    const getMyArticleList = async () => {
      const params: GetMyArticleInfoParams = {
        username: username || '',
        page: page,
        pageSize: 4,
        visibility,
        orderBy,
        orderType,
      }
      if (articleCreatedStartTime != '' && articleCreatedEndTime != '') {
        params.startTime = articleCreatedStartTime
        params.endTime = articleCreatedEndTime
      }
      const res = await GetMyArticleListAPI(params)
      setMyArticleList(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getMyArticleList()
  }, [
    articleCreatedEndTime,
    articleCreatedStartTime,
    orderBy,
    orderType,
    page,
    visibility,
  ])
  useEffect(() => {
    const getUserArticleCreateProcess = async () => {
      const res = await GetMyArticleCreateProcessAPI()
      setArticleStatistic(res.data)
    }
    getUserArticleCreateProcess()
  }, [])

  const handleChangeOrderBy = (newOrderBy: string) => {
    // 判断当前排序方式使用一样
    if (page > 1) {
      setPage(1)
    }
    if (orderBy === newOrderBy) {
      setOrderType(orderType === 'desc' ? 'asc' : 'desc')
      return
    }
    setOrderBy(newOrderBy)
    setOrderType('desc')
  }

  const handleSelectArticleMonthRange = (
    startTime: string,
    endTime: string,
  ) => {
    setArticleCreatedStartTime(startTime)
    setArticleCreatedEndTime(endTime)
  }

  return (
    <div>
      {myArticleList.length > 0 ? (
        <div>
          <MyArticleTabContentControlPanel
            visibility={visibility}
            setVibility={setVisiblity}
            orderBy={orderBy}
            setOrderBy={orderBy => handleChangeOrderBy(orderBy)}
            articleStatistic={articleStatistic}
            setArticleCreateTimeRange={(startTime, endTime) =>
              handleSelectArticleMonthRange(startTime, endTime)
            }
          />
          {myArticleList.map(item => {
            return <Article key={item.id} articleInfo={item} />
          })}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      ) : (
        <a className="flex items-center justify-center px-2 py-4 mt-20 text-[14px] text-[#1d98d1] font-bold cursor-pointer">
          暂无文章, 快去创作吧
        </a>
      )}
    </div>
  )
}
