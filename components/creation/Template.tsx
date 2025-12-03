'use client'

import { CreateArticleParams } from '@/types/article'
import { ArticleTagResponse } from '@/types/tag'
import { CreationStep } from './CreationStep'
import CreationStepOneContent from './CreationStepOneContent'
import { useState } from 'react'
import MDPlugins from '../Md'
import CreationStepOperateBar from './CreationStepOperateBar'

export default function CreationTemplate({
  articleInfo,
  articleTags,
  handleUpdateArticleInfoAction,
  handleUpdateArticleContentAction,
  handlePublishArticleAction,
  showDraftButton,
}: {
  articleInfo: CreateArticleParams
  articleTags: ArticleTagResponse[]
  handleUpdateArticleInfoAction: (
    title: string,
    abstract: string,
    tags: string[],
    categoryName: string,
    coverage: string | undefined,
    visibility: 0 | 1 | 2,
    publicComment: boolean,
  ) => void
  handleUpdateArticleContentAction: (conten: string, type: number) => void
  handlePublishArticleAction: (status: number) => void
  showDraftButton: boolean
}) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  return (
    <div className="w-full">
      <CreationStep currentStep={currentStep} />
      {currentStep === 1 && (
        <CreationStepOneContent
          createArticleInfo={articleInfo}
          articleTags={articleTags}
          transmitDataAction={(
            title,
            abstract,
            tags,
            categoryName,
            coverage,
            visibility,
            publicComment,
          ) => {
            handleUpdateArticleInfoAction(
              title,
              abstract,
              tags,
              categoryName,
              coverage,
              visibility,
              publicComment === '0',
            )
            setCurrentStep(prev => prev + 1)
          }}
        />
      )}
      {currentStep === 2 && (
        <div>
          <MDPlugins
            content={articleInfo.content}
            changeContentAction={(content, addType) => {
              handleUpdateArticleContentAction(content, addType)
            }}
          />
          <CreationStepOperateBar
            currentStep={currentStep}
            changeStepAction={setCurrentStep}
            handlePublishArticleAction={handlePublishArticleAction}
            showDraftButton={showDraftButton}
          />
        </div>
      )}
    </div>
  )
}
