"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Icon from "../Icon";
import { toast } from "sonner";
import InterestSelector from "../center/InterestCategory";

interface MultiSelectProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function MultiTagSelect({
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
      return;
    }

    if (selected.length >= 5) {
      toast.info("最多选择5个标签");
      setOpen(false);
      return;
    }

    onChange([...selected, value]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
        >
          <Icon icon="ri:add-line" size={16} />
          <span>添加文章标签</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-150 rounded-lg border-slate-200 px-3 shadow-lg dark:border-white/10">
        <InterestSelector
          onTagSelect={toggleValue}
          selectedTags={selected}
          mode="flat"
        />
      </PopoverContent>
    </Popover>
  );
}
