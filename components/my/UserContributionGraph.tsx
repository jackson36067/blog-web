'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface ContributionData {
  date: string
  count: number
}

interface ContributionGraphProps {
  data: ContributionData[]
}

export default function UserContributionGraph({
  data,
}: ContributionGraphProps) {
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-800'
    if (count < 3) return 'bg-green-300 dark:bg-green-500'
    if (count < 6) return 'bg-green-500 dark:bg-green-600'
    return 'bg-green-700 dark:bg-green-800'
  }

  return (
    <TooltipProvider>
      <div className="mx-auto mt-4">
        <div className="flex flex-wrap gap-2 justify-start">
          {data.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`w-4 h-4 rounded-[3px] ${getColor(
                    item.count,
                  )} transition-colors`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.date}</p>
                <p>{item.count} 次提交</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
