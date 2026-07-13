import { cn } from "@/lib/utils";
import { HeaderContent } from "@/components/ui/header-content";

type SectionHeaderProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
};

function SectionHeader({ className, title, description, ...props }: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex min-h-14 md:min-h-23 w-full items-center bg-neutral-bg1 p-2 md:p-6",
        className,
      )}
      {...props}
    >
      <HeaderContent title={title} description={description} className="flex-1" />
    </div>
  );
}

export { SectionHeader };
