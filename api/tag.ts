import httpInstance from "@/utils/http";

// 获取文章标签列表
export const GetArticleTagListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/article/tag/list",
  });
};
