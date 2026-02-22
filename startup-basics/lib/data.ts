export const siteConfig = {
  name: "Startup Basics",
  tagline: "From Idea to Launch — We Build Founders",
  description:
    "Startup Basics helps aspiring entrepreneurs turn raw ideas into real businesses through structured cohorts, expert consulting, and a community of builders.",
  email: "hello@startupbasics.com",
  phone: "+1 (555) 123-4567",
  whatsapp: "https://wa.me/15551234567",
  social: {
    twitter: "https://twitter.com/startupbasics",
    linkedin: "https://linkedin.com/company/startupbasics",
    instagram: "https://instagram.com/startupbasics",
    youtube: "https://youtube.com/@startupbasics",
  },
};

export const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 3 exits. Passionate about helping first-time founders avoid common pitfalls.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Programs",
    bio: "Former accelerator director who has coached 200+ startups from idea to seed funding.",
  },
  {
    name: "Marcus Chen",
    role: "Lead Mentor",
    bio: "Product leader with 15 years at top tech companies. Specializes in product-market fit strategy.",
  },
  {
    name: "Sofia Andersen",
    role: "Community Manager",
    bio: "Builds founder communities that actually help. Previously grew a 10K-member startup network.",
  },
];

export const programs = {
  cohort: {
    title: "Startup Cohort",
    subtitle: "12-Week Founder Accelerator",
    description:
      "A structured, hands-on program that takes you from idea to launch-ready in 12 weeks. Work alongside a cohort of ambitious founders with weekly workshops, mentorship, and accountability.",
    modules: [
      { week: "1-2", title: "Idea Validation", desc: "Problem discovery, customer interviews, market sizing" },
      { week: "3-4", title: "Business Model Design", desc: "Revenue models, unit economics, competitive positioning" },
      { week: "5-6", title: "MVP Development", desc: "Build your minimum viable product with lean methodology" },
      { week: "7-8", title: "Go-to-Market Strategy", desc: "Launch planning, distribution channels, early traction" },
      { week: "9-10", title: "Growth & Metrics", desc: "Key metrics, growth experiments, retention strategies" },
      { week: "11-12", title: "Pitch & Fundraise", desc: "Investor-ready pitch deck, demo day preparation" },
    ],
    cta: "Apply for Next Cohort",
  },
  consulting: {
    title: "Startup Consulting",
    subtitle: "1-on-1 Expert Guidance",
    description:
      "Get personalized advice from experienced founders and operators. Whether you need help with strategy, fundraising, product, or scaling — we match you with the right expert.",
    packages: [
      {
        name: "Strategy Session",
        duration: "90 minutes",
        desc: "Deep-dive into your biggest challenge with an expert mentor.",
        features: ["Problem diagnosis", "Action plan", "Follow-up notes"],
      },
      {
        name: "Growth Sprint",
        duration: "4 weeks",
        desc: "Intensive engagement to solve a specific growth challenge.",
        features: ["Weekly sessions", "Async support", "Metrics dashboard", "Resource library"],
      },
      {
        name: "Founder Advisory",
        duration: "Ongoing",
        desc: "Retained advisory for founders who want a strategic thought partner.",
        features: ["Bi-weekly calls", "Board meeting prep", "Investor intros", "Priority support"],
      },
    ],
    cta: "Book a Call",
  },
};

export const caseStudies = [
  {
    slug: "greenplate-food-delivery",
    title: "GreenPlate: Sustainable Food Delivery",
    category: "FoodTech",
    summary: "How a first-time founder built a sustainable food delivery platform that reached 10K orders in 6 months.",
    challenge: "The founder had a passion for sustainable food but no tech background and limited runway.",
    solution: "Through our cohort program, they validated demand with 50 customer interviews, built a no-code MVP, and secured a pre-seed round.",
    result: "10K orders in 6 months, $500K pre-seed raised, team of 8.",
    metrics: { orders: "10K+", funding: "$500K", team: "8 people", timeline: "6 months" },
  },
  {
    slug: "learnloop-edtech",
    title: "LearnLoop: AI-Powered Tutoring",
    category: "EdTech",
    summary: "From side project to a funded edtech startup serving 5,000 students across 3 countries.",
    challenge: "Two co-founders with strong technical skills but no go-to-market experience or business model clarity.",
    solution: "Our consulting helped them identify their ICP, design a freemium model, and build distribution through school partnerships.",
    result: "5,000 active students, $1.2M seed round, partnerships with 40 schools.",
    metrics: { students: "5,000", funding: "$1.2M", schools: "40", countries: "3" },
  },
  {
    slug: "finflow-fintech",
    title: "FinFlow: SMB Cash Flow Tool",
    category: "FinTech",
    summary: "A bootstrapped fintech tool that grew to $30K MRR by solving a painful problem for small businesses.",
    challenge: "Solo founder with domain expertise but struggling to find product-market fit after 8 months of building.",
    solution: "A strategy session helped them narrow their ICP from 'all SMBs' to 'freelancers with irregular income', leading to a complete product pivot.",
    result: "$30K MRR, 2,000 paying users, profitable within 14 months.",
    metrics: { mrr: "$30K", users: "2,000", profitability: "14 months", churn: "3.2%" },
  },
];

