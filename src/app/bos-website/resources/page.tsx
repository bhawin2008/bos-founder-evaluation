"use client";

import { useState } from "react";
import Link from "next/link";

type Domain = "all" | "marketing" | "leadership" | "technology" | "revenue" | "operations";
type ResourceType = "all" | "blog" | "framework" | "system" | "playbook" | "guide";

const resources = [
  { title: "The Positioning Playbook", desc: "How to carve out a defensible market position that makes you the obvious choice in your niche. Includes the BOS Positioning Canvas and real founder case studies.", domain: "marketing" as const, type: "playbook" as const, time: "12 min read" },
  { title: "Revenue Engine Framework", desc: "The complete system for building predictable revenue. Map your pipeline from awareness to close with specific metrics and conversion triggers at every stage.", domain: "revenue" as const, type: "framework" as const, time: "15 min read" },
  { title: "From Founder to CEO: The Leadership Shift", desc: "The hardest transition isn't product-market fit — it's becoming the leader your growing company needs. A candid look at what changes when you stop building and start leading.", domain: "leadership" as const, type: "blog" as const, time: "8 min read" },
  { title: "Tech Stack Decision Matrix", desc: "A structured framework for making technology decisions that scale. Evaluate build vs. buy, assess technical debt, and align your stack with business growth goals.", domain: "technology" as const, type: "framework" as const, time: "10 min read" },
  { title: "The 90-Day Hiring System", desc: "Stop hiring on gut feeling. This system covers role design, sourcing channels, structured interviews, cultural fit assessment, and 90-day onboarding — all in one playbook.", domain: "operations" as const, type: "system" as const, time: "18 min read" },
  { title: "Content That Converts: The IT Founder's Guide", desc: "How to create content that builds authority AND generates leads. The specific frameworks, formats, and distribution strategies that work for technical founders.", domain: "marketing" as const, type: "guide" as const, time: "14 min read" },
  { title: "Pricing for Profit", desc: "Most IT founders underprice by 30-50%. This playbook covers value-based pricing, packaging strategies, and the psychology of pricing for B2B tech services.", domain: "revenue" as const, type: "playbook" as const, time: "11 min read" },
  { title: "Building Culture in Remote Teams", desc: "Culture doesn't happen by accident — especially in remote-first teams. How top BOS founders build strong team cultures across time zones without an office.", domain: "leadership" as const, type: "blog" as const, time: "7 min read" },
  { title: "Scaling Infrastructure Without Burning Cash", desc: "How to scale your tech infrastructure 10x without 10x the cost. Practical approaches to cloud optimization, auto-scaling, and infrastructure-as-code.", domain: "technology" as const, type: "blog" as const, time: "9 min read" },
  { title: "The Weekly CEO Operating Rhythm", desc: "The exact weekly schedule used by high-performing BOS founders. Time blocks for strategic thinking, team management, business development, and deep work.", domain: "operations" as const, type: "system" as const, time: "6 min read" },
  { title: "From Services to Products: The Transition Framework", desc: "How to evolve from trading time for money to building scalable products. A step-by-step framework for productizing your expertise without abandoning your cash flow.", domain: "revenue" as const, type: "framework" as const, time: "13 min read" },
  { title: "The Delegation Blueprint", desc: "Stop doing $20/hour work when your time is worth $500/hour. The complete system for identifying, delegating, and monitoring tasks so you can focus on what matters.", domain: "leadership" as const, type: "playbook" as const, time: "10 min read" },
];

const domainColors: Record<string, string> = {
  marketing: "from-blue-500 to-blue-400",
  leadership: "from-violet-500 to-violet-400",
  technology: "from-emerald-500 to-emerald-400",
  revenue: "from-yellow-400 to-amber-500",
  operations: "from-orange-500 to-orange-400",
};

const domains: { value: Domain; label: string }[] = [
  { value: "all", label: "All" },
  { value: "marketing", label: "Marketing" },
  { value: "leadership", label: "Leadership" },
  { value: "technology", label: "Technology" },
  { value: "revenue", label: "Revenue" },
  { value: "operations", label: "Operations" },
];

const types: { value: ResourceType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "blog", label: "Blog" },
  { value: "framework", label: "Framework" },
  { value: "system", label: "System" },
  { value: "playbook", label: "Playbook" },
  { value: "guide", label: "Guide" },
];

export default function ResourcesPage() {
  const [activeDomain, setActiveDomain] = useState<Domain>("all");
  const [activeType, setActiveType] = useState<ResourceType>("all");

  const filtered = resources.filter((r) => {
    const domainMatch = activeDomain === "all" || r.domain === activeDomain;
    const typeMatch = activeType === "all" || r.type === activeType;
    return domainMatch && typeMatch;
  });

  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-20 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Founder knowledge base.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[560px]">
            Frameworks, playbooks, systems, and guides — all built by and for IT
            founders who build with structure.
          </p>
        </div>
      </section>

      {/* Filters + Resources Grid */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12 items-start">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-[10px] flex-wrap">
              <span className="text-xs font-bold uppercase tracking-[1px] text-gray-400 mr-2 self-center px-2">
                Domain
              </span>
              {domains.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setActiveDomain(d.value)}
                  className={`px-4 py-2 text-[0.8125rem] font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeDomain === d.value
                      ? "bg-white text-[#0A0A0A] font-semibold shadow-sm"
                      : "text-gray-500 hover:text-[#0A0A0A]"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-[10px] flex-wrap">
              <span className="text-xs font-bold uppercase tracking-[1px] text-gray-400 mr-2 self-center px-2">
                Type
              </span>
              {types.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setActiveType(t.value)}
                  className={`px-4 py-2 text-[0.8125rem] font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeType === t.value
                      ? "bg-white text-[#0A0A0A] font-semibold shadow-sm"
                      : "text-gray-500 hover:text-[#0A0A0A]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <div
                key={resource.title}
                className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)] bg-white"
              >
                <div className={`h-1.5 bg-gradient-to-r ${domainColors[resource.domain]}`} />
                <div className="p-6 pb-7 flex-1 flex flex-col">
                  <div className="flex gap-1.5 mb-3.5 flex-wrap">
                    <span className="inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-semibold rounded-md uppercase tracking-[0.5px] bg-gray-100 text-gray-600">
                      {resource.domain.charAt(0).toUpperCase() + resource.domain.slice(1)}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-semibold rounded-md uppercase tracking-[0.5px] border border-gray-300 text-gray-600">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 tracking-[-0.3px] leading-tight">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {resource.desc}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">
                      {resource.time}
                    </span>
                    <span className="text-base text-gray-300 transition-all group-hover:text-yellow-600 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No resources match your current filters. Try adjusting your selection.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_50%,#0D0D0D_100%)] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Want full access?
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            BOS members get unlimited access to all frameworks, playbooks, and
            systems — plus live sessions where these are taught and applied.
          </p>
          <Link
            href="/bos-website/apply"
            className="inline-flex items-center justify-center px-9 py-4 text-base font-bold rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(250,204,21,0.4)] transition-all"
          >
            Apply to BOS
          </Link>
        </div>
      </section>
    </>
  );
}
