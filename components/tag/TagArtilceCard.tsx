"use client";
import { ArticleInfo } from "@/types/article";
import ArticleList from "../ArticleList";
import Icon from "../Icon";

interface TagArticleCardProps {
  tagArticleList: ArticleInfo[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function TagArticleCard({
  tagArticleList,
  page,
  totalPages,
  setPage,
}: TagArticleCardProps) {
  return (
    // 使用 border-border/50 增加半透明边框，让深色模式过渡更自然
    <div className="rounded-2xl border border-border/50 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden transition-all">
      <div className="p-4 md:p-6">
        <ArticleList
          articleList={tagArticleList}
          page={page}
          totalPage={totalPages}
          onPageChange={setPage}
        />

        {/* 如果没有数据时的视觉占位 */}
        {tagArticleList.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
            <Icon
              icon="lucide:package-open"
              size={48}
              className="text-muted-foreground/30"
            />
            <p className="text-muted-foreground">该标签下暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
