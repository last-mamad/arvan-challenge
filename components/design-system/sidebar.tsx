"use client";

import { usePathname, useRouter } from "next/navigation";

import { SidebarMenuItem } from "@/components/ui/sidebar-menu-item";
import { cn } from "@/lib/utils";

type SidebarItem = {
  title: string;
  href: string;
  description?: string;
};

type SidebarProps = {
  className?: string;
  items: SidebarItem[];
};

function Sidebar({ className, items }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      data-slot="sidebar"
      className={cn(
        "flex w-60 shrink-0 flex-col gap-1 border-r border-neutral-st3 bg-neutral-bg1 p-4",
        className,
      )}
    >
      {items.map((item) => (
        <SidebarMenuItem
          key={item.href}
          title={item.title}
          description={item.description}
          selected={pathname === item.href}
          onClick={() => router.push(item.href)}
        />
      ))}
    </nav>
  );
}

export { Sidebar };
export type { SidebarItem };
