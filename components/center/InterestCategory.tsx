import { GetArticleTagListAPI } from "@/api/tag";
import { cn } from "@/lib/utils";
import { ArticleTagResponse } from "@/types/tag";
import { useEffect, useState } from "react";

interface Props {
  selectedTags: string[];
  onTagSelect?: (tag: string, type: number) => void;
  mode?: string;
  searchColumn?: (value: string) => void;
}

export default function InterestSelector({
  onTagSelect,
  selectedTags,
  mode = "vertical", // horizontal模式水平摆放
}: Props) {
  const [tagList, setTagList] = useState<ArticleTagResponse[]>([]);
  // 记录选择的标签
  const [selectedTagTree, setSeletedTagTree] =
    useState<ArticleTagResponse | null>(null);
  // 获取标签树
  useEffect(() => {
    const getTagList = async () => {
      const res = await GetArticleTagListAPI();
      setTagList(res.data);
      setSeletedTagTree(res.data[0]);
    };
    getTagList();
  }, []);

  return (
    <div
      className={`w-full flex gap-6 pl-6 pr-3 py-3 border border-solid border-gray-200 dark:border-gray-200/20 rounded-lg ${mode === "vertical" && "flex-col"}`}
    >
      <div
        className={`flex gap-3 ${mode === "vertical" ? "flex-row flex-wrap" : "flex-col gap-5 max-h-70 w-40 overflow-y-auto overflow-x-hidden"}`}
      >
        {tagList.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSeletedTagTree(item)}
              className={`
                text-[#777888] hover:text-[#507999] cursor-pointer text-[14px]
              ${selectedTagTree?.id === item.id && "text-[#507999]!"}
            `}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {/* 分类选择 */}
      <div className="flex flex-wrap gap-3 content-start">
        {selectedTagTree &&
          selectedTagTree.children &&
          selectedTagTree.children.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => onTagSelect?.(item.title, 1)}
                className={cn(
                  "h-6 bg-[#ebf2f7] dark:bg-[#1a232b] border border-solid border-[#ebf2f7] dark:border-[#1a232b] rounded-[3px] text-[#507999] pr-1.5 pl-2 py-px cursor-pointer text-[14px] hover:bg-[#e0e9f0] dark:hover:bg-[#161d23]",
                  selectedTags.includes(item.title) &&
                    "bg-[#507999] text-white hover:bg-[#507999] hover:text-white",
                )}
              >
                {item.title}
              </div>
            );
          })}
      </div>
    </div>
  );
}
