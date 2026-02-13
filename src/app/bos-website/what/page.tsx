import Link from "next/link";

export default function WhatPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Understanding BOS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            What is BOS?
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[560px]">
            A structured operating system for running your founder life — not
            another course, community, or coaching program.
          </p>
        </div>
      </section>

      {/* What BOS Is / Is Not */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-5">
                What BOS <span className="text-yellow-600">is</span>
              </h3>
              <ul className="space-y-3.5">
                {[
                  "A structured operating system for running your founder life",
                  "A private community of serious IT founders",
                  "Frameworks for revenue, positioning, decisions, and leadership",
                  "Accountability and clarity, delivered weekly",
                  "A system that compounds — not a one-time event",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 text-[0.9375rem] text-gray-600 leading-relaxed"
                  >
                    <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-yellow-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5">
                What BOS is <span className="text-yellow-600">not</span>
              </h3>
              <ul className="space-y-3.5">
                {[
                  "Not a course or coaching program",
                  "Not a networking group with no structure",
                  "Not a motivational community",
                  "Not for passive learners or spectators",
                  "Not a shortcut — it's a system",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 text-[0.9375rem] text-gray-600 leading-relaxed"
                  >
                    <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-gray-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Problems */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            The Reality
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Problems we solve.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mb-14">
            Most IT founders share the same six bottlenecks. BOS was built to
            address each one systematically.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Revenue unpredictability", desc: "Feast-or-famine cycles with no reliable pipeline or process behind growth." },
              { num: "02", title: "Founder dependency", desc: "The business stalls the moment you step away. Everything runs through you." },
              { num: "03", title: "Weak positioning", desc: "You're good at what you do, but the market can't tell you apart from the noise." },
              { num: "04", title: "No systems", desc: "Operations, hiring, delivery — all running on improvisation instead of process." },
              { num: "05", title: "Decision fatigue", desc: "Too many choices, not enough frameworks. Every decision feels heavy." },
              { num: "06", title: "Sales inconsistency", desc: "You know how to build, but selling feels unnatural and unpredictable." },
            ].map((problem) => (
              <div
                key={problem.num}
                className="group p-7 border border-gray-800 rounded-2xl transition-all relative overflow-hidden hover:border-gray-600 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="block text-xs font-bold text-yellow-400 tracking-[1px] mb-4">
                  {problem.num}
                </span>
                <h3 className="text-[1.0625rem] font-bold mb-2 text-white">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Ready to see the system?
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mx-auto mb-10">
            Explore the five frameworks that make up BOS.
          </p>
          <Link
            href="/bos-website/framework"
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl bg-[#0A0A0A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all"
          >
            Explore Framework
          </Link>
        </div>
      </section>
    </>
  );
}
