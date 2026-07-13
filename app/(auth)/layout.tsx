export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-bg2 p-4">
      <div className="w-full max-w-114">{children}</div>
    </div>
  );
}
