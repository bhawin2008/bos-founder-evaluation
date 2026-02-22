import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore Startup Basics programs — our 12-week Startup Cohort and 1-on-1 Startup Consulting packages.",
};

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Programs"
            title="Choose Your Path to Launch"
            subtitle="Whether you want a structured program with a cohort of peers or personalized 1-on-1 guidance, we have the right program for your stage."
          />
        </div>
      </section>

      {/* Startup Cohort */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent bg-accent-bg px-3 py-1 rounded-full mb-4">
              Most Popular
            </span>
            <h2 className="text-3xl font-bold text-primary">{programs.cohort.title}</h2>
            <p className="text-lg text-text-secondary mt-2">{programs.cohort.subtitle}</p>
            <p className="text-text-secondary leading-relaxed mt-4">{programs.cohort.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.cohort.modules.map((mod) => (
              <Card key={mod.week}>
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                  Week {mod.week}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{mod.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{mod.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-accent/5 to-accent-bg rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary">Ready to join the next cohort?</h3>
                <p className="text-text-secondary mt-2">
                  Cohort 6 starts soon. Limited to 15 founders per cohort for personalized attention.
                </p>
              </div>
              <Button href="/contact" size="lg">{programs.cohort.cta}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Consulting */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-primary">{programs.consulting.title}</h2>
            <p className="text-lg text-text-secondary mt-2">{programs.consulting.subtitle}</p>
            <p className="text-text-secondary leading-relaxed mt-4">{programs.consulting.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.consulting.packages.map((pkg, i) => (
              <Card key={pkg.name} className={i === 1 ? "ring-2 ring-accent relative" : ""}>
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-accent px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-primary">{pkg.name}</h3>
                <p className="text-sm font-medium text-accent mt-1">{pkg.duration}</p>
                <p className="text-text-secondary text-sm leading-relaxed mt-3 mb-6">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={i === 1 ? "primary" : "outline"} className="w-full">
                  {programs.consulting.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-12 space-y-6">
            {[
              {
                q: "Do I need a technical background?",
                a: "No. Our cohort is designed for all backgrounds. We'll help you figure out how to build your MVP whether you code or not.",
              },
              {
                q: "What stage should my idea be at?",
                a: "Any stage — from a rough concept to an early prototype. The cohort is designed to take you from wherever you are to launch-ready.",
              },
              {
                q: "How much time commitment is required?",
                a: "Plan for 10-15 hours per week — including workshops, mentor sessions, and building your product.",
              },
              {
                q: "Is there a cost?",
                a: "Yes, but we keep it accessible. Contact us for current pricing and scholarship opportunities.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border border-border rounded-xl p-6">
                <h3 className="font-semibold text-primary">{faq.q}</h3>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
