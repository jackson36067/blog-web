"use client";

import { ArticleInfo } from "@/types/article";
import Article from "./Article";
import Pagination from "./Pagination";
import { AnimatePresence, motion } from "framer-motion";

interface ArticleListProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  articleList: ArticleInfo[];
  showEdit?: boolean;
}

export default function ArticleList({
  articleList,
  page,
  totalPage,
  onPageChange,
  showEdit,
}: ArticleListProps) {
  return (
    <div className="w-full">
      {articleList.length > 0 && (
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {articleList.map((item) => {
                return (
                  <Article
                    articleInfo={item}
                    key={item.id}
                    showAuthor
                    showEdit={showEdit}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
          {totalPage > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={onPageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
