import Navigation from "./_components/Navigation";
import HeroSection from "./_components/HeroSection";
import ToolsSection from "./_components/ToolsSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import PricingSection from "./_components/PricingSection";
import FaqSection from "./_components/FaqSection";
import Footer from "./_components/Footer";

/* ------------------------------------------------------------------ */
/*  Static data arrays for the remaining sections that don't need     */
/*  their own component files per the spec.                           */
/* ------------------------------------------------------------------ */

const whatIs = [
  "A structured operating system for running your founder life",
  "A private community of serious IT founders",
  "Frameworks for revenue, positioning, decisions, and leadership",
  "Accountability and clarity, delivered weekly",
  "A system that compounds \u2014 not a one-time event",
];

const whatIsNot = [
  "Not a course or coaching program",
  "Not a networking group with no structure",
  "Not a motivational community",
  "Not for passive learners or spectators",
  "Not a shortcut \u2014 it\u2019s a system",
];

const problems = [
  {
    num: "01",
    title: "Revenue unpredictability",
    desc: "Feast-or-famine cycles with no reliable pipeline or process behind growth.",
  },
  {
    num: "02",
    title: "Founder dependency",
    desc: "The business stalls the moment you step away. Everything runs through you.",
  },
  {
    num: "03",
    title: "Weak positioning",
    desc: "You\u2019re good at what you do, but the market can\u2019t tell you apart from the noise.",
  },
  {
    num: "04",
    title: "No systems",
    desc: "Operations, hiring, delivery \u2014 all running on improvisation instead of process.",
  },
  {
    num: "05",
    title: "Decision fatigue",
    desc: "Too many choices, not enough frameworks. Every decision feels heavy.",
  },
  {
    num: "06",
    title: "Sales inconsistency",
    desc: "You know how to build, but selling feels unnatural and unpredictable.",
  },
];

const frameworks = [
  {
    icon: "RE",
    title: "Reputation Engine",
    desc: "Build authority through structured content, positioning, and founder branding. Become the obvious choice in your space.",
  },
  {
    icon: "SS",
    title: "Sell Without Selling",
    desc: "A system for inbound revenue that doesn\u2019t require cold outreach or performance. Attract, don\u2019t chase.",
  },
  {
    icon: "DO",
    title: "Founder Decision OS",
    desc: "Frameworks for making high-stakes decisions with clarity. Reduce regret, increase speed, eliminate overthinking.",
  },
  {
    icon: "LS",
    title: "Leadership Systems",
    desc: "Hire, delegate, and lead without micromanaging. Build teams that execute without constant founder input.",
  },
  {
    icon: "EX",
    title: "Execution Systems",
    desc: "Operational playbooks for delivery, project flow, and founder productivity. Ship consistently, not reactively.",
  },
];

const howItems = [
  {
    title: "Weekly live session",
    desc: "Structured deep-dive into one BOS framework topic. No fluff, no filler.",
  },
  {
    title: "Monthly open mic",
    desc: "Bring your hardest problem. Get direct input from experienced founders.",
  },
  {
    title: "Frameworks & templates",
    desc: "Ready-to-use tools for decisions, positioning, hiring, and operations.",
  },
  {
    title: "Founder discussions",
    desc: "Private threads with founders solving real problems in real time.",
  },
  {
    title: "Accountability layer",
    desc: "Monthly check-ins, progress tracking, and peer commitment loops.",
  },
];

const filterCards = [
  {
    title: "Employees",
    desc: "BOS is exclusively for founders and co-founders building their own companies.",
  },
  {
    title: "Idea-stage founders",
    desc: "You need an active product and some revenue. BOS is for builders, not dreamers.",
  },
  {
    title: "Shortcut seekers",
    desc: "There are no hacks here. Just systems that work when you put in the work.",
  },
  {
    title: "Passive learners",
    desc: "If you want to watch from the sidelines, this isn\u2019t the right fit.",
  },
];

const processSteps = [
  {
    num: "1",
    title: "Apply",
    desc: "Fill out a short application. Tell us about your business, stage, and what you\u2019re solving for.",
  },
  {
    num: "2",
    title: "Validation call",
    desc: "A 15-minute call to confirm fit. No pitch \u2014 just an honest conversation.",
  },
  {
    num: "3",
    title: "Selection",
    desc: "We review every application. Not everyone gets in. That\u2019s what makes it work.",
  },
  {
    num: "4",
    title: "Onboarding",
    desc: "Get access to frameworks, the community, and your first structured session.",
  },
];

