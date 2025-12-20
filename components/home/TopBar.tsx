'use client'

import { HomeMenu } from '@/constants/menu'
import NavigationMenu from './NavigationMenu'
import Operate from './Operate'
import LovePointer from '../pointer'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface HomeTopBarProps {
  className?: string
}

export default function HomeTopBar({ className }: HomeTopBarProps) {
  const router = useRouter()
  const path = usePathname()
  if (path == '/') return null
  return (
    <div
      className={cn(
        'w-full flex items-center bg-white dark:bg-[#212121] py-2.5',
        className,
      )}
    >
      <div
        className={cn(
          'flex justify-between items-center max-w-[1400px] w-[1400px] mx-auto',
        )}
      >
        <h1
          className="text-[#212121] dark:text-white font-bold text-[16px] p-2"
          onClick={() => router.push('/')}
        >
          ✨ MyBlog
          <LovePointer />
        </h1>
        <NavigationMenu menu={HomeMenu} />
        <Operate />
      </div>
    </div>
  )
}
