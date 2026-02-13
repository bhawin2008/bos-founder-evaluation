"use client";

import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Shield,
  FileText,
  AlertCircle,
  StickyNote,
  BarChart3,
  BookOpen,
  Flag,
  Zap,
  Settings,
} from "lucide-react";
import type { ViewType } from "../_data/types";

const navItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { view: "members", label: "Members", icon: <Users size={18} /> },
  { view: "tasks", label: "Tasks", icon: <CheckSquare size={18} /> },
  { view: "roles", label: "Roles", icon: <Shield size={18} /> },
  { view: "reports", label: "Reports", icon: <FileText size={18} /> },
  { view: "insights", label: "Predictive Insights", icon: <AlertCircle size={18} /> },
  { view: "notes", label: "My Notes", icon: <StickyNote size={18} /> },
  { view: "compare", label: "Compare", icon: <BarChart3 size={18} /> },
];

const bottomNavItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
  { view: "manual", label: "Manual", icon: <BookOpen size={18} /> },
  { view: "flagrules", label: "Signal Framework", icon: <Flag size={18} /> },
  { view: "autorules", label: "Auto Rules", icon: <Zap size={18} /> },
  { view: "config", label: "Configuration", icon: <Settings size={18} /> },
];

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-lg font-bold">
          GOR<span className="text-yellow-400">Framework</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Culture Intelligence Console</p>
      </div>
      <nav className="flex-1 py-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
              activeView === item.view
                ? "bg-gray-800 text-white border-r-2 border-yellow-400"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <nav className="py-2 border-t border-gray-700">
        {bottomNavItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
              activeView === item.view
                ? "bg-gray-800 text-white border-r-2 border-yellow-400"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
