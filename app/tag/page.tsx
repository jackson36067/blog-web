"use client";

import TagComponentPage from "@/components/tag/TagPageComponent";
import { Suspense } from "react";

export default function TagPage() {
  return (
    <Suspense>
      <TagComponentPage></TagComponentPage>
    </Suspense>
  );
}
