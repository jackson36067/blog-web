'use client'

import { menu } from '@/constants/menu'
import NavigationMenu from './NavigationMenu'
import Operate from './Operate'
import LovePointer from '../Pointer'
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
        'flex justify-between items-center px-62 w-full mx-auto py-2.5 bg-white dark:bg-[#212121]',
        className,
      )}
    >
      <div
        className="text-[#212121] dark:text-white font-bold text-[16px] p-2"
        onClick={() => router.push('/')}
      >
        ✨ MyBlog
        <LovePointer />
      </div>
      <NavigationMenu menu={menu} />
      <Operate />
    </div>
  )
}
