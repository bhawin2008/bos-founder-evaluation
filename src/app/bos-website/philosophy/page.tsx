import Link from "next/link";

export default function PhilosophyPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-[150px] pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-yellow-600 mb-4">
            <span className="w-6 h-0.5 bg-yellow-400 rounded-sm" />
            Our Beliefs
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-[-2px] mb-4">
            Founder philosophy.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[560px]">
            The principles that guide everything we build, teach, and practice
            inside BOS.
          </p>
        </div>
      </section>

      {/* Philosophy Cards */}
      <section className="py-28">
        <div className="max-w-[1120px] mx-auto px-6">
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
                className="group p-10 border border-gray-200 rounded-2xl transition-all duration-300 relative overflow-hidden hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_0_30px_rgba(250,204,21,0.15)]"
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
      <section className="py-28 bg-[#0D0D0D] text-white">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[2.75rem] font-black leading-[1.1] tracking-[-1.5px] mb-4">
            Aligned? Let&apos;s talk.
          </h2>
          <p className="text-[1.0625rem] text-gray-400 leading-relaxed max-w-[520px] mx-auto mb-10">
            If these principles resonate, BOS might be the right fit for you.
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
