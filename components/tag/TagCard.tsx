"use client";
import { GetArticleTagListAPI } from "@/api/tag";
import { ArticleTagResponse } from "@/types/tag";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon";
import { cn } from "@/lib/utils";

interface TagCardProps {
  selectedTags: string[];
  changeSelectedTags: (tag: string) => void;
}

export default function TagCard({
  selectedTags,
  changeSelectedTags,
}: TagCardProps) {
  const [allTags, setAllTags] = useState<ArticleTagResponse[]>([]);

  useEffect(() => {
    const getArticleTagList = async () => {
      const res = await GetArticleTagListAPI();
      setAllTags(res.data);
    };
    getArticleTagList();
  }, []);

  const isAllSelected =
    selectedTags.length === 0 ||
    (selectedTags.length === 1 && selectedTags[0] === "");

  return (
    <nav className="flex flex-col w-full space-y-1">
      <TagItem
        title="全部内容"
        icon="lucide:layout-grid"
        isActive={isAllSelected}
        onClick={() => changeSelectedTags("")}
      />
      <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
        热门话题
      </div>
      <div className="flex flex-col space-y-1 max-h-[68vh] overflow-y-auto">
        {allTags.map((tag) => (
          <TagItem
            key={tag.id}
            title={tag.title}
            icon="lucide:hash"
            isActive={selectedTags.includes(tag.title)}
            onClick={() => changeSelectedTags(tag.title)}
            isHot={tag.browseCount > 10000}
          />
        ))}
      </div>
    </nav>
  );
}

function TagItem({
  title,
  icon,
  isActive,
  onClick,
  isHot,
}: {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  isHot?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-xl transition-colors duration-300",
        isActive
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-primary rounded-xl z-0"
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex items-center min-w-0">
        <div
          className={cn(
            "mr-3 transition-transform",
            isActive
              ? "rotate-12"
              : "text-muted-foreground/40 group-hover:text-primary",
          )}
        >
          <Icon icon={icon} size={16} />
        </div>
        <span
          className={cn("truncate font-medium", isActive ? "font-bold" : "")}
        >
          {title}
        </span>
      </div>
      {isHot && (
        <div className="relative z-10 ml-2">
          <Icon
            icon="noto:fire"
            size={14}
            className={cn(!isActive && "animate-pulse")}
          />
        </div>
      )}
    </motion.button>
  );
}
