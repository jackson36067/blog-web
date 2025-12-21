"use client";

import { OtherMessageItem } from "@/types/message";
import { useEffect, useState } from "react";
import Icon from "../Icon";
import { GetOtherMessageAPI } from "@/api/message";
import FanMessageItem from "./fan/FanMessageItem";
import Image from "next/image";
import Pagination from "../Pagination";

export default function FanMessageTabContent() {
  const [fanMessage, setFanMessage] = useState<OtherMessageItem[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const getFanMessage = async () => {
      const res = await GetOtherMessageAPI({ page, pageSize, type: 4 });
      setFanMessage(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    };
    getFanMessage();
  }, [page]);
  return (
    <div>
      {totalElements > 0 ? (
        <div>
          <div className="p-3 flex justify-between item-center text-[12px]">
            <p className="text-gray-400">共{totalElements}条内容</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-px items-center text-[#277ccc] hover:text-[#277ccc]/80 cursor-pointer border-r border-solid border-r-[#ccccd8] dark:border-r-gray-200/20 pr-3">
                <Icon icon="stash:user-group" />
                <p>粉丝数据</p>
              </div>
              <div className="flex gap-px items-center text-[#277ccc] hover:text-[#277ccc]/80 cursor-pointer">
                <Icon icon="material-symbols-light:delete-outline" />
                <p>清空所有消息</p>
              </div>
            </div>
          </div>
          {fanMessage.map((item) => {
            return (
              <div className="px-3 py-2" key={item.id}>
                <FanMessageItem key={item.id} message={item} />
              </div>
            );
          })}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-120">
          <Image
            src="images/null.8e64a63.png"
            alt=""
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
