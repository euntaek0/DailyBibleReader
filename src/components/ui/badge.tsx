import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils.ts";

const badgeVariants = cva(
  "inline-flex select-none items-center justify-center rounded-full border font-semibold leading-none tracking-[-0.01em] whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-500 text-white",
        secondary: "border-transparent bg-neutral-700 text-white",
        outline: "border-border text-muted-foreground",

        primary: "border-transparent bg-brand-500 text-white",
        neutral: "border-transparent bg-neutral-700 text-white",
        signal: "border-transparent bg-signals-default text-white",
        warning: "border-transparent bg-signals-warning text-white",
        danger: "border-transparent bg-signals-error text-white",
        success: "border-transparent bg-signals-success text-white",

        primaryWeak: "border-transparent bg-brand-100 text-brand-500",
        neutralWeak: "border-transparent bg-neutral-100 text-neutral-700",
        signalWeak: "border-transparent bg-signals-default-light text-signals-default",
        warningWeak: "border-transparent bg-signals-warning-light text-signals-warning",
        dangerWeak: "border-transparent bg-signals-error-light text-signals-error",
        successWeak: "border-transparent bg-signals-success-light text-signals-success",

        read: "border-transparent bg-signals-success-light text-signals-success",
        partial: "border-transparent bg-signals-warning-light text-signals-warning",
        notread: "border-transparent bg-neutral-100 text-neutral-700",
      },
      size: {
        sm: "h-7 px-2.5 text-[11px]",
        md: "h-8 px-3 text-xs",
        lg: "h-9 px-3.5 text-[13px]",
        xl: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps): React.JSX.Element {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge };
