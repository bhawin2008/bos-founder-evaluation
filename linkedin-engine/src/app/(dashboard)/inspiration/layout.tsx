import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspiration Engine — LinkedIn Engine",
  description:
    "Find your next great LinkedIn post idea with daily prompts, swipe files, and creative sparks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
