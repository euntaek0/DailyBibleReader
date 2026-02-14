import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps): React.JSX.Element {
  return (
    <div className="flex h-full w-full justify-center bg-[radial-gradient(circle_at_top,_hsl(var(--background))_0%,_hsl(var(--background))_42%,_hsl(var(--muted))_130%)]">
      <div
        className={cn(
          "relative flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-background md:my-3 md:h-[calc(100%-1.5rem)] md:rounded-xl md:border md:border-border/80 md:shadow-2",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
