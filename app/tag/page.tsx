"use client";
import { useEffect, useState } from "react";
import TagCard from "@/components/tag/TagCard";
import TagArticleCard from "@/components/tag/TagArtilceCard";
import { ArticleInfo, GetArticleInfoParams } from "@/types/article";
import { GetArticleAPI } from "@/api/article";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TagPage() {
  const initSelectedTitle = useSearchParams().get("title");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    initSelectedTitle || "",
  ]);
  const [tagArticles, setTagArticles] = useState<ArticleInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalArtilce, setTotalArtilce] = useState<number>(0);
  const pageSize = 4;

  useEffect(() => {
    const getTagArticleList = async () => {
      const param: GetArticleInfoParams = {
        page: page,
        pageSize: pageSize,
      };
      if (selectedTags.length > 0) {
        param.tags = selectedTags.filter((item) => item !== "");
      }
      const res = await GetArticleAPI(param);
      setTagArticles(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalArtilce(res.data.totalElements);
    };
    getTagArticleList();
  }, [page, selectedTags]);

  const handleSelectedTags = (tag: string) => {
    setPage(1);
    if (tag === "") {
      setSelectedTags([]);
      return;
    }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧侧边栏 */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 ml-1">
              话题标签
            </h2>
            <div className="pr-2">
              <TagCard
                selectedTags={selectedTags}
                changeSelectedTags={handleSelectedTags}
              />
            </div>
          </div>
        </aside>

        {/* 右侧主内容 */}
        <main className="flex-1 min-h-[600px] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              精选文章
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              共 {totalArtilce} 篇
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTags.join("-") + page}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <TagArticleCard
                tagArticleList={tagArticles}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
