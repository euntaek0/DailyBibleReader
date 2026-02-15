import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps): React.JSX.Element {
  return (
    <div className="flex h-full w-full justify-center bg-background">
      <div
        className={cn(
          "relative flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-background md:my-5 md:h-[calc(100%-2.5rem)] md:rounded-[24px] md:border md:border-border/80 md:shadow-2",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
