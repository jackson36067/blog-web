'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { NewFavoriteAPI, UpdateFavoriteInfoAPI } from '@/api/favorite'
import { toast } from 'sonner'

interface NewFavoriteDialogContentProps {
  closeNewFavoriteDialog: () => void
  title?: string
  abstarct?: string
  isDefault?: boolean
  operateType: string
  favoriteId?: number
}

const formSchema = z.object({
  title: z.string().min(1, { message: '请输入收藏夹名称' }),
  description: z.string().optional(),
  isDefault: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export default function NewFavoriteDialogContent({
  closeNewFavoriteDialog,
  title,
  abstarct,
  isDefault,
  operateType,
  favoriteId,
}: NewFavoriteDialogContentProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || '',
      description: abstarct || '',
      isDefault: isDefault || false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (operateType === 'add') {
      await NewFavoriteAPI({
        title: values.title,
        abstract: values.description,
        isDefault: values.isDefault,
      })
    } else {
      if (isDefault && !values.isDefault) {
        toast.info('一定要有一个默认收藏夹')
        form.setValue('isDefault', true)
        return
      }
      await UpdateFavoriteInfoAPI(favoriteId!, {
        title: values.title,
        abstract: values.description,
        isDefault: values.isDefault,
      })
    }
    closeNewFavoriteDialog()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 bg-white dark:bg-neutral-900"
      >
        {/* 收藏夹标题 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收藏夹名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入收藏夹名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 收藏夹描述 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收藏夹描述</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入收藏夹描述（可选）"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>描述内容可留空</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 是否设为默认 */}
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>设为默认收藏夹</FormLabel>
                <FormDescription>创建收藏时将自动使用此收藏夹</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 提交按钮 */}
        <Button type="submit" className="w-full">
          {operateType === 'add' ? '保存收藏夹' : '保存更新'}
        </Button>
      </form>
    </Form>
  )
}
