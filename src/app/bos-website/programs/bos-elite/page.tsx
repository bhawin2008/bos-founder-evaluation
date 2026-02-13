import Link from "next/link";

export default function BosElitePage() {
  return (
    <>
      {/* Program Hero */}
      <section className="pt-[150px] pb-20 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_40%,#0D0D0D_100%)] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(250,204,21,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-[1.5px] bg-yellow-400/15 text-yellow-400 rounded-lg mb-5">
            Advanced Program
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-2px] leading-[1.05] mb-5">
            BOS Elite
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-[600px] mb-8">
            The 12-week intensive for founders who&apos;ve outgrown the basics.
            Advanced systems for scaling leadership, operations, and revenue past
            $200K/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
            {[
              { label: "Duration", value: "12 Weeks" },
              { label: "Format", value: "Live + 1-on-1" },
              { label: "Ideal For", value: "$200K+/mo" },
              { label: "Next Cohort", value: "May 2026" },
            ].map((meta) => (
              <div key={meta.label} className="flex flex-col gap-1">
                <span className="text-[0.6875rem] font-bold uppercase tracking-[1.5px] text-gray-500">
                  {meta.label}
                </span>
                <span className="text-[1.0625rem] font-bold text-white">
                  {meta.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Content */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
            <div>
              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5">
                Beyond the basics
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                You&apos;ve built a business that works. Revenue is flowing.
                Clients are happy. But you&apos;ve hit a ceiling — and it&apos;s
                not a market problem. It&apos;s an operations problem. A
                leadership problem. A &quot;how do I scale myself&quot; problem.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                BOS Elite is designed for founders who&apos;ve mastered the
                fundamentals and need to build second-order systems: leadership
                frameworks that let you step back, operational playbooks that
                scale with headcount, and revenue engines that don&apos;t
                require your personal involvement.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                How it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, title: "1-on-1 advisory", desc: "Bi-weekly sessions with a senior BOS advisor" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: "Advanced frameworks", desc: "Scaling-specific playbooks and systems" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Elite cohort", desc: "Max 10 founders per cohort" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Deep-dive format", desc: "2-hour weekly sessions with hot seats" },
                ].map((b) => (
                  <div key={b.title} className="flex gap-3 items-start p-4 border border-gray-200 rounded-xl transition-all hover:border-yellow-400 hover:bg-yellow-400/[0.02]">
                    {b.icon}
                    <div>
                      <h4 className="text-[0.9375rem] font-semibold mb-0.5">{b.title}</h4>
                      <p className="text-[0.8125rem] text-gray-500 mb-0">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                12-week curriculum
              </h2>
              {[
                { weeks: "Weeks 1-2", title: "Organizational Architecture", desc: "Design your company structure for the next stage. Role mapping, org chart evolution, and the founder's changing role." },
                { weeks: "Weeks 3-4", title: "Leadership Systems", desc: "Build frameworks for hiring leaders, not just doers. Management operating systems, 1-on-1 structures, and performance frameworks." },
                { weeks: "Weeks 5-6", title: "Revenue at Scale", desc: "Evolve from founder-led sales to a revenue team. Building sales playbooks, training systems, and compensation structures." },
                { weeks: "Weeks 7-8", title: "Operational Excellence", desc: "Create SOPs, quality assurance systems, and delivery frameworks that maintain quality as you grow." },
                { weeks: "Weeks 9-10", title: "Financial Intelligence", desc: "Advanced financial modeling, cash flow management, pricing optimization, and profit margin engineering." },
                { weeks: "Weeks 11-12", title: "Strategic Vision", desc: "Build your 3-year strategic plan. Market expansion, product evolution, potential exits, and legacy planning." },
              ].map((w) => (
                <p key={w.weeks} className="text-base text-gray-600 leading-[1.8] mb-4">
                  <strong>{w.weeks} — {w.title}.</strong> {w.desc}
                </p>
              ))}

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                Who this is for
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                BOS Elite is exclusively for IT founders doing $200K+ per month
                in revenue with a team of 10+ people. You should have completed
                BOS Basics or have equivalent foundational systems in place.
                This program is for founders who are ready to transition from
                operator to leader.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                If you&apos;re still doing most of the selling, most of the
                delivery, or most of the strategic thinking — and you know
                that&apos;s unsustainable — Elite is designed to fix that.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                What founders say
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { quote: "Elite helped me hire my first two senior leaders. Within 6 months, I went from working 60-hour weeks to 35 — while revenue grew 40%. The advisory sessions alone were worth 10x the investment.", initials: "RJ", name: "Raj J.", role: "CEO, TechForge Systems" },
                  { quote: "The Elite cohort is different. Everyone in the room has real problems at real scale. The conversations alone changed how I think about building a company. I've 3x'd my team since graduating.", initials: "LW", name: "Lisa W.", role: "Founder, Nexus Digital" },
                ].map((t) => (
                  <div key={t.initials} className="p-8 border border-gray-200 rounded-2xl transition-all hover:border-yellow-400 hover:-translate-y-0.5 hover:shadow-md">
                    <p className="text-[0.9375rem] text-gray-600 leading-relaxed mb-5 italic">
                      <span className="text-3xl font-black text-yellow-400 leading-none relative top-2 mr-1">&ldquo;</span>
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-sm font-bold text-[#0A0A0A]">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0A0A0A]">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="p-8 bg-gradient-to-br from-[#0D0D0D] to-gray-900 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-[-30%] right-[-30%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h3 className="text-xl font-extrabold mb-3 relative z-10">
                  Apply for BOS Elite
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">
                  Next cohort starts May 2026. Limited to 10 founders.
                  Application includes a 30-minute screening call.
                </p>
                <Link
                  href="/bos-website/apply"
                  className="relative z-10 inline-flex items-center justify-center w-full px-9 py-4 text-base font-bold rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(250,204,21,0.4)] transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
