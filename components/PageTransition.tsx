'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Loader2 } from 'lucide-react'
import useUserStore from '@/stores/UserStore'

export default function PageTransition() {
  const pathname = usePathname()
  const { userInfo } = useUserStore()
  const [showOverlay, setShowOverlay] = useState(false)

  // 封装一个触发动画的方法
  const triggerLoading = useCallback(() => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    setShowOverlay(true)

    const timer = setTimeout(() => {
      setShowOverlay(false)
      NProgress.done()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 路由变化时触发
    // eslint-disable-next-line react-hooks/set-state-in-effect
    triggerLoading()
  }, [pathname, triggerLoading])

  useEffect(() => {
    // 监听 userInfo 中某个字段变化时触发动画
    if (userInfo.token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      triggerLoading()
    }
  }, [userInfo.token, triggerLoading, userInfo])

  return (
    showOverlay && (
      <div className="fixed inset-0 z-1030 bg-white/60 backdrop-blur-md flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    )
  )
}
