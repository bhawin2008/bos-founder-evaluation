import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real success stories from Startup Basics alumni — see how founders turned ideas into thriving businesses.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Case Studies"
            title="Real Founders, Real Results"
            subtitle="Every startup has a story. Here are some of ours — the challenges, the breakthroughs, and the outcomes."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
                <Card className="h-full flex flex-col">
                  <span className="inline-block text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full mb-3 self-start">
                    {cs.category}
                  </span>
                  <h3 className="text-xl font-semibold text-primary mb-2">{cs.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">{cs.summary}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(cs.metrics).map(([key, val]) => (
                      <div key={key} className="text-center bg-surface rounded-lg py-2.5">
                        <div className="text-sm font-bold text-accent">{val}</div>
                        <div className="text-xs text-text-secondary capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-sm font-semibold text-accent">
                    Read Full Story &rarr;
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
