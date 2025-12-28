"use client";

import { HomeMenu } from "@/constants/menu";
import NavigationMenu from "./NavigationMenu";
import Operate from "./Operate";
import LovePointer from "../pointer";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface HomeTopBarProps {
  className?: string;
}

export default function HomeTopBar({ className }: HomeTopBarProps) {
  const router = useRouter();
  const path = usePathname();
  if (path == "/") return null;
  return (
    <div
      className={cn(
        "w-full flex items-center bg-white dark:bg-[#212121] py-2.5",
        className,
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center max-w-[1400px] w-[1400px] mx-auto",
        )}
      >
        <h1
          className="group flex items-center gap-1 cursor-pointer select-none active:scale-95 transition-transform duration-200"
          onClick={() => router.push("/")}
        >
          <span className="text-[#212121] dark:text-white font-black text-xl tracking-tighter italic hover:opacity-80 transition-opacity">
            ✨ My<span className="text-[#fc5531]">Blog</span>
          </span>
          <LovePointer />
        </h1>
        <NavigationMenu menu={HomeMenu} />
        <Operate />
      </div>
    </div>
  );
}
