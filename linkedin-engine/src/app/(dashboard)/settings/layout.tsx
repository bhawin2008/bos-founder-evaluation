import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — LinkedIn Engine",
  description: "Manage your profile and subscription.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
