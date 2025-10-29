'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import VerifyCodeInput from '../input/VerifyCodeInput'
import { RegisterAPI } from '@/api/user'

interface RegisterFormProps {
  // 切换至登录选项卡函数
  toLoginTab: () => void
}

const formSchema = z
  .object({
    username: z.string().min(3, { message: '用户名至少3个字符' }),
    nickname: z.string().min(2, { message: '姓名至少2个字符' }),
    password: z.string().min(6, { message: '密码至少6个字符' }),
    rePassword: z.string().min(6, { message: '请再次输入密码' }),
    email: z.string().email({ message: '邮箱格式不正确' }),
    emailCode: z.string().length(6, { message: '验证码为6位字符' }),
  })
  .refine(data => data.password === data.rePassword, {
    message: '两次密码输入不一致',
    path: ['rePassword'],
  })

export default function RegisterForm(props: RegisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      nickname: '',
      password: '',
      rePassword: '',
      email: '',
      emailCode: '',
    },
  })

  // 提交注册
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, nickname, password, email, emailCode } = values
    // 调用注册接口
    await RegisterAPI({
      username,
      nickname,
      password,
      email,
      emailCode,
    })
    // 切换到登录选项
    props.toLoginTab()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[360px]"
      >
        {/* 用户名 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 密码 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="请输入密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 确认密码 */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="请再次输入密码"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 邮箱 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 邮箱验证码 + 按钮 */}
        <FormField
          control={form.control}
          name="emailCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱验证码</FormLabel>
              <VerifyCodeInput
                value={field.value}
                onChange={field.onChange}
                // eslint-disable-next-line react-hooks/incompatible-library
                email={form.watch('email')}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 提交按钮 */}
        <Button type="submit" className="w-full">
          注册
        </Button>
      </form>
    </Form>
  )
}
