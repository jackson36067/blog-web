"use client";

import Image from "next/image";
import { ShineBorder } from "../ui/shine-border";
import Icon from "../Icon";
import useUserStore from "@/stores/UserStore";
import { useRouter } from "next/navigation";
import useSelectSessionStore from "@/stores/SelectSessionStore";

interface AvatarHoverCardContentProps {
  userInfo: {
    avatar: string;
    username: string;
    codeAge: number;
    fans: number;
    following: number;
    articleLikes: number;
  };
}

export default function AvatarHoverCardContent({
  userInfo,
}: AvatarHoverCardContentProps) {
  const { clearUserInfo } = useUserStore();
  const router = useRouter();
  const { clearSelectSession } = useSelectSessionStore();

  const handleExitLogin = () => {
    // 清除本地存储的用户信息
    clearUserInfo();
    clearSelectSession();
    router.push("/home");
  };

  return (
    <div className="flex flex-col gap-1.5 cursor-pointer">
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        className="rounded-[10px]"
      />
      <div className="flex gap-3 items-start">
        <Image
          src={userInfo.avatar || "https://picsum.photos/120/80?random=1"}
          className="w-12 h-12 rounded-full"
          alt=""
          width={12}
          height={12}
        />
        <div className="flex flex-col justify-between items-start gap-1">
          <p className="truncate w-[180px]">{userInfo.username}</p>
          <div className="px-4 py-px rounded-[5px] bg-gray-400/20 text-[12px] text-gray-400">
            码龄{userInfo.codeAge}年
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-[5px] py-5 border-b-gray-200 border-solid border-b">
        <div className="flex flex-col justify-center items-center gap-0.5">
          <p className="font-bold">{userInfo.fans ? userInfo.fans : 0}</p>
          <p className="text-[12px] text-gray-400">粉丝</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-0.5">
          <p className="font-bold">
            {userInfo.following ? userInfo.following : 0}
          </p>
          <p className="text-[12px] text-gray-400">关注</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-0.5">
          <p className="font-bold">
            {userInfo.articleLikes ? userInfo.articleLikes : 0}
          </p>
          <p className="text-[12px] text-gray-400">获赞</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4 border-b-gray-200 border-solid border-b">
        <div
          className="flex items-center gap-2 text-gray-600 dark:text-white"
          onClick={() => {
            router.push(`/my?username=${userInfo.username}`);
          }}
        >
          <Icon icon="fluent:home-20-regular" className="text-inherit" />
          <p>我的主页</p>
        </div>
        <div
          className="flex items-center gap-2 text-gray-600 dark:text-white"
          onClick={() => {
            router.push(`/center`);
          }}
        >
          <Icon icon="f7:person" className="text-inherit" />
          <p>个人中心</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-white">
          <Icon icon="cuida:lamp-on-outline" className="text-inherit" />
          <p>内容管理</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div
          className="flex items-center gap-2 text-gray-600 dark:text-white"
          onClick={() => handleExitLogin()}
        >
          <Icon icon="fluent:arrow-exit-48-regular" className="text-inherit" />
          <p>退出登录</p>
        </div>
      </div>
    </div>
  );
}
