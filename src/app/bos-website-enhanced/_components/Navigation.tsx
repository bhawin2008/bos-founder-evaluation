"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "#what", label: "What is BOS" },
  { href: "#framework", label: "Framework" },
  { href: "#tools", label: "Tools" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const nav = document.querySelector("nav");
        const offset = nav ? nav.offsetHeight : 64;
        const y =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setMenuOpen(false);
      }
    },
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 backdrop-blur-[12px] transition-colors duration-300 ${
        scrolled
          ? "bg-white/[0.98]"
          : "bg-white/[0.92]"
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className="text-[1.3rem] font-black tracking-tight text-[#0A0A0A]"
        >
          BOS
        </a>

        {/* Desktop nav links */}
        <div
          className={`
            flex items-center gap-1
            max-sm:hidden
            ${menuOpen ? "" : ""}
          `}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-gray-600 px-3.5 py-2 rounded-md transition-colors hover:text-[#0A0A0A] hover:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => handleSmoothScroll(e, "#apply")}
            className="bg-[#0A0A0A] text-white font-semibold text-sm px-5 py-2 rounded-md ml-2 transition-colors hover:bg-gray-800"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile nav links */}
        <div
          className={`
            sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 flex-col py-3 px-6 gap-0.5
            ${menuOpen ? "flex" : "hidden"}
          `}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-gray-600 px-3.5 py-2 rounded-md transition-colors hover:text-[#0A0A0A] hover:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => handleSmoothScroll(e, "#apply")}
            className="bg-[#0A0A0A] text-white font-semibold text-sm px-5 py-2 rounded-md mt-2 text-center transition-colors hover:bg-gray-800"
          >
            Apply Now
          </a>
        </div>

        {/* Hamburger toggle */}
        <button
          className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8 bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block w-full h-[1.5px] bg-[#0A0A0A] transition-all duration-300 ${
              menuOpen
                ? "rotate-45 translate-x-[3px] translate-y-[3px]"
                : ""
            }`}
          />
          <span
            className={`block w-full h-[1.5px] bg-[#0A0A0A] transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 translate-x-[3px] -translate-y-[3px]"
                : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
