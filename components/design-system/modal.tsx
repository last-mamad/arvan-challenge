"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { ModalContent } from "@/components/ui/modal-content";
import { ModalFooter } from "@/components/ui/modal-footer";
import { ModalHeader } from "@/components/ui/modal-header";
import { cn } from "@/lib/utils";

const modalVariants = cva("flex w-full flex-col overflow-hidden rounded-md", {
  variants: {
    size: {
      small: "max-w-xs sm:max-w-114",
      medium: "max-w-150",
      large: "max-w-200",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

type ModalProps = VariantProps<typeof modalVariants> & {
  className?: string;
  isOpen: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  cancelButtonText?: string;
  cancelButtonAction: () => void;
  confirmButtonText?: string;
  confirmButtonAction: () => void;
  danger?: boolean;
  confirmLoading?: boolean;
};

function Modal({
  className,
  isOpen,
  title,
  description,
  children,
  footer,
  cancelButtonText = "Cancel",
  cancelButtonAction,
  confirmButtonText = "Confirm",
  confirmButtonAction,
  danger = false,
  confirmLoading = false,
  size,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      data-slot="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/32"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          cancelButtonAction();
        }
      }}
    >
      <div data-slot="modal" data-size={size} className={cn(modalVariants({ size }), className)}>
        <ModalHeader title={title} description={description} />
        <ModalContent>{children}</ModalContent>
        {footer ?? (
          <ModalFooter
            danger={danger}
            confirmLoading={confirmLoading}
            cancelButtonText={cancelButtonText}
            onCancel={cancelButtonAction}
            confirmButtonText={confirmButtonText}
            onConfirm={confirmButtonAction}
          />
        )}
      </div>
    </div>
  );
}

export { Modal, modalVariants };
