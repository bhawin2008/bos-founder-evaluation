"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/bos-website/about", label: "About" },
  { href: "/bos-website/programs", label: "Programs" },
  { href: "/bos-website/events", label: "Events" },
  { href: "/bos-website/framework", label: "Framework" },
  { href: "/bos-website/resources", label: "Resources" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/bos-website/programs") {
      return pathname.startsWith("/bos-website/programs");
    }
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 border-black/6 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-white/85 border-black/6"
      } backdrop-blur-[20px]`}
    >
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link
          href="/bos-website"
          className="text-[1.4rem] font-black tracking-[-0.5px] text-[#0A0A0A] relative"
        >
          BOS
          <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-yellow-400 rounded-sm" />
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all relative ${
                isActive(link.href)
                  ? "text-[#0A0A0A] font-semibold"
                  : "text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-yellow-400 rounded-sm" />
              )}
            </Link>
          ))}
          <Link
            href="/bos-website/apply"
            className={`text-sm font-semibold px-5 py-2 rounded-lg ml-2 transition-all ${
              pathname === "/bos-website/apply"
                ? "bg-[#0A0A0A] text-white"
                : "bg-[#0A0A0A] text-white hover:bg-gray-800 hover:-translate-y-px"
            }`}
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex sm:hidden flex-col justify-center gap-1.5 w-9 h-9 p-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-[1.5px] bg-[#0A0A0A] rounded-sm transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[1.5px] bg-[#0A0A0A] rounded-sm transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/[0.98] backdrop-blur-[20px] border-b border-gray-200 flex flex-col px-6 py-3 gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all ${
                isActive(link.href)
                  ? "text-[#0A0A0A] font-semibold"
                  : "text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/bos-website/apply"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-5 py-2 rounded-lg mt-2 text-center bg-[#0A0A0A] text-white hover:bg-gray-800"
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
