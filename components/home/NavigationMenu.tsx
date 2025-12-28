"use client";

import { useRouter } from "next/navigation";
import Icon from "../Icon";

export default function NavigationMenu(props: {
  menu: Array<{ icon: string; label: string; link: string }>;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-8">
      {props.menu.map((item, index) => (
        <div
          className="group relative flex items-center gap-1.5 py-1 text-gray-600 dark:text-gray-300 hover:text-[#fc5531] dark:hover:text-[#fc5531] transition-all duration-300 cursor-pointer"
          key={index}
          onClick={() => router.push(item.link)}
        >
          <Icon
            icon={item.icon}
            size="18"
            className="transition-transform group-hover:-translate-y-0.5"
          />
          <p className="text-[14px] font-bold tracking-tight">{item.label}</p>

          {/* 悬停下划线动画 */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fc5531] transition-all duration-300 group-hover:w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
