"use client";

import { DeleteMessageAPI, GetOtherMessageAPI } from "@/api/message";
import { useCallback, useEffect, useState } from "react";
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

  const getOtherMessages = useCallback(async () => {
    const res = await GetOtherMessageAPI({ page, pageSize, type });
    setOtherMessages(res.data.data);
    setTotalPages(res.data.totalPages);
    setTotalElements(res.data.totalElements);
  }, [page, pageSize, type]);
  useEffect(() => {
    // eslint-disable-next-line
    getOtherMessages();
  }, [getOtherMessages]);
  // 移除消息
  const handleDeleteMessage = async (ids: number[]) => {
    await DeleteMessageAPI(ids);
    setPage(1);
    getOtherMessages();
  };
  return totalElements > 0 ? (
    <div>
      <div className="p-3 flex justify-between item-center text-[12px]">
        <p className="text-gray-400">共{totalElements}条内容</p>
        <div
          className="flex gap-px items-center text-[#277ccc] hover:text-[#277ccc]/80 cursor-pointer"
          onClick={() =>
            handleDeleteMessage(otherMessages.map((item) => item.id))
          }
        >
          <Icon icon="material-symbols-light:delete-outline" />
          <p>清空所有消息</p>
        </div>
      </div>
      <div>
        {otherMessages.map((item) => {
          return (
            <MessageItem
              key={item.id}
              message={item}
              type={type}
              handleDeleteMessageAction={(ids) => handleDeleteMessage(ids)}
            />
          );
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
