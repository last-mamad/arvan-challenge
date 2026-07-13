import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-neutral-st2 bg-neutral-bg1 px-2 text-body2 text-neutral-fg1 outline-none transition-colors",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-body2 file:font-medium file:text-neutral-fg1",
        "placeholder:text-neutral-fg1-disable",
        "hover:border-neutral-st2-hover hover:text-neutral-fg1-hover",
        "focus:border-primary-fg1",
        "read-only:border-neutral-st1 read-only:text-neutral-fg1",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-neutral-st2-disable disabled:text-neutral-fg1-disable",
        "aria-invalid:border-error-fg1",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
