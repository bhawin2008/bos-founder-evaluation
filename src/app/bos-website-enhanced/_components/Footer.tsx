const footerCols = [
  {
    title: "About",
    links: [
      { href: "#what", label: "What is BOS" },
      { href: "#framework", label: "Framework" },
      { href: "#philosophy", label: "Philosophy" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "#how", label: "How It Works" },
      { href: "#tools", label: "Tools" },
      { href: "#pricing", label: "Pricing" },
      { href: "#apply", label: "Apply" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#faq", label: "FAQ" },
      { href: "#filter", label: "Who It\u2019s For" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-gray-200">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="flex justify-between mb-12 max-[900px]:flex-col max-[900px]:gap-10">
          <div>
            <span className="block text-[1.2rem] font-black mb-2">BOS</span>
            <p className="text-[0.8125rem] text-gray-500 max-w-[260px] leading-relaxed">
              Business Operating System for serious IT founders.
            </p>
          </div>

          <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[1px] text-gray-400 mb-4">
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-gray-600 mb-2.5 transition-colors hover:text-[#0A0A0A]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-[0.8125rem] text-gray-400">
            &copy; 2026 BOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
