import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils.ts";

type BoardRowSurface = "card" | "subtle";

export interface BoardRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  surface?: BoardRowSurface;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  leadingClassName?: string;
}

function BoardRow({
  className,
  title,
  description,
  leading,
  trailing,
  collapsible = false,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  surface = "card",
  contentClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  leadingClassName,
  children,
  ...props
}: BoardRowProps): React.JSX.Element {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const expanded = isControlled ? Boolean(open) : internalOpen;
  const contentId = React.useId();

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }

      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const baseSurfaceClassName =
    surface === "subtle"
      ? "border-border/70 bg-background/70 shadow-none"
      : "border-border/80 bg-card shadow-1";

  const headerContent = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {leading ? <span className={cn("inline-flex shrink-0 items-center text-brand-500", leadingClassName)}>{leading}</span> : null}
          <p className={cn("truncate text-sm font-semibold text-foreground", titleClassName)}>{title}</p>
        </div>
        {description ? <div className={cn("pt-1 text-sm leading-6 text-muted-foreground", descriptionClassName)}>{description}</div> : null}
      </div>

      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </>
  );

  return (
    <div className={cn("overflow-hidden rounded-xl border", baseSurfaceClassName, className)} {...props}>
      {collapsible ? (
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-fast ease-standard",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "hover:bg-muted/30",
            disabled && "cursor-not-allowed opacity-55 hover:bg-transparent",
            headerClassName
          )}
          onClick={() => {
            if (disabled) {
              return;
            }
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-controls={contentId}
          disabled={disabled}
        >
          {headerContent}
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-standard", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      ) : (
        <div className={cn("flex items-center gap-3 px-4 py-3", headerClassName)}>{headerContent}</div>
      )}

      {collapsible ? (
        <div id={contentId} className={cn("border-t border-border/70 bg-muted/20 px-4 py-3", !expanded && "hidden", contentClassName)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export { BoardRow };
