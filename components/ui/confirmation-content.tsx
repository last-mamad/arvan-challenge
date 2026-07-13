import { CheckCircleIcon } from "@/components/icons/check-circle";
import { WarningIcon } from "@/components/icons/warning";
import { cn } from "@/lib/utils";

type ConfirmationContentProps = {
  className?: string;
  message: string;
  type?: "success" | "error";
  icon?: boolean;
};

function ConfirmationContent({ className, message, type = "success", icon = true }: ConfirmationContentProps) {
  const isError = type === "error";
  const Icon = isError ? WarningIcon : CheckCircleIcon;

  return (
    <div
      data-slot="confirmation-content"
      className={cn("flex w-full flex-col items-center justify-center gap-2", className)}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full p-4",
            isError ? "bg-error-bg1" : "bg-success-bg1",
          )}
        >
          <Icon className={cn("size-6", isError ? "text-error-fg1" : "text-success-fg1")} />
        </div>
      )}
      <p className="w-full text-center text-body2 text-neutral-fg1">{message}</p>
    </div>
  );
}

export { ConfirmationContent };
