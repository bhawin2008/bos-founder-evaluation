export default function DecisionOSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/decision-os" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="font-semibold text-stone-900 text-lg">
              DecisionOS
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/decision-os/decisions"
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/decision-os/decisions/new"
              className="text-sm bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
            >
              New Decision
            </a>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
