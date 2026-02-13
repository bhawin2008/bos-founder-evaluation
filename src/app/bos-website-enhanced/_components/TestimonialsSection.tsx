const testimonials = [
  {
    quote:
      "\u201CBOS gave me the operating system I didn\u2019t know I was missing. Revenue became predictable within 3 months of applying the frameworks.\u201D",
    initials: "AK",
    name: "Arjun K.",
    role: "SaaS Founder, 12-person team",
  },
  {
    quote:
      "\u201CThe Decision OS alone saved me from a bad hire that would have cost us 6 months. The frameworks are practical, not theoretical.\u201D",
    initials: "SP",
    name: "Sarah P.",
    role: "Agency Founder, bootstrapped",
  },
  {
    quote:
      "\u201CI went from doing everything myself to having a team that executes without me. The Leadership Systems module changed how I run my company.\u201D",
    initials: "MR",
    name: "Marcus R.",
    role: "Dev Shop Founder, 20+ team",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-[120px] max-[900px]:py-20" id="proof">
      <div className="max-w-[1080px] mx-auto px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-gray-400 mb-4">
          From the Community
        </span>
        <h2 className="text-[2.5rem] font-extrabold leading-[1.15] tracking-[-1px] mb-4 max-[900px]:text-[2rem] max-sm:text-[1.75rem]">
          What founders say.
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-14 max-[900px]:grid-cols-1 max-[900px]:max-w-[520px]">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 border border-gray-200 rounded-xl transition-all hover:border-gray-400 hover:-translate-y-0.5"
            >
              <p className="text-[0.9375rem] text-gray-600 leading-[1.7] mb-6 italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#171717] text-yellow-400 text-xs font-extrabold rounded-full">
                  {t.initials}
                </div>
                <div>
                  <span className="block text-sm font-bold text-[#0A0A0A]">
                    {t.name}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
