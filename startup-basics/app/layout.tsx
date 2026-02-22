import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Startup Basics — From Idea to Launch",
    template: "%s | Startup Basics",
  },
  description:
    "Startup Basics helps aspiring entrepreneurs turn raw ideas into real businesses through structured cohorts, expert consulting, and a community of builders.",
  keywords: [
    "startup",
    "entrepreneurship",
    "founder",
    "accelerator",
    "cohort",
    "business ideas",
    "startup consulting",
    "MVP",
  ],
  openGraph: {
    title: "Startup Basics — From Idea to Launch",
    description:
      "Helping aspiring entrepreneurs turn raw ideas into real businesses through structured cohorts and expert consulting.",
    type: "website",
    locale: "en_US",
    siteName: "Startup Basics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Basics — From Idea to Launch",
    description:
      "Helping aspiring entrepreneurs turn raw ideas into real businesses through structured cohorts and expert consulting.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
