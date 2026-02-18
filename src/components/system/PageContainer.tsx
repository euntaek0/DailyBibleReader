import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBottomInset?: boolean;
  withMicDockInset?: boolean;
}

export function PageContainer({
  children,
  className,
  withBottomInset = true,
  withMicDockInset = false,
}: PageContainerProps): React.JSX.Element {
  return (
    <main
      className={cn(
        "page-gutter flex-1 overflow-y-auto pt-4",
        withBottomInset && !withMicDockInset && "pb-[calc(var(--bottom-nav-height)+0.85rem+env(safe-area-inset-bottom))]",
        withBottomInset && withMicDockInset && "pb-[calc(var(--bottom-nav-height)+var(--mic-dock-height)+0.75rem+env(safe-area-inset-bottom))]",
        !withBottomInset && "pb-6",
        className
      )}
    >
      {children}
    </main>
  );
}
