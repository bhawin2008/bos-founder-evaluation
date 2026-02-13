import { z } from "zod";

export const claritySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum([
    "CAREER",
    "FINANCE",
    "RELATIONSHIP",
    "HEALTH",
    "BUSINESS",
    "EDUCATION",
    "LIFESTYLE",
    "OTHER",
  ]),
  decisionType: z.enum(["ONE_WAY", "TWO_WAY"]),
  deadline: z.string().optional(),
  urgencyNote: z.string().default(""),
  doNothing30Days: z.string().default(""),
  emotionState: z
    .enum(["calm", "fear", "anger", "guilt", "ego", "excitement", "anxiety"])
    .default("calm"),
  reasonsFor: z.array(z.string()).default([]),
  reasonsAgainst: z.array(z.string()).default([]),
});

export const truthSchema = z.object({
  factsKnown: z.string().default(""),
  assumptions: z.string().default(""),
  bestCase: z.string().default(""),
  worstCase: z.string().default(""),
  likelyOutcome: z.string().default(""),
  costMoney: z.number().min(0).max(10).default(0),
  costTime: z.number().min(0).max(10).default(0),
  costEnergy: z.number().min(0).max(10).default(0),
  costReputation: z.number().min(0).max(10).default(0),
  options: z
    .object({
      a: z.string().default(""),
      b: z.string().default(""),
      c: z.string().default(""),
    })
    .default({ a: "", b: "", c: "" }),
});

export const alignmentSchema = z.object({
  valuesTop3: z.array(z.string()).default([]),
  identityMatch: z.string().default(""),
  proudIn1Year: z.enum(["YES", "NO", "UNSURE"]).default("UNSURE"),
  scores: z.object({
    clarityOutcome: z.number().min(0).max(10).default(5),
    reversibility: z.number().min(0).max(10).default(5),
    valueAlignment: z.number().min(0).max(10).default(5),
    peaceImpact: z.number().min(0).max(10).default(5),
    opportunityGain: z.number().min(0).max(10).default(5),
    riskLevel: z.number().min(0).max(10).default(5),
    regretTest: z.number().min(0).max(10).default(5),
  }),
});

export const calmCheckSchema = z.object({
  hungry: z.boolean().default(false),
  tired: z.boolean().default(false),
  angry: z.boolean().default(false),
  lonely: z.boolean().default(false),
});

export const decisionFormSchema = claritySchema
  .merge(truthSchema)
  .merge(alignmentSchema);

export type ClarityData = z.infer<typeof claritySchema>;
export type TruthData = z.infer<typeof truthSchema>;
export type AlignmentData = z.infer<typeof alignmentSchema>;
export type CalmCheckData = z.infer<typeof calmCheckSchema>;
export type DecisionFormData = z.infer<typeof decisionFormSchema>;
