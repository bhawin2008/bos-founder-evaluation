import type { TemplateCategory, TemplateSection } from "@/types";

export interface TemplateData {
  name: string;
  description: string;
  category: TemplateCategory;
  structure: TemplateSection[];
  is_premium: boolean;
}

export const templates: TemplateData[] = [
  {
    name: "Story Framework",
    category: "story",
    description: "Share a personal or professional story with a clear lesson",
    is_premium: false,
    structure: [
      { label: "Hook", placeholder: "Start with a surprising or emotional opening line", tips: "Create tension or curiosity in under 15 words" },
      { label: "Context", placeholder: "Set the scene. When and where did this happen?", tips: "Keep it to 1-2 short sentences" },
      { label: "The Story", placeholder: "What happened? Be specific and vivid.", tips: "Use short paragraphs. Each paragraph should be 1-2 sentences max for LinkedIn readability." },
      { label: "The Turning Point", placeholder: "What changed? What did you realize?", tips: "This is where the value lives. Make the insight clear." },
      { label: "The Lesson", placeholder: "What should the reader take away?", tips: "State the lesson simply. One clear takeaway is better than five vague ones." },
      { label: "CTA", placeholder: "End with a question or invitation to engage", tips: "Ask a question that's easy to answer. 'Has this happened to you?' works better than 'What do you think about the nature of failure?'" },
    ],
  },
  {
    name: "Hot Take",
    category: "opinion",
    description: "Share a bold opinion that challenges conventional thinking",
    is_premium: false,
    structure: [
      { label: "Bold Statement", placeholder: "State your opinion clearly and directly", tips: "Be specific. 'Content marketing is dead' is too broad. 'Posting daily on LinkedIn is actually hurting your growth' is specific." },
      { label: "Why Most People Are Wrong", placeholder: "Explain the common belief you're challenging", tips: "Show empathy — acknowledge why people believe the conventional way." },
      { label: "Your Evidence", placeholder: "Back up your opinion with data, experience, or examples", tips: "Use numbers or specific stories. Vague opinions get ignored." },
      { label: "The Better Way", placeholder: "What should people do instead?", tips: "Offer a clear alternative. Don't just criticize — solve." },
      { label: "CTA", placeholder: "Invite discussion: agree or disagree?", tips: "Controversial CTAs drive comments. 'Am I wrong?' is powerful." },
    ],
  },
  {
    name: "Listicle",
    category: "listicle",
    description: "Share a numbered list of tips, insights, or resources",
    is_premium: false,
    structure: [
      { label: "Hook", placeholder: "Promise specific value: '7 tools that changed how I work'", tips: "Use a number. Odd numbers tend to perform better. Be specific about the outcome." },
      { label: "Context", placeholder: "Why should the reader care? What's the problem this list solves?", tips: "One sentence connecting the list to a real pain point." },
      { label: "List Items", placeholder: "1. First item\n\n2. Second item\n\n3. Third item\n\n(Add 5-7 items with brief explanations)", tips: "Each item should be scannable. Bold the key point, then add 1 sentence of context." },
      { label: "Bonus Tip", placeholder: "One extra insight that adds unexpected value", tips: "The bonus tip should be the most surprising or valuable item." },
      { label: "CTA", placeholder: "Which one resonates most? Save this for later.", tips: "'Save this post' and 'Which would you add?' both drive engagement." },
    ],
  },
  {
    name: "Case Study",
    category: "case_study",
    description: "Share a specific result with the process behind it",
    is_premium: false,
    structure: [
      { label: "Result Hook", placeholder: "Lead with the outcome: 'We increased X by Y% in Z days'", tips: "Numbers grab attention. Be specific and honest." },
      { label: "The Starting Point", placeholder: "Where were things before? What was the problem?", tips: "Paint the 'before' picture so the transformation is clear." },
      { label: "The Process", placeholder: "What exactly did you do? Step by step.", tips: "Be generous with details. Actionable content gets saved and shared." },
      { label: "The Result", placeholder: "What happened? Include specific metrics if possible.", tips: "Revisit the numbers from your hook with more context." },
      { label: "Key Takeaway", placeholder: "What's the one thing the reader should try?", tips: "Make it actionable. 'Try X this week' is better than 'Think about X.'" },
      { label: "CTA", placeholder: "Have you tried something similar? What were your results?", tips: "Invite others to share their experiences." },
    ],
  },
  {
    name: "How-To Guide",
    category: "how_to",
    description: "Teach something practical step-by-step",
    is_premium: false,
    structure: [
      { label: "Hook", placeholder: "State the skill or outcome: 'How to write a LinkedIn post in 15 minutes'", tips: "Make the promise clear and time-bound if possible." },
      { label: "Why This Matters", placeholder: "Why should someone learn this? What's at stake?", tips: "Connect to a real problem or aspiration." },
      { label: "Step-by-Step", placeholder: "Step 1: ...\n\nStep 2: ...\n\nStep 3: ...\n\n(Keep it to 3-5 steps)", tips: "Each step should be a concrete action, not a vague suggestion." },
      { label: "Pro Tip", placeholder: "One insider tip that makes this even more effective", tips: "This is your expertise showing. Share what took you years to learn." },
      { label: "CTA", placeholder: "Try this today and let me know how it goes.", tips: "Challenge the reader to take action immediately." },
    ],
  },
  {
    name: "Launch Announcement",
    category: "launch",
    description: "Announce something new — product, service, career change, or milestone",
    is_premium: false,
    structure: [
      { label: "Teaser Hook", placeholder: "Build anticipation without revealing everything", tips: "Create curiosity. 'After 6 months of quiet work, I'm finally ready to share...' works well." },
      { label: "The Backstory", placeholder: "Why did you build/start/change this?", tips: "People connect with the 'why' more than the 'what.'" },
      { label: "What It Is", placeholder: "Clearly explain what you're launching or announcing", tips: "Be clear and concise. Don't make people guess." },
      { label: "Who It's For", placeholder: "Who will benefit from this?", tips: "Be specific about your audience. Not 'everyone' — narrow it down." },
      { label: "CTA", placeholder: "What should interested people do next?", tips: "One clear next step: comment, DM, visit link, or sign up." },
    ],
  },
  {
    name: "Authority Builder",
    category: "authority",
    description: "Establish expertise by sharing frameworks, principles, or industry insights",
    is_premium: true,
    structure: [
      { label: "Expertise Hook", placeholder: "Position yourself as someone who's done the work", tips: "'After working with 100+ clients...' or 'In my 10 years of...' establishes credibility." },
      { label: "The Framework", placeholder: "Share your unique way of thinking about this topic", tips: "Give it a name if possible. Named frameworks are memorable and shareable." },
      { label: "How It Works", placeholder: "Break down each component of your framework", tips: "Use bullet points or numbered steps. Make it easy to follow." },
      { label: "Real Example", placeholder: "Show how this framework works in practice", tips: "A specific example proves the framework works. Abstract theory doesn't." },
      { label: "Application", placeholder: "How can the reader apply this to their situation?", tips: "End with actionable advice they can use today." },
      { label: "CTA", placeholder: "Want the full breakdown? Drop a comment.", tips: "Offer deeper content for those who engage." },
    ],
  },
  {
    name: "Engagement Magnet",
    category: "engagement",
    description: "Start conversations and maximize comments",
    is_premium: true,
    structure: [
      { label: "Provocative Opening", placeholder: "Start with something that begs a response", tips: "Polls, either/or questions, or bold claims all work well." },
      { label: "Context", placeholder: "Give enough background for an informed response", tips: "2-3 sentences that set up the question without giving away the 'right' answer." },
      { label: "Your Take", placeholder: "Share your perspective — but leave room for disagreement", tips: "Saying 'I think X, but I could be wrong' invites conversation." },
      { label: "The Question", placeholder: "Ask one clear, easy-to-answer question", tips: "The easier the question, the more comments you'll get. 'Agree or disagree?' is powerful." },
    ],
  },
];
