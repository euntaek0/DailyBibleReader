import * as React from "react";

import { cn } from "../../lib/utils.ts";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
}

export function Progress({ value = 0, max = 100, label, className, ...props }: ProgressProps): React.JSX.Element {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percentage = (clamped / safeMax) * 100;

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {label ? <div className="text-xs text-muted-foreground">{label}</div> : null}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(clamped)}
      >
        <div className="h-full rounded-full bg-primary transition-all duration-base ease-standard" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
