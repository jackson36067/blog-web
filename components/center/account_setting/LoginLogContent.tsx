'use client'

import { GetUserLoginLogAPI } from '@/api/user'
import Pagination from '@/components/Pagination'
import { UserLoginLogResponse } from '@/types/user'
import { useEffect, useState } from 'react'

export default function LoginLogContent() {
  const [loginLogs, setLoginLogs] = useState<UserLoginLogResponse[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 5
  const [totalPages, setTotalPages] = useState(0)
  // 分页获取用户登录日志信息
  useEffect(() => {
    const getUserLoginLogs = async () => {
      const res = await GetUserLoginLogAPI(page, pageSize)
      setLoginLogs(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getUserLoginLogs()
  }, [page])
  return (
    <div>
      <p className="mb-4 text-[14px] text-[#4d4d4d] dark:text-[#cfcfcf]">
        若发现异常登录, 请尽快修改密码
      </p>
      <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto text-[14px]">
        {loginLogs.length > 0 ? (
          loginLogs.map(item => {
            return (
              <li
                key={item.id}
                className="flex justify-between even:bg-[#f4f4f4] px-2 py-1 dark:even:bg-[#2c2c2c]"
              >
                <p>{item.createdAt}</p>
                <p>
                  {item.addr}({item.ip})
                </p>
              </li>
            )
          })
        ) : (
          <div>暂无登录记录</div>
        )}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
