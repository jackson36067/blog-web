import { GetArticleTagListAPI } from "@/api/tag";
import { cn } from "@/lib/utils";
import { ArticleTagResponse } from "@/types/tag";
import { useEffect, useState } from "react";

interface Props {
  selectedTags: string[];
  onTagSelect?: (tag: string, type?: number) => void;
  mode?: string;
  searchColumn?: (value: string) => void;
}

export default function InterestSelector({
  onTagSelect,
  selectedTags,
  mode = "vertical",
}: Props) {
  const [tagList, setTagList] = useState<ArticleTagResponse[]>([]);
  const [selectedTagTree, setSeletedTagTree] =
    useState<ArticleTagResponse | null>(null);
  const isVerticalMode = mode === "vertical";
  const isFlatMode = mode === "flat";
  const flatTags = tagList.flatMap((tag) => [tag, ...(tag.children ?? [])]);

  useEffect(() => {
    const getTagList = async () => {
      const res = await GetArticleTagListAPI();
      setTagList(res.data);
      setSeletedTagTree(res.data[0]);
    };
    getTagList();
  }, []);

  if (isFlatMode) {
    return (
      <div className="w-full rounded-lg border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-[#181b20]">
        <div className="grid max-h-80 grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-3 overflow-y-auto pr-1">
          {flatTags.map((item) => {
            const isSelected = selectedTags.includes(item.title);

            return (
              <button
                type="button"
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onTagSelect?.(item.title, 1);
                }}
                className={cn(
                  "flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm leading-5 transition-all",
                  "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600",
                  "dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/20 dark:hover:bg-blue-400/10 dark:hover:text-blue-300",
                  isSelected &&
                    "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:bg-blue-500",
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full gap-5 rounded-lg border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-[#181b20]",
        isVerticalMode ? "flex-col" : "min-h-72",
      )}
    >
      <div
        className={cn(
          isVerticalMode
            ? "flex flex-wrap gap-2"
            : "flex max-h-72 w-40 shrink-0 flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2",
        )}
      >
        {tagList.map((item) => {
          const isActive = selectedTagTree?.id === item.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => setSeletedTagTree(item)}
              className={cn(
                "cursor-pointer rounded-md border px-3 py-2 text-center text-sm text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:border-blue-400/20 dark:hover:bg-blue-400/10 dark:hover:text-blue-300",
                isVerticalMode ? "min-w-22" : "w-full",
                isActive
                  ? "border-blue-200 bg-blue-50 font-medium text-blue-600 shadow-sm dark:border-blue-400/30 dark:bg-blue-400/15 dark:text-blue-300"
                  : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5",
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "grid flex-1 content-start gap-3",
          isVerticalMode
            ? "grid-cols-[repeat(auto-fill,minmax(96px,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(104px,1fr))]",
        )}
      >
        {selectedTagTree?.children?.map((item) => {
          const isSelected = selectedTags.includes(item.title);

          return (
            <button
              type="button"
              key={item.id}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagSelect?.(item.title, 1);
              }}
              className={cn(
                "flex min-h-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm leading-5 text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/20 dark:hover:bg-blue-400/10 dark:hover:text-blue-300",
                isSelected &&
                  "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:bg-blue-500",
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
