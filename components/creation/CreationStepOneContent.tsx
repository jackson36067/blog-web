"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CreateArticleParams } from "@/types/article";
import MultiTagSelect from "./MultiTagSelect";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import AutoWidthInput from "../AutoWidthInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import ImageUploadPreview from "../ImageUpload";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "标题不能2个字",
  }),
  abstract: z.string().min(1, {
    message: "摘要不能为空",
  }),
  tags: z
    .array(z.string())
    .min(1, {
      message: "至少选择 1 个标签",
    })
    .max(5, {
      message: "最多选择 5 个标签",
    }),
  categoryName: z.string().min(1, {
    message: "文章分类不能为空",
  }),
  visibility: z.enum(["0", "1", "2"]),
  coverage: z.string().optional(),
  publicComment: z.string(),
});

export default function CreationStepOneContent({
  createArticleInfo,
  transmitDataAction,
}: {
  createArticleInfo: CreateArticleParams;
  transmitDataAction: (
    title: string,
    abstract: string,
    tags: string[],
    categoryName: string,
    coverag: string | undefined,
    visibility: 0 | 1 | 2,
    publicComment: string,
  ) => void;
}) {
  const [showCategoryTab, setShowCategoryTab] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: createArticleInfo.title,
      abstract: createArticleInfo.abstract,
      tags: createArticleInfo.tags,
      categoryName: createArticleInfo.categoryName,
      visibility: String(createArticleInfo.visibility) as "0" | "1" | "2",
      coverage: createArticleInfo.coverage,
      publicComment: createArticleInfo.publicComment ? "0" : "1",
    },
  });
  // 后期渲染props
  useEffect(() => {
    form.reset({
      title: createArticleInfo.title,
      abstract: createArticleInfo.abstract,
      tags: createArticleInfo.tags,
      categoryName: createArticleInfo.categoryName,
      visibility: String(createArticleInfo.visibility) as "0" | "1" | "2",
      coverage: createArticleInfo.coverage,
      publicComment: createArticleInfo.publicComment ? "0" : "1",
    });
  }, [createArticleInfo, form]);

  const submit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    transmitDataAction(
      values.title,
      values.abstract,
      values.tags,
      values.categoryName,
      values.coverage,
      Number(values.visibility) as 0 | 1 | 2,
      values.publicComment,
    );
  });
  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#181b20]">
      <Form {...form}>
        <form onSubmit={submit} className="space-y-7">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-center">
                <FormLabel className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <p>博文标题</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入博文标题"
                    {...field}
                    className="h-10 max-w-xl rounded-lg border-slate-200 bg-slate-50/80 focus-visible:border-blue-500 focus-visible:ring-blue-500/15 dark:border-white/10 dark:bg-white/5"
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-center">
                <FormLabel className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <p>文章标签</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap items-center gap-2">
                    <MultiTagSelect
                      selected={field.value}
                      onChange={field.onChange}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      {field.value.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex cursor-pointer items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[12px] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300"
                          >
                            <span>{item}</span>
                            <Icon
                              icon="iwwa:delete"
                              size={14}
                              hanldeOnClick={() => {
                                field.onChange(
                                  field.value.filter((tag) => tag !== item),
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-start">
                <div className="contents">
                  <FormLabel className="flex items-center gap-1 pt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <p>添加封面</p>
                    <FormLabelHoverContent hoverTitle="可不填写" />
                  </FormLabel>
                  <FormControl>
                    <ImageUploadPreview
                      handleFileChangeAction={(coverage) =>
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-center">
                <FormLabel className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <p>公开评论</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    className="flex flex-wrap gap-4"
                    onValueChange={(value) => field.onChange(value)}
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-start">
                <div className="contents">
                  <FormLabel className="flex items-center gap-1 pt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <p>博文摘要</p>
                    <FormLabelHoverContent />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请输入博文摘要"
                      {...field}
                      className="min-h-28 rounded-lg border-slate-200 bg-slate-50/80 focus-visible:border-blue-500 focus-visible:ring-blue-500/15 dark:border-white/10 dark:bg-white/5"
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-center">
                <FormLabel className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <p>分类专栏</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap items-center gap-2">
                    {(showCategoryTab || field.value) && (
                      <AutoWidthInput
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        initialWidth={40}
                        onClear={() => setShowCategoryTab(false)}
                      />
                    )}
                    <div
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
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
              <FormItem className="grid gap-2 sm:grid-cols-[128px_1fr] sm:items-center">
                <FormLabel className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <p>可见范围</p>
                  <FormLabelHoverContent />
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    className="flex flex-wrap gap-4"
                    onValueChange={(value) => field.onChange(value)}
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
          <div className="flex items-center justify-end border-t border-slate-100 pt-5 dark:border-white/10">
            <button
              className="mr-4 cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
              type="submit"
            >
              下一步
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function FormLabelHoverContent({
  hoverTitle = "必须填写",
}: {
  hoverTitle?: string;
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
  );
}
