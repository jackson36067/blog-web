import { Search } from 'lucide-react'
import React from 'react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        flex items-center gap-2 w-[120px] px-2 py-2 rounded-[20px]
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
        className="
          flex-1 bg-transparent border-none outline-none text-[#212121] dark:text-white placeholder-[#212121]/80 dark:placeholder-[#ffffff]/80
          text-sm
        "
        {...props}
      />
    </div>
  )
}

export default SearchInput
