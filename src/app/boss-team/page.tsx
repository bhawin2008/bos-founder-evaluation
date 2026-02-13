"use client";

import { useCallback } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardView from "./_components/DashboardView";
import MembersView from "./_components/MembersView";
import TasksView from "./_components/TasksView";
import RolesView from "./_components/RolesView";
import ReportsView from "./_components/ReportsView";
import NotesView from "./_components/NotesView";
import GenericView from "./_components/GenericView";
import { useLocalStorage } from "./_hooks/useLocalStorage";
import type { ViewType, Member, Task, Role, Flag, Note } from "./_data/types";
import { useState } from "react";

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export default function BossTeamPage() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [members, setMembers, membersLoaded] = useLocalStorage<Member[]>("boss_members", []);
  const [tasks, setTasks] = useLocalStorage<Task[]>("boss_tasks", []);
  const [roles, setRoles] = useLocalStorage<Role[]>("boss_roles", []);
  const [flags] = useLocalStorage<Flag[]>("boss_flags", []);
  const [notes, setNotes] = useLocalStorage<Note[]>("boss_notes", []);

  const addMember = useCallback((member: Omit<Member, "id">) => {
    setMembers((prev) => [...prev, { ...member, id: generateId() }]);
  }, [setMembers]);

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, [setMembers]);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    setTasks((prev) => [...prev, { ...task, id: generateId(), createdAt: new Date().toISOString() }]);
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  const addRole = useCallback((role: Omit<Role, "id">) => {
    setRoles((prev) => [...prev, { ...role, id: generateId() }]);
  }, [setRoles]);

  const deleteRole = useCallback((id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  }, [setRoles]);

  const addNote = useCallback((note: Omit<Note, "id" | "createdAt">) => {
    setNotes((prev) => [...prev, { ...note, id: generateId(), createdAt: new Date().toISOString() }]);
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, [setNotes]);

  if (!membersLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView members={members} tasks={tasks} flags={flags} />;
      case "members":
        return <MembersView members={members} onAddMember={addMember} onDeleteMember={deleteMember} />;
      case "tasks":
        return <TasksView tasks={tasks} members={members} onAddTask={addTask} onUpdateTask={updateTask} onDeleteTask={deleteTask} />;
      case "roles":
        return <RolesView roles={roles} onAddRole={addRole} onDeleteRole={deleteRole} />;
      case "reports":
        return <ReportsView members={members} tasks={tasks} flags={flags} />;
      case "notes":
        return <NotesView notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} />;
      case "insights":
        return <GenericView title="Predictive Insights" description="AI-powered predictions about team culture trends, potential conflicts, and growth opportunities." />;
      case "compare":
        return <GenericView title="Compare" description="Compare team performance metrics across different time periods and departments." />;
      case "manual":
        return <GenericView title="Manual" description="Comprehensive guide to the GOR Framework methodology and best practices." />;
      case "flagrules":
        return <GenericView title="Signal Framework" description="Define and manage culture signals that indicate positive or negative team patterns." />;
      case "autorules":
        return <GenericView title="Auto Rules" description="Configure automated rules that trigger actions based on team behavior patterns." />;
      case "config":
        return <GenericView title="Configuration" description="Customize categories, scoring weights, notification preferences, and display settings." />;
      default:
        return <DashboardView members={members} tasks={tasks} flags={flags} />;
    }
  };

  return (
    <div className="flex min-h-screen -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
