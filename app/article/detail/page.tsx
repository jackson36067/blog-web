"use client";

import ArticleDetailCard from "@/components/article/detail/ArticleDetailCard";
import { Suspense } from "react";

export default function ArticleDetailPage() {
  return (
    <Suspense>
      <div className="py-6">
        <ArticleDetailCard />
      </div>
    </Suspense>
  );
}
