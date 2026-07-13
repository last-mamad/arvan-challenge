"use client";

import { Loader2 } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

type DropdownMenuAction = {
  title: string;
  loadingTitle?: string;
  isLoading?: boolean;
  onClick: () => void;
};

function DropdownMenuItem({
  title,
  loadingTitle = "Loading...",
  isLoading = false,
  onClick,
}: DropdownMenuAction) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      disabled={isLoading}
      // Keep the menu open on select so the loading feedback below is visible;
      // the caller closes it themselves once `isLoading` settles.
      onSelect={(event) => {
        event.preventDefault();
        onClick();
      }}
      className={cn(
        "cursor-pointer flex w-full items-center gap-2 rounded-md p-2 text-body2 text-neutral-fg1 outline-none select-none",
        "data-[highlighted]:bg-neutral-bg1-hover data-[highlighted]:text-neutral-fg1-hover",
        "active:bg-neutral-bg1-press active:text-neutral-fg1-press",
        "data-[disabled]:pointer-events-none data-[disabled]:text-neutral-fg1-disable",
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 shrink-0 animate-spin text-neutral-fg2" />
          <span className="flex-1 text-neutral-fg2">{loadingTitle}</span>
        </>
      ) : (
        <span className="flex-1">{title}</span>
      )}
    </DropdownMenuPrimitive.Item>
  );
}

type DropdownMenuProps = Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
  "children"
> & {
  trigger: React.ReactNode;
  items: DropdownMenuAction[];
  contentClassName?: string;
};

function DropdownMenu({ trigger, items, contentClassName, ...props }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          sideOffset={4}
          className={cn(
            "z-50 flex w-fit min-w-[144px] flex-col gap-1 rounded-[12px] bg-neutral-bg1 p-2 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.16)] outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
            contentClassName,
          )}
        >
          {items.map((item, index) => (
            <DropdownMenuItem key={index} {...item} />
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export { DropdownMenu, DropdownMenuItem };
export type { DropdownMenuAction };
