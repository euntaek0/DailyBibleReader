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

  return (
    <header
      className={cn(
        "topbar-shadow sticky top-0 z-20 bg-background/96 px-[var(--content-gutter)] backdrop-blur supports-[backdrop-filter]:bg-background/92",
        compact
          ? "pb-2 pt-[calc(env(safe-area-inset-top)+0.35rem)]"
          : isPage
            ? "pb-3 pt-[calc(env(safe-area-inset-top)+0.95rem)]"
            : "pb-3 pt-[calc(env(safe-area-inset-top)+0.65rem)]"
      )}
    >
      <div className="flex min-h-[var(--topbar-height)] items-center gap-2">
        {onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="뒤로 가기" className="tap-target">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1
            className={cn(
              "truncate font-semibold tracking-[-0.015em] text-foreground",
              compact ? "text-lg leading-tight" : isPage ? "text-[2rem] leading-[1.12]" : "text-[1.35rem] leading-[1.2]"
            )}
          >
            {title}
          </h1>
          {subtitle ? <p className={cn("truncate pt-1 text-muted-foreground", compact ? "text-sm" : "text-[1.05rem]")}>{subtitle}</p> : null}
        </div>
        {rightAction ? <div className="shrink-0">{rightAction}</div> : null}
      </div>
    </header>
  );
}
