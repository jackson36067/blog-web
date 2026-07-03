import { creationSteps } from '@/constants/creation'
import { cn } from '@/lib/utils'

export function CreationStep({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-4 rounded-lg border border-slate-200/80 bg-white px-4 py-4 shadow-sm dark:border-white/10 dark:bg-[#181b20] sm:gap-6">
      {creationSteps.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id

        return (
          <div key={step.id} className="flex items-center">
            {/* 圆形节点 */}
            <div
              className={cn(
                'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-sm font-semibold transition',

                // 完成状态
                isCompleted &&
                  'border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300',

                // 当前步骤
                isActive &&
                  'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20 dark:border-blue-500 dark:bg-blue-500',

                // 未完成
                !isCompleted &&
                  !isActive &&
                  'border-slate-200 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400',
              )}
            >
              {isCompleted ? '✓' : step.id}
            </div>

            {/* 文本 */}
            <span
              className={cn(
                'ml-2 text-sm transition text-slate-800 dark:text-slate-100',
                isActive && 'text-primary font-medium',
                !isCompleted && !isActive && 'text-gray-400 dark:text-gray-400',
              )}
            >
              {step.label}
            </span>

            {/* 横线 */}
            {index < creationSteps.length - 1 && (
              <div
                className={cn(
                  'mx-3 h-px w-12 transition sm:mx-4 sm:w-16',
                  isCompleted
                    ? 'bg-blue-500'
                    : isActive
                    ? 'bg-slate-400'
                    : 'bg-slate-200 dark:bg-white/10',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
