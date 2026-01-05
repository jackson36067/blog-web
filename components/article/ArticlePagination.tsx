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
    <div className="flex-1 space-y-6">
      {/* 文章列表 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-3">
        <div className="flex justify-between items-center border-b border-solid border-b-gray-200 pb-4">
          <p className="font-bold text-[16px]">文章列表</p>
          <SearchInput value={title} onValueChange={setTitle} />
        </div>
        <ArticleList
          articleList={articleInfo}
          page={page}
          totalPage={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
