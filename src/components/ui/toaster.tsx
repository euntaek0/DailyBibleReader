import { Toaster as Sonner } from "sonner";

export function Toaster(): React.JSX.Element {
  return (
    <Sonner
      position="top-center"
      expand={false}
      richColors={false}
      theme="system"
      toastOptions={{
        className: "border border-border/80 bg-card text-card-foreground shadow-2",
      }}
    />
  );
}
