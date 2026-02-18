import { Mic, MicOff, Square, ShieldAlert } from "lucide-react";

import { Button } from "../ui/button.tsx";
import { Card, CardContent } from "../ui/card.tsx";
import { cn } from "../../lib/utils.ts";

export type MicControlState = "idle" | "listening" | "denied" | "unsupported";

interface MicControlProps {
  state: MicControlState;
  onToggle?: () => void;
  onOpenSettingsGuide?: () => void;
  className?: string;
  helperText?: string;
  size?: "compact" | "regular";
}

export function MicControl({
  state,
  onToggle,
  onOpenSettingsGuide,
  className,
  helperText,
  size = "compact",
}: MicControlProps): React.JSX.Element {
  if (state === "denied" || state === "unsupported") {
    return (
      <Card className={cn("bg-card", className)}>
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 text-signals-warning" aria-hidden="true" />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-foreground">
              {state === "denied" ? "마이크 권한이 꺼져 있어요" : "현재 브라우저에서 음성 인식을 지원하지 않아요"}
            </p>
            <p className="text-sm leading-[1.45] text-muted-foreground">
              {helperText ??
                (state === "denied"
                  ? "브라우저 설정에서 마이크 권한을 허용하면 바로 낭독을 시작할 수 있어요."
                  : "최신 Chrome 환경에서 다시 시도해 주세요.")}
            </p>
            {onOpenSettingsGuide ? (
              <Button variant="outline" size="sm" onClick={onOpenSettingsGuide}>
                권한 설정 안내
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCompact = size === "compact";
  const buttonSizeClass = isCompact ? "h-[58px] w-[58px]" : "h-[72px] w-[72px]";
  const iconSizeClass = isCompact ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]";
  const stopIconClass = isCompact ? "h-[12px] w-[12px]" : "h-[14px] w-[14px]";
  const idleRingClass = isCompact
    ? "shadow-[0_0_0_7px_hsl(var(--primary)/0.14),0_10px_24px_-14px_hsl(var(--primary)/0.48)]"
    : "shadow-[0_0_0_9px_hsl(var(--primary)/0.14),0_10px_24px_-14px_hsl(var(--primary)/0.48)]";
  const listeningRingClass = isCompact
    ? "shadow-[0_0_0_7px_hsl(var(--signal-success)/0.14),0_10px_24px_-14px_hsl(var(--signal-success)/0.52)]"
    : "shadow-[0_0_0_9px_hsl(var(--signal-success)/0.14),0_10px_24px_-14px_hsl(var(--signal-success)/0.52)]";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <Button
        size="icon"
        className={cn(
          "relative rounded-full",
          buttonSizeClass,
          state === "listening"
            ? cn("bg-signals-success text-white hover:brightness-[0.95]", listeningRingClass)
            : cn("bg-brand-500 text-white hover:bg-brand-400", idleRingClass)
        )}
        onClick={onToggle}
        aria-label={state === "listening" ? "낭독 중지" : "낭독 시작"}
        aria-pressed={state === "listening"}
      >
        {state === "listening" ? <Square className={stopIconClass} /> : <Mic className={iconSizeClass} />}
        {state === "listening" ? (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-signals-success/40 animate-mic-pulse" aria-hidden="true" />
        ) : null}
      </Button>
      <div
        className={cn(
          "text-center text-[0.88rem] font-medium leading-[1.4]",
          state === "listening" ? "text-signals-success" : "text-muted-foreground"
        )}
        aria-live="polite"
      >
        {state === "listening" ? "듣고 있어요. 천천히 읽어주세요." : helperText ?? "마이크를 눌러 낭독을 시작하세요."}
      </div>
    </div>
  );
}

export function MicMutedIcon(): React.JSX.Element {
  return <MicOff className="h-5 w-5" aria-hidden="true" />;
}
