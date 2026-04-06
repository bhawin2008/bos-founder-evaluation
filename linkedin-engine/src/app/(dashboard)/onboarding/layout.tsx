import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — LinkedIn Engine",
  description:
    "Set up your profile to get personalized content suggestions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
