"use client";

import MyComponentPage from "@/components/my/MyPageComponent";
import { Suspense } from "react";

export default function MyPage() {
  return (
    <Suspense>
      <MyComponentPage></MyComponentPage>
    </Suspense>
  );
}
