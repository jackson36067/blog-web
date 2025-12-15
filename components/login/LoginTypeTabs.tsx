'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import VerifyCodeInput from '../input/VerifyCodeInput'
import { LoginAPI } from '@/api/user'
import useUserStore from '@/stores/UserStore'
import { WS } from '@/utils/connectWebSocket'

interface LoginTypeTabsProps {
  // 关闭弹窗函数
  onCloseDialog: () => void
}

const accountSchema = z.object({
  username: z.string().min(1, { message: '请输入用户名' }),
  password: z.string().min(6, { message: '密码至少 6 位' }),
})

const emailSchema = z.object({
  email: z.email({ message: '请输入有效的邮箱地址' }),
  emailCode: z.string().length(6, { message: '验证码为6 位字符' }),
})

export default function LoginTabs(props: LoginTypeTabsProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'email'>('account')
  const { setUserInfo, userInfo } = useUserStore()

  // 用户名密码登录表单
  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // 邮箱登录表单
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      emailCode: '',
    },
  })

  // 提交使用用户名密码登录事件
  const onSubmitAccount = async (values: z.infer<typeof accountSchema>) => {
    // 发送登录请求
    const res = await LoginAPI({
      loginType: 1,
      username: values.username,
      password: values.password,
    })
    // 本地存储用户信息
    setUserInfo(res.data)
    const userId = res.data.userId || userInfo.userId
    // 发送连接WebSocket请求
    WS.connect({
      userId,
      url: 'ws://127.0.0.1:8080/ws?userId=' + userId,
    })
    // 关闭弹窗
    props.onCloseDialog()
  }

  // 提交使用邮箱登录事件
  const onSubmitEmail = async (values: z.infer<typeof emailSchema>) => {
    // 发送登录请求
    const res = await LoginAPI({
      loginType: 2,
      email: values.email,
      emailCode: values.emailCode,
    })
    // 本地存储用户信息
    setUserInfo(res.data)
    const userId = res.data.userId || userInfo.userId
    // 发送连接WebSocket请求
    WS.connect({
      userId,
      url: 'ws://127.0.0.1:8080/ws?userId=' + userId,
    })
    // 关闭弹窗
    props.onCloseDialog()
  }

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('account')}
          className={cn(
            'w-1/2 py-3 text-center text-sm relative transition-all',
            activeTab === 'account'
              ? 'font-semibold text-primary'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
          )}
        >
          用户名密码登录
          {activeTab === 'account' && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 bottom-0 w-full h-0.5 bg-primary"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className={cn(
            'w-1/2 py-3 text-center text-sm relative transition-all',
            activeTab === 'email'
              ? 'font-semibold text-primary'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
          )}
        >
          邮箱登录
          {activeTab === 'email' && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 bottom-0 w-full h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {/* 用户名密码登录 */}
          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 absolute w-full"
            >
              <Form {...accountForm}>
                <form
                  onSubmit={accountForm.handleSubmit(onSubmitAccount)}
                  className="space-y-5"
                >
                  <FormField
                    control={accountForm.control}
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
                    control={accountForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="请输入密码"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    登录
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}

          {/* 邮箱登录 */}
          {activeTab === 'email' && (
            <motion.div
              key="email"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 absolute w-full"
            >
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                  className="space-y-5"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="请输入邮箱地址"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="emailCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱验证码</FormLabel>
                        <VerifyCodeInput
                          value={field.value}
                          onChange={field.onChange}
                          // eslint-disable-next-line react-hooks/incompatible-library
                          email={emailForm.watch('email')}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    登录
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
