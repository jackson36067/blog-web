"use client";

import { GetArticleAPI } from "@/api/article";
import CategoryArticleCard from "@/components/category/CategoryArticleCard";
import CategoryCard from "@/components/category/CategoryCard";
import { ArticleInfo } from "@/types/article";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState<string>(searchParams.get("title") || "");
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [categoryArticleList, setCategoryArticleList] = useState<ArticleInfo[]>(
    [],
  );

  const handleChangeCategory = (newTitle: string) => {
    if (newTitle === title) return;
    setTitle(newTitle);
    setPage(1);
  };

  useEffect(() => {
    const getCategoryArticleList = async () => {
      const res = await GetArticleAPI({
        page,
        pageSize,
        categoryTitle: title || "",
      });
      setCategoryArticleList(res.data.data);
      setTotalPages(res.data.totalPages);
    };
    getCategoryArticleList();
  }, [page, pageSize, title]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* 左侧：玻璃拟态分类栏 - Sticky 效果 */}
        <aside className="w-full md:w-64 md:sticky md:top-24 z-10">
          <div className="pl-2 mb-4">
            <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Explore
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
              Categories
            </p>
          </div>
          <CategoryCard title={title} changeTitle={handleChangeCategory} />
        </aside>

        {/* 右侧：便当盒布局文章列表 */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={title + page} // 切换分类或翻页时触发动画
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryArticleCard
                categoryArticleList={categoryArticleList}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
