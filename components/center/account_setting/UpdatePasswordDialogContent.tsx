'use client'

import { updateUserFieldAPI } from '@/api/user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useUserStore from '@/stores/UserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z
  .object({
    oldPwd: z.string().min(6, '密码至少6位'),
    newPwd: z.string().min(6, '密码至少6位'),
    confirmPwd: z.string().min(6, '密码至少6位'),
  })
  .refine(data => data.newPwd === data.confirmPwd, {
    message: '两次输入的密码不一致',
    path: ['confirmPwd'],
  })

export default function UpdatePasswordDialogContent({
  closeDialogAction,
}: {
  closeDialogAction: () => void
}) {
  const { userInfo } = useUserStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUserFieldAPI(userInfo.userId, [
      { field: 'oldPwd', value: values.oldPwd },
      { field: 'newPwd', value: values.newPwd },
    ])
    toast.info('修改密码成功')
    closeDialogAction()
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="oldPwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>旧密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入旧密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入新密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请再次输入新密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#fc5531] dark:bg-[#ff755e] border border-solid border-[#fc5531] dark:border-[#ff755e] outline-none text-white px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer hover:bg-[#fc5531] hover:border-[#fc5531] dark:hover:bg-[#ff755e] dark:hover:border-[#ff755e]"
          >
            提交
          </Button>
        </form>
      </Form>
    </div>
  )
}
