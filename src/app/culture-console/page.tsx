"use client";

import { useState, useCallback } from "react";
import type { ViewName, AppData, DateRange } from "./_data/types";
import { getInitialData } from "./_data/sampleData";
import Sidebar from "./_components/Sidebar";
import DateRangeFilter from "./_components/DateRangeFilter";
import DashboardView from "./_components/DashboardView";
import MembersView from "./_components/MembersView";
import TasksView from "./_components/TasksView";
import RolesView from "./_components/RolesView";
import ReportsView from "./_components/ReportsView";
import PredictiveView from "./_components/PredictiveView";
import NotesView from "./_components/NotesView";
import CompareView from "./_components/CompareView";
import ManualView from "./_components/ManualView";
import SignalFrameworkView from "./_components/SignalFrameworkView";
import AutoRulesView from "./_components/AutoRulesView";
import ConfigView from "./_components/ConfigView";

export default function CultureConsolePage() {
  const [activeView, setActiveView] = useState<ViewName>("dashboard");
  const [data, setData] = useState<AppData>(getInitialData);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: "2025-12-01",
    end: "2026-01-31",
  });

  const handleDataChange = useCallback((newData: AppData) => {
    setData(newData);
  }, []);

  function renderView() {
    switch (activeView) {
      case "dashboard":
        return <DashboardView data={data} />;
      case "members":
        return <MembersView data={data} onDataChange={handleDataChange} />;
      case "tasks":
        return <TasksView data={data} onDataChange={handleDataChange} />;
      case "roles":
        return <RolesView data={data} onDataChange={handleDataChange} />;
      case "reports":
        return <ReportsView data={data} />;
      case "predictive":
        return <PredictiveView data={data} />;
      case "notes":
        return <NotesView data={data} onDataChange={handleDataChange} />;
      case "compare":
        return <CompareView data={data} />;
      case "manual":
        return <ManualView />;
      case "signals":
        return (
          <SignalFrameworkView data={data} onDataChange={handleDataChange} />
        );
      case "autorules":
        return <AutoRulesView data={data} onDataChange={handleDataChange} />;
      case "config":
        return <ConfigView data={data} onDataChange={handleDataChange} />;
      default:
        return <DashboardView data={data} />;
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#0a0a0f] text-[#f0f0f5] font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 py-8 px-10 overflow-y-auto max-h-[calc(100vh-64px)]">
        {/* Date Range Filter - show on views that use it */}
        {(activeView === "dashboard" ||
          activeView === "reports" ||
          activeView === "compare") && (
          <div className="flex justify-end mb-4">
            <DateRangeFilter dateRange={dateRange} onChange={setDateRange} />
          </div>
        )}
        {renderView()}
      </main>
    </div>
  );
}
