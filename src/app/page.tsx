import Link from "next/link";

const tools = [
  {
    href: "/bos-website",
    title: "BOS Website",
    description: "Marketing website for the Business Operating System community with programs, events, frameworks, and resources.",
    color: "bg-indigo-600",
  },
  {
    href: "/bos-website-enhanced",
    title: "BOS Website Enhanced",
    description: "Enhanced landing page with SEO optimization, Open Graph meta tags, and improved hero section.",
    color: "bg-indigo-500",
  },
  {
    href: "/startup-studio",
    title: "Startup Studio",
    description: "Venture pipeline manager with dashboard, ventures tracking, evaluation criteria, and pipeline views.",
    color: "bg-emerald-600",
  },
  {
    href: "/analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Month-over-month analytics dashboard with sample data, charts, and team performance metrics.",
    color: "bg-amber-600",
  },
  {
    href: "/boss-team",
    title: "Boss Team",
    description: "Team management system with members, tasks, roles, and analytics tracking capabilities.",
    color: "bg-blue-600",
  },
  {
    href: "/culture-console",
    title: "Culture Console",
    description: "GOR Framework culture intelligence dashboard with predictive insights, signal framework, and team analysis.",
    color: "bg-purple-600",
  },
  {
    href: "/startup-health",
    title: "Startup Health Diagnostic",
    description: "20-question interactive diagnostic to evaluate startup health across multiple categories with scoring.",
    color: "bg-rose-600",
  },
  {
    href: "/sales-diagnostic",
    title: "Sales & Marketing Diagnostic",
    description: "Sales and marketing assessment tool with clarity reports, 4-dimension scorecards, and bottleneck analysis.",
    color: "bg-orange-600",
  },
  {
    href: "/decision-os",
    title: "Decision OS",
    description: "Counselor-style decision framework with clarity, truth, alignment checks, and detailed evaluation reports.",
    color: "bg-stone-700",
  },
];

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Business Operating System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A unified platform of tools designed for IT founders — from diagnostics
          and team management to decision frameworks and marketing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center`}
              >
                <span className="text-white text-sm font-bold">
                  {tool.title[0]}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {tool.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
