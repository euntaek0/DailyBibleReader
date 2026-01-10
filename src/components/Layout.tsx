import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px", // Mobile view simulation on desktop
        height: "100%",
        margin: "0 auto",
        backgroundColor: "var(--color-bg-base)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 40px rgba(0,0,0,0.5)", // Subtle shadow for depth on desktop
        overflow: "hidden",
      }}
    >
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--spacing-md)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}