const philosophyCards = [
  {
    highlight: "Peace",
    rest: "over pressure.",
    desc: "Building a company shouldn\u2019t destroy your health or relationships. Sustainable pace wins.",
  },
  {
    highlight: "Systems",
    rest: "over chaos.",
    desc: "Good systems free your mind. Bad habits trap it. We build the former.",
  },
  {
    highlight: "Reputation",
    rest: "over reach.",
    desc: "A strong reputation compounds. Vanity metrics don\u2019t. Play the long game.",
  },
  {
    highlight: "Long-term",
    rest: "over hacks.",
    desc: "Every shortcut has a debt. We build foundations that hold weight for years.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BosWebsiteEnhancedPage() {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <HeroSection />

      {/* What is BOS */}
      <section className="py-[120px] max-[900px]:py-20" id="what">
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
            Understanding BOS
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            What is BOS?
          </h2>

          <div className="grid grid-cols-2 gap-12 mt-14 max-sm:grid-cols-1 max-sm:gap-6">
            {/* What BOS IS */}
            <div>
              <h3 className="text-xl font-bold mb-5">
                What BOS <span className="text-yellow-600">is</span>
              </h3>
              <ul className="space-y-3.5">
                {whatIs.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] text-gray-600 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-yellow-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What BOS IS NOT */}
            <div>
              <h3 className="text-xl font-bold mb-5">
                What BOS is <span className="text-yellow-600">not</span>
              </h3>
              <ul className="space-y-3.5">
                {whatIsNot.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] text-gray-600 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Problems */}
      <section
        className="py-[120px] bg-[#171717] text-white max-[900px]:py-20"
        id="problems"
      >
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 mb-4">
            The Reality
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            Problems we solve.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
            Most IT founders share the same six bottlenecks. BOS was built to
            address each one systematically.
          </p>

          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {problems.map((p) => (
              <div
                key={p.num}
                className="p-8 border border-gray-800 rounded-xl transition-all hover:border-gray-600 hover:-translate-y-0.5"
              >
                <span className="block text-xs font-bold text-yellow-400 tracking-[1px] mb-4">
                  {p.num}
                </span>
                <h3 className="text-[1.0625rem] font-bold mb-2 text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOS Framework */}
      <section className="py-[120px] max-[900px]:py-20" id="framework">
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
            The System
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            The BOS Framework.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
            Five interconnected systems that give you structure across every
            dimension of founder life.
          </p>

          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {frameworks.map((f) => (
              <div
                key={f.icon}
                className="p-8 border border-gray-200 rounded-xl transition-all hover:border-yellow-400 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-[#171717] text-yellow-400 text-[0.8125rem] font-extrabold tracking-[0.5px] rounded-[10px] mb-5">
                  {f.icon}
                </div>
                <h3 className="text-[1.0625rem] font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.65]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Ecosystem */}
      <ToolsSection />

      {/* Testimonials / Social Proof */}
      <TestimonialsSection />

      {/* How It Works */}
      <section
        className="py-[120px] bg-[#171717] text-white max-[900px]:py-20"
        id="how"
      >
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 mb-4">
            The Structure
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            How it works.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
            BOS delivers value through a structured cadence, not random content
            drops.
          </p>

          <div className="flex flex-col max-w-[560px]">
            {howItems.map((item, i) => (
              <div
                key={item.title}
                className={`flex gap-5 py-7 ${
                  i < howItems.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
              >
                <span className="w-2 h-2 min-w-[8px] rounded-full bg-yellow-400 mt-2" />
                <div>
                  <h3 className="text-base font-bold mb-1 text-white">
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

      {/* Pricing */}
      <PricingSection />

      {/* Who Should NOT Join */}
      <section
        className="py-[120px] bg-[#171717] text-white max-[900px]:py-20"
        id="filter"
      >
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 mb-4">
            Honest Filter
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            Who should <span className="text-yellow-600">not</span> join.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
            BOS is selective by design. This isn&apos;t for everyone — and
            that&apos;s the point.
          </p>

          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-6">
            {filterCards.map((card) => (
              <div
                key={card.title}
                className="p-8 border border-gray-800 rounded-xl transition-colors hover:border-gray-600"
              >
                <div className="flex items-center justify-center w-7 h-7 bg-white/[0.06] text-gray-500 text-base font-semibold rounded-md mb-4">
                  &times;
                </div>
                <h3 className="text-base font-bold mb-1.5 text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Application Process */}
      <section
        className="py-[120px] bg-[#171717] text-white max-[900px]:py-20"
        id="apply"
      >
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 mb-4">
            Join BOS
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            Application process.
          </h2>
          <p className="text-[1.0625rem] text-gray-500 leading-[1.7] max-w-[520px] mb-14">
            We keep the bar high so every member gets maximum value.
          </p>

          {/* Desktop process steps */}
          <div className="hidden md:flex items-start mb-12">
            {processSteps.map((step, i) => (
              <div key={step.num} className="contents">
                <div className="flex-1 text-center px-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-[#0A0A0A] text-[0.9375rem] font-extrabold rounded-full mx-auto mb-5">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-10 min-w-[40px] h-px bg-gray-700 mt-5" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile process steps */}
          <div className="md:hidden mb-12">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-4 py-5 ${
                  i < processSteps.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
              >
                <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-yellow-400 text-[#0A0A0A] text-[0.9375rem] font-extrabold rounded-full">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.8125rem] text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-lg bg-yellow-400 text-[#0A0A0A] transition-all hover:bg-yellow-500 hover:-translate-y-px"
            >
              Apply to BOS
            </a>
          </div>
        </div>
      </section>

      {/* Founder Philosophy */}
      <section className="py-[120px] max-[900px]:py-20" id="philosophy">
        <div className="max-w-[1080px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
            Our Beliefs
          </span>
          <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
            Founder philosophy.
          </h2>

          <div className="grid grid-cols-2 gap-6 mt-14 max-sm:grid-cols-1">
            {philosophyCards.map((card) => (
              <div
                key={card.highlight}
                className="p-10 border border-gray-200 rounded-xl transition-all hover:border-yellow-400 hover:-translate-y-0.5"
              >
                <h3 className="text-2xl font-extrabold tracking-[-0.3px] mb-3">
                  <span className="text-yellow-600">{card.highlight}</span>{" "}
                  {card.rest}
                </h3>
                <p className="text-[0.9375rem] text-gray-500 leading-[1.7]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
