import { cn } from "@/lib/utils";

type HeaderContentProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
};

function HeaderContent({ className, title = "Title", description, ...props }: HeaderContentProps) {
  return (
    <div data-slot="header-content" className={cn("flex items-center gap-3", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
        <p className="text-title3 text-neutral-fg1">{title}</p>
        {description && <p className="text-body2 text-neutral-fg2">{description}</p>}
      </div>
    </div>
  );
}

export { HeaderContent };
