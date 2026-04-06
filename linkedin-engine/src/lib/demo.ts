// Demo mode: when NEXT_PUBLIC_DEMO_MODE=true, the app works
// without Supabase, Razorpay, or any external services.
// All data is stored in memory / localStorage.

import type { Profile, Post } from "@/types";

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const DEMO_PROFILE: Profile = {
  id: "demo-user-001",
  full_name: "Alex Kumar",
  email: "alex@example.com",
  linkedin_headline: "Helping B2B founders grow on LinkedIn",
  industry: "Marketing",
  content_pillars: ["Personal Branding", "Marketing", "Startups"],
  subscription_tier: "pro",
  subscription_status: "active",
  razorpay_customer_id: null,
  razorpay_subscription_id: null,
  subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  onboarding_completed: true,
  created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEMO_POSTS: Post[] = [
  {
    id: "post-001",
    user_id: "demo-user-001",
    title: "My LinkedIn Journey",
    content: "I went from 0 to 5,000 followers in 90 days. But not the way you think.\n\nHere's what actually worked:\n\n1. I stopped chasing viral posts\n2. I started having real conversations\n3. I posted 3x/week consistently\n\nThe algorithm didn't change. My behavior did.\n\nWhat's your LinkedIn strategy?",
    hook_used: "I went from 0 to 5,000 followers in 90 days. But not the way you think.",
    template_used: "Story Framework",
    content_type: "text",
    status: "draft",
    ai_suggestions: null,
    performance_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock AI responses for demo mode
export const DEMO_HOOKS = [
  { hook: "I tested this strategy for 30 days. The results surprised even me.", style: "statement" },
  { hook: "What if everything you know about LinkedIn growth is wrong?", style: "question" },
  { hook: "87% of professionals make this mistake on LinkedIn. Here's the data:", style: "stat" },
];

export const DEMO_ANALYSIS = {
  overall_score: 7,
  hook_strength: { score: 8, feedback: "Strong opening — creates curiosity and promises a specific insight." },
  readability: { score: 7, feedback: "Good use of short paragraphs. Consider adding more line breaks between list items." },
  value: { score: 7, feedback: "Provides actionable takeaways. Could be stronger with a specific example or data point." },
  cta_strength: { score: 6, feedback: "The question is a bit broad. Try something more specific like 'What's the one thing you do daily on LinkedIn?'" },
  suggestions: [
    "Add a specific metric to point #3 (e.g., '3x/week for 90 days = 270 posts')",
    "Include a brief story about one real conversation that led to a connection",
    "End with a more specific question to drive comments",
  ],
  estimated_engagement: "medium" as const,
  one_line_verdict: "A solid post with clear structure — add one specific story to take it from good to great.",
};

export const DEMO_PROMPTS = [
  {
    idea: "Share the one cold email template that actually gets replies — break down each line and explain why it works",
    format: "text",
    starter_hook: "I've sent 1,000+ cold emails. Only one template consistently gets replies:",
    why_it_works: "Specific numbers + promise of a practical template = high save rate",
  },
  {
    idea: "Create a before/after comparison of a LinkedIn profile makeover with specific changes",
    format: "carousel",
    starter_hook: "I redesigned my LinkedIn profile in 20 minutes. Inbound leads doubled.",
    why_it_works: "Visual transformations perform well + actionable advice people can apply immediately",
  },
  {
    idea: "Poll your audience on the most underrated marketing channel in 2026",
    format: "poll",
    starter_hook: "Hot take: Email marketing still beats every new platform. Change my mind.",
    why_it_works: "Polls drive engagement + hot takes spark debate in comments",
  },
];
