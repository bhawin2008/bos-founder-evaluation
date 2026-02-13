import Link from "next/link";

export default function HowPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            The Structure
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            How it works.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[560px]">
            BOS delivers value through a structured cadence, not random content
            drops.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-col max-w-[560px]">
            {[
              { title: "Weekly live session", desc: "Structured deep-dive into one BOS framework topic. No fluff, no filler." },
              { title: "Monthly open mic", desc: "Bring your hardest problem. Get direct input from experienced founders." },
              { title: "Frameworks & templates", desc: "Ready-to-use tools for decisions, positioning, hiring, and operations." },
              { title: "Founder discussions", desc: "Private threads with founders solving real problems in real time." },
              { title: "Accountability layer", desc: "Monthly check-ins, progress tracking, and peer commitment loops." },
            ].map((item, i, arr) => (
              <div
                key={item.title}
                className={`group flex gap-5 py-7 transition-all hover:pl-2 ${
                  i < arr.length - 1 ? "border-b border-gray-800" : ""
                }`}
              >
                <span className="w-2.5 h-2.5 min-w-[10px] rounded-full bg-yellow-400 mt-[7px] shadow-[0_0_12px_rgba(250,204,21,0.4)]" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should NOT Join */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Honest Filter
          </span>
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Who should <span className="text-yellow-600">not</span> join.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-relaxed max-w-[520px] mb-14">
            BOS is selective by design. This isn&apos;t for everyone — and
            that&apos;s the point.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Employees", desc: "BOS is exclusively for founders and co-founders building their own companies." },
              { title: "Idea-stage founders", desc: "You need an active product and some revenue. BOS is for builders, not dreamers." },
              { title: "Shortcut seekers", desc: "There are no hacks here. Just systems that work when you put in the work." },
              { title: "Passive learners", desc: "If you want to watch from the sidelines, this isn't the right fit." },
            ].map((card) => (
              <div
                key={card.title}
                className="p-7 border border-gray-200 rounded-2xl relative transition-all hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 text-lg font-bold rounded-lg mb-4">
                  &times;
                </div>
                <h3 className="text-base font-bold mb-1.5">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
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
            Sound like you?
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            If you&apos;re a serious IT founder ready to build with systems,
            start the application.
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
