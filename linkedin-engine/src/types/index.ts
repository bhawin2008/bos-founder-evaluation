// ==================== Database Types ====================

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  linkedin_headline: string | null;
  industry: string | null;
  content_pillars: string[] | null;
  subscription_tier: "free" | "basic" | "pro";
  subscription_status: "active" | "inactive" | "cancelled" | "past_due";
  razorpay_customer_id: string | null;
  razorpay_subscription_id: string | null;
  subscription_end_date: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  hook_used: string | null;
  template_used: string | null;
  content_type: "text" | "carousel" | "poll" | "article" | "video" | null;
  status: "draft" | "ready" | "published";
  ai_suggestions: AISuggestions | null;
  performance_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Hook {
  id: string;
  text: string;
  category: HookCategory;
  example_post: string | null;
  is_curated: boolean;
  use_count: number;
  created_at: string;
}

export type HookCategory =
  | "launch"
  | "story"
  | "authority"
  | "engagement"
  | "controversy"
  | "education"
  | "case_study"
  | "personal"
  | "opinion";

export interface Template {
  id: string;
  name: string;
  description: string | null;
  category: TemplateCategory;
  structure: TemplateSection[];
  example_post: string | null;
  is_premium: boolean;
  use_count: number;
  created_at: string;
}

export type TemplateCategory =
  | "launch"
  | "story"
  | "authority"
  | "engagement"
  | "case_study"
  | "listicle"
  | "opinion"
  | "how_to";

export interface TemplateSection {
  label: string;
  placeholder: string;
  tips: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: "banner" | "carousel" | "cta_framework" | "checklist" | "swipe_file";
  use_case: string;
  file_url: string | null;
  preview_url: string | null;
  is_premium: boolean;
  download_count: number;
  created_at: string;
}

export interface DailyPrompt {
  id: string;
  prompt_text: string;
  prompt_type: "topic" | "what_if" | "trending" | "challenge" | null;
  industry_tags: string[] | null;
  active_date: string | null;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  item_type: "hook" | "template" | "resource" | "prompt" | "swipe";
  item_id: string;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  amount: number;
  currency: string;
  status: "pending" | "captured" | "failed" | "refunded";
  plan_type: PlanType | null;
  created_at: string;
}

export type PlanType =
  | "basic_monthly"
  | "pro_monthly"
  | "pro_annual"
  | "course"
  | "marathon"
  | "consultation"
  | "bundle";

// ==================== AI Response Types ====================

export interface AISuggestions {
  overall_score: number;
  hook_strength: { score: number; feedback: string };
  readability: { score: number; feedback: string };
  value: { score: number; feedback: string };
  cta_strength: { score: number; feedback: string };
  suggestions: string[];
  estimated_engagement: "low" | "medium" | "high";
  one_line_verdict: string;
}

export interface GeneratedHook {
  hook: string;
  style: "question" | "statement" | "stat";
}

export interface GeneratedPrompt {
  idea: string;
  format: "text" | "carousel" | "poll";
  starter_hook: string;
  why_it_works: string;
}

// ==================== UI Types ====================

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export type SubscriptionTier = "free" | "basic" | "pro";