export const businessIdeas = [
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder for Gen Z",
    category: "AI/SaaS",
    difficulty: "Medium",
    investment: "$5K - $15K",
    summary: "A tool that generates tailored resumes and cover letters using AI, designed specifically for new graduates.",
    problem: "New graduates struggle to create compelling resumes with limited experience.",
    opportunity: "4M+ new graduates annually in the US alone. Existing tools are generic and outdated.",
    monetization: "Freemium SaaS — free basic, $9/mo premium with AI optimization.",
  },
  {
    slug: "local-experience-marketplace",
    title: "Local Experience Marketplace",
    category: "Marketplace",
    difficulty: "Hard",
    investment: "$20K - $50K",
    summary: "A platform connecting travelers with authentic local experiences hosted by residents.",
    problem: "Travelers want authentic experiences but don't know how to find them outside tourist traps.",
    opportunity: "Experience economy growing 4x faster than goods. Airbnb Experiences validated the market.",
    monetization: "15% service fee per booking. Average booking $75, targeting 500 bookings/month at scale.",
  },
  {
    slug: "pet-wellness-subscription",
    title: "Pet Wellness Subscription Box",
    category: "E-Commerce",
    difficulty: "Easy",
    investment: "$3K - $10K",
    summary: "Curated monthly boxes with premium pet health products, supplements, and treats.",
    problem: "Pet owners want the best for their pets but are overwhelmed by choices and misinformation.",
    opportunity: "$150B global pet industry. Subscription boxes have proven LTV in adjacent categories.",
    monetization: "Monthly subscription $39-69. Target 60%+ gross margins through supplier partnerships.",
  },
  {
    slug: "remote-team-culture-tool",
    title: "Remote Team Culture Platform",
    category: "B2B SaaS",
    difficulty: "Hard",
    investment: "$15K - $40K",
    summary: "A platform that helps remote teams build culture through structured rituals, recognition, and pulse surveys.",
    problem: "Remote teams struggle with culture, belonging, and retention. Managers lack visibility.",
    opportunity: "70% of companies now have remote/hybrid workers. Culture is the #1 cited retention factor.",
    monetization: "Per-seat SaaS pricing: $8/user/month. Target 50-500 employee companies.",
  },
  {
    slug: "sustainable-fashion-resale",
    title: "Sustainable Fashion Resale App",
    category: "Marketplace",
    difficulty: "Medium",
    investment: "$10K - $25K",
    summary: "A mobile-first marketplace for buying and selling pre-owned sustainable fashion brands.",
    problem: "Eco-conscious consumers want sustainable fashion but can't afford retail prices for ethical brands.",
    opportunity: "Resale market growing 25% YoY. Sustainability is a top purchase driver for under-35 consumers.",
    monetization: "12% seller fee + optional promoted listings. Target $50 average order value.",
  },
  {
    slug: "micro-saas-analytics",
    title: "Analytics for Micro-SaaS",
    category: "AI/SaaS",
    difficulty: "Medium",
    investment: "$5K - $12K",
    summary: "Lightweight analytics dashboard built specifically for solo founders and micro-SaaS products.",
    problem: "Google Analytics is overkill. Mixpanel is expensive. Solo founders need simple, actionable metrics.",
    opportunity: "100K+ micro-SaaS products globally. Growing indie hacker / solopreneur movement.",
    monetization: "Flat pricing: $19/mo per product. No per-seat or usage tiers.",
  },
];

export const events = [
  {
    title: "Founder Fireside: Building in Public",
    date: "2026-03-15",
    time: "6:00 PM EST",
    type: "Virtual",
    description: "Join three founders who share their journey of building startups transparently on social media.",
    upcoming: true,
  },
  {
    title: "Startup Basics Demo Day — Cohort 5",
    date: "2026-04-02",
    time: "2:00 PM EST",
    type: "Hybrid",
    description: "Watch 12 founders pitch their startups to a panel of investors and mentors after 12 weeks of building.",
    upcoming: true,
  },
  {
    title: "Workshop: Validate Before You Build",
    date: "2026-04-18",
    time: "10:00 AM EST",
    type: "Virtual",
    description: "A hands-on workshop on customer discovery, problem validation, and lean experimentation.",
    upcoming: true,
  },
  {
    title: "Pitch Practice Night",
    date: "2026-01-20",
    time: "7:00 PM EST",
    type: "In-Person",
    description: "Practice your startup pitch in front of a supportive audience and get real-time feedback.",
    upcoming: false,
  },
  {
    title: "Startup Basics Demo Day — Cohort 4",
    date: "2025-12-10",
    time: "2:00 PM EST",
    type: "Hybrid",
    description: "10 founders presented their MVPs to investors. 3 received follow-up meetings.",
    upcoming: false,
  },
];

export const testimonials = [
  {
    quote: "Startup Basics gave me the structure I was missing. I went from a vague idea to a real product with paying customers in 12 weeks.",
    name: "Jordan T.",
    role: "Founder, GreenPlate",
  },
  {
    quote: "The consulting session was the most valuable 90 minutes I've ever spent on my business. Clear diagnosis, clear plan.",
    name: "Mei L.",
    role: "Founder, LearnLoop",
  },
  {
    quote: "The community alone is worth it. Being surrounded by other builders who understand the struggle is incredibly motivating.",
    name: "David K.",
    role: "Cohort 3 Graduate",
  },
];
