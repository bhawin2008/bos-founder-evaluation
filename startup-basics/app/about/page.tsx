import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Startup Basics — our mission, founder story, values, and the team behind the programs.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="About Us"
            title="We Exist to Help Founders Win"
            subtitle="Startup Basics was born from a simple observation: talented people with great ideas fail because they lack structure, mentorship, and community. We fix that."
          />
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Democratize Startup Success
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We believe that building a successful startup shouldn&apos;t require a Stanford degree, a Silicon Valley
                network, or a trust fund. It requires the right knowledge, the right process, and the right people
                around you.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Startup Basics provides all three — through structured cohort programs, expert consulting, and a
                community of builders who support each other through the hardest parts of the journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent-bg rounded-2xl p-10">
              <div className="space-y-6">
                {[
                  { num: "500+", label: "Founders Supported" },
                  { num: "5", label: "Cohorts Completed" },
                  { num: "85%", label: "Launch Rate" },
                  { num: "$4.2M", label: "Funding Raised by Alumni" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-accent w-20">{stat.num}</div>
                    <div className="text-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Founder Story"
            title="Why We Started This"
          />
          <div className="mt-10 prose prose-lg max-w-none text-text-secondary">
            <p className="leading-relaxed">
              In 2020, our founder Alex Rivera had just completed their third startup exit. While advising friends and
              former colleagues on their own ventures, a pattern emerged: smart, capable people were making the same
              avoidable mistakes — building before validating, hiring before finding product-market fit, and burning
              through cash without clear metrics.
            </p>
            <p className="leading-relaxed mt-4">
              Alex realized that the real gap wasn&apos;t talent or ideas — it was access to structured guidance. The kind
              of mentorship that accelerators provide was only available to a tiny fraction of founders who got accepted
              into competitive programs.
            </p>
            <p className="leading-relaxed mt-4">
              Startup Basics was created to bridge that gap — an accessible, affordable program that gives every
              aspiring founder the framework, mentorship, and community they need to turn their idea into a real
              business.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Bias for Action",
                desc: "Ship fast, learn faster. We value progress over perfection and encourage founders to test ideas in the real world.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: "Radical Honesty",
                desc: "We give founders the truth, not what they want to hear. Honest feedback builds better companies.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Community First",
                desc: "Building is a team sport. We foster genuine connections between founders who lift each other up.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
              {
                title: "Accessible by Design",
                desc: "Great startup education shouldn't be gatekept. We make our programs affordable and inclusive.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
              },
            ].map((value) => (
              <Card key={value.title}>
                <div className="text-accent mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="The Team"
            title="Meet the People Behind Startup Basics"
            subtitle="Experienced founders, operators, and educators dedicated to your success."
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                <p className="text-sm font-medium text-accent mt-1">{member.role}</p>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Want to Join Our Mission?</h2>
          <p className="mt-4 text-lg text-white/80">
            Whether as a founder, mentor, or partner — there&apos;s a place for you at Startup Basics.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="secondary" size="lg">
              Join the Cohort
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
