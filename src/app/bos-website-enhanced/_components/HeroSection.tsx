const stats = [
  { num: "5", label: "Core Systems" },
  { num: "52", label: "Sessions / Year" },
  { num: "6", label: "Bottlenecks Solved" },
];

export default function HeroSection() {
  return (
    <section className="pt-[180px] pb-[120px] max-w-[720px] mx-auto text-left px-6 max-[900px]:pt-[140px] max-[900px]:pb-20 max-sm:pt-[120px] max-sm:pb-16">
      <div className="inline-block text-[0.8125rem] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-full mb-6">
        Trusted by 200+ IT founders
      </div>

      <h1 className="text-[3.5rem] font-extrabold leading-[1.1] tracking-[-2px] mb-6 text-[#0A0A0A] max-[900px]:text-[2.5rem] max-[900px]:tracking-[-1.5px] max-sm:text-[2rem] max-sm:tracking-[-1px]">
        Build a business that{" "}
        <span className="text-yellow-600">runs without you.</span>
      </h1>

      <p className="text-lg text-gray-500 leading-7 max-w-[540px] mb-10 max-sm:text-base">
        BOS is a private founder community and operating system for serious IT
        founders who want structure, clarity, and sustainable growth — not hype.
      </p>

      <div className="flex gap-3 mb-14 max-sm:flex-col">
        <a
          href="#apply"
          className="inline-flex items-center justify-center px-7 py-3 text-[0.9375rem] font-semibold rounded-lg bg-[#0A0A0A] text-white transition-all hover:bg-gray-800 hover:-translate-y-px max-sm:w-full max-sm:text-center"
        >
          Apply Now
        </a>
        <a
          href="#framework"
          className="inline-flex items-center justify-center px-7 py-3 text-[0.9375rem] font-semibold rounded-lg bg-transparent text-gray-600 border border-gray-300 transition-all hover:text-[#0A0A0A] hover:border-gray-500 max-sm:w-full max-sm:text-center"
        >
          Explore Framework
        </a>
      </div>

      <div className="flex items-center gap-8 pt-10 border-t border-gray-200 max-[900px]:gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-5">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8 max-[900px]:gap-6 max-sm:gap-5">
            {i > 0 && (
              <div className="w-px h-10 bg-gray-200 max-sm:w-10 max-sm:h-px" />
            )}
            <div>
              <span className="block text-[2rem] font-extrabold tracking-[-1px] text-[#0A0A0A]">
                {stat.num}
              </span>
              <span className="block text-[0.8125rem] text-gray-400 font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
