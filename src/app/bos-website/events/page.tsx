"use client";

import { useState } from "react";
import Link from "next/link";

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const upcomingEvents = [
  {
    title: "Founder Revenue Blueprint",
    desc: "A hands-on workshop where you'll map your revenue engine from lead generation to close. Walk away with a complete pipeline system tailored to your IT business.",
    date: "March 15, 2026",
    tags: [{ label: "Workshop", yellow: true }, { label: "Online", yellow: false }],
    duration: "2 hours",
    access: "Members only",
  },
  {
    title: "Scaling Systems Masterclass",
    desc: "Deep-dive into the operational systems that allow your business to grow without growing your headcount proportionally. Delegation, automation, and process design.",
    date: "March 29, 2026",
    tags: [{ label: "Masterclass", yellow: true }, { label: "Online", yellow: false }],
    duration: "90 min",
    access: "Members only",
  },
  {
    title: "BOS Quarterly: Q2 Kickoff",
    desc: "Kick off Q2 with the entire BOS community. Review Q1 wins, set Q2 goals, and hear from featured founders who crushed their targets this quarter.",
    date: "April 5, 2026",
    tags: [{ label: "Community", yellow: true }, { label: "Hybrid", yellow: false }],
    duration: "3 hours",
    access: "Online + Dubai",
  },
  {
    title: "LinkedIn Authority Sprint",
    desc: "Build your LinkedIn content engine in one session. Learn the frameworks that BOS founders use to generate inbound leads through authority-building content.",
    date: "April 19, 2026",
    tags: [{ label: "Workshop", yellow: true }, { label: "Online", yellow: false }],
    duration: "2 hours",
    access: "Open to all",
  },
];

const pastEvents = [
  {
    title: "Positioning for IT Founders",
    desc: "How to carve out a defensible market position that makes you the obvious choice. Includes the BOS Positioning Canvas template.",
    date: "January 18, 2026",
    tags: [{ label: "Workshop" }, { label: "Online" }],
  },
  {
    title: "Decision-Making Frameworks for Founders",
    desc: "Eliminate analysis paralysis with structured decision models. The same frameworks used by BOS Elite founders to make high-stakes calls with confidence.",
    date: "February 1, 2026",
    tags: [{ label: "Masterclass" }, { label: "Online" }],
  },
  {
    title: "BOS Quarterly: Q1 Review",
    desc: "Community-wide Q1 goal review, wins celebration, and planning session. Featured three founders who doubled revenue using BOS systems.",
    date: "January 4, 2026",
    tags: [{ label: "Community" }, { label: "Online" }],
  },
  {
    title: "Building a Sales Engine",
    desc: "From random referrals to predictable revenue. This workshop covered the complete sales system used by top-performing BOS founders.",
    date: "December 14, 2025",
    tags: [{ label: "Workshop" }, { label: "Online" }],
  },
  {
    title: "Hiring Your First 10",
    desc: "The hiring playbook for founders growing from solo to a 10-person team. Covers role design, interview systems, and cultural fit assessment.",
    date: "November 30, 2025",
    tags: [{ label: "Workshop" }, { label: "Online" }],
  },
  {
    title: "Tech Leadership Summit 2025",
    desc: "Our flagship annual event. Two days of deep sessions on scaling technology teams, architectural decisions, and the CTO-to-CEO transition.",
    date: "November 15, 2025",
    tags: [{ label: "Summit" }, { label: "Hybrid" }],
  },
];

export default function EventsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-20 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Events
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Learn. Connect. Execute.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[560px]">
            Live workshops, masterclasses, and founder sessions designed to move
            your business forward — not just your knowledge.
          </p>
        </div>
      </section>

      {/* Events Tabs + Grid */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex gap-1 mb-12 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                tab === "upcoming"
                  ? "bg-white text-[#0A0A0A] shadow-sm"
                  : "text-gray-500 hover:text-[#0A0A0A]"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                tab === "past"
                  ? "bg-white text-[#0A0A0A] shadow-sm"
                  : "text-gray-500 hover:text-[#0A0A0A]"
              }`}
            >
              Past Events
            </button>
          </div>

          {tab === "upcoming" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="group block p-8 border border-gray-200 rounded-2xl transition-all duration-300 relative overflow-hidden hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {event.tags.map((t) => (
                      <span
                        key={t.label}
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md uppercase tracking-[0.5px] ${
                          t.yellow
                            ? "bg-yellow-400/15 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-yellow-600 mb-3">
                    <CalendarIcon />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-[-0.3px]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-4 text-[0.8125rem] text-gray-400">
                    <span className="flex items-center gap-1">
                      <ClockIcon />
                      {event.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserIcon />
                      {event.access}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "past" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <div
                  key={event.title}
                  className="group block p-8 border border-gray-200 rounded-2xl transition-all duration-300 relative overflow-hidden opacity-70 hover:opacity-100 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {event.tags.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md uppercase tracking-[0.5px] bg-gray-800 text-gray-300"
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-yellow-600 mb-3">
                    <CalendarIcon />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-[-0.3px]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-4 text-[0.8125rem] text-gray-400">
                    <span>Completed</span>
                    <span>Recording available</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_50%,#0D0D0D_100%)] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Don&apos;t just watch. Build.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            BOS events are designed for active founders. Apply to join and get
            access to every upcoming session.
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
