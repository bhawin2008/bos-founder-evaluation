import { describe, it, expect } from "vitest";
import { evaluateDecision, type DecisionInput } from "../lib/evaluate";

function makeInput(overrides: Partial<DecisionInput> = {}): DecisionInput {
  return {
    title: "Test Decision",
    category: "CAREER",
    decisionType: "TWO_WAY",
    emotionState: "calm",
    factsKnown: "Some verified facts here.",
    assumptions: "",
    reasonsFor: ["Good opportunity"],
    reasonsAgainst: ["Some risk"],
    bestCase: "Great outcome",
    worstCase: "Minor loss",
    likelyOutcome: "Moderate success",
    costMoney: 3,
    costTime: 3,
    costEnergy: 3,
    costReputation: 1,
    valuesTop3: ["Growth", "Freedom"],
    identityMatch: "Aligns with who I want to be",
    proudIn1Year: "YES",
    options: { a: "Go for it", b: "Wait 3 months", c: "" },
    scores: {
      clarityOutcome: 7,
      reversibility: 8,
      valueAlignment: 8,
      peaceImpact: 7,
      opportunityGain: 8,
      riskLevel: 3,
      regretTest: 8,
    },
    ...overrides,
  };
}

describe("evaluateDecision", () => {
  describe("weighted score calculation", () => {
    it("computes correct weighted score for balanced input", () => {
      const input = makeInput();
      const result = evaluateDecision(input);
      // costLevel = avg(3, 3, 3, 1) = 2.5
      // weighted = (8*20 + 7*15 + 7*15 + 8*10 + 8*15 + (10-3)*10 + (10-2.5)*10 + 8*5) / 100 * 10
      // = (160 + 105 + 105 + 80 + 120 + 70 + 75 + 40) / 100 * 10
      // = 755 / 100 * 10 = 75.5 => round to 76
      expect(result.weightedScore).toBe(76);
    });

    it("gives low score for poor inputs", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 2,
          reversibility: 2,
          valueAlignment: 2,
          peaceImpact: 2,
          opportunityGain: 2,
          riskLevel: 9,
          regretTest: 2,
        },
        costMoney: 9,
        costTime: 9,
        costEnergy: 9,
        costReputation: 9,
      });
      const result = evaluateDecision(input);
      expect(result.weightedScore).toBeLessThan(30);
    });

    it("gives high score for excellent inputs", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 10,
          reversibility: 10,
          valueAlignment: 10,
          peaceImpact: 10,
          opportunityGain: 10,
          riskLevel: 0,
          regretTest: 10,
        },
        costMoney: 0,
        costTime: 0,
        costEnergy: 0,
        costReputation: 0,
      });
      const result = evaluateDecision(input);
      expect(result.weightedScore).toBe(100);
    });
  });

  describe("cost level", () => {
    it("averages cost dimensions correctly", () => {
      const input = makeInput({
        costMoney: 4,
        costTime: 6,
        costEnergy: 8,
        costReputation: 2,
      });
      const result = evaluateDecision(input);
      expect(result.costLevel).toBe(5); // (4+6+8+2)/4 = 5
    });

    it("handles zero costs", () => {
      const input = makeInput({
        costMoney: 0,
        costTime: 0,
        costEnergy: 0,
        costReputation: 0,
      });
      const result = evaluateDecision(input);
      expect(result.costLevel).toBe(0);
    });
  });

  describe("verdict determination", () => {
    it("returns DO for high score with no major red flags", () => {
      const input = makeInput();
      const result = evaluateDecision(input);
      expect(result.weightedScore).toBeGreaterThanOrEqual(75);
      expect(result.verdict).toBe("DO");
    });

    it("returns DONT for very low score", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 1,
          reversibility: 1,
          valueAlignment: 1,
          peaceImpact: 1,
          opportunityGain: 1,
          riskLevel: 10,
          regretTest: 1,
        },
        costMoney: 10,
        costTime: 10,
        costEnergy: 10,
        costReputation: 10,
      });
      const result = evaluateDecision(input);
      expect(result.verdict).toBe("DONT");
    });

    it("returns TEST for score in 60-74 range", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 6,
          reversibility: 6,
          valueAlignment: 6,
          peaceImpact: 6,
          opportunityGain: 6,
          riskLevel: 4,
          regretTest: 6,
        },
        costMoney: 4,
        costTime: 4,
        costEnergy: 4,
        costReputation: 4,
      });
      const result = evaluateDecision(input);
      expect(result.weightedScore).toBeGreaterThanOrEqual(60);
      expect(result.weightedScore).toBeLessThan(75);
      expect(result.verdict).toBe("TEST");
    });

    it("returns WAIT for score in 45-59 range", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 5,
          reversibility: 5,
          valueAlignment: 5,
          peaceImpact: 5,
          opportunityGain: 5,
          riskLevel: 5,
          regretTest: 5,
        },
        costMoney: 5,
        costTime: 5,
        costEnergy: 5,
        costReputation: 5,
      });
      const result = evaluateDecision(input);
      expect(result.weightedScore).toBeGreaterThanOrEqual(45);
      expect(result.weightedScore).toBeLessThan(60);
      expect(result.verdict).toBe("WAIT");
    });

    it("returns TEST when score >= 75 but has major red flags", () => {
      const input = makeInput({
        decisionType: "ONE_WAY",
        emotionState: "fear",
        proudIn1Year: "YES",
      });
      const result = evaluateDecision(input);
      if (result.weightedScore >= 75) {
        expect(result.verdict).toBe("TEST");
      }
    });
  });

  describe("red flags", () => {
    it("flags ONE_WAY + high emotion", () => {
      const input = makeInput({
        decisionType: "ONE_WAY",
        emotionState: "fear",
      });
      const result = evaluateDecision(input);
      expect(result.redFlags.some((f) => f.includes("One-way decision"))).toBe(
        true
      );
    });

    it("flags assumptions without facts", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "I think it will work out",
      });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("assumptions but no verified"))
      ).toBe(true);
    });

    it("flags proudIn1Year = NO", () => {
      const input = makeInput({ proudIn1Year: "NO" });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("NOT be proud"))
      ).toBe(true);
    });

    it("flags low peace impact", () => {
      const input = makeInput({
        scores: {
          ...makeInput().scores,
          peaceImpact: 2,
        },
      });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("Low peace impact"))
      ).toBe(true);
    });

    it("flags high energy cost", () => {
      const input = makeInput({ costEnergy: 9 });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("high energy cost"))
      ).toBe(true);
    });

    it("does not flag calm emotion on ONE_WAY", () => {
      const input = makeInput({
        decisionType: "ONE_WAY",
        emotionState: "calm",
      });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("One-way decision"))
      ).toBe(false);
    });

    it("does not flag assumptions when facts are present", () => {
      const input = makeInput({
        factsKnown: "I have verified data",
        assumptions: "Some assumptions too",
      });
      const result = evaluateDecision(input);
      expect(
        result.redFlags.some((f) => f.includes("assumptions but no verified"))
      ).toBe(false);
    });
  });

  describe("confidence", () => {
    it("starts at 50 baseline", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "",
        emotionState: "calm",
        decisionType: "TWO_WAY",
        options: { a: "", b: "", c: "" },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBe(50);
    });

    it("adds 10 for facts known", () => {
      const input = makeInput({
        factsKnown: "I have data",
        assumptions: "",
        emotionState: "calm",
        decisionType: "TWO_WAY",
        options: { a: "", b: "", c: "" },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBe(60);
    });

    it("adds 10 for options B/C filled", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "",
        emotionState: "calm",
        decisionType: "TWO_WAY",
        options: { a: "", b: "Alternative", c: "" },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBe(60);
    });

    it("subtracts 10 for high emotion", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "",
        emotionState: "anger",
        decisionType: "TWO_WAY",
        options: { a: "", b: "", c: "" },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBe(40);
    });

    it("subtracts 10 for ONE_WAY with low reversibility", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "",
        emotionState: "calm",
        decisionType: "ONE_WAY",
        options: { a: "", b: "", c: "" },
        scores: {
          ...makeInput().scores,
          reversibility: 2,
        },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBe(40);
    });

    it("clamps confidence to 0-100", () => {
      const input = makeInput({
        factsKnown: "",
        assumptions: "",
        emotionState: "fear",
        decisionType: "ONE_WAY",
        options: { a: "", b: "", c: "" },
        scores: {
          ...makeInput().scores,
          reversibility: 1,
        },
      });
      const result = evaluateDecision(input);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe("counselor notes", () => {
    it("mentions dominant emotion when not calm", () => {
      const input = makeInput({ emotionState: "anxiety" });
      const result = evaluateDecision(input);
      expect(result.counselorNotes).toContain("anxiety");
    });

    it("warns about thin facts", () => {
      const input = makeInput({ factsKnown: "Short" });
      const result = evaluateDecision(input);
      expect(result.counselorNotes).toContain("known facts section is thin");
    });

    it("acknowledges assumptions", () => {
      const input = makeInput({ assumptions: "I assume this will work" });
      const result = evaluateDecision(input);
      expect(result.counselorNotes).toContain("identified assumptions");
    });
  });

  describe("experiment plan", () => {
    it("generates experiment plan when verdict is TEST", () => {
      const input = makeInput({
        scores: {
          clarityOutcome: 6,
          reversibility: 6,
          valueAlignment: 6,
          peaceImpact: 6,
          opportunityGain: 6,
          riskLevel: 4,
          regretTest: 6,
        },
        costMoney: 4,
        costTime: 4,
        costEnergy: 4,
        costReputation: 4,
      });
      const result = evaluateDecision(input);
      if (result.verdict === "TEST") {
        expect(result.experimentPlan).not.toBeNull();
        expect(result.experimentPlan!.hypothesis).toBeTruthy();
        expect(result.experimentPlan!.timebox).toBeTruthy();
        expect(result.experimentPlan!.successMetrics).toHaveLength(3);
        expect(result.experimentPlan!.killCriteria).toBeTruthy();
        expect(result.experimentPlan!.reviewDate).toBeTruthy();
      }
    });

    it("does not generate experiment plan for DO verdict", () => {
      const input = makeInput();
      const result = evaluateDecision(input);
      if (result.verdict === "DO") {
        expect(result.experimentPlan).toBeNull();
      }
    });
  });

  describe("next steps", () => {
    it("returns next steps for all verdict types", () => {
      const input = makeInput();
      const result = evaluateDecision(input);
      expect(result.nextSteps).toHaveProperty("DO");
      expect(result.nextSteps).toHaveProperty("DONT");
      expect(result.nextSteps).toHaveProperty("WAIT");
      expect(result.nextSteps).toHaveProperty("TEST");
      expect(result.nextSteps["DO"].length).toBeGreaterThan(0);
    });
  });
});
