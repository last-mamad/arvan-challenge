import type { VariantProps } from "class-variance-authority";

import { FieldLabel } from "@/components/ui/field";
import { Message, type messageVariants } from "@/components/ui/message";
import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/utils";

type FieldProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  htmlFor?: string;
  label?: boolean;
  labelText?: string;
  required?: boolean;
  message?: boolean;
  messageText?: string;
  messageType?: VariantProps<typeof messageVariants>["type"];
};

function Field({
  className,
  children,
  htmlFor,
  label = true,
  labelText = "Label",
  required = true,
  message = true,
  messageText,
  messageType,
  ...props
}: FieldProps) {
  return (
    <div data-slot="field" className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {label && (
        <FieldLabel htmlFor={htmlFor} className="w-full items-start gap-0">
          <span className="text-body2 text-neutral-fg1">{labelText}</span>
          {required && <span className="text-caption2 text-error-fg1">*</span>}
        </FieldLabel>
      )}
      {children ?? <Placeholder />}
      {message && <Message type={messageType}>{messageText}</Message>}
    </div>
  );
}

export { Field };
