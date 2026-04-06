import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
