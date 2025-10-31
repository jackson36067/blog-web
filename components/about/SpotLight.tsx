'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function Spotlight() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const background = useTransform([smoothX, smoothY], ([x, y]) => {
    if (!mounted) return 'transparent'
    if (theme === 'light') {
      return `radial-gradient(600px at ${x}px ${y}px, rgba(99,102,241,0.35), rgba(255,255,255,0) 80%)`
    } else {
      return `radial-gradient(600px at ${x}px ${y}px, rgba(139,92,246,0.2), transparent 80%)`
    }
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null // 👈 防止 SSR 与 CSR 不一致

  return (
    <motion.div
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-500 ease-out"
    />
  )
}
