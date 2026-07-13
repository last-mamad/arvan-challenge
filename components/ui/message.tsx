import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const messageVariants = cva("text-caption1-strong", {
  variants: {
    type: {
      default: "text-neutral-fg2",
      error: "text-error-fg1",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

function Message({
  className,
  type = "error",
  children = "error message",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof messageVariants> & { children?: string }) {
  return (
    <div
      data-slot="message"
      data-type={type}
      className={cn("flex w-full items-center gap-1", className)}
      {...props}
    >
      <p className={cn(messageVariants({ type }))}>{children}</p>
    </div>
  );
}

export { Message, messageVariants };
