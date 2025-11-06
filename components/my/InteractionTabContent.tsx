'use client'

import { InteractionTab } from '@/constants/tab'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Pagination from '../Pagination'
import FollowedTabContent from './follow/FollowedTabContent'
import FansTabContent from './follow/FansTabContent'
import CommentCard from './comment/CommentCard'
import CommentTabContent from './comment/CommentTabContent'

export default function InteractionTabContent() {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPagte] = useState<number>(0)
  const pageSize = 6

  return (
    <div>
      <div className="flex gap-10 items-center py-3 text-gray-500 dark:text-white text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/10">
        {InteractionTab.map(item => {
          return (
            <p
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setPage(1)
                setTotalPagte(0)
              }}
              className={cn(
                activeTab === item.id && 'text-[#fc5531]',
                'cursor-pointer',
              )}
            >
              {item.title}
            </p>
          )
        })}
      </div>
      <div>
        {activeTab === 1 && (
          <FollowedTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
          />
        )}
        {activeTab === 2 && (
          <FansTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
          />
        )}
        {activeTab === 3 && (
          <CommentTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
            type="out"
          />
        )}
        {activeTab === 4 && (
          <CommentTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
            type="in"
          />
        )}
      </div>
      {totalPage > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
