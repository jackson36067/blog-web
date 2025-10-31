'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface GlowProps {
  className?: string
  children?: React.ReactNode
  glowColor?: string
  intensity?: number
}

export default function Glow({
  className = '',
  children,
  glowColor = 'purple',
  intensity = 1,
}: GlowProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className={className}>{children}</div>

  const colorMap: Record<string, string> = {
    purple: theme === 'dark' ? '#a78bfa' : '#7c3aed',
    cyan: theme === 'dark' ? '#67e8f9' : '#06b6d4',
    pink: theme === 'dark' ? '#f472b6' : '#db2777',
    blue: theme === 'dark' ? '#60a5fa' : '#2563eb',
  }

  const colorValue = colorMap[glowColor] ?? glowColor
  const shadow = `0px 0px ${20 * intensity}px ${colorValue}`

  return (
    <motion.div
      className={`${className} transition-all duration-500`}
      initial={{ scale: 1, boxShadow: shadow }}
      animate={{
        scale: [1, 1.02, 1],
        boxShadow: [
          `0px 0px ${20 * intensity}px ${colorValue}`,
          `0px 0px ${35 * intensity}px ${colorValue}`,
          `0px 0px ${20 * intensity}px ${colorValue}`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
    >
      {children}
    </motion.div>
  )
}
