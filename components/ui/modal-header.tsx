import { cn } from "@/lib/utils";

type ModalHeaderProps = {
  className?: string;
  title: string;
  description?: string;
};

function ModalHeader({ className, title, description }: ModalHeaderProps) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex w-full items-center justify-end border-b border-neutral-st3 bg-neutral-bg1 px-6 py-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start">
        <p className="w-full truncate text-body1 text-neutral-fg1">{title}</p>
        {description && <p className="w-full truncate text-caption1 text-neutral-fg2">{description}</p>}
      </div>
    </div>
  );
}

export { ModalHeader };
