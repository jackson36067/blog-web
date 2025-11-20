'use client'

import { SendEmailCodeAPI, updateUserFieldAPI } from '@/api/user'
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
import z, { email } from 'zod'

const formSchema = z.object({
  email: z.string().nonempty().email('请输入有效的邮箱地址'),
  code: z.string().length(6, '验证码为6位字符'),
})

export default function UpdateEmailDialogContent({
  closeDialogAction,
}: {
  closeDialogAction: () => void
}) {
  const { userInfo, setUserInfo } = useUserStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      code: '',
    },
  })

  const handleGetEmailCode = async () => {
    const email = form.getValues('email')
    if (!email) {
      form.setError('email', { message: '请先输入邮箱地址' })
      return
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailReg.test(email)) {
      form.setError('email', { message: '邮箱格式不合法' })
      return
    }
    await SendEmailCodeAPI(email)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUserFieldAPI(userInfo.userId, [
      { field: 'email', value: values.email },
      { field: 'emailCode', value: values.code },
    ])
    toast.info('更改邮箱成功')
    closeDialogAction()
    setUserInfo({ ...userInfo, email: values.email })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="请输入新的邮箱地址"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>验证码</FormLabel>
                <FormControl>
                  <div className="flex w-full items-center gap-2">
                    <Input placeholder="请输入邮箱验证码" {...field} />
                    <Button
                      variant="outline"
                      onClick={() => handleGetEmailCode()}
                    >
                      获取验证码
                    </Button>
                  </div>
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
