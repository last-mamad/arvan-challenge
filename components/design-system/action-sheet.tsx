"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DropdownMenuAction } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type ActionSheetProps = {
  trigger: React.ReactNode;
  items: DropdownMenuAction[];
  /** Accessible title for the sheet (visually hidden by default). */
  title?: string;
};

/**
 * The mobile counterpart of `DropdownMenu`: opens a bottom sheet listing the
 * same `items` as full-width buttons, so one actions definition drives both
 * breakpoints.
 */
function ActionSheet({ trigger, items, title = "Actions" }: ActionSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" showClose={false} aria-describedby={undefined}>
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="link"
              size="lg"
              loading={item.isLoading}
              className="w-full justify-start text-body1 px-3 py-2 text-neutral-fg1"
              onClick={() => {
                item.onClick();
                if (!item.isLoading) setOpen(false);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ActionSheet };
export type { ActionSheetProps };
