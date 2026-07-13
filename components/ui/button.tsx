import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-[12px] text-body2-strong whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary-bg2 text-neutral-fg3 hover:bg-primary-bg2-hover active:bg-primary-bg2-press disabled:bg-primary-bg2-disable",
        destructive:
          "bg-error-bg2 text-neutral-fg3 hover:bg-error-bg2-hover active:bg-error-bg2-press disabled:bg-error-bg2-disable focus-visible:ring-destructive/20",
        secondary:
          "border border-neutral-st2 bg-neutral-bg1 text-neutral-fg1 hover:border-neutral-st2-hover hover:text-neutral-fg1-hover active:border-neutral-st2-press active:text-neutral-fg1-press disabled:border-neutral-st2-disable disabled:text-neutral-fg1-disable",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-info-fg1 text-body2-strong font-semibold hover:text-info-fg1-hover active:text-info-fg1-press disabled:text-info-fg1-disable",
      },
      size: {
        default: "h-10 min-w-18 px-4 py-2.5 has-[>svg]:px-3.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-10",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-disabled={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "pointer-events-none cursor-wait",
      )}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
