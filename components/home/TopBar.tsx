'use client'

import { menu } from '@/constants/menu'
import NavigationMenu from './NavigationMenu'
import Operate from './Operate'
import LovePointer from '../pointer'
import { useRouter } from 'next/navigation'

export default function HomeTopBar() {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center px-20 py-2.5 bg-gray-200/40 dark:bg-[#212121]">
      <div
        className="text-[#212121] dark:text-white font-bold text-[16px] p-2"
        onClick={() => router.push('/')}
      >
        Jackson Blog
        <LovePointer />
      </div>
      <NavigationMenu menu={menu} />
      <Operate />
    </div>
  )
}
