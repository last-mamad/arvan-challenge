import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalFooterProps = {
  className?: string;
  cancelButtonText?: string;
  onCancel: () => void;
  confirmButtonText?: string;
  onConfirm: () => void;
  danger?: boolean;
  confirmLoading?: boolean;
};

function ModalFooter({
  className,
  cancelButtonText = "Cancel",
  onCancel,
  confirmButtonText = "Confirm",
  onConfirm,
  danger = false,
  confirmLoading = false,
}: ModalFooterProps) {
  const cancelButton = (
    <Button variant="secondary" disabled={confirmLoading} onClick={onCancel}>
      {cancelButtonText}
    </Button>
  );
  const confirmButton = (
    <Button variant={danger ? "destructive" : "default"} loading={confirmLoading} onClick={onConfirm}>
      {confirmButtonText}
    </Button>
  );

  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex w-full items-center justify-end gap-4 border-t border-neutral-st3 bg-neutral-bg1 px-6 py-4",
        className,
      )}
    >
      {danger ? (
        <>
          {confirmButton}
          {cancelButton}
        </>
      ) : (
        <>
          {cancelButton}
          {confirmButton}
        </>
      )}
    </div>
  );
}

export { ModalFooter };
