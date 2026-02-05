"use client";

import CategoryComponentPage from "@/components/category/CategoryPageComponent";
import { Suspense } from "react";

export default function CategoryPage() {
  return (
    <Suspense>
      <CategoryComponentPage></CategoryComponentPage>
    </Suspense>
  );
}
