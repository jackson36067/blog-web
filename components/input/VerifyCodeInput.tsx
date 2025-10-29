'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form'
import { toast } from 'sonner'
import { SendEmailCodeAPI } from '@/api/user'

interface VerifyCodeInputProps {
  value?: string
  onChange?: (value: string) => void
  email?: string
}

export default function VerifyCodeInput({
  value,
  onChange,
  email,
}: VerifyCodeInputProps) {
  const [countdown, setCountdown] = useState(0)
  const [sending, setSending] = useState(false)

  // 倒计时逻辑
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  // 邮箱格式校验
  const validateEmail = (email: string) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return regex.test(email)
  }

  // 发送验证码逻辑
  const handleSendCode = async () => {
    if (sending || countdown > 0) return

    if (!email || email.trim() === '') {
      toast.info('请先输入邮箱')
      return
    }

    if (!validateEmail(email)) {
      toast.info('邮箱格式不正确')
      return
    }

    setSending(true)
    try {
      // 模拟调用接口
      await SendEmailCodeAPI(email)
      // toast.success('验证码已发送，请查收邮箱')
      setCountdown(60)
    } catch (error) {
      console.error('发送验证码失败:', error)
      toast.error('发送验证码失败，请稍后重试')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex gap-2">
      <FormControl>
        <Input
          placeholder="请输入验证码"
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      </FormControl>
      <Button
        type="button"
        variant="outline"
        onClick={handleSendCode}
        disabled={sending || countdown > 0}
      >
        {countdown > 0 ? `${countdown}s` : sending ? '发送中...' : '发送验证码'}
      </Button>
    </div>
  )
}
