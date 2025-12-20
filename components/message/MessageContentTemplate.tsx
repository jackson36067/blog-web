"use client";

import { GetOtherMessageAPI } from "@/api/message";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import MessageItem from "./other/MessageItem";
import { OtherMessageItem } from "@/types/message";
import Icon from "../Icon";
import Image from "next/image";

interface MessageContentTemplateProps {
  type: number;
}

export default function MessageContentTemplate({
  type,
}: MessageContentTemplateProps) {
  const [otherMessages, setOtherMessages] = useState<OtherMessageItem[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  useEffect(() => {
    const getOtherMessages = async () => {
      const res = await GetOtherMessageAPI({ page, pageSize, type });
      setOtherMessages(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    };
    getOtherMessages();
  }, [page, type]);
  return totalElements > 0 ? (
    <div>
      <div className="p-3 flex justify-between item-center text-[12px]">
        <p className="text-gray-400">共{totalElements}条内容</p>
        <div className="flex gap-px items-center text-[#277ccc] hover:text-[#277ccc]/80 cursor-pointer">
          <Icon icon="material-symbols-light:delete-outline" />
          <p>清除所有消息</p>
        </div>
      </div>
      <div>
        {otherMessages.map((item) => {
          return <MessageItem key={item.id} message={item} type={type} />;
        })}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-120">
      <Image src="images/null.8e64a63.png" alt="" width={200} height={200} />
    </div>
  );
}
