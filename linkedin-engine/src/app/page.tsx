import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PenLine,
  Lightbulb,
  FolderOpen,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xl font-bold text-primary">LinkedIn</span>
            <span className="text-xl font-bold text-accent">Engine</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">
            <Zap className="h-3 w-3 mr-1" /> Now in Founding Member access
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Stop Staring at a{" "}
            <span className="text-primary">Blank Screen.</span>
            <br />
            Start Creating Posts That{" "}
            <span className="text-accent">Get Results.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            The daily-use LinkedIn content tool built by a consultant who has
            helped 10+ professionals grow their LinkedIn presence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="text-base px-8">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base">
                See How It Works
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            7-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
            You know you should post on LinkedIn. But every day, you open it,
            stare at the blank screen, and close it.{" "}
            <span className="text-primary font-semibold">
              LinkedIn Engine solves this.
            </span>
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to post consistently
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Post Creator</h3>
                <p className="text-sm text-muted-foreground">
                  Write with curated hooks, structural templates, and AI
                  feedback. Preview exactly how your post will look on LinkedIn.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Inspiration Engine
                </h3>
                <p className="text-sm text-muted-foreground">
                  Daily content prompts, a swipe file of proven posts, and
                  creative &ldquo;what if&rdquo; prompts to spark ideas.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Resource Library</h3>
                <p className="text-sm text-muted-foreground">
                  50+ hooks, templates, CTA frameworks, and carousel templates
                  organized by use case.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Open LinkedIn Engine", desc: "Log in and head to Post Creator — your daily writing workspace." },
              { step: 2, title: "Get inspired", desc: "Browse daily prompts, swipe files, or pick a structural template." },
              { step: 3, title: "Write with AI assistance", desc: "Use curated hooks, get AI-powered analysis, and refine your draft." },
              { step: 4, title: "Preview and copy", desc: "See exactly how your post looks on mobile and desktop. One-click copy." },
              { step: 5, title: "Publish and grow", desc: "Paste into LinkedIn, hit publish, and share with the Tribe for feedback." },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-xl bg-background p-6 shadow-sm"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Lock in founding member pricing — it stays forever.
          </p>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Basic */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">Basic</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">&#8377;299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="line-through">&#8377;499/month</span> — Founding price
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Post Creator with templates",
                    "10 AI assists per month",
                    "Inspiration Engine",
                    "Basic Resource Library",
                    "Copy to clipboard",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="accent" className="px-3">
                  <Crown className="h-3 w-3 mr-1" /> Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">Pro</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">&#8377;499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="line-through">&#8377;799/month</span> — Founding price
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Everything in Basic",
                    "Unlimited AI assists",
                    "Premium Resources & Templates",
                    "Tribe Access (Skool community)",
                    "Priority Marathon access",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button variant="accent" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Does LinkedIn Engine connect to my LinkedIn account?",
                a: "No. LinkedIn Engine is a content creation tool. You write your post here, copy it, and paste it into LinkedIn. This is intentional — it keeps your LinkedIn account safe.",
              },
              {
                q: "What happens after my 7-day free trial?",
                a: "You'll be prompted to subscribe. Your drafts and data are saved. You can subscribe anytime to regain access.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel from Settings at any time. You'll keep access until the end of your billing period.",
              },
              {
                q: "What AI model powers the suggestions?",
                a: "We use Claude by Anthropic for hook generation and post analysis. It's one of the most capable AI models available.",
              },
              {
                q: "Is founding member pricing really forever?",
                a: "Yes. As long as your subscription stays active, you'll never pay the regular price.",
              },
              {
                q: "Can I use this on my phone?",
                a: "Yes. LinkedIn Engine is fully responsive and works on mobile browsers.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border bg-background p-4"
              >
                <summary className="cursor-pointer font-medium text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join 100 Founding Members.
            <br />
            <span className="text-accent">
              Lock in Founding Pricing Forever.
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop overthinking. Start posting. Your first scroll-stopping
            LinkedIn post is one click away.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-base px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-primary">LinkedIn</span>
            <span className="text-sm font-semibold text-accent">Engine</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with care for LinkedIn professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
