'use client'

export default function CreationStepOperateBar({
  currentStep,
  changeStepAction,
  handlePublishArticleAction,
}: {
  currentStep: number
  changeStepAction: (step: number) => void
  handlePublishArticleAction: (status: number) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 flex justify-end w-full px-10 py-4 bg-white dark:bg-[#21212a]">
      <div className="flex gap-4 items-center">
        <button
          className="bg-[#fc5531] text-white cursor-pointer px-4 py-2 rounded-xl mr-4"
          onClick={() => changeStepAction(currentStep - 1)}
        >
          上一步
        </button>
        <button
          className="border border-solid border-[#e5e5e5] px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => handlePublishArticleAction(1)}
        >
          保存草稿
        </button>
        {/* TODO: 引入审核模块后,该传入值改为2 */}
        <button
          className="bg-[#fc5531] text-white px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => handlePublishArticleAction(3)}
        >
          发布博文
        </button>
      </div>
    </div>
  )
}
