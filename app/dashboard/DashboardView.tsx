"use client";

import { useRouter } from "next/navigation";

import { useSessionGuard } from "@/app/dashboard/_hooks/useSessionGuard";
import { Header } from "@/components/design-system/header";
import { useAuthStore } from "@/lib/store/auth-store";
import { Spinner } from "@/components/ui/spinner";

function DashboardView() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore((state) => state);
  const { isPending } = useSessionGuard();

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userName={user.firstName}
        title="Dashboard"
        onLogout={() => {
          clearAuth();
          router.replace("/sign-in");
        }}
      />
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-body1 text-neutral-fg1">Welcome, {user.firstName}!</p>
      </main>
    </div>
  );
}

export { DashboardView };
