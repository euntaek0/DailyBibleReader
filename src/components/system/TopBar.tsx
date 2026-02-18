import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

import { Button } from "../ui/button.tsx";
import { cn } from "../../lib/utils.ts";

interface TopBarProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  compact?: boolean;
  variant?: "page" | "section";
  showSubtitle?: boolean;
}

export function TopBar({
  title,
  subtitle,
  onBack,
  leftAction,
  rightAction,
  compact = false,
  variant = "page",
  showSubtitle = false,
}: TopBarProps): React.JSX.Element {
  const isPage = variant === "page";
  const titleClass = compact
    ? "text-[1.02rem] leading-[1.2] tracking-[-0.012em]"
    : isPage
      ? "text-[1.15rem] leading-[1.2] tracking-[-0.014em]"
      : "text-[1.08rem] leading-[1.2] tracking-[-0.012em]";
  const subtitleClass = "text-[0.78rem] leading-[1.35] text-muted-foreground";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border/70 bg-background/96 supports-[backdrop-filter]:bg-background/92",
        compact
          ? "pt-[calc(env(safe-area-inset-top)+0.25rem)]"
          : "pt-[calc(env(safe-area-inset-top)+0.4rem)]",
        showSubtitle && subtitle ? "pb-2" : "pb-1.5"
      )}
    >
      <div className="reader-column page-gutter">
        <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-start">
            {onBack ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="뒤로 가기"
                className="tap-target h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            ) : leftAction ? (
              leftAction
            ) : null}
          </div>

          <div className="min-w-0 text-center">
            <h1 className={cn("truncate font-semibold text-foreground", titleClass)}>{title}</h1>
            {showSubtitle && subtitle ? <p className={cn("mt-0.5 line-clamp-1", subtitleClass)}>{subtitle}</p> : null}
          </div>

          <div className="flex h-10 w-10 items-center justify-end">{rightAction ?? null}</div>
        </div>
      </div>
    </header>
  );
}
