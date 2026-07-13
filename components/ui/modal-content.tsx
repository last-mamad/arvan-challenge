import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/utils";

type ModalContentProps = {
  className?: string;
  children?: React.ReactNode;
};

function ModalContent({ className, children }: ModalContentProps) {
  return (
    <div
      data-slot="modal-content"
      className={cn("flex max-h-114 w-full flex-col items-center bg-neutral-bg1 p-6", className)}
    >
      {children ?? <Placeholder className="w-full" />}
    </div>
  );
}

export { ModalContent };
