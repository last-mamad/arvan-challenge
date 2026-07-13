import { cva, type VariantProps } from "class-variance-authority";
import { toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";

const toastVariants = cva(
  "flex w-fit max-w-full items-center gap-1 rounded-[12px] px-4 py-3 shadow-[0px_8px_40px_0px_rgba(37,51,67,0.24)]",
  {
    variants: {
      type: {
        success: "bg-success-bg1 text-success-fg1",
        error: "bg-error-bg1 text-error-fg1",
      },
    },
    defaultVariants: {
      type: "success",
    },
  },
);

type ToastProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof toastVariants> & {
    title: string;
    description?: string;
  };

function Toast({ className, type = "success", title, description, ...props }: ToastProps) {
  return (
    <div
      data-slot="toast"
      data-type={type}
      className={cn(toastVariants({ type }), className)}
      {...props}
    >
      <p className="shrink-0 text-body2-strong whitespace-nowrap">{title}</p>
      {description && <p className="min-w-0 truncate text-caption1">{description}</p>}
    </div>
  );
}

function showToast({
  type = "success",
  title,
  description,
}: {
  type?: "success" | "error";
  title: string;
  description?: string;
}) {
  return sonnerToast.custom(() => <Toast type={type} title={title} description={description} />, {
    position: "top-center",
    // Force the sonner toast wrapper to full width and center our pill inside it,
    // so it's symmetrically centered regardless of the wrapper's intrinsic width.
    className: "flex w-full justify-center",
  });
}

export { Toast, toastVariants, showToast };
