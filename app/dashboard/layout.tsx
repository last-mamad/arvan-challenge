"use client";

import { useRouter } from "next/navigation";

import { useSessionGuard } from "@/app/dashboard/_hooks/useSessionGuard";
import { Header } from "@/components/design-system/header";
import { Sidebar } from "@/components/design-system/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/store/auth-store";
import { useUiStore } from "@/lib/store/ui-store";

const SIDEBAR_ITEMS = [
  { title: "All Articles", href: "/dashboard/articles" },
  { title: "New Article", href: "/dashboard/articles/new" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore((state) => state);
  const { sidebarOpen, setSidebarOpen } = useUiStore((state) => state);
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
        onMenuClick={() => setSidebarOpen(true)}
        onLogout={() => {
          clearAuth();
          router.replace("/sign-in");
        }}
      />
      <div className="flex flex-1">
        <Sidebar items={SIDEBAR_ITEMS} className="hidden md:flex" />
        <main className="min-w-0 flex-1 bg-neutral-bg2 p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile navigation drawer */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" aria-describedby={undefined} showClose={false}>
          <Sidebar
            items={SIDEBAR_ITEMS}
            className="w-full border-r-0 p-0"
            onNavigate={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
