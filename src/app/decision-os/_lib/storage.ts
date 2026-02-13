/**
 * localStorage-based mock data store for Decision OS.
 * Replaces Prisma database calls with client-side persistence.
 */

export interface Decision {
  id: string;
  title: string;
  category: string;
  decisionType: string;
  deadline: string | null;
  urgencyNote: string;
  doNothing30Days: string;
  emotionState: string;
  reasonsFor: string;
  reasonsAgainst: string;
  factsKnown: string;
  assumptions: string;
  bestCase: string;
  worstCase: string;
  likelyOutcome: string;
  costMoney: number;
  costTime: number;
  costEnergy: number;
  costReputation: number;
  valuesTop3: string;
  identityMatch: string;
  proudIn1Year: string;
  options: string;
  scores: string;
  weightedScore: number;
  verdict: string;
  confidence: number;
  redFlags: string;
  counselorNotes: string;
  nextSteps: string;
  experimentPlan: string;
  status: string;
  calmCheck: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "decision-os-decisions";

function generateId(): string {
  return `dec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getAll(): Decision[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Decision[];
  } catch {
    return [];
  }
}

function saveAll(decisions: Decision[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
}

export const storage = {
  findMany(options?: {
    where?: Record<string, unknown>;
    orderBy?: { updatedAt?: "asc" | "desc" };
    take?: number;
  }): Decision[] {
    let decisions = getAll();

    // Apply filters
    if (options?.where) {
      const where = options.where;
      decisions = decisions.filter((d) => {
        for (const [key, value] of Object.entries(where)) {
          if (value === undefined || value === null) continue;
          if (
            typeof value === "object" &&
            value !== null &&
            "contains" in (value as Record<string, unknown>)
          ) {
            const contains = (value as { contains: string }).contains;
            if (
              !(d as unknown as Record<string, unknown>)[key]
                ?.toString()
                .toLowerCase()
                .includes(contains.toLowerCase())
            ) {
              return false;
            }
          } else {
            if ((d as unknown as Record<string, unknown>)[key] !== value) return false;
          }
        }
        return true;
      });
    }

    // Apply ordering
    if (options?.orderBy?.updatedAt) {
      const dir = options.orderBy.updatedAt === "asc" ? 1 : -1;
      decisions.sort(
        (a, b) =>
          dir *
          (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
      );
    }

    // Apply limit
    if (options?.take) {
      decisions = decisions.slice(0, options.take);
    }

    return decisions;
  },

  findUnique(id: string): Decision | null {
    const decisions = getAll();
    return decisions.find((d) => d.id === id) || null;
  },

  count(where?: Record<string, unknown>): number {
    if (where) {
      return this.findMany({ where }).length;
    }
    return getAll().length;
  },

  create(data: Omit<Decision, "id" | "createdAt" | "updatedAt">): Decision {
    const decisions = getAll();
    const now = new Date().toISOString();
    const decision: Decision = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    decisions.push(decision);
    saveAll(decisions);
    return decision;
  },

  update(
    id: string,
    data: Partial<Omit<Decision, "id" | "createdAt">>
  ): Decision | null {
    const decisions = getAll();
    const index = decisions.findIndex((d) => d.id === id);
    if (index === -1) return null;
    decisions[index] = {
      ...decisions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveAll(decisions);
    return decisions[index];
  },

  delete(id: string): boolean {
    const decisions = getAll();
    const filtered = decisions.filter((d) => d.id !== id);
    if (filtered.length === decisions.length) return false;
    saveAll(filtered);
    return true;
  },
};
