import { cn } from "@/lib/utils";

type SidebarMenuItemProps = Omit<React.ComponentProps<"button">, "title"> & {
  title: string;
  description?: string;
  selected?: boolean;
};

function SidebarMenuItem({
  className,
  title,
  description,
  selected = false,
  ...props
}: SidebarMenuItemProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-menu-item"
      data-selected={selected || undefined}
      className={cn(
        "group flex w-full flex-col items-start p-2 text-left outline-none transition-colors",
        selected
          ? "bg-primary-bg1 hover:bg-primary-bg1-hover"
          : "bg-neutral-bg1 hover:bg-neutral-bg1-hover cursor-pointer active:bg-neutral-bg1-press",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "w-full text-body1",
          selected
            ? "text-primary-fg1 group-hover:text-primary-fg1-hover"
            : "text-neutral-fg1 group-hover:text-neutral-fg1-hover group-active:text-neutral-fg1-press",
        )}
      >
        {title}
      </span>
      {description && <span className="w-full text-caption1 text-neutral-fg1">{description}</span>}
    </button>
  );
}

export { SidebarMenuItem };
