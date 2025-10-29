'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-gray-200 dark:bg-white" />
  }

  return (
    <div
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative flex items-center w-14 h-7 rounded-full cursor-pointer transition-colors duration-300',
        theme === 'dark' ? 'bg-white' : 'bg-gray-200',
      )}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-300',
          theme === 'dark'
            ? 'translate-x-7 bg-yellow-400'
            : 'translate-x-0 bg-white',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-4 h-4 text-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-4 h-4 text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
