"use client";

import CreationEditorComponentPage from "@/components/creation/editor/CreationEditorComponent";
import { Suspense } from "react";

export default function CreationEditorPage() {
  return (
    <Suspense>
      <CreationEditorComponentPage></CreationEditorComponentPage>
    </Suspense>
  );
}
