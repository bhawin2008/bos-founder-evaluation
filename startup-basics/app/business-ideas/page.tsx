"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { businessIdeas } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(businessIdeas.map((i) => i.category)))];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function BusinessIdeasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = useMemo(() => {
    return businessIdeas.filter((idea) => {
      const matchesSearch =
        !search ||
        idea.title.toLowerCase().includes(search.toLowerCase()) ||
        idea.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || idea.category === category;
      const matchesDiff = difficulty === "All" || idea.difficulty === difficulty;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [search, category, difficulty]);

  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Business Ideas"
            title="Startup Ideas Worth Exploring"
            subtitle="Curated business ideas with market analysis, monetization strategies, and difficulty ratings to help you find your next venture."
          />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search ideas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                ))}
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d === "All" ? "All Levels" : d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary">No ideas match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((idea) => (
                <Link key={idea.slug} href={`/business-ideas/${idea.slug}`}>
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-accent bg-accent-bg px-2.5 py-1 rounded-full">
                        {idea.category}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        idea.difficulty === "Easy"
                          ? "text-success bg-green-50"
                          : idea.difficulty === "Medium"
                          ? "text-warning bg-amber-50"
                          : "text-red-500 bg-red-50"
                      }`}>
                        {idea.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{idea.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{idea.summary}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-text-secondary">
                        Est. Investment: <span className="font-semibold text-primary">{idea.investment}</span>
                      </span>
                      <span className="text-sm font-semibold text-accent">Explore &rarr;</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
