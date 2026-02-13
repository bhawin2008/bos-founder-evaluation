"use client";

import { useState } from "react";
import { Venture, Stage } from "../_data/types";
import VentureCard from "./VentureCard";

type FilterValue = "all" | Stage;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "idea", label: "Idea" },
  { value: "validating", label: "Validating" },
  { value: "building", label: "Building" },
  { value: "launched", label: "Launched" },
  { value: "paused", label: "Paused" },
];

interface VenturesViewProps {
  ventures: Venture[];
  onVentureClick: (id: string) => void;
}

export default function VenturesView({ ventures, onVentureClick }: VenturesViewProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all" ? ventures : ventures.filter((v) => v.stage === filter);

  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-[#e8eaed]">Ventures</h2>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3.5 py-1.5 rounded-full border text-xs cursor-pointer transition-all ${
                filter === f.value
                  ? "bg-[#6c5ce7] border-[#6c5ce7] text-white"
                  : "border-[#2a2e3f] bg-transparent text-[#9aa0b2] hover:border-[#6c5ce7] hover:text-[#e8eaed]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[#6b7185]">
          <p className="text-sm mt-2">No ventures found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {filtered.map((v) => (
            <VentureCard key={v.id} venture={v} onClick={onVentureClick} />
          ))}
        </div>
      )}
    </section>
  );
}
