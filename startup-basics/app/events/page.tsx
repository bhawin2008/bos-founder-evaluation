import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops, demo days, and networking events for founders at every stage — hosted by Startup Basics.",
};

export default function EventsPage() {
  const upcoming = events.filter((e) => e.upcoming);
  const past = events.filter((e) => !e.upcoming);

  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Events"
            title="Learn, Connect, Build"
            subtitle="Join our workshops, demo days, and networking events designed to help founders at every stage."
          />
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="text-text-secondary">No upcoming events. Check back soon!</p>
          ) : (
            <div className="space-y-6">
              {upcoming.map((event, i) => (
                <Card key={i} className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-accent-bg rounded-xl flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-2xl font-bold text-accent leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-accent bg-accent-bg px-2.5 py-0.5 rounded-full">
                        {event.type}
                      </span>
                      <span className="text-xs text-text-secondary">{event.time}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
                    <p className="text-text-secondary mt-2 leading-relaxed">{event.description}</p>
                    <Button href="/contact" size="sm" className="mt-4">
                      Register Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8">Past Events</h2>
          {past.length === 0 ? (
            <p className="text-text-secondary">No past events yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {past.map((event, i) => (
                <Card key={i} className="opacity-80">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-surface-alt rounded-xl flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-text-secondary">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-lg font-bold text-text-secondary leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-text-secondary bg-surface-alt px-2 py-0.5 rounded-full">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
                      <p className="text-text-secondary text-sm mt-1">{event.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Never Miss an Event</h2>
          <p className="mt-2 text-white/80">
            Get notified about upcoming workshops, demo days, and community events.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="mt-6">
            Join Our Mailing List
          </Button>
        </div>
      </section>
    </>
  );
}
