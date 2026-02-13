export interface Role {
  id: string;
  name: string;
  description: string;
  color: "blue" | "green" | "yellow" | "red" | "purple";
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "active" | "on-leave" | "inactive";
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  completedAt: string | null;
}

export interface AppData {
  members: Member[];
  tasks: Task[];
  roles: Role[];
}

export type ViewName = "dashboard" | "members" | "tasks" | "roles" | "analytics";

export interface MonthlyStats {
  total: number;
  completed: number;
  rate: number;
}

export interface TrendInfo {
  label: string;
  value: string;
  direction: "up" | "down" | "neutral";
}

export interface BarDataset {
  label: string;
  values: number[];
}

export interface MemberPerformanceRow {
  member: Member;
  role: Role | undefined;
  decTasks: number;
  decCompleted: number;
  janTasks: number;
  janCompleted: number;
  diff: number;
}

export interface WeeklyData {
  weeks: number[];
  monthLabel: string;
}
