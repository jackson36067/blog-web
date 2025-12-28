"use client";

import { ArticleInfo } from "@/types/article";
import Article from "./Article";
import Pagination from "./Pagination";

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
