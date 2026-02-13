import Link from "next/link";

export default function FrameworkPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            The System
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            The BOS Framework.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[560px]">
            Five interconnected systems that give you structure across every
            dimension of founder life.
          </p>
        </div>
      </section>

      {/* Framework Cards */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { code: "RE", title: "Reputation Engine", desc: "Build authority through structured content, positioning, and founder branding. Become the obvious choice in your space." },
              { code: "SS", title: "Sell Without Selling", desc: "A system for inbound revenue that doesn't require cold outreach or performance. Attract, don't chase." },
              { code: "DO", title: "Founder Decision OS", desc: "Frameworks for making high-stakes decisions with clarity. Reduce regret, increase speed, eliminate overthinking." },
              { code: "LS", title: "Leadership Systems", desc: "Hire, delegate, and lead without micromanaging. Build teams that execute without constant founder input." },
              { code: "EX", title: "Execution Systems", desc: "Operational playbooks for delivery, project flow, and founder productivity. Ship consistently, not reactively." },
            ].map((fw) => (
              <div
                key={fw.code}
                className="group p-9 border border-gray-200 rounded-2xl transition-all duration-300 relative overflow-hidden hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-yellow-400 text-[0.8125rem] font-extrabold tracking-[0.5px] rounded-xl mb-5">
                  {fw.code}
                </div>
                <h3 className="text-[1.0625rem] font-bold mb-2">{fw.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {fw.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            See how these frameworks are delivered.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            BOS isn&apos;t just theory. It&apos;s a structured weekly cadence
            designed for action.
          </p>
          <Link
            href="/bos-website/how"
            className="inline-flex items-center justify-center px-9 py-4 text-base font-bold rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(250,204,21,0.4)] transition-all"
          >
            See How It Works
          </Link>
        </div>
      </section>
    </>
  );
}
