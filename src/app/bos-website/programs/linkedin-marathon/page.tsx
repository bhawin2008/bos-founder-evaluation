import Link from "next/link";

export default function LinkedInMarathonPage() {
  return (
    <>
      {/* Program Hero */}
      <section className="pt-[150px] pb-20 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1500_40%,#0D0D0D_100%)] text-white relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(250,204,21,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1120px] mx-auto px-6 relative z-10">
          <span className="inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-[1.5px] bg-yellow-400/15 text-yellow-400 rounded-lg mb-5">
            Sprint Program
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-2px] leading-[1.05] mb-5">
            LinkedIn Marathon
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-[600px] mb-8">
            30 days to build a LinkedIn authority engine that generates inbound
            leads. Not vanity metrics — real business results from personal
            branding.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
            {[
              { label: "Duration", value: "30 Days" },
              { label: "Format", value: "Daily Actions" },
              { label: "Ideal For", value: "All Stages" },
              { label: "Next Sprint", value: "March 2026" },
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
                Why LinkedIn matters for founders
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                Your reputation is your most asymmetric growth lever. While
                competitors are spending thousands on ads, the smartest IT
                founders are building personal brands that generate inbound
                leads, attract top talent, and open partnership doors — all
                organically.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                The LinkedIn Marathon isn&apos;t about becoming an
                &quot;influencer.&quot; It&apos;s about building a systematic
                content engine that positions you as the authority in your space.
                This is the Reputation Engine pillar of BOS, condensed into an
                actionable 30-day sprint.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                How it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: "30 content templates", desc: "One ready-to-customize template per day" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Daily micro-actions", desc: "15-minute tasks that compound over 30 days" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Sprint community", desc: "Daily check-ins with fellow founders" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-600 min-w-[20px] mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>, title: "Profile optimization", desc: "Complete LinkedIn profile overhaul guide" },
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
                The 30-day journey
              </h2>
              {[
                { period: "Week 1 — Foundation (Days 1-7)", desc: "Profile optimization, content pillars definition, audience mapping, and your first 7 posts using proven frameworks. By day 7, your profile will be optimized for discovery and conversion." },
                { period: "Week 2 — Momentum (Days 8-14)", desc: "Story-based content, engagement strategies, commenting system, and connection building. This is where you start seeing real traction and building consistency." },
                { period: "Week 3 — Authority (Days 15-21)", desc: "Thought leadership posts, carousel creation, poll strategies, and content that demonstrates deep expertise. Your engagement rates should be climbing significantly by now." },
                { period: "Week 4 — Conversion (Days 22-30)", desc: "Lead-generating content, DM strategies, lead magnet integration, and building a sustainable posting system that runs beyond the sprint. The goal: a content engine that works without you thinking about it." },
              ].map((w) => (
                <p key={w.period} className="text-base text-gray-600 leading-[1.8] mb-4">
                  <strong>{w.period}.</strong> {w.desc}
                </p>
              ))}

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                What you&apos;ll walk away with
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                After 30 days, you&apos;ll have: an optimized LinkedIn profile
                that converts visitors, 30+ published posts with growing
                engagement, a documented content strategy with 90 days of
                planned posts, a commenting and engagement system, and a clear
                understanding of what content resonates with your audience.
              </p>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                Most importantly, you&apos;ll have built the habit. The Marathon
                is designed to make consistent content creation feel natural —
                not like a chore.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                Who this is for
              </h2>
              <p className="text-base text-gray-600 leading-[1.8] mb-4">
                The LinkedIn Marathon is open to IT founders at any revenue
                stage. Whether you&apos;re pre-revenue and want to build
                authority before launching, or scaling and want to add an
                inbound channel — this sprint works. The only requirement: you
                need to commit 30-45 minutes per day for 30 consecutive days.
              </p>

              <h2 className="text-[1.75rem] font-extrabold tracking-[-0.5px] mb-5 mt-12">
                What founders say
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { quote: "I went from 200 followers and zero leads to 4,500 followers and 3 inbound clients in 30 days. The templates made it so easy to start. Now I post every day without even thinking about it.", initials: "MK", name: "Mikhail K.", role: "Founder, DevOps.Studio" },
                  { quote: "I was skeptical about LinkedIn. But the Marathon framework is different — it's not about being loud, it's about being useful. My content now generates 2-3 qualified leads per week on autopilot.", initials: "NP", name: "Nina P.", role: "Co-founder, CyberShield Tech" },
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
                  Join the next sprint
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">
                  Next LinkedIn Marathon starts March 2026. Open to BOS members
                  and non-members.
                </p>
                <Link
                  href="/bos-website/apply"
                  className="relative z-10 inline-flex items-center justify-center w-full px-9 py-4 text-base font-bold rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-[#0A0A0A] shadow-[0_2px_12px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(250,204,21,0.4)] transition-all"
                >
                  Join Sprint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
