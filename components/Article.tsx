"use client";

import { ArticleInfo } from "@/types/article";
import Image from "next/image";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ArticleProps {
  articleInfo: ArticleInfo;
  className?: string;
  showAuthor?: boolean;
  showEdit?: boolean;
}
export default function Article({
  articleInfo,
  className,
  showAuthor,
  showEdit,
}: ArticleProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        `group relative my-3 flex cursor-pointer flex-col gap-4 rounded-lg border border-transparent p-3
     bg-white transition-all duration-200 ease-out
     hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50/80 hover:shadow-sm
     dark:bg-transparent dark:hover:border-white/10 dark:hover:bg-white/5 sm:flex-row
    `,
        className,
      )}
      onClick={() => {
        router.push(`/article/detail?articleId=${articleInfo.id}`);
      }}
    >
      {/* 封面图 */}
      <Image
        src={
          articleInfo.coverage
            ? articleInfo.coverage
            : `https://picsum.photos/120/80?random=${articleInfo.id}`
        }
        alt=""
        width={20}
        height={20}
        className="h-40 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-28 sm:w-40"
        loading="eager"
      />
      {/* 内容 */}
      <div className="flex min-w-0 flex-1 flex-col space-y-2">
        {showAuthor && (
          <div
            className="flex w-fit items-center gap-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            onClick={() => router.push(`/my?username=${articleInfo.username}`)}
          >
            <Image
              src={
                articleInfo.avatar ?? "https://picsum.photos/120/80?random=2"
              }
              alt="avatar"
              width={32}
              height={32}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-white/10"
            />
            <span className="text-sm font-medium">
              {articleInfo.username ?? "未命名用户"}
            </span>
          </div>
        )}

        {/* 标题 */}
        <h3
          className="font-semibold text-lg leading-tight
    text-slate-950 dark:text-slate-50
    transition-colors duration-300
    group-hover:text-blue-600 dark:group-hover:text-blue-400"
        >
          {articleInfo.title}
        </h3>

        {/* 摘要 */}
        <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {articleInfo.abstract}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {articleInfo.tags.map((item, index) => (
            <span
              key={index}
              className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5
           text-xs text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300
           transition-all duration-300
           group-hover:border-blue-200 group-hover:bg-blue-100 dark:group-hover:bg-blue-400/15"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* 底部所有统计信息 */}
        <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
          <div className="flex items-center gap-1">
            <Icon icon="iconoir:clock" size={14} />
            <span>{articleInfo.createdAt}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="tdesign:browse" size={14} />
            <span>{articleInfo.browseCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="iconamoon:like-thin" size={14} />
            <span>{articleInfo.likeCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="material-symbols-light:comment-outline" size={14} />
            <span>{articleInfo.commentCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="material-symbols:star" size={14} />
            <span>{articleInfo.collectCount}</span>
          </div>
        </div>
      </div>
      {showEdit && (
        <div
          className="opacity-0 group-hover:opacity-100 absolute right-4 bottom-2 text-[12px] text-gray-500 dark:text-gray-400"
          onClick={(e) => {
            // 防止冒泡进入文章详情页
            e.stopPropagation();
            window.open(`/creation/editor?id=${articleInfo.id}`, "_blank");
          }}
        >
          编辑
        </div>
      )}
    </div>
  );
}
