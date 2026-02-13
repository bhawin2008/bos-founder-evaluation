import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOS — Business Operating System for IT Founders",
  description:
    "A unified platform with tools for founder evaluation, team management, diagnostics, and more.",
};

const tools = [
  { href: "/bos-website", label: "BOS Website" },
  { href: "/bos-website-enhanced", label: "BOS Enhanced" },
  { href: "/startup-studio", label: "Startup Studio" },
  { href: "/analytics-dashboard", label: "Analytics" },
  { href: "/boss-team", label: "Boss Team" },
  { href: "/culture-console", label: "Culture Console" },
  { href: "/startup-health", label: "Startup Health" },
  { href: "/sales-diagnostic", label: "Sales Diagnostic" },
  { href: "/decision-os", label: "Decision OS" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
                <span className="font-semibold text-gray-900 text-lg">
                  BOS Platform
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
