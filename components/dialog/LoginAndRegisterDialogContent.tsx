'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginTypeTabs from '../login/LoginTypeTabs'
import RegisterForm from '../register/RegisterForm'

interface LoginAndRegisterDialogContentProps {
  // 关闭弹窗函数
  onCloseDialog: () => void
}

export default function LoginAndRegisterDialogContent(
  props: LoginAndRegisterDialogContentProps,
) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="p-6">
      {/* 内容部分 */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <LoginTypeTabs onCloseDialog={props.onCloseDialog} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full text-center text-gray-500"
            >
              <RegisterForm toLoginTab={() => setIsLogin(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部三角形切换按钮 */}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="absolute bottom-0 right-0 w-22 h-22 rounded-br-[10px] bg-[#0a0a0a] dark:bg-white text-white dark:text-[#0a0a0a] font-semibold
                   flex items-end justify-end pb-3 pr-4 text-sm shadow-md hover:bg-primary/90 transition-all duration-300"
        style={{
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
        }}
      >
        {isLogin ? '注册' : '登录'}
      </button>
    </div>
  )
}
