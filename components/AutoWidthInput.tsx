import { useRef, useState, useEffect, useCallback } from 'react'
import Icon from './Icon'

export default function AutoWidthInput({
  value,
  onChange,
  initialWidth = 40,
  className = '',
  onClear,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  initialWidth?: number
  className?: string
}) {
  const [width, setWidth] = useState(initialWidth)
  const spanRef = useRef<HTMLSpanElement>(null)

  const updateWidth = useCallback(
    (text: string) => {
      if (!spanRef.current) return
      spanRef.current.textContent = text || ' '
      const newWidth = spanRef.current.offsetWidth + 35
      setWidth(Math.max(initialWidth, newWidth))
    },
    [initialWidth],
  )

  useEffect(() => {
    updateWidth(value || '')
  }, [updateWidth, value])

  const handleClear = () => {
    onClear?.()
    onChange('')
  }

  return (
    <div className="relative inline-flex items-center">
      {/* 隐藏宽度测量 */}
      <span
        ref={spanRef}
        className="absolute left-0 top-0 invisible whitespace-pre text-[12px]"
      ></span>

      {/* 输入框 */}
      <input
        {...props}
        autoFocus
        value={value}
        onChange={e => {
          onChange(e.target.value)
          updateWidth(e.target.value)
        }}
        style={{ width }}
        className={`
          h-6 py-1! bg-[#267dcc0d] text-[#006fff] border border-solid border-[#80B7FF] rounded-[3px] text-[12px] cursor-pointer pl-2 pr-6 ${className} focus:outline-0
          `}
      />

      <Icon
        icon="iwwa:delete"
        size={14}
        hanldeOnClick={() => handleClear()}
        className="absolute right-1 text-[#006fff] cursor-pointer hover:bg-white rounded-full"
      />
    </div>
  )
}
