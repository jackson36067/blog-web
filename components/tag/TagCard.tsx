"use client";
import { GetArticleTagListAPI } from "@/api/tag";
import { ArticleTagResponse } from "@/types/tag";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

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
        depth={0}
      />
      <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
        热门话题
      </div>
      <div className="flex flex-col space-y-1 max-h-[68vh] overflow-y-auto px-1">
        {allTags.map((tag) => (
          <RecursiveTag
            key={tag.id}
            tag={tag}
            depth={0}
            selectedTags={selectedTags}
            changeSelectedTags={changeSelectedTags}
          />
        ))}
      </div>
    </nav>
  );
}

// 递归渲染组件
function RecursiveTag({
  tag,
  depth,
  selectedTags,
  changeSelectedTags,
}: {
  tag: ArticleTagResponse;
  depth: number;
  selectedTags: string[];
  changeSelectedTags: (tag: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = tag.children && tag.children.length > 0;
  const isActive = selectedTags.includes(tag.title);

  return (
    <div className="flex flex-col">
      <TagItem
        title={tag.title}
        icon={
          hasChildren
            ? isOpen
              ? "lucide:folder-open"
              : "lucide:folder"
            : "lucide:hash"
        }
        isActive={isActive}
        onClick={() => changeSelectedTags(tag.title)}
        isHot={tag.browseCount > 800}
        depth={depth}
        hasChildren={hasChildren}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      {hasChildren && isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col space-y-1 mt-1"
        >
          {tag.children?.map((child) => (
            <RecursiveTag
              key={child.id}
              tag={child}
              depth={depth + 1}
              selectedTags={selectedTags}
              changeSelectedTags={changeSelectedTags}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function TagItem({
  title,
  icon,
  isActive,
  onClick,
  isHot,
  depth = 0,
  hasChildren,
  isOpen,
  onToggle,
}: {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  isHot?: boolean;
  depth?: number;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex items-center justify-between w-full px-3 py-2 text-sm rounded-xl transition-all duration-200",
        isActive
          ? "text-primary-foreground shadow-sm" // 选中时的文字颜色
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
      style={{
        marginLeft: `${depth * 12}px`,
        width: `calc(100% - ${depth * 12}px)`,
      }}
      onClick={onClick}
    >
      {/* 关键修改：移除 layoutId，让每个标签独立拥有背景 */}
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

      <div className="relative z-10 flex items-center min-w-0 flex-1">
        {hasChildren && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
            className={cn(
              "mr-1 p-1 rounded-md transition-colors",
              isActive ? "hover:bg-white/20" : "hover:bg-black/10",
            )}
          >
            <ChevronRight
              className={cn(
                "w-3 h-3 transition-transform",
                isOpen && "rotate-90",
                isActive ? "text-primary-foreground" : "text-muted-foreground",
              )}
            />
          </div>
        )}

        <div
          className={cn(
            "mr-2 transition-transform shrink-0",
            isActive
              ? "rotate-12 text-primary-foreground"
              : "text-muted-foreground/40 group-hover:text-primary",
          )}
        >
          <Icon icon={icon} size={14} />
        </div>

        <span
          className={cn("truncate font-medium", isActive ? "font-bold" : "")}
        >
          {title}
        </span>
      </div>

      {isHot && (
        <div className="relative z-10 ml-2 shrink-0">
          <Icon
            icon="noto:fire"
            size={12}
            className={cn(!isActive && "animate-pulse")}
          />
        </div>
      )}
    </motion.button>
  );
}
