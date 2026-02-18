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
  appearance?: "solid" | "translucent";
}

export function TopBar({
  title,
  subtitle,
  onBack,
  leftAction,
  rightAction,
  compact = false,
  variant = "page",
  showSubtitle,
  appearance = "translucent",
}: TopBarProps): React.JSX.Element {
  const isPage = variant === "page";
  const resolvedShowSubtitle = showSubtitle ?? Boolean(subtitle);

  const titleClass = compact
    ? "text-[1rem] leading-[1.2] tracking-[-0.012em]"
    : isPage
      ? "text-[1.14rem] leading-[1.2] tracking-[-0.014em]"
      : "text-[1.07rem] leading-[1.2] tracking-[-0.012em]";

  const subtitleClass = "text-[0.75rem] leading-[1.35] text-muted-foreground";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border/60",
        appearance === "translucent" ? "glass-surface" : "bg-background",
        compact ? "pt-[calc(env(safe-area-inset-top)+0.2rem)]" : "pt-[calc(env(safe-area-inset-top)+0.35rem)]",
        resolvedShowSubtitle && subtitle ? "pb-2" : "pb-1"
      )}
    >
      <div className="reader-column page-gutter">
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center">
          <div className="flex h-11 w-11 items-center justify-start">
            {onBack ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="뒤로 가기"
                className="tap-target h-11 w-11 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            ) : leftAction ? (
              leftAction
            ) : null}
          </div>

          <div className="min-w-0 px-2 text-center">
            <h1 className={cn("truncate font-semibold text-foreground", titleClass)}>{title}</h1>
            {resolvedShowSubtitle && subtitle ? <p className={cn("mt-0.5 line-clamp-1", subtitleClass)}>{subtitle}</p> : null}
          </div>

          <div className="flex h-11 w-11 items-center justify-end">{rightAction ?? null}</div>
        </div>
      </div>
    </header>
  );
}
