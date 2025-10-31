'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  showButton?: boolean // 是否展示按钮
  onViewProject?: () => void // 点击按钮回调
}

export default function ProjectCard({
  title,
  description,
  showButton = false,
  onViewProject,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Card
        className={`
          relative border backdrop-blur-xl transition-all duration-300
          bg-white/70 border-gray-200 hover:border-purple-400/50
          dark:bg-white/5 dark:border-white/10 dark:hover:border-white
        `}
      >
        <CardContent className="p-6 min-h-40 flex flex-col justify-between">
          <div>
            <h3
              className="
                text-lg font-semibold mb-2 
                text-gray-900 dark:text-purple-300
              "
            >
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {description}
            </p>
          </div>

          {showButton && (
            <Button
              variant="outline"
              size="sm"
              className="
                absolute bottom-4 right-4
                text-purple-600 dark:text-purple-300
                hover:bg-purple-50 dark:hover:bg-purple-900/20
              "
              onClick={onViewProject}
            >
              查看项目
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
