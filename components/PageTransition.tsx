"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Loader2 } from "lucide-react";
import { HTTP_LOADING_EVENT } from "@/utils/http";

type HttpLoadingEvent = CustomEvent<{
  loading: boolean;
  pendingRequests: number;
}>;

export default function PageTransition() {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleLoadingChange = (event: Event) => {
      const { loading } = (event as HttpLoadingEvent).detail;

      if (loading) {
        setShowOverlay(true);
        return;
      }

      setShowOverlay(false);
    };

    window.addEventListener(HTTP_LOADING_EVENT, handleLoadingChange);

    return () => {
      window.removeEventListener(HTTP_LOADING_EVENT, handleLoadingChange);
    };
  }, []);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    const timer = window.setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      window.clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return (
    showOverlay && (
      <div className="pointer-events-none fixed inset-0 z-1030 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </div>
    )
  );
}
