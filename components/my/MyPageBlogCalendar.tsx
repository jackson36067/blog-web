'use client'

import { useEffect, useState } from 'react'
import UserContributionGraph, {
  ContributionData,
} from './UserContributionGraph'

export default function MyPageBlogCalendar() {
  const [data, setData] = useState<ContributionData[]>([])

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    // 模拟数据：生成当前月的创作文章记录
    const randomData = Array.from({ length: daysInMonth }, (_, i) => ({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(
        i + 1,
      ).padStart(2, '0')}`,
      count: Math.floor(Math.random() * 10),
    }))

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(randomData)
  }, [])
  return (
    <div className="w-[300px] h-40 bg-white dark:bg-[#212121] px-6 rounded-[3px]">
      <div className="w-full py-3 border-b border-solid border-gray-200 dark:border-gray-200/10 font-bold text-gray-500 text-[14px]">
        本月创作历程
      </div>
      <UserContributionGraph data={data} />
    </div>
  )
}
