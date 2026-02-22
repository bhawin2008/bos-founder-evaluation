import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { programs, caseStudies, businessIdeas, events, testimonials } from "@/lib/data";

export default function Home() {
  const upcomingEvents = events.filter((e) => e.upcoming).slice(0, 2);
  const featuredIdeas = businessIdeas.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-light rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-light bg-white/10 rounded-full mb-6">
              Cohort 6 — Applications Open
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              From Idea to Launch —{" "}
              <span className="text-accent-light">We Build Founders</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Startup Basics is a hands-on program that helps aspiring entrepreneurs validate ideas, build MVPs, and
              launch real businesses — with mentorship, community, and structure.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/programs" size="lg">
                Join Startup Cohort
              </Button>
              <Button href="/case-studies" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                See Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="The Problem"
            title="Most Startups Fail Before They Start"
            subtitle="90% of startups fail — but not because of bad ideas. They fail because founders build in isolation, skip validation, and run out of runway before finding product-market fit."
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: "Building Without Validating",
                desc: "Founders spend months building products nobody wants. We teach validation before code.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                title: "Founder Isolation",
                desc: "Building alone is brutal. Our cohort gives you peers, mentors, and accountability.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                ),
                title: "No Clear Roadmap",
                desc: "First-time founders don't know what they don't know. Our framework gives you the steps.",
              },
            ].map((item, i) => (
              <Card key={i}>
                <div className="text-accent mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Programs"
            title="Two Ways to Get Started"
            subtitle="Whether you need a structured program or personalized guidance, we have you covered."
          />
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-accent-bg px-3 py-1 rounded-full mb-4">
                Most Popular
              </span>
              <h3 className="text-2xl font-bold text-primary">{programs.cohort.title}</h3>
              <p className="text-text-secondary mt-1 mb-4">{programs.cohort.subtitle}</p>
              <p className="text-text-secondary leading-relaxed mb-6">{programs.cohort.description}</p>
              <Button href="/programs">{programs.cohort.cta}</Button>
            </Card>
            <Card>
              <h3 className="text-2xl font-bold text-primary">{programs.consulting.title}</h3>
              <p className="text-text-secondary mt-1 mb-4">{programs.consulting.subtitle}</p>
              <p className="text-text-secondary leading-relaxed mb-6">{programs.consulting.description}</p>
              <Button href="/programs" variant="outline">{programs.consulting.cta}</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Success Stories"
            title="Real Founders, Real Results"
            subtitle="See how founders like you turned their ideas into thriving businesses."
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
                <Card className="h-full">
                  <span className="inline-block text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full mb-3">
                    {cs.category}
                  </span>
                  <h3 className="text-lg font-semibold text-primary mb-2">{cs.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{cs.summary}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(cs.metrics).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="text-center bg-surface rounded-lg py-2">
                        <div className="text-sm font-bold text-accent">{val}</div>
                        <div className="text-xs text-text-secondary capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/case-studies" variant="outline">View All Case Studies</Button>
          </div>
        </div>
      </section>

      {/* Business Ideas Preview */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Get Inspired"
            title="Startup Ideas Worth Exploring"
            subtitle="Curated business ideas with market analysis, monetization strategies, and difficulty ratings."
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {featuredIdeas.map((idea) => (
              <Link key={idea.slug} href={`/business-ideas/${idea.slug}`}>
                <Card className="h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full">
                      {idea.category}
                    </span>
                    <span className="text-xs font-medium text-text-secondary bg-surface-alt px-2.5 py-1 rounded-full">
                      {idea.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{idea.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">{idea.summary}</p>
                  <p className="text-xs font-medium text-text-secondary">
                    Est. Investment: <span className="text-primary font-semibold">{idea.investment}</span>
                  </p>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/business-ideas" variant="outline">Browse All Ideas</Button>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Upcoming Events"
            title="Join the Community"
            subtitle="Workshops, demo days, and networking events for founders at every stage."
          />
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, i) => (
              <Card key={i}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-accent-bg rounded-xl flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold text-accent leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent bg-accent-bg px-2 py-0.5 rounded-full">
                        {event.type}
                      </span>
                      <span className="text-xs text-text-secondary">{event.time}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
                    <p className="text-text-secondary text-sm mt-1">{event.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/events" variant="outline">See All Events</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="What Founders Say"
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="relative">
                <svg className="absolute top-6 left-6 w-8 h-8 text-accent/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="pt-8">
                  <p className="text-text-secondary leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-semibold text-primary">{t.name}</p>
                    <p className="text-sm text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Build Something Real?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join the next cohort and go from idea to launch with the support, structure, and mentorship you need.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="secondary" size="lg">
              Apply Now
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
