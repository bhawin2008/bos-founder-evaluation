export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  joinDate: string;
  status: "active" | "inactive";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  category: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Flag {
  id: string;
  memberId: string;
  type: "positive" | "negative" | "neutral";
  category: string;
  note: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface AutoRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

export type ViewType =
  | "dashboard"
  | "members"
  | "tasks"
  | "roles"
  | "reports"
  | "insights"
  | "notes"
  | "compare"
  | "manual"
  | "flagrules"
  | "autorules"
  | "config";

export const defaultCategories = [
  { id: "cat_people", name: "People" },
  { id: "cat_sop", name: "SOP" },
  { id: "cat_emotion", name: "Emotion" },
  { id: "cat_skill", name: "Skill" },
  { id: "cat_domain", name: "Domain" },
  { id: "cat_management", name: "Management" },
  { id: "cat_other", name: "Other" },
];
