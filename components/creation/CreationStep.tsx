import { creationSteps } from '@/constants/creation'
import { cn } from '@/lib/utils'

export function CreationStep({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-2 mb-4">
      {creationSteps.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id

        return (
          <div key={step.id} className="flex items-center">
            {/* 圆形节点 */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 transition font-medium cursor-pointer',

                // 完成状态
                isCompleted &&
                  'bg-[#e6f4ff] dark:bg-[#15325b]/50 border-transparent text-[#1677ff] dark:text-[#1668dc]',

                // 当前步骤
                isActive &&
                  'border-transparent text-white bg-[#1677ff] dark:bg-[#1668dc]',

                // 未完成
                !isCompleted &&
                  !isActive &&
                  'border-transparent text-[#000000A6] dark:text-[#FFFFFFA6] bg-[#0000000A] dark:bg-[#FFFFFF14]',
              )}
            >
              {isCompleted ? '✓' : step.id}
            </div>

            {/* 文本 */}
            <span
              className={cn(
                'ml-2 text-sm transition text-[#1c1c1c] dark:text-white',
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
                  'w-14 h-0.5 mx-4 transition',
                  isCompleted
                    ? 'bg-[#1677ff]'
                    : isActive
                    ? 'bg-[#999999]'
                    : 'bg-gray-300',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
