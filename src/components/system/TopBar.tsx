import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

import { Button } from "../ui/button.tsx";
import { cn } from "../../lib/utils.ts";

interface TopBarProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  compact?: boolean;
  variant?: "page" | "section";
}

export function TopBar({
  title,
  subtitle,
  onBack,
  rightAction,
  compact = false,
  variant = "page",
}: TopBarProps): React.JSX.Element {
  const isPage = variant === "page";
  const titleClass = compact
    ? "text-[1.375rem] leading-[1.16] tracking-[-0.018em]"
    : isPage
      ? "text-[clamp(1.5rem,6.2vw,1.95rem)] leading-[1.1] tracking-[-0.02em]"
      : "text-[1.4rem] leading-[1.14] tracking-[-0.018em]";
  const subtitleClass = compact ? "text-sm leading-[1.45]" : isPage ? "text-sm leading-[1.45]" : "text-sm leading-[1.45]";

  return (
    <header
      className={cn(
        "topbar-shadow sticky top-0 z-20 bg-background/94 px-[var(--content-gutter)] backdrop-blur supports-[backdrop-filter]:bg-background/90",
        compact
          ? "pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]"
          : isPage
            ? "pb-3 pt-[calc(env(safe-area-inset-top)+1.1rem)]"
            : "pb-3 pt-[calc(env(safe-area-inset-top)+1rem)]"
      )}
    >
      <div className="flex min-h-[var(--topbar-height)] items-center gap-3">
        {onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="뒤로 가기" className="tap-target h-10 w-10 rounded-full text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className={cn("truncate font-semibold text-foreground", titleClass)}>
            {title}
          </h1>
          {subtitle ? <p className={cn("truncate pt-1 text-muted-foreground", subtitleClass)}>{subtitle}</p> : null}
        </div>
        {rightAction ? <div className="shrink-0">{rightAction}</div> : null}
      </div>
    </header>
  );
}
