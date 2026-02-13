import Link from "next/link";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-yellow-600 min-w-[16px]">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ProgramsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-20 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Programs
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Choose your path.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-[560px]">
            Structured programs designed for every stage of the founder journey.
            From first systems to scaling mastery.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full md:max-w-none">
            {/* BOS Basics */}
            <Link
              href="/bos-website/programs/bos-basics"
              className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)] bg-white"
            >
              <div className="p-7 pb-6 bg-gradient-to-br from-[#0D0D0D] to-gray-900 relative overflow-hidden">
                <div className="absolute top-[-50%] right-[-30%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,transparent_70%)] pointer-events-none" />
                <span className="inline-flex px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[1px] bg-yellow-400/20 text-yellow-400 rounded-md mb-4 relative z-10">
                  Foundation
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-[-0.5px] relative z-10">
                  BOS Basics
                </h3>
              </div>
              <div className="p-7 pt-6 flex-1 flex flex-col">
                <p className="text-[0.9375rem] text-gray-500 leading-relaxed mb-5 flex-1">
                  The essential 8-week operating system for early-stage IT
                  founders. Build your first business systems for revenue,
                  positioning, and decision-making.
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    8 weeks, structured curriculum
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    Weekly live sessions
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    5 core frameworks included
                  </div>
                </div>
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-[#0A0A0A] transition-all group-hover:gap-3 group-hover:text-yellow-600">
                  Learn more &rarr;
                </span>
              </div>
            </Link>

            {/* BOS Elite */}
            <Link
              href="/bos-website/programs/bos-elite"
              className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)] bg-white"
            >
              <div className="p-7 pb-6 bg-gradient-to-br from-[#0D0D0D] to-gray-900 relative overflow-hidden">
                <div className="absolute top-[-50%] right-[-30%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,transparent_70%)] pointer-events-none" />
                <span className="inline-flex px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[1px] bg-yellow-400/20 text-yellow-400 rounded-md mb-4 relative z-10">
                  Advanced
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-[-0.5px] relative z-10">
                  BOS Elite
                </h3>
              </div>
              <div className="p-7 pt-6 flex-1 flex flex-col">
                <p className="text-[0.9375rem] text-gray-500 leading-relaxed mb-5 flex-1">
                  The 12-week intensive for founders scaling past $200K/month.
                  Advanced frameworks for leadership, team building, and
                  operational excellence.
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    12 weeks, deep-dive format
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    1-on-1 founder advisory
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    Exclusive founder network
                  </div>
                </div>
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-[#0A0A0A] transition-all group-hover:gap-3 group-hover:text-yellow-600">
                  Learn more &rarr;
                </span>
              </div>
            </Link>

            {/* LinkedIn Marathon */}
            <Link
              href="/bos-website/programs/linkedin-marathon"
              className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)] bg-white"
            >
              <div className="p-7 pb-6 bg-gradient-to-br from-[#0D0D0D] to-gray-900 relative overflow-hidden">
                <div className="absolute top-[-50%] right-[-30%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,transparent_70%)] pointer-events-none" />
                <span className="inline-flex px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[1px] bg-yellow-400/20 text-yellow-400 rounded-md mb-4 relative z-10">
                  Sprint
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-[-0.5px] relative z-10">
                  LinkedIn Marathon
                </h3>
              </div>
              <div className="p-7 pt-6 flex-1 flex flex-col">
                <p className="text-[0.9375rem] text-gray-500 leading-relaxed mb-5 flex-1">
                  30-day personal branding sprint. Build your LinkedIn authority
                  engine with proven content frameworks, engagement systems, and
                  lead-generation strategies.
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    30 days, daily actions
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    Content templates &amp; frameworks
                  </div>
                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-600">
                    <CheckIcon />
                    Group accountability
                  </div>
                </div>
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-[#0A0A0A] transition-all group-hover:gap-3 group-hover:text-yellow-600">
                  Learn more &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Compare
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Find your fit.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mb-14">
            Not sure which program is right? Here&apos;s a quick comparison.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              {[
                { letter: "B", title: "BOS Basics", desc: "Best for: Pre-revenue to $50K/mo founders who need their first systems. Focus: Foundation frameworks, initial revenue engine, positioning clarity." },
                { letter: "E", title: "BOS Elite", desc: "Best for: $200K+/mo founders ready to scale operations and leadership. Focus: Team building, delegation, advanced revenue, operational excellence." },
                { letter: "L", title: "LinkedIn Marathon", desc: "Best for: Any founder wanting to build authority and generate inbound leads. Focus: Content strategy, personal brand, LinkedIn growth engine." },
              ].map((item) => (
                <div key={item.letter} className="flex gap-4 items-start">
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400/15 rounded-[10px] text-yellow-400 font-extrabold text-sm">
                    {item.letter}
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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 flex flex-col gap-6 relative overflow-hidden self-stretch">
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,transparent_70%)] pointer-events-none" />
              {[
                { title: "All programs include", desc: "Live sessions, frameworks, templates, community access, and accountability check-ins." },
                { title: "Battle-tested by founders", desc: "Every framework has been used by real IT founders in real businesses with measurable results." },
                { title: "Structured for execution", desc: "Not just learning — every session ends with specific action items you implement that week." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start relative z-10">
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400/15 rounded-[10px] text-yellow-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
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
            Ready to start building systems?
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            Apply to BOS and we&apos;ll help you choose the right program for
            your stage.
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
