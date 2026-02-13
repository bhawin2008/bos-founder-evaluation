// ==================== Core Data Models ====================

export interface Role {
  id: string;
  name: string;
  description: string;
  color: RoleColor;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: MemberStatus;
  createdAt: string;
  cultureScore?: number;
  gorScore?: GORScore;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  completedAt: string | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Signal {
  id: string;
  name: string;
  description: string;
  category: SignalCategory;
  weight: number;
  threshold: number;
  enabled: boolean;
}

export interface AutoRule {
  id: string;
  name: string;
  description: string;
  triggerSignal: string;
  condition: "above" | "below" | "equals";
  conditionValue: number;
  action: string;
  enabled: boolean;
  lastTriggered: string | null;
}

export interface CultureConfig {
  orgName: string;
  gorWeights: GORWeights;
  healthThresholds: HealthThresholds;
  dateRange: DateRange;
  notificationsEnabled: boolean;
  autoRulesEnabled: boolean;
}

// ==================== GOR Framework ====================

export interface GORScore {
  growth: number;
  operations: number;
  resilience: number;
  overall: number;
}

export interface GORWeights {
  growth: number;
  operations: number;
  resilience: number;
}

export interface HealthThresholds {
  excellent: number;
  good: number;
  warning: number;
  critical: number;
}

// ==================== Predictive Models ====================

export interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  category: "risk" | "opportunity" | "trend";
  confidence: number;
  impact: "high" | "medium" | "low";
  membersAffected: string[];
  suggestedAction: string;
  timeframe: string;
}

// ==================== Comparison ====================

export interface ComparisonPeriod {
  label: string;
  startDate: string;
  endDate: string;
}

// ==================== Enums / Union Types ====================

export type RoleColor = "blue" | "green" | "yellow" | "red" | "purple";

export type MemberStatus = "active" | "on-leave" | "inactive";

export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type SignalCategory =
  | "engagement"
  | "productivity"
  | "collaboration"
  | "wellbeing"
  | "leadership";

export type ViewName =
  | "dashboard"
  | "members"
  | "tasks"
  | "roles"
  | "reports"
  | "predictive"
  | "notes"
  | "compare"
  | "manual"
  | "signals"
  | "autorules"
  | "config";

// ==================== App State ====================

export interface AppData {
  members: Member[];
  tasks: Task[];
  roles: Role[];
  notes: Note[];
  signals: Signal[];
  autoRules: AutoRule[];
  config: CultureConfig;
}

// ==================== Date Range ====================

export interface DateRange {
  start: string;
  end: string;
}

// ==================== Modal State ====================

export interface ModalState {
  isOpen: boolean;
  editId: string | null;
}
