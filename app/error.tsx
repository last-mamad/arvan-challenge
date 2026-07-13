"use client";

import { useEffect } from "react";

import { WarningIcon } from "@/components/icons/warning";
import { Button } from "@/components/ui/button";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-neutral-bg2 px-6 text-center">
      <div className="flex items-center justify-center rounded-full bg-error-bg1 p-6">
        <WarningIcon className="size-10 text-error-fg1" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-title3 text-neutral-fg1">Something went wrong</p>
        <p className="max-w-sm text-body2 text-neutral-fg2">
          An unexpected error occurred. You head back to the homepage.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={() => (window.location.href = "/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
