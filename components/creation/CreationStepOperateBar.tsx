'use client'

export default function CreationStepOperateBar({
  currentStep,
  changeStepAction,
  handlePublishArticleAction,
  showDraftButton,
}: {
  currentStep: number
  changeStepAction: (step: number) => void
  handlePublishArticleAction: (status: number) => void
  showDraftButton: boolean
}) {
  return (
    <div className="fixed bottom-0 left-0 z-40 flex w-full justify-center border-t border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#181b20]/90">
      <div className="flex w-full max-w-5xl justify-end">
      <div className="flex gap-4 items-center">
        <button
          className="mr-2 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          onClick={() => changeStepAction(currentStep - 1)}
        >
          上一步
        </button>
        {showDraftButton && (
          <button
            className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            onClick={() => handlePublishArticleAction(1)}
          >
            保存草稿
          </button>
        )}
        {/* TODO: 引入审核模块后,该传入值改为2 */}
        <button
          className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          onClick={() => handlePublishArticleAction(3)}
        >
          发布博文
        </button>
      </div>
      </div>
    </div>
  )
}
