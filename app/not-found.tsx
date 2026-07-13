import { SearchX } from "lucide-react";
import type { Metadata } from "next";

import { BackHomeButton } from "@/app/_components/BackToHomeButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-neutral-bg2 px-6 text-center">
      <div className="flex items-center justify-center rounded-full bg-primary-bg1 p-6">
        <SearchX className="size-10 text-primary-fg1" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-caption1-strong tracking-widest text-neutral-fg2 uppercase">404</p>
        <p className="text-title3 text-neutral-fg1">Page not found</p>
        <p className="max-w-sm text-body2 text-neutral-fg2">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>
      <BackHomeButton />
    </div>
  );
}
