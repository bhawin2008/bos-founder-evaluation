"use client";

import { ViewName } from "../_data/types";

interface SidebarProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
}

const NAV_ITEMS: { view: ViewName; icon: string; label: string }[] = [
  { view: "dashboard", icon: "\u25C9", label: "Dashboard" },
  { view: "ventures", icon: "\u2699", label: "Ventures" },
  { view: "evaluate", icon: "\u2605", label: "Evaluate" },
  { view: "pipeline", icon: "\u21E2", label: "Pipeline" },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 bg-[#161822] border-r border-[#2a2e3f] p-6 flex flex-col fixed h-screen">
      <div>
        <h1 className="text-xl font-bold text-[#6c5ce7]">Startup Studio</h1>
        <span className="text-xs text-[#6b7185] mt-0.5 block">
          Venture Pipeline Manager
        </span>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.view}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.view);
            }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
              activeView === item.view
                ? "bg-[#6c5ce7] text-white"
                : "text-[#9aa0b2] hover:bg-[#1c1f2e] hover:text-[#e8eaed]"
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
