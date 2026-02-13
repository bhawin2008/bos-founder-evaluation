"use client";

import { ViewName } from "../_data/types";

interface SidebarProps {
  activeView: ViewName;
  onSwitchView: (view: ViewName) => void;
}

const navItems: { view: ViewName; icon: string; label: string }[] = [
  { view: "dashboard", icon: "\u25A0", label: "Dashboard" },
  { view: "members", icon: "\u25CF", label: "Members" },
  { view: "tasks", icon: "\u25B6", label: "Tasks" },
  { view: "roles", icon: "\u2605", label: "Roles" },
  { view: "analytics", icon: "\u25B2", label: "Analytics" },
];

export default function Sidebar({ activeView, onSwitchView }: SidebarProps) {
  return (
    <aside className="w-60 min-w-[240px] bg-[#0e0e16] border-r border-[#2a2a3a] p-6 flex flex-col">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-extrabold text-[#f0f0f5]">
          Boss
          <span className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
            Team
          </span>
        </h1>
        <p className="text-xs text-[#8888a0] mt-0.5">Team Management</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onSwitchView(item.view)}
            className={`flex items-center gap-2.5 px-3.5 py-3 border-none text-[0.95rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 text-left w-full ${
              activeView === item.view
                ? "bg-[rgba(74,108,247,0.12)] text-[#4a6cf7]"
                : "bg-transparent text-[#8888a0] hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
            }`}
          >
            <span className="text-[0.8rem]">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
