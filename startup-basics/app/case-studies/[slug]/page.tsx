import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { caseStudies } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: cs.title,
    description: cs.summary,
  };
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="text-sm text-accent hover:underline mb-4 inline-block">
            &larr; All Case Studies
          </Link>
          <span className="block text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full mb-4 self-start w-fit">
            {cs.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{cs.title}</h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">{cs.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {Object.entries(cs.metrics).map(([key, val]) => (
              <Card key={key} hover={false} className="text-center">
                <div className="text-xl font-bold text-accent">{val}</div>
                <div className="text-xs text-text-secondary capitalize mt-1">{key}</div>
              </Card>
            ))}
          </div>

          {/* Story */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">The Challenge</h2>
              <p className="text-text-secondary leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">The Solution</h2>
              <p className="text-text-secondary leading-relaxed">{cs.solution}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">The Result</h2>
              <p className="text-text-secondary leading-relaxed">{cs.result}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-accent-bg rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-primary mb-2">Want results like these?</h3>
            <p className="text-text-secondary mb-6">Join our next cohort and build your startup with expert guidance.</p>
            <Button href="/programs">Apply for the Cohort</Button>
          </div>
        </div>
      </section>
    </>
  );
}
