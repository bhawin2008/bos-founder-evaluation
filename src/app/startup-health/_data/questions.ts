export interface Question {
  category: string;
  categoryKey: CategoryKey;
  question: string;
  options: [string, string, string, string];
}

export type CategoryKey = "sales" | "marketing" | "founder" | "team";

export const categoryLabels: Record<CategoryKey, string> = {
  sales: "Sales System Maturity",
  marketing: "Marketing Clarity",
  founder: "Founder Dependency",
  team: "Team Capability",
};

export const questions: Question[] = [
  // SALES SYSTEM MATURITY
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How do most deals close today?",
    options: [
      "Mostly through random referrals or word of mouth",
      "Founder personally closes almost every deal",
      "There's a loose process, but it's inconsistent",
      "A clear, repeatable sales system that the team follows",
    ],
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How predictable is your monthly revenue?",
    options: [
      "Completely random — we never know what's coming",
      "We have a rough sense, but it swings wildly",
      "Somewhat predictable with occasional surprises",
      "Highly predictable — we forecast with confidence",
    ],
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "Do you actively qualify or reject leads?",
    options: [
      "We chase every lead that comes in",
      "We have a gut feel but no formal criteria",
      "We have some filters, but they're loosely followed",
      "We have a clear qualification checklist and say no fast",
    ],
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "How confident are sales conversations across the team?",
    options: [
      "Only the founder can handle sales conversations well",
      "One or two people can sell, but it's inconsistent",
      "The team manages okay with some founder support",
      "The team handles sales calls confidently and independently",
    ],
  },
  {
    category: "Sales System Maturity",
    categoryKey: "sales",
    question: "Is your sales process documented and repeatable?",
    options: [
      "It's entirely in the founder's head",
      "Some rough notes exist, but nobody follows them",
      "Partially documented but not consistently used",
      "Clearly documented, trained, and followed by the team",
    ],
  },

  // MARKETING CLARITY
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "How clearly defined is your ideal customer profile (ICP)?",
    options: [
      "We sell to anyone who's willing to pay",
      "We have a vague idea but nothing written down",
      "Somewhat defined but we still take random clients",
      "Very specific, documented, and strictly followed",
    ],
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "What primarily drives inbound leads today?",
    options: [
      "Mostly luck, random referrals, or personal network",
      "Some social media activity but no clear strategy",
      "A few channels are working but we're not sure why",
      "Intent-driven marketing with clear lead sources",
    ],
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Is your messaging consistent across website, LinkedIn, and sales calls?",
    options: [
      "Completely different messaging everywhere",
      "Similar tone but no unified message",
      "Mostly aligned with a few gaps",
      "Same core message across every touchpoint",
    ],
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Can prospects understand what you do within 10 seconds?",
    options: [
      "People are often confused after we explain",
      "It takes a full conversation to get clarity",
      "Most people get it, but it's not instant",
      "Instantly clear — even a stranger gets it immediately",
    ],
  },
  {
    category: "Marketing Clarity",
    categoryKey: "marketing",
    question: "Do you know which marketing activities actually convert into revenue?",
    options: [
      "No tracking at all — we're guessing",
      "We track some vanity metrics (likes, followers)",
      "We have some data but can't connect it to revenue",
      "Clear tracking from lead source to closed deal",
    ],
  },

  // FOUNDER DEPENDENCY
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "What happens if you step away for 2 weeks?",
    options: [
      "Everything breaks — the business stops",
      "Major things stall, small things survive",
      "Most things run, but key decisions wait for me",
      "Business runs smoothly without me",
    ],
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Who makes critical business decisions today?",
    options: [
      "Only the founder — no exceptions",
      "Founder decides, but sometimes takes input",
      "A few people can decide on smaller things",
      "Clear ownership layers — decisions happen without the founder",
    ],
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Who closes important deals?",
    options: [
      "Only the founder — nobody else can",
      "Founder does most, with some team support",
      "Team handles smaller deals, founder closes big ones",
      "Sales team closes deals independently",
    ],
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "Are key processes documented or only in your head?",
    options: [
      "Nothing is documented — it's all in my head",
      "A few things are written down but outdated",
      "Important processes are partially documented",
      "Clear SOPs exist and are actively maintained",
    ],
  },
  {
    category: "Founder Dependency",
    categoryKey: "founder",
    question: "How often are you firefighting daily issues?",
    options: [
      "Every single day — I'm the fire department",
      "Most days have at least one fire to put out",
      "Occasionally, but it's getting better",
      "Rarely — the team handles issues before they escalate",
    ],
  },

  // TEAM CAPABILITY
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How reliable is your team without constant follow-up?",
    options: [
      "Nothing moves unless I push it",
      "Some things get done, but quality drops",
      "Mostly reliable with occasional check-ins needed",
      "Highly reliable — they deliver without follow-up",
    ],
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "Do team members take ownership beyond assigned tasks?",
    options: [
      "Rarely — they only do what's told",
      "Sometimes, but only certain individuals",
      "Growing — more people are stepping up",
      "Consistently — the team owns outcomes, not just tasks",
    ],
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "Is there a leadership layer below you?",
    options: [
      "None — I manage everyone directly",
      "Informal leads but no real authority",
      "A few emerging leaders but not fully empowered",
      "Strong leadership team that runs their areas",
    ],
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How is feedback handled inside the team?",
    options: [
      "Avoided — people fear confrontation",
      "Happens but gets emotional or personal",
      "Improving — some structure is forming",
      "Structured, safe, and part of the culture",
    ],
  },
  {
    category: "Team Capability",
    categoryKey: "team",
    question: "How confident are you in your hiring decisions so far?",
    options: [
      "Mostly wrong — high regret or turnover",
      "Hit or miss — no clear pattern",
      "Getting better — learning from past mistakes",
      "Consistently strong hires that fit and perform",
    ],
  },
];
