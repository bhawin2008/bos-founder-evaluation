"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/business-ideas", label: "Business Ideas" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            Startup<span className="text-accent">Basics</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors rounded-lg hover:bg-accent-bg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/programs"
              className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-light rounded-lg transition-colors"
            >
              Join Startup Cohort
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-accent"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:bg-accent-bg rounded-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/programs"
              className="block mt-3 mx-3 px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-light rounded-lg text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Join Startup Cohort
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
