import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BOS \u2013 Business Operating System for IT Founders",
  description:
    "A private, structured founder community for serious IT founders. Systems over chaos. Reputation over reach. Frameworks for revenue, decisions, and leadership.",
  openGraph: {
    title: "BOS \u2013 Business Operating System for IT Founders",
    description:
      "A structured operating system and private community for serious IT founders who want clarity, systems, and sustainable growth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOS \u2013 Business Operating System for IT Founders",
    description:
      "Systems over chaos. Reputation over reach. A structured OS for serious IT founders.",
  },
};

export default function BosWebsiteEnhancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-[#0A0A0A] leading-relaxed text-base antialiased font-[Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] scroll-smooth">
      {children}
    </div>
  );
}
