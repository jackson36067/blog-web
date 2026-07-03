import { Search } from 'lucide-react'
import React from 'react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: string
  onValueChange?: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  className = '',
  value,
  onValueChange,
  ...props
}) => {
  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value)
  }

  return (
    <div
      className={`
        flex h-10 w-full items-center gap-2 rounded-lg border border-slate-200
        bg-slate-50 px-3 text-slate-900 shadow-xs transition-all duration-200
        hover:border-slate-300 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-3 focus-within:ring-blue-500/10
        dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:focus-within:bg-white/8 sm:w-[240px]
        ${className}
      `}
    >
      <Search className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        placeholder="搜索"
        value={value}
        onChange={handleChange}
        className="
          min-w-0 flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white 
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          text-sm placeholder:text-[12px]
        "
        {...props}
      />
    </div>
  )
}

export default SearchInput
