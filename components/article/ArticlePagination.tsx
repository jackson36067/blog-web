"use client";

import { GetRecommendArticleAPI } from "@/api/article";
import { ArticleInfo, GetRecommendArticleParams } from "@/types/article";
import { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import ArticleList from "../ArticleList";
import useUserStore from "@/stores/UserStore";

export default function ArticlePagination() {
  const { userInfo } = useUserStore();
  const [articleInfo, setArticleInfo] = useState<ArticleInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getRecommendArticleList = async () => {
      const params: GetRecommendArticleParams = {
        page,
        pageSize: 5,
      };

      if (userInfo.token != undefined && userInfo.token != "") {
        params.userId = userInfo.userId;
        params.HobbyTags = userInfo.hobby;
      }

      const res = await GetRecommendArticleAPI(params);
      setArticleInfo(res.data.data);
      setTotalPages(res.data.totalPages);
    };
    getRecommendArticleList();
  }, [page, userInfo]);
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 space-y-6">
      {/* 文章列表 */}
      <div className="overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#181b20]">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p className="font-bold text-[16px]">文章列表</p>
          <SearchInput value={title} onValueChange={setTitle} />
        </div>
        <div className="px-3 py-2 sm:px-4">
          <ArticleList
            articleList={articleInfo}
            page={page}
            totalPage={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
