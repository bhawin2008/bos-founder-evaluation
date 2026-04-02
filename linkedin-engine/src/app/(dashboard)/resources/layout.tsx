import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Library — LinkedIn Engine",
  description:
    "Hooks, templates, CTA frameworks, and more — organized by use case.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
