'use client'

import React from 'react'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useTheme } from 'next-themes'
import { UploadFileAPI } from '@/api/user'
import { toast } from 'sonner'

const textToImage: ICommand = {
  name: 'Text To Image',
  keyCommand: 'text2image',
  buttonProps: { 'aria-label': 'Insert title3' },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path
        fill="currentColor"
        d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
      ></path>
    </svg>
  ),
  execute: () => {
    // 触发父组件里的 ref
    const input = document.querySelector('.md-image-input') as HTMLInputElement
    input?.click()
  },
}

const customCommands = commands.getCommands().map(cmd => {
  if (cmd.name === 'image') {
    return textToImage // ← 替换默认的 image
  }
  return cmd
})

export default function MDPlugins({
  content,
  changeContentAction,
}: {
  content: string
  changeContentAction: (content: string, addType: number) => void
}) {
  const { theme } = useTheme()
  // 选择图片
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // 异步上传 OSS
    try {
      const res = await UploadFileAPI(file)
      const remoteUrl = res.data
      const mdText = `![](${remoteUrl})`
      // 替换临时链接为 OSS 链接
      changeContentAction(`\n\n${mdText}\n\n`, 1)
    } catch (err) {
      console.log(err)
      toast.error('图片上传失败')
    }
  }

  return (
    <div className="w-full pb-25">
      <MDEditor
        className="w-full!"
        value={content}
        onChange={val => changeContentAction(val || '', 0)}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        height={700}
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        textareaProps={{
          placeholder: '请输入文章内容',
        }}
        autoFocus={true}
        autoFocusEnd={true}
        commands={customCommands}
      />
      {/* 隐藏的文件选择 */}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden md-image-input"
      />
    </div>
  )
}
