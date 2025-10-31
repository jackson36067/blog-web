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
        flex items-center gap-2 w-[200px] px-2 py-2 rounded-[20px]
        border-2 border-gray-400 transition-all duration-200
        hover:border-blue-500 focus-within:border-blue-500
        bg-transparent text-[#212121] dark:text-white cursor-text
        ${className}
      `}
    >
      <Search className="w-5 h-5 text-[#212121] dark:text-white shrink-0" />
      <input
        type="text"
        placeholder="搜索"
        value={value}
        onChange={handleChange}
        className="
          flex-1 bg-transparent border-none outline-none text-[#212121] dark:text-white 
          placeholder-[#212121]/80 dark:placeholder-[#ffffff]/80
          text-sm placeholder:text-[12px]
        "
        {...props}
      />
    </div>
  )
}

export default SearchInput
