import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-20 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(234,179,8,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Built by founders,
            <br />
            for founders.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[560px]">
            BOS exists because building a company shouldn&apos;t mean building
            alone. We created the system we wished we had.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
                <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
                The Beginning
              </span>
              <h2 className="text-3xl font-extrabold tracking-[-1px] mb-5 leading-[1.15]">
                We started BOS because the founder journey was broken.
              </h2>
              <p className="text-base text-gray-500 leading-[1.8] mb-4">
                In 2024, a small group of IT founders realized something: they
                were all solving the same problems in isolation. Revenue
                plateaus. Hiring mistakes. Decision paralysis. The information
                existed — scattered across books, podcasts, and expensive
                masterminds — but none of it was structured for the way founders
                actually operate.
              </p>
              <p className="text-base text-gray-500 leading-[1.8] mb-4">
                So we built BOS — a Business Operating System. Not another
                community. Not another course. A structured system that gives
                founders clarity on what to do, when to do it, and how to
                execute — across every dimension of building a company.
              </p>
              <p className="text-base text-gray-500 leading-[1.8]">
                Today, BOS serves serious IT founders across multiple countries
                — from pre-revenue builders to companies doing $500K+/month. The
                common thread isn&apos;t revenue stage. It&apos;s the mindset:
                systems over chaos, long-term over hacks, substance over hype.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,transparent_70%)] pointer-events-none" />
              {[
                { num: "01", title: "Identify the gap", desc: "Founders building alone, making preventable mistakes repeatedly" },
                { num: "02", title: "Design the system", desc: "Structured frameworks for revenue, positioning, decisions, and leadership" },
                { num: "03", title: "Build the community", desc: "Curate a selective group of serious founders who push each other forward" },
                { num: "04", title: "Deliver weekly", desc: "Live sessions, templates, accountability, and real-time founder support" },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 items-start relative z-10">
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400/15 rounded-[10px] text-yellow-400 font-extrabold text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-white mb-0.5">
                      {step.title}
                    </h4>
                    <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-28 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Active founders" },
              { number: "12+", label: "Countries represented" },
              { number: "200+", label: "Sessions delivered" },
              { number: "50+", label: "Frameworks & playbooks" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-10 border border-gray-800 rounded-2xl transition-all hover:border-yellow-400 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl font-black tracking-[-2px] leading-none mb-2 bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            What We Believe
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Our mission.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mb-14">
            To give every serious IT founder the structured operating system,
            community, and accountability they need to build a business that runs
            — and a life worth living.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Structure creates freedom", desc: "When your business runs on systems, your mind is free to think strategically instead of reactively. We build frameworks that eliminate guesswork." },
              { title: "Quality over quantity", desc: "We keep BOS selective because density of talent matters. Every member is vetted. Every interaction has weight. No passengers." },
              { title: "Execution beats theory", desc: "Every framework we teach has been battle-tested by real founders in real businesses. If it doesn't work in practice, it doesn't make the cut." },
              { title: "Sustainable growth wins", desc: "We don't celebrate hustle culture. We celebrate founders who build revenue machines that don't require 80-hour weeks to sustain." },
              { title: "Reputation compounds", desc: "Personal branding isn't vanity — it's the most asymmetric growth lever a founder has. We help you build one that lasts decades." },
              { title: "The long game always wins", desc: "Quick hacks create debt. Real systems create compounding returns. Everything we teach is designed for multi-year payoff, not quick fixes." },
            ].map((value) => (
              <div
                key={value.title}
                className="p-9 border border-gray-200 rounded-2xl transition-all hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-xl mb-5 text-2xl">
                  &#9670;
                </div>
                <h3 className="text-[1.0625rem] font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What BOS Does */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            What We Do
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            More than a community.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mb-14">
            BOS operates across three pillars — each designed to accelerate how
            you build, lead, and grow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-7">
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
                  title: "Structured Programs",
                  desc: "Multi-week programs designed for specific founder stages — from BOS Basics for early-stage to BOS Elite for scaling founders, plus our LinkedIn Marathon for personal branding.",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  title: "Live Events & Sessions",
                  desc: "Weekly deep-dives, monthly open mics, quarterly reviews, and exclusive founder summits. Every event is designed for action, not passive consumption.",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                  title: "Frameworks & Resources",
                  desc: "A library of battle-tested playbooks, systems, templates, and guides across marketing, revenue, leadership, technology, and operations.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400/15 rounded-[10px] text-yellow-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-7">
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  title: "Founder Community",
                  desc: "A curated network of serious IT founders who share problems, solutions, and accountability. No lurkers. No spectators. Only builders.",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                  title: "Accountability System",
                  desc: "Monthly check-ins, progress tracking, and peer commitment loops that ensure you don't just learn — you execute and measure results.",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  title: "Ongoing Support",
                  desc: "Direct access to experienced founders and BOS mentors. Real-time problem-solving when you need it most — not on someone else's schedule.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400/15 rounded-[10px] text-yellow-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_50%,#0D0D0D_100%)] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Ready to build with structure?
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            Join 150+ IT founders who&apos;ve replaced chaos with systems.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/bos-website/apply"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-bold rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(250,204,21,0.4)] transition-all"
            >
              Apply to BOS
            </Link>
            <Link
              href="/bos-website/programs"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl bg-transparent text-gray-400 border-[1.5px] border-gray-700 hover:text-white hover:border-gray-400 hover:-translate-y-px transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
