'use client'

import {
  ArticleInfo,
  ArticleYearStatistic,
  GetMyArticleInfoParams,
} from '@/types/article'
import { useEffect, useState } from 'react'
import {
  GetMyArticleCreateProcessAPI,
  GetMyArticleListAPI,
} from '@/api/article'
import MyArticleTabContentControlPanel from './MyArticleTabContentControlPanel'
import { useSearchParams } from 'next/navigation'
import ArticleList from '../ArticleList'

export default function MyArticleTabContent() {
  const username = useSearchParams().get('username')
  const [myArticleList, setMyArticleList] = useState<ArticleInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(5)
  const [page, setPage] = useState<number>(1)
  const [visibility, setVisiblity] = useState(0)
  const [status, setStatus] = useState(3)
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
        status,
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
    status,
    username,
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
      <MyArticleTabContentControlPanel
        visibility={visibility}
        stauts={status}
        setVibility={setVisiblity}
        setStatus={setStatus}
        orderBy={orderBy}
        setOrderBy={orderBy => handleChangeOrderBy(orderBy)}
        articleStatistic={articleStatistic}
        setArticleCreateTimeRange={(startTime, endTime) =>
          handleSelectArticleMonthRange(startTime, endTime)
        }
      />
      <ArticleList
        articleList={myArticleList}
        page={page}
        totalPage={totalPages}
        onPageChange={setPage}
        showEdit={true}
      />
    </div>
  )
}
