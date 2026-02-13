import type { Role, RoleColor, MemberStatus, TaskStatus, TaskPriority } from "../_data/types";

// ==================== Helpers ====================

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function formatStatus(status: string): string {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const date = new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2])
  );
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function getRoleColor(role: Role | undefined): RoleColor {
  return role ? role.color : "blue";
}

// ==================== Color Maps ====================

export const avatarColorMap: Record<RoleColor, string> = {
  blue: "bg-[rgba(74,108,247,0.3)] text-[#4a6cf7]",
  green: "bg-[rgba(34,197,94,0.3)] text-[#22c55e]",
  yellow: "bg-[rgba(234,179,8,0.3)] text-[#eab308]",
  red: "bg-[rgba(239,68,68,0.3)] text-[#ef4444]",
  purple: "bg-[rgba(168,85,247,0.3)] text-[#a855f7]",
};

export const roleBadgeColorMap: Record<RoleColor, string> = {
  blue: "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  green: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  yellow: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  red: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  purple: "bg-[rgba(168,85,247,0.15)] text-[#a855f7]",
};

export const statusBadgeMap: Record<MemberStatus | TaskStatus, string> = {
  active: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  "on-leave": "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  inactive: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  pending: "bg-[rgba(136,136,160,0.15)] text-[#8888a0]",
  "in-progress": "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  completed: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
};

export const priorityBadgeMap: Record<TaskPriority, string> = {
  low: "bg-[rgba(136,136,160,0.15)] text-[#8888a0]",
  medium: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  high: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
};
