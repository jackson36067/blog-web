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
    if (selected.length >= 7) {
      toast.info("最多选择7个标签");
      setOpen(false);
      return;
    }
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex gap-2 items-center px-2 py-1 border border-solid border-[#e8e8e8] dark:border-[#2a2a2a] rounded-lg text-[#555666] text-[12px] cursor-pointer hover:bg-[#f4f8fc] hover:text-[#26a2e2] dark:hover:bg-[#1c1f26] dark:hover:text-[#4cb9ff] dark:text-[#d1d5db]">
          <Icon icon="ri:add-line" size={16} />
          <p>添加文章标签</p>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-140 px-3">
        <InterestSelector
          onTagSelect={toggleValue}
          selectedTags={selected}
          mode="horizon"
        />
      </PopoverContent>
    </Popover>
  );
}
