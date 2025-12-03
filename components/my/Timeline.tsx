import { BrowseArticleHistoryGroup } from '@/types/article'
import Article from '../Article'

interface TimelineProps {
  groups: BrowseArticleHistoryGroup[]
}

export function Timeline({ groups }: TimelineProps) {
  return (
    <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4">
      {groups.map(group => (
        <div key={group.groupTime} className="mb-8 relative">
          {/* 节点圆圈 */}
          <div className="absolute -left-2 top-0 w-4 h-4 bg-[#e8e8ed] rounded-full border border-white dark:border-gray-900"></div>

          {/* 时间分组标题 */}
          <div className="ml-4 font-semibold text-gray-800 dark:text-gray-100">
            {group.groupTime}
          </div>

          {/* 文章列表 */}
          <div className="ml-4">
            {group.articles.map((item, index) => {
              return (
                <Article
                  key={index}
                  articleInfo={item}
                  className="border border-solid border-gray-200 dark:border-gray-200/10 py-2 pl-2"
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
