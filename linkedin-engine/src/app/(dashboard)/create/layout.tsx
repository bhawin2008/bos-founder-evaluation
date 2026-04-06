import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Creator — LinkedIn Engine",
  description:
    "Write scroll-stopping LinkedIn posts with AI-powered hooks, templates, and feedback.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
