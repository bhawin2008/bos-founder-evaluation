import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 bg-[#0D0D0D] text-white relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30" />

      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-10">
          {/* Brand */}
          <div>
            <span className="text-[1.3rem] font-black block mb-2 text-white">
              BOS
            </span>
            <p className="text-[0.8125rem] text-gray-500 max-w-[260px] leading-relaxed">
              Business Operating System for serious IT founders.
            </p>
          </div>

          {/* Columns */}
          <div className="flex gap-16 flex-col sm:flex-row">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-gray-500 mb-4">
                Learn
              </h4>
              <Link
                href="/bos-website/about"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                About BOS
              </Link>
              <Link
                href="/bos-website/framework"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Framework
              </Link>
              <Link
                href="/bos-website/philosophy"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Philosophy
              </Link>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-gray-500 mb-4">
                Explore
              </h4>
              <Link
                href="/bos-website/programs"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Programs
              </Link>
              <Link
                href="/bos-website/events"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Events
              </Link>
              <Link
                href="/bos-website/resources"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Resources
              </Link>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-gray-500 mb-4">
                Connect
              </h4>
              <Link
                href="/bos-website/apply"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Apply
              </Link>
              <a
                href="#"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="block text-sm text-gray-400 mb-2.5 transition-all hover:text-white hover:translate-x-0.5"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-[0.8125rem] text-gray-600">
            &copy; 2026 BOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
