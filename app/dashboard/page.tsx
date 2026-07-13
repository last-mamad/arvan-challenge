"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Header } from "@/components/design-system/header";
import { useAuthStore } from "@/lib/store/auth-store";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userName={user.username}
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
