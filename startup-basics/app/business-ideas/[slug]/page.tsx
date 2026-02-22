import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { businessIdeas } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return businessIdeas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = businessIdeas.find((i) => i.slug === slug);
  if (!idea) return { title: "Idea Not Found" };
  return {
    title: idea.title,
    description: idea.summary,
  };
}

export default async function BusinessIdeaDetail({ params }: PageProps) {
  const { slug } = await params;
  const idea = businessIdeas.find((i) => i.slug === slug);
  if (!idea) notFound();

  return (
    <>
      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/business-ideas" className="text-sm text-accent hover:underline mb-4 inline-block">
            &larr; All Business Ideas
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full">
              {idea.category}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              idea.difficulty === "Easy"
                ? "text-green-600 bg-green-50"
                : idea.difficulty === "Medium"
                ? "text-amber-600 bg-amber-50"
                : "text-red-500 bg-red-50"
            }`}>
              {idea.difficulty}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{idea.title}</h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">{idea.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Card hover={false} className="text-center">
              <div className="text-lg font-bold text-accent">{idea.investment}</div>
              <div className="text-xs text-text-secondary mt-1">Est. Investment</div>
            </Card>
            <Card hover={false} className="text-center">
              <div className={`text-lg font-bold ${
                idea.difficulty === "Easy" ? "text-green-600" : idea.difficulty === "Medium" ? "text-amber-600" : "text-red-500"
              }`}>
                {idea.difficulty}
              </div>
              <div className="text-xs text-text-secondary mt-1">Difficulty Level</div>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">The Problem</h2>
              <p className="text-text-secondary leading-relaxed">{idea.problem}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">The Opportunity</h2>
              <p className="text-text-secondary leading-relaxed">{idea.opportunity}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Monetization Strategy</h2>
              <p className="text-text-secondary leading-relaxed">{idea.monetization}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-accent-bg rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-primary mb-2">Want to build this?</h3>
            <p className="text-text-secondary mb-6">
              Join our cohort and get expert guidance to turn this idea into a real business.
            </p>
            <Button href="/programs">Apply for the Cohort</Button>
          </div>
        </div>
      </section>
    </>
  );
}
