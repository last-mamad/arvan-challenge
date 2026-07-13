"use client";

import { useRouter } from "next/navigation";

import { useSessionGuard } from "@/app/dashboard/_hooks/useSessionGuard";
import { Header } from "@/components/design-system/header";
import { Sidebar } from "@/components/design-system/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/store/auth-store";

const SIDEBAR_ITEMS = [
  { title: "All Articles", href: "/dashboard/articles" },
  { title: "New Article", href: "/dashboard/articles/new" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
        title="Arvancloud Challenge"
        onLogout={() => {
          clearAuth();
          router.replace("/sign-in");
        }}
      />
      <div className="flex flex-1">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="flex-1 p-6 bg-neutral-bg2">{children}</main>
      </div>
    </div>
  );
}
