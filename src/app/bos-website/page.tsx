import Link from "next/link";

export default function BosHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-28 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,transparent_70%)] pointer-events-none animate-pulse" />
        <div className="max-w-[760px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-yellow-600 uppercase tracking-[1.5px] mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            For serious IT founders
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-black leading-[1.05] tracking-[-2.5px] mb-6 text-[#0A0A0A]">
            Build a business that{" "}
            <span className="bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              runs without you.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-[540px] mb-10">
            BOS is a private founder community and structured operating system
            for IT founders who want clarity, systems, and sustainable growth —
            not hype.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Link
              href="/bos-website/apply"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl bg-[#0A0A0A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all w-full sm:w-auto text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/bos-website/programs"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-xl bg-transparent text-gray-600 border-[1.5px] border-gray-300 hover:text-[#0A0A0A] hover:border-[#0A0A0A] hover:-translate-y-px transition-all w-full sm:w-auto text-center"
            >
              Explore Programs
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-16 pt-10 border-t border-gray-200">
            {[
              { number: "150+", label: "Active founders" },
              { number: "12+", label: "Countries" },
              { number: "50+", label: "Frameworks" },
              { number: "3", label: "Programs" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-black tracking-[-1px] text-[#0A0A0A] leading-none mb-1">
                  {stat.number}
                </span>
                <span className="text-[0.8125rem] text-gray-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-28 relative">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            At a Glance
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            A system, not a shortcut.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mb-14">
            BOS gives founders the frameworks, community, and accountability to
            build companies that scale without burning out.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                href: "/bos-website/about",
                title: "About BOS",
                desc: "Our story, mission, and what drives a community of 150+ founders.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                ),
              },
              {
                href: "/bos-website/programs",
                title: "Programs",
                desc: "BOS Basics, BOS Elite, and LinkedIn Marathon — choose your path.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                ),
              },
              {
                href: "/bos-website/events",
                title: "Events",
                desc: "Live workshops, masterclasses, and founder sessions every week.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                ),
              },
              {
                href: "/bos-website/resources",
                title: "Resources",
                desc: "Frameworks, playbooks, systems, and guides — filtered by domain and type.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                ),
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block p-7 border border-gray-200 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl text-gray-600 mb-4">
                  {card.icon}
                </div>
                <h3 className="text-[1.0625rem] font-bold mb-1.5">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                <span className="absolute top-8 right-7 text-xl text-gray-300 transition-all group-hover:text-yellow-600 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-28 bg-[#0D0D0D] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,rgba(250,204,21,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(234,179,8,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_50%_80%,rgba(245,158,11,0.04)_0%,transparent_50%)] pointer-events-none animate-[meshFloat_20s_ease-in-out_infinite]" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-400 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Programs
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Structured paths for every stage.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mb-14">
            From first systems to scaling mastery — choose the program that
            matches your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/bos-website/programs/bos-basics",
                badge: "Foundation",
                title: "BOS Basics",
                desc: "8-week operating system for early-stage IT founders. Build your first business systems.",
              },
              {
                href: "/bos-website/programs/bos-elite",
                badge: "Advanced",
                title: "BOS Elite",
                desc: "12-week intensive for scaling founders. Leadership, operations, and advanced revenue.",
              },
              {
                href: "/bos-website/programs/linkedin-marathon",
                badge: "Sprint",
                title: "LinkedIn Marathon",
                desc: "30-day personal branding sprint. Build your LinkedIn authority engine.",
              },
            ].map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group flex flex-col border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(250,204,21,0.15)]"
              >
                <div className="p-7 pb-6 bg-gradient-to-br from-[#0D0D0D] to-gray-900 relative overflow-hidden">
                  <div className="absolute top-[-50%] right-[-30%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[1px] bg-yellow-400/20 text-yellow-400 rounded-md mb-4 relative z-10">
                    {program.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-[-0.5px] relative z-10">
                    {program.title}
                  </h3>
                </div>
                <div className="p-7 pt-6 flex-1 flex flex-col bg-[#0D0D0D]">
                  <p className="text-[0.9375rem] text-gray-400 leading-relaxed mb-5 flex-1">
                    {program.desc}
                  </p>
                  <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-yellow-400 transition-all group-hover:gap-3">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Preview */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Our Beliefs
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            What we stand for.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mb-14">
            These principles guide everything we build, teach, and practice
            inside BOS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                word: "Peace",
                rest: " over pressure.",
                desc: "Building a company shouldn't destroy your health or relationships. Sustainable pace wins.",
              },
              {
                word: "Systems",
                rest: " over chaos.",
                desc: "Good systems free your mind. Bad habits trap it. We build the former.",
              },
              {
                word: "Reputation",
                rest: " over reach.",
                desc: "A strong reputation compounds. Vanity metrics don't. Play the long game.",
              },
              {
                word: "Long-term",
                rest: " over hacks.",
                desc: "Every shortcut has a debt. We build foundations that hold weight for years.",
              },
            ].map((item) => (
              <div
                key={item.word}
                className="group p-9 border border-gray-200 rounded-2xl transition-all duration-300 relative overflow-hidden hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-yellow-400 to-amber-500 transition-all duration-400 group-hover:h-full rounded-br-sm" />
                <h3 className="text-2xl font-extrabold tracking-[-0.3px] mb-3">
                  <span className="text-yellow-600">{item.word}</span>
                  {item.rest}
                </h3>
                <p className="text-[0.9375rem] text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_50%,#0D0D0D_100%)] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Stop winging it. Start operating.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            Join 150+ IT founders who&apos;ve replaced chaos with systems,
            pressure with peace, and hacks with foundations.
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
