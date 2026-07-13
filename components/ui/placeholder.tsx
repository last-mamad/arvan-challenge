import * as React from "react";

import { cn } from "@/lib/utils";

function Placeholder({
  className,
  children = "Replace me",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { children?: string }) {
  return (
    <div
      data-slot="placeholder"
      className={cn("flex w-full items-center justify-center bg-primary-bg1 py-2.5", className)}
      {...props}
    >
      <p className="text-body2-strong text-primary-fg1">{children}</p>
    </div>
  );
}

export { Placeholder };
