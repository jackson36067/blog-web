"use client";

import { ArticleInfo } from "@/types/article";
import ArticleList from "../ArticleList";

interface CategoryArticleCardProps {
  categoryArticleList: ArticleInfo[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function CategoryArticleCard({
  categoryArticleList,
  page,
  setPage,
  totalPages,
}: CategoryArticleCardProps) {
  // 如果你需要更复杂的便当盒布局，可以直接在 ArticleList 里定义 grid-cols
  // 这里的包装层负责处理背景和整体间距
  return (
    <div className="w-full">
      {/* 提示：如果你的 ArticleList 组件内部是渲染一个简单的列表，
        你可能需要修改 ArticleList 内部的 className。
        理想的 Bento Grid 类名为：
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      */}
      <div className="rounded-3xl p-1 transition-all">
        <ArticleList
          articleList={categoryArticleList}
          page={page}
          totalPage={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* 空状态处理 */}
      {categoryArticleList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-white/10 rounded-3xl border border-dashed">
          <div className="text-4xl mb-4">Empty</div>
          <p>该分类下暂无文章，去看看别的吧？</p>
        </div>
      )}
    </div>
  );
}
