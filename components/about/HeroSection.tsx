'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TypingAnimation } from '@/components/ui/typing-animation'
import Glow from './glow'
import { TextAnimate } from '../ui/text-animate'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  return (
    <div className="text-center max-w-4xl">
      <Glow
        className="inline-block p-4 rounded-full"
        glowColor="cyan"
        intensity={0.8}
      >
        <motion.img
          src="https://avatars.githubusercontent.com/u/000000?v=4"
          alt="avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-white/20 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </Glow>
      <div className="mt-6 text-4xl sm:text-5xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        <TypingAnimation>你好，我是 Jackson 👋</TypingAnimation>
      </div>
      <div className="mt-4 text-gray-400 text-[14px] text-center">
        <TextAnimate
          className="whitespace-normal wrap-break-word leading-relaxed"
          duration={1.5}
        >
          我是一名全栈开发者，开发这个网站的初衷是希望通过它展示自己的项目与技术积累，
          同时打造一个属于自己的学习与分享空间。在这里，我可以记录开发过程中的思考与成长，
          也能与更多开发者进行交流和启发。
        </TextAnimate>
      </div>

      <motion.div
        className="mt-6 flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={() => {
            router.push('/home')
          }}
        >
          进入项目
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-cyan-400 text-cyan-400"
        >
          联系我
        </Button>
      </motion.div>
    </div>
  )
}
