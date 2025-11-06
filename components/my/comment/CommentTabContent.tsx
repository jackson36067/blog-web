'use client'

import { GetUserCommentAPI } from '@/api/user'
import { UserCommentResponse } from '@/types/user'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

interface CommentTabContentProps {
  page: number
  pageSize: number
  setTotalPage: (totalPage: number) => void
  type: 'in' | 'out'
}

export default function CommentTabContent({
  page,
  pageSize,
  setTotalPage,
  type,
}: CommentTabContentProps) {
  const pathParma = useSearchParams()
  const [userComments, setUserComments] = useState<UserCommentResponse[]>([])
  useEffect(() => {
    const getUserComment = async () => {
      const res = await GetUserCommentAPI({
        page: page,
        pageSize: pageSize,
        username: pathParma.get('username') || '',
        type: type,
      })
      setUserComments(res.data.data)
      setTotalPage(res.data.totalPages)
    }
    getUserComment()
  }, [page, pageSize, pathParma, setTotalPage, type])
  return (
    <div className="flex flex-col">
      {userComments.length > 0 ? (
        userComments.map(item => {
          return <CommentCard key={item.commentId} comment={item} />
        })
      ) : (
        <div className="flex justify-center py-20 text-[#1d98d1]">
          {type === 'in' ? '收到的评论为空' : '发布的评论为空'}
        </div>
      )}
    </div>
  )
}
