import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkedIn Engine — Stop Staring at a Blank Screen",
  description:
    "The daily-use LinkedIn content tool. Write scroll-stopping posts with AI-powered hooks, templates, and inspiration. Built for professionals who want results.",
  openGraph: {
    title: "LinkedIn Engine — Stop Staring at a Blank Screen",
    description:
      "The daily-use LinkedIn content tool. Write scroll-stopping posts with AI-powered hooks, templates, and inspiration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
