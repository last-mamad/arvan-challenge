import * as React from "react";

import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive> & {
  label?: string;
};

function Checkbox({ label, className, ...props }: CheckboxProps) {
  const checkbox = <CheckboxPrimitive className={cn("group", className)} {...props} />;

  if (!label) {
    return checkbox;
  }

  return (
    <label className="group/label inline-flex cursor-pointer items-center gap-1 has-disabled:cursor-not-allowed">
      {checkbox}
      <span
        className={cn(
          "text-body2 text-neutral-fg1 select-none",
          "group-hover/label:text-neutral-fg1-hover",
          "group-active/label:text-neutral-fg1-press",
          "group-has-disabled/label:text-neutral-fg1-disable",
        )}
      >
        {label}
      </span>
    </label>
  );
}

export { Checkbox };
