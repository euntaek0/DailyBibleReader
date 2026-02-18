import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils.ts";

const badgeVariants = cva(
  "inline-flex select-none items-center justify-center rounded-full font-semibold leading-none tracking-[-0.01em] whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-500 text-white",
        secondary: "bg-neutral-700 text-white",
        outline: "border border-border text-muted-foreground",

        primary: "bg-brand-500 text-white",
        neutral: "bg-neutral-700 text-white",
        signal: "bg-signals-default text-white",
        warning: "bg-signals-warning text-white",
        danger: "bg-signals-error text-white",
        success: "bg-signals-success text-white",

        primaryWeak: "bg-brand-100 text-brand-700",
        neutralWeak: "bg-neutral-100 text-neutral-800",
        signalWeak: "bg-signals-default-light text-neutral-800",
        warningWeak: "bg-signals-warning-light text-signals-warning",
        dangerWeak: "bg-signals-error-light text-signals-error",
        successWeak: "bg-signals-success-light text-signals-success",

        read: "bg-signals-success-light text-signals-success",
        partial: "bg-signals-warning-light text-signals-warning",
        notread: "bg-neutral-100 text-neutral-800",
      },
      size: {
        sm: "h-6 px-2.5 text-[11px]",
        md: "h-7 px-3 text-[12px]",
        lg: "h-8 px-3.5 text-[13px]",
        xl: "h-9 px-4 text-[14px]",
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
