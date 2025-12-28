"use client";

import { GetCategoryListAPI } from "@/api/category";
import { CategoryInfo } from "@/types/category";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  changeTitle: (title: string) => void;
}

export default function CategoryCard({
  title,
  changeTitle,
}: CategoryCardProps) {
  const [categoryList, setCategoryList] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await GetCategoryListAPI();
      setCategoryList([{ id: 0, title: "全部" }, ...res.data]);
    };
    getCategoryList();
  }, []);

  return (
    <div
      className={cn(
        "relative p-2 rounded-3xl border border-white/20 dark:border-white/10",
        "bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl shadow-2xl",
        "max-h-[76vh] overflow-y-auto overflow-x-hidden",
      )}
    >
      <div className="flex flex-col gap-1">
        {categoryList.map((item) => {
          const isActive = title === item.title;
          return (
            <button
              key={item.id}
              onClick={() => changeTitle(item.title)}
              className={cn(
                "relative flex items-center px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 group outline-hidden",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              {/* 选中时的背景平滑滑动动画 */}
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-between w-full">
                {item.title}
                <span
                  className={cn(
                    "text-[10px] opacity-50 group-hover:opacity-100 transition-opacity",
                    isActive ? "text-white" : "",
                  )}
                >
                  {isActive ? "●" : "○"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
