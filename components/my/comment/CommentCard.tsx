'use client'

import { UserCommentResponse } from '@/types/user'

interface CommentCardProps {
  comment: UserCommentResponse
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex flex-col justify-between gap-2 w-full py-4 border-b border-solid border-gray-200 dark:border-gray-200/20 hover:text-[#fc5531] cursor-pointer">
      <p className="w-full line-clamp-2 ">{comment.content}</p>
      <div className="flex gap-4 items-center text-[#555666] text-[14px]">
        <p>{comment.createdAt}</p>
        <p>·</p>
        <p>{comment.title}</p>
      </div>
    </div>
  )
}
