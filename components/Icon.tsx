'use client'

import { Icon as IconifyIcon } from '@iconify/react'
import { useTheme } from 'next-themes'
import React, { CSSProperties } from 'react'

interface IconProps {
  icon: string // 图标名称（如 "mdi:home" 或 "ep:edit"）
  size?: string | number // 图标大小
  color?: string // 图标颜色
  className?: string // 自定义类名
  darkColor?: string // 深色模式下的颜色
  hanldeOnClick?: () => void // 点击事件处理函数
}

/**
 * 通用图标组件
 * - 自动处理数字尺寸（自动加 px）
 * - 支持自定义颜色和类名
 */
const Icon: React.FC<IconProps> = ({
  icon,
  size = 20,
  color,
  className,
  darkColor,
  hanldeOnClick,
}) => {
  const iconSize = typeof size === 'number' ? `${size}px` : size || '20px'
  const { resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || 'light'

  const style: CSSProperties = {
    width: iconSize,
    height: iconSize,
    color: currentTheme === 'dark' ? darkColor : color,
    verticalAlign: 'middle',
  }

  return (
    <IconifyIcon
      icon={icon}
      style={style}
      className={className}
      onClick={hanldeOnClick}
    />
  )
}

export default Icon
