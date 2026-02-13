import Link from "next/link";

export default function BosBasicsPage() {
  return (
    <>
      {/* Program Hero */}
      <section className="pt-[150px] pb-20 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_40%,#0D0D0D_100%)] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(250,204,21,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-[1.5px] bg-yellow-400/15 text-yellow-400 rounded-lg mb-5">
            Foundation Program
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-2px] leading-[1.05] mb-5">
            BOS Basics
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-[600px] mb-8">
            The essential 8-week operating system for early-stage IT founders.
            Build your first business systems — the ones you&apos;ll run on for
            years.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
            {[
              { label: "Duration", value: "8 Weeks" },
              { label: "Format", value: "Live + Async" },
              { label: "Ideal For", value: "$0-$50K/mo" },
              { label: "Next Cohort", value: "April 2026" },
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
                What you&apos;ll build
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                BOS Basics isn&apos;t a course you watch — it&apos;s a system
                you build. Over 8 weeks, you&apos;ll create the foundational
                operating systems that every serious IT company needs. Each week
                focuses on one system, with a live session, framework template,
                and specific implementation actions.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                By the end of the program, you&apos;ll have a documented
                operating system covering your revenue pipeline, market
                positioning, decision-making processes, delivery workflow, and
                weekly execution rhythm. These aren&apos;t theoretical —
                they&apos;re the same systems used by BOS founders generating
                $100K-$500K/month.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                How it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, title: "Weekly live sessions", desc: "90-minute deep-dives every week" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: "Framework templates", desc: "Ready-to-use Notion/Docs templates" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Cohort community", desc: "Private group of 15-20 founders" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Weekly accountability", desc: "Check-ins and progress tracking" },
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
                8-week curriculum
              </h2>
              {[
                { week: "Week 1", title: "Founder Clarity", desc: "Define your ideal business model, revenue targets, and 12-month vision using the BOS Clarity Canvas." },
                { week: "Week 2", title: "Market Positioning", desc: "Use the Positioning Playbook to identify your niche, differentiation, and messaging that resonates with your ideal client." },
                { week: "Week 3", title: "Revenue Engine", desc: "Build your pipeline system from scratch using the Revenue Canvas. Map awareness, nurture, and close stages with specific actions." },
                { week: "Week 4", title: "Sell Without Selling", desc: "Design your inbound system: content strategy, lead magnets, and conversion triggers that bring clients to you." },
                { week: "Week 5", title: "Decision Framework", desc: "Install the Founder Decision OS for making high-stakes calls with confidence. Eliminate analysis paralysis permanently." },
                { week: "Week 6", title: "Delivery Systems", desc: "Create operational workflows for client delivery, project management, and quality assurance that don't depend on you." },
                { week: "Week 7", title: "Execution Rhythm", desc: "Build your Weekly CEO Operating Rhythm: time blocks, metrics reviews, team check-ins, and strategic thinking slots." },
                { week: "Week 8", title: "Integration & Launch", desc: "Connect all systems into a unified operating system. Set 90-day execution targets and graduation into the BOS community." },
              ].map((w) => (
                <p key={w.week} className="text-base text-gray-600 leading-[1.8] mb-4">
                  <strong>{w.week} — {w.title}.</strong> {w.desc}
                </p>
              ))}

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                Who this is for
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                BOS Basics is designed for IT founders who have a product or
                service with some traction but lack structured business systems.
                You might be a technical founder who&apos;s great at building
                but struggling with the business side. Or a service-based
                founder who&apos;s grown through referrals but needs a real
                growth engine.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                Ideal candidates are pre-revenue to $50K/month founders, solo
                founders or small teams (1-5 people), and anyone who&apos;s
                tired of running their business on improvisation.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                What founders say
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { quote: "BOS Basics gave me the structure I'd been craving for two years. Within 3 months of graduating, my revenue doubled because I finally had a real pipeline system.", initials: "AK", name: "Arjun K.", role: "Founder, CloudScale Solutions" },
                  { quote: "I've taken dozens of courses. BOS Basics is the first program where I actually built something I use every single day. The frameworks aren't theoretical — they're operational.", initials: "SM", name: "Sarah M.", role: "Co-founder, DataBridge AI" },
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
                  Join the next cohort
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">
                  Next cohort starts April 2026. Limited to 20 founders per
                  cohort to ensure quality interaction.
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
