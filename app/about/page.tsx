'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/about/HeroSection'
import ProjectCard from '@/components/about/ProjectCard'
import Spotlight from '@/components/about/SpotLight'
import { MyProject, projectIntroduction } from '@/constants/about'

export default function AboutPage() {
  // 定义统一的动画效果
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  const handelOpenMyProject = (path?: string) => {
    if (path) {
      window.open(path, '_blank')
    }
  }

  return (
    <div
      className="
        relative min-h-screen overflow-hidden 
        bg-white text-gray-900
        dark:bg-[#0a0a0a] dark:text-white
        transition-colors duration-700 ease-in-out
      "
    >
      {/* 发光背景 */}
      <Spotlight />
      <main className="relative z-10 flex flex-col items-center py-5 px-6">
        {/* 顶部介绍 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <HeroSection />
        </motion.div>

        {/* === 项目简介 === */}
        <section className="mt-16 max-w-5xl w-full">
          <motion.h2
            className="text-2xl font-bold mb-6 text-center text-purple-400"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            项目简介
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {projectIntroduction.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProjectCard
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* === 我的作品 === */}
        <section className="mt-20 max-w-5xl w-full">
          <motion.h2
            className="text-2xl font-bold mb-6 text-center text-purple-400"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            我的作品
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {MyProject.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProjectCard
                  title={item.title}
                  description={item.description}
                  showButton={true}
                  onViewProject={() => handelOpenMyProject(item.projectPath)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  )
}
