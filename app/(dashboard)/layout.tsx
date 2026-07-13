export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Blog Admin Dashboard</h1>
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  );
}
