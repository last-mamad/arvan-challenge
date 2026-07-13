import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-2 rounded-md border border-neutral-st2 bg-neutral-bg1 p-1",
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<typeof Button> & {
  isActive?: boolean;
};

function PaginationLink({ className, isActive, size = "icon-sm", ...props }: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? "default" : "ghost"}
      size={size}
      className={cn("rounded-md transition-none", className)}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to previous page"
      variant="ghost"
      size="icon-sm"
      className={cn("rounded-md transition-none", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </Button>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to next page"
      variant="ghost"
      size="icon-sm"
      className={cn("rounded-md transition-none", className)}
      {...props}
    >
      <ChevronRightIcon />
    </Button>
  );
}

function PaginationEllipsis({
  className,
  disabled,
  ...props
}: React.ComponentProps<"span"> & { disabled?: boolean }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center text-body2-strong select-none",
        disabled ? "text-neutral-fg1-disable cursor-not-allowed" : "text-neutral-fg1",
        className,
      )}
      {...props}
    >
      ...
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
