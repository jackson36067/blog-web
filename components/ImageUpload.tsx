'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import Icon from './Icon'

export default function ImageUploadPreview({
  handleFileChangeAction,
  coverage,
}: {
  handleFileChangeAction: (src: string) => void
  coverage: string | undefined
}) {
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(coverage)
  }, [coverage])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    handleFileChangeAction(url)
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-start gap-4 flex-1">
      {/* 上传区域 */}
      <div
        onClick={triggerUpload}
        className="w-32 h-25 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl
                  cursor-pointer
                   hover:bg-gray-50 dark:hover:bg-[#24242c] transition"
      >
        {!preview ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              从本地上传
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="group relative">
            <Image
              src={preview}
              alt=""
              width={8}
              height={8}
              className="w-full h-22 object-cover"
            />
            <Icon
              icon="iwwa:delete"
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-white bg-[#212121] rounded-full"
              size={18}
              hanldeOnClick={() => setPreview('')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
