export interface Question {
  category: string;
  categoryKey: CategoryKey;
  question: string;
  options: [string, string, string, string];
}

export type CategoryKey = "demand" | "message" | "sales" | "revenue";

export const questions: Question[] = [
  // SECTION 1: DEMAND QUALITY (MARKETING INPUT)
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Where do most of your leads come from?",
    options: [
      "Random / referrals / luck",
      "Founder network",
      "Some inbound channels",
      "Clear, intent-based sources",
    ],
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "How relevant are incoming leads?",
    options: [
      "Mostly poor fit",
      "Mixed quality",
      "Mostly relevant",
      "Highly qualified & targeted",
    ],
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Do leads understand why they contacted you?",
    options: [
      "Often confused",
      "Need explanation",
      "Mostly aware",
      "Very clear problem awareness",
    ],
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "How consistent is lead flow?",
    options: [
      "Completely random",
      "Spikes occasionally",
      "Somewhat steady",
      "Predictable inflow",
    ],
  },
  {
    category: "Demand Quality",
    categoryKey: "demand",
    question: "Do you intentionally attract or passively receive leads?",
    options: [
      "Passive only",
      "Some effort",
      "Planned activities",
      "Clear demand strategy",
    ],
  },

  // SECTION 2: MESSAGE & POSITIONING CLARITY
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Can prospects explain what you do in one sentence?",
    options: ["No", "After explanation", "Mostly yes", "Instantly yes"],
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "How consistent is your message across channels?",
    options: [
      "Different everywhere",
      "Slightly aligned",
      "Mostly aligned",
      "Fully consistent",
    ],
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Do you sell outcomes or services?",
    options: [
      "Services only",
      "Mix of both",
      "Outcome-led sometimes",
      "Outcome-led always",
    ],
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Do prospects compare you mainly on price?",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  {
    category: "Message & Positioning Clarity",
    categoryKey: "message",
    question: "Is your differentiation clear?",
    options: [
      "No clear difference",
      "Generic difference",
      "Somewhat clear",
      "Very distinct",
    ],
  },

  // SECTION 3: SALES PROCESS & CONVERSION
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "Is there a defined sales process?",
    options: [
      "Completely ad-hoc",
      "Founder-driven",
      "Some structure",
      "Documented & repeatable",
    ],
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How are discovery calls handled?",
    options: [
      "Unstructured chats",
      "Founder intuition",
      "Semi-structured",
      "Clear discovery framework",
    ],
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "Do you qualify or reject leads?",
    options: [
      "Almost never",
      "Gut-based",
      "Basic checklist",
      "Strict qualification",
    ],
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How strong is your proposal clarity?",
    options: [
      "Confusing / long",
      "Depends on client",
      "Mostly clear",
      "Very crisp & outcome-led",
    ],
  },
  {
    category: "Sales Process & Conversion",
    categoryKey: "sales",
    question: "How confident is your close rate?",
    options: [
      "Very low / random",
      "Inconsistent",
      "Reasonably stable",
      "Highly predictable",
    ],
  },

  // SECTION 4: REVENUE PREDICTABILITY
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "Can you forecast revenue 2\u20133 months ahead?",
    options: [
      "No idea",
      "Rough guess",
      "Approximate forecast",
      "Clear forecast",
    ],
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How dependent is revenue on the founder?",
    options: [
      "Completely dependent",
      "Mostly dependent",
      "Partially dependent",
      "Largely independent",
    ],
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "Do you know your conversion metrics?",
    options: ["No tracking", "Gut feeling", "Some numbers", "Clear metrics"],
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How stable are your deal sizes?",
    options: [
      "Very inconsistent",
      "Mostly small deals",
      "Some consistency",
      "Very consistent",
    ],
  },
  {
    category: "Revenue Predictability",
    categoryKey: "revenue",
    question: "How calm do you feel about next quarter revenue?",
    options: [
      "Very anxious",
      "Unsure",
      "Mostly confident",
      "Very confident",
    ],
  },
];
