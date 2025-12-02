'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { CreateArticleParams } from '@/types/article'
import { ArticleTagResponse } from '@/types/tag'
import MultiTagSelect from './MultiTagSelect'
import Icon from '../Icon'
import { useState } from 'react'
import AutoWidthInput from '../AutoWidthInput'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import ImageUploadPreview from '../ImageUpload'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

const formSchema = z.object({
  title: z.string().min(2, {
    message: '标题不能2个字',
  }),
  abstract: z.string().min(1, {
    message: '摘要不能为空',
  }),
  tags: z
    .array(z.string())
    .min(1, {
      message: '至少选择 1 个标签',
    })
    .max(5, {
      message: '最多选择 5 个标签',
    }),
  categoryName: z.string().min(1, {
    message: '文章分类不能为空',
  }),
  visibility: z.enum(['0', '1', '2']),
  coverage: z.string().optional(),
  publicComment: z.string(),
})

export default function CreationStepOneContent({
  createArticleInfo,
  articleTags,
  transmitDataAction,
}: {
  createArticleInfo: CreateArticleParams
  articleTags: ArticleTagResponse[]
  transmitDataAction: (
    title: string,
    abstract: string,
    tags: string[],
    categoryName: string,
    coverag: string | undefined,
    visibility: 0 | 1 | 2,
    publicComment: string,
  ) => void
}) {
  const [showCategoryTab, setShowCategoryTab] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: createArticleInfo.title,
      abstract: createArticleInfo.abstract,
      tags: createArticleInfo.tags,
      categoryName: createArticleInfo.categoryName,
      visibility: String(createArticleInfo.visibility) as '0' | '1' | '2',
      coverage: createArticleInfo.coverage,
      publicComment: createArticleInfo.publicComment ? '0' : '1',
    },
  })
  const submit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    console.log(values)
    transmitDataAction(
      values.title,
      values.abstract,
      values.tags,
      values.categoryName,
      values.coverage,
      Number(values.visibility) as 0 | 1 | 2,
      values.publicComment,
    )
  })
  return (
    <div className="w-200 mx-auto bg-white dark:bg-[#212121] p-4 rounded-lg">
      <Form {...form}>
        <form onSubmit={submit} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  <p>博文标题</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入博文标题"
                    {...field}
                    className="w-84"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  <p>文章标签</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {field.value.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-1 px-2 bg-[#267dcc0d] text-[#006fff] border border-solid border-[#80B7FF] rounded-[3px] text-[12px] cursor-pointer ml-2 first:ml-0 last:mr-2"
                          >
                            <span>{item}</span>
                            <Icon
                              icon="iwwa:delete"
                              size={14}
                              hanldeOnClick={() => {
                                field.onChange(
                                  field.value.filter(tag => tag !== item),
                                )
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <MultiTagSelect
                      options={articleTags}
                      selected={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverage"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <div className="flex items-start gap-2 w-full">
                  <FormLabel className="flex items-center gap-1">
                    <p>添加封面</p>
                    <FormLabelHoverContent hoverTitle="可不填写" />
                  </FormLabel>
                  <FormControl>
                    <ImageUploadPreview
                      handleFileChangeAction={coverage =>
                        field.onChange(coverage)
                      }
                      coverage={field.value}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicComment"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  <p>公开评论</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    className="flex gap-4"
                    onValueChange={value => field.onChange(value)}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="0" id="p1" />
                      <Label htmlFor="p1">公开评论</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="p2" />
                      <Label htmlFor="p2">不可评论</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abstract"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <div className="w-full flex items-start gap-2">
                  <FormLabel className="flex items-center gap-1">
                    <p>博文摘要</p>
                    <FormLabelHoverContent />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请输入博文摘要"
                      {...field}
                      className="flex-1"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  <p>分类专栏</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    {(showCategoryTab || field.value) && (
                      <AutoWidthInput
                        value={field.value}
                        onChange={value => field.onChange(value)}
                        initialWidth={40}
                        onClear={() => setShowCategoryTab(false)}
                      />
                    )}
                    <div
                      className="flex gap-2 items-center px-2 py-1 border border-solid border-[#e8e8e8] dark:border-[#2a2a2a] rounded-lg text-[#555666] text-[12px] cursor-pointer hover:bg-[#f4f8fc] hover:text-[#26a2e2] dark:hover:bg-[#1c1f26] dark:hover:text-[#4cb9ff] dark:text-[#d1d5db]"
                      onClick={() => setShowCategoryTab(true)}
                    >
                      <Icon icon="ri:add-line" size={16} />
                      <p>新建分类专栏</p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  <p>可见范围</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    className="flex gap-4"
                    onValueChange={value => field.onChange(value)}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="0" id="r1" />
                      <Label htmlFor="r1">全部可见</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="r2" />
                      <Label htmlFor="r2">仅粉丝可见</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id="r3" />
                      <Label htmlFor="r3">仅自己可见</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center">
            <button
              className=" bg-[#fc5531] text-white cursor-pointer px-4 py-px rounded-xl mr-4"
              type="submit"
            >
              下一步
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

function FormLabelHoverContent({
  hoverTitle = '必须填写',
}: {
  hoverTitle?: string
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Icon
          icon="akar-icons:question"
          size={16}
          className="text-gray-400 dark:text-gray-100"
        />
      </HoverCardTrigger>
      <HoverCardContent className="flex justify-center items-center py-1! text-[12px] w-30!">
        <p>{hoverTitle}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
