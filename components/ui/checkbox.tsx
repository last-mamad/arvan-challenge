"use client";

import * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "size-4 shrink-0 rounded-[4px] outline-none transition-colors",
        "border-2 border-neutral-st1 bg-neutral-bg1",
        "hover:border-neutral-st1-hover hover:bg-neutral-bg1-hover",
        "active:border-neutral-st1-press active:bg-neutral-bg1-press",
        // synced styling when nested inside a `group`-marked label wrapper (see design-system/checkbox.tsx) — inert otherwise
        "group-hover:border-neutral-st1-hover group-hover:bg-neutral-bg1-hover",
        "group-active:border-neutral-st1-press group-active:bg-neutral-bg1-press",
        "disabled:cursor-not-allowed disabled:border-neutral-st2-disable disabled:bg-neutral-bg1",
        "data-[state=checked]:border-0 data-[state=checked]:bg-primary-bg2 data-[state=checked]:hover:bg-primary-bg2-hover data-[state=checked]:active:bg-primary-bg2-press data-[state=checked]:group-hover:bg-primary-bg2-hover data-[state=checked]:group-active:bg-primary-bg2-press data-[state=checked]:disabled:bg-primary-bg2-disable",
        "data-[state=indeterminate]:border-0 data-[state=indeterminate]:bg-primary-bg2 data-[state=indeterminate]:hover:bg-primary-bg2-hover data-[state=indeterminate]:active:bg-primary-bg2-press data-[state=indeterminate]:group-hover:bg-primary-bg2-hover data-[state=indeterminate]:group-active:bg-primary-bg2-press data-[state=indeterminate]:disabled:bg-primary-bg2-disable",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator flex items-center justify-center text-neutral-fg3"
      >
        <CheckIcon className="hidden size-3 group-data-[state=checked]/indicator:block" />
        <MinusIcon className="hidden size-3 group-data-[state=indeterminate]/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
