import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeaderProps = {
  userName: string;
  title: string;
  onLogout: () => void;
  className?: string;
};

function Header({ userName, title, onLogout, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "relative flex w-full items-center justify-between border-b border-neutral-st3 bg-neutral-bg1 px-6 py-3",
        className,
      )}
    >
      <div className="flex min-w-0 shrink-0 items-center gap-0.5 truncate">
        <span className="text-body2 text-neutral-fg1">Welcome</span>
        <span className="text-body2-strong text-neutral-fg1">{userName}</span>
      </div>

      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate rounded-[4px] bg-neutral-bg2 px-3 py-2 text-body1 text-neutral-fg1">
        {title}
      </p>

      <Button variant="secondary" onClick={onLogout}>
        Log out
      </Button>
    </header>
  );
}

export { Header };
