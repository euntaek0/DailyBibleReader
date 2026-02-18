import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils.ts";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-[10px] font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-1 hover:bg-brand-400 active:bg-brand-600 data-[pressed=true]:bg-brand-600 data-[pressed=true]:shadow-none disabled:bg-brand-200 disabled:text-white/90",
        primaryWeak:
          "bg-brand-100 text-brand-500 hover:bg-brand-200 active:bg-brand-300 data-[pressed=true]:bg-brand-300 data-[pressed=true]:shadow-none disabled:bg-brand-100 disabled:text-brand-300",
        secondary:
          "bg-neutral-700 text-white shadow-1 hover:bg-neutral-600 active:bg-neutral-800 data-[pressed=true]:bg-neutral-800 data-[pressed=true]:shadow-none disabled:bg-neutral-300 disabled:text-white/85",
        secondaryWeak:
          "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 data-[pressed=true]:bg-neutral-300 data-[pressed=true]:shadow-none disabled:bg-neutral-100 disabled:text-neutral-400",
        danger:
          "bg-signals-error text-white shadow-1 hover:brightness-[1.06] active:brightness-[0.9] data-[pressed=true]:brightness-[0.9] data-[pressed=true]:shadow-none disabled:bg-signals-error-light disabled:text-white/90",
        dangerWeak:
          "bg-signals-error-light text-signals-error hover:brightness-[0.98] active:brightness-[0.94] data-[pressed=true]:brightness-[0.94] data-[pressed=true]:shadow-none disabled:bg-signals-error-light/70 disabled:text-signals-error/45",
        primaryInverse:
          "bg-white text-brand-500 shadow-1 hover:bg-neutral-50 active:bg-neutral-100 data-[pressed=true]:bg-neutral-100 data-[pressed=true]:shadow-none disabled:bg-white/70 disabled:text-brand-300",
        primaryInverseWeak:
          "bg-white/20 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] hover:bg-white/28 active:bg-white/34 data-[pressed=true]:bg-white/34 data-[pressed=true]:shadow-none disabled:bg-white/10 disabled:text-white/45",
        ghost: "text-foreground hover:bg-muted/80 active:bg-muted data-[pressed=true]:bg-muted disabled:text-muted-foreground/55",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted/70 active:bg-muted data-[pressed=true]:bg-muted data-[pressed=true]:shadow-none disabled:border-border/60 disabled:bg-muted/30 disabled:text-muted-foreground",
      },
      size: {
        sm: "h-8 min-w-[2.5rem] px-3 text-[12px] leading-none",
        md: "h-10 min-w-[2.75rem] px-4 text-sm leading-none",
        lg: "h-11 min-w-[3rem] px-5 text-[15px] leading-none",
        xl: "h-14 min-w-[3.5rem] px-7 text-base leading-none",
        icon: "h-10 w-10 rounded-full",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
      pressed: {
        true: "translate-y-[1px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
      pressed: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, pressed, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const label = typeof children === "string" && children.trim().length ? children : "버튼";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, pressed }), className)}
        ref={ref}
        disabled={Boolean(disabled || loading)}
        aria-busy={loading === true ? true : undefined}
        data-pressed={pressed ? "true" : undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className="opacity-0">{label}</span>
            <span className="absolute inset-0 flex items-center justify-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-current/75" />
              <span className="h-1.5 w-1.5 rounded-full bg-current/55" />
              <span className="h-1.5 w-1.5 rounded-full bg-current/35" />
            </span>
            <span className="sr-only">로딩 중</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
