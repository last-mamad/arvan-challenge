import { LogOutIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeaderProps = {
  userName: string;
  title: string;
  onLogout: () => void;
  /** Opens the mobile navigation drawer. When provided, a hamburger shows below `md`. */
  onMenuClick?: () => void;
  className?: string;
};

function Header({ userName, title, onLogout, onMenuClick, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "relative flex w-full items-center justify-between border-b border-neutral-st3 bg-neutral-bg1 px-4 py-3 md:px-6",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {onMenuClick && (
          <Button
            variant="secondary"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <MenuIcon className="size-5" />
          </Button>
        )}
        {/* Welcome greeting is desktop-only */}
        <div className="hidden min-w-0 shrink-0 items-center gap-0.5 truncate md:flex">
          <span className="text-body2 text-neutral-fg1">Welcome</span>
          <span className="text-body2-strong text-neutral-fg1">{userName}</span>
        </div>
      </div>

      <p className="absolute top-1/2 left-1/2 max-w-[55%] -translate-x-1/2 -translate-y-1/2 truncate rounded-[4px] bg-neutral-bg2 px-3 py-2 text-body1 text-neutral-fg1 md:max-w-none">
        {title}
      </p>

      {/* Logout: icon below md, labelled button from md up */}
      <Button
        variant="secondary"
        size="icon-sm"
        className="md:hidden"
        aria-label="Log out"
        onClick={onLogout}
      >
        <LogOutIcon className="size-5" />
      </Button>
      <Button variant="secondary" className="hidden md:inline-flex" onClick={onLogout}>
        Log out
      </Button>
    </header>
  );
}

export { Header };
