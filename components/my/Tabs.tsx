import { myPageTabItems } from '@/constants/my'
import * as Tabs from '@radix-ui/react-tabs'
import { motion, AnimatePresence } from 'framer-motion'
import MyArticleTabContent from './MyArticleTabContent'
import MyLikeArticleTabContent from './MyLikeArticleTabContent'
import RecentBrowseTabContent from './RecentBrowseTabContent'
import InteractionTabContent from './InteractionTabContent'
import MyCollectTabContent from './MyCollectTabContent'

interface MyPageTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export default function MyPageTabs({
  activeTab,
  onTabChange,
}: MyPageTabsProps) {
  const activeItem = myPageTabItems.find(item => item.title === activeTab)

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange} className="w-full">
      {/* Tab 列表 */}
      <Tabs.List
        className="w-full border-b flex justify-between items-center overflow-x-auto text-[16px]"
        aria-label="Manage your account"
      >
        {myPageTabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            value={item.title}
            className="group outline-none py-1.5 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-[#222226]
            dark:data-[state=active]:border-white data-[state=active]:text-[#222226] dark:data-[state=active]:text-white"
          >
            <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-[#1d98d1] font-medium">
              {item.title}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Tab 内容 */}
      <div className="relative min-h-[100px] py-2">
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeItem.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <Tabs.Content value={activeItem.title}>
                {activeItem.title === '我的点赞' && <MyLikeArticleTabContent />}
                {activeItem.title === '最近浏览' && <RecentBrowseTabContent />}
                {activeItem.title === '我的文章' && <MyArticleTabContent />}
                {activeItem.title === '关注/互动' && <InteractionTabContent />}
                {activeItem.title === '我的收藏' && <MyCollectTabContent />}
              </Tabs.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Tabs.Root>
  )
}
