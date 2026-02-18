import type { ReactNode } from "react";

import { AppShell } from "./system/AppShell.tsx";
import { PageContainer } from "./system/PageContainer.tsx";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AppShell>
      <PageContainer withBottomInset={false}>{children}</PageContainer>
    </AppShell>
  );
}
