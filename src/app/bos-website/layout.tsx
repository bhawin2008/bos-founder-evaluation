import type { Metadata } from "next";
import Navigation from "./_components/Navigation";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "BOS - Business Operating System for IT Founders",
  description:
    "A private, structured founder community for serious IT founders. Systems over chaos. Reputation over reach. Programs, events, and frameworks.",
};

export default function BosWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-[Inter,system-ui,sans-serif] leading-relaxed text-base overflow-x-hidden">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
