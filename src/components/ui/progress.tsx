import * as React from "react";

import { cn } from "../../lib/utils.ts";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function Progress({ value = 0, max = 100, label, showValue = true, className, ...props }: ProgressProps): React.JSX.Element {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percentage = (clamped / safeMax) * 100;
  const roundedValue = Math.round(clamped);

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label || showValue ? (
        <div className="flex items-center justify-between gap-3">
          {label ? <div className="text-sm font-medium text-muted-foreground">{label}</div> : <span />}
          {showValue ? <div className="text-sm font-semibold text-foreground">{Math.round(percentage)}%</div> : null}
        </div>
      ) : null}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={roundedValue}
        aria-valuetext={`${Math.round(percentage)}%`}
      >
        <div className="h-full rounded-full bg-primary/95 transition-all duration-base ease-standard" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
