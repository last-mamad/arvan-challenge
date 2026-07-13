import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-16 w-full rounded-md border border-neutral-st2 bg-neutral-bg1 px-2 py-2 text-body2 text-neutral-fg1 outline-none transition-colors",
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

export { Textarea };
