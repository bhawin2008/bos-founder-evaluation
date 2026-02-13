"use client";

import { Calendar } from "lucide-react";
import type { DateRange } from "../_data/types";

interface DateRangeFilterProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangeFilter({
  dateRange,
  onChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-3 bg-[#12121a] border border-[#2a2a3a] rounded-xl px-4 py-2">
      <Calendar size={16} className="text-[#8888a0]" />
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => onChange({ ...dateRange, start: e.target.value })}
        className="bg-transparent border-none text-[#f0f0f5] text-sm outline-none"
      />
      <span className="text-[#8888a0] text-sm">to</span>
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => onChange({ ...dateRange, end: e.target.value })}
        className="bg-transparent border-none text-[#f0f0f5] text-sm outline-none"
      />
    </div>
  );
}
