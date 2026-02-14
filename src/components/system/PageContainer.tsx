import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBottomInset?: boolean;
}

export function PageContainer({ children, className, withBottomInset = true }: PageContainerProps): React.JSX.Element {
  return (
    <main
      className={cn(
        "page-gutter flex-1 overflow-y-auto pt-4",
        withBottomInset ? "pb-[calc(var(--bottom-nav-height)+1.75rem+env(safe-area-inset-bottom))]" : "pb-4",
        className
      )}
    >
      {children}
    </main>
  );
}
