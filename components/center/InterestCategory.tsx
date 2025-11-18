import { interestData } from '@/constants/interest'
import React, { useState } from 'react'

interface Props {
  onTagSelect?: (tag: string, type: number) => void
}

const InterestSelector: React.FC<Props> = ({ onTagSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="pl-6 mt-6">
      <div className="w-full flex flex-col gap-6 px-3 py-3 border border-solid border-gray-200 dark:border-gray-200/20 rounded-lg">
        {/* 分类选择 */}
        <div className="flex flex-wrap gap-3">
          {interestData.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                text-[#777888] hover:text-[#507999] cursor-pointer text-[14px]
              ${currentIndex === index && 'text-[#507999]!'}
            `}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* 标签展示 */}
        <div className="flex flex-wrap gap-3">
          {interestData[currentIndex].tags.map((tag, idx) => (
            <div
              key={idx}
              onClick={() => onTagSelect?.(tag, 1)}
              className="flex items-center gap-3 bg-[#ebf2f7] dark:bg-[#1a232b] border border-solid border-[#ebf2f7] dark:border-[#1a232b] rounded-[3px] text-[#507999] pr-1.5 pl-2 py-px cursor-pointer text-[14px] hover:bg-[#e0e9f0] dark:hover:bg-[#161d23]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterestSelector
