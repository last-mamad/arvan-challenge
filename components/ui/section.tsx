import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";

type SectionProps = Omit<React.ComponentProps<"div">, "title"> & {
  title?: string;
  description?: string;
};

function Section({ className, title, description, children, ...props }: SectionProps) {
  return (
    <div
      data-slot="section"
      className={cn("flex w-full flex-col overflow-hidden rounded-md", className)}
      {...props}
    >
      <SectionHeader title={title} description={description} />
      <div className="flex min-h-64 w-full flex-col items-center justify-center border-t border-neutral-st3 bg-neutral-bg1 p-6">
        {children ?? <Placeholder className="h-full flex-1" />}
      </div>
    </div>
  );
}

export { Section };
