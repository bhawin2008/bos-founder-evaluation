"use client";

import {
  LayoutDashboard,
  Users,
  ListTodo,
  Shield,
  BarChart3,
  BrainCircuit,
  StickyNote,
  GitCompare,
  BookOpen,
  Radio,
  Zap,
  Settings,
} from "lucide-react";
import type { ViewName } from "../_data/types";

interface SidebarProps {
  activeView: ViewName;
  onViewChange: (view: ViewName) => void;
}

const navItems: { view: ViewName; label: string; icon: React.ElementType }[] = [
  { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { view: "members", label: "Members", icon: Users },
  { view: "tasks", label: "Tasks", icon: ListTodo },
  { view: "roles", label: "Roles", icon: Shield },
  { view: "reports", label: "Reports", icon: BarChart3 },
  { view: "predictive", label: "Predictive Insights", icon: BrainCircuit },
  { view: "notes", label: "Notes", icon: StickyNote },
  { view: "compare", label: "Compare", icon: GitCompare },
  { view: "manual", label: "Manual", icon: BookOpen },
  { view: "signals", label: "Signal Framework", icon: Radio },
  { view: "autorules", label: "Auto Rules", icon: Zap },
  { view: "config", label: "Configuration", icon: Settings },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-60 min-w-[240px] bg-[#0e0e16] border-r border-[#2a2a3a] p-6 flex flex-col">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-extrabold text-[#f0f0f5]">
          Culture
          <span className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
            Console
          </span>
        </h1>
        <p className="text-xs text-[#8888a0] mt-0.5">GOR Framework</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ view, label, icon: Icon }) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`flex items-center gap-2.5 px-3.5 py-3 border-none text-[0.95rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 text-left w-full ${
                isActive
                  ? "bg-[rgba(74,108,247,0.12)] text-[#4a6cf7]"
                  : "bg-transparent text-[#8888a0] hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
