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
}

export function MicControl({ state, onToggle, onOpenSettingsGuide, className, helperText }: MicControlProps): React.JSX.Element {
  if (state === "denied" || state === "unsupported") {
    return (
      <Card className={cn("border-destructive/35 bg-destructive/5 shadow-1", className)}>
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 text-destructive" aria-hidden="true" />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-foreground">{state === "denied" ? "마이크 권한이 꺼져 있어요" : "현재 브라우저에서 음성 인식을 지원하지 않아요"}</p>
            <p className="text-sm text-muted-foreground">
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

  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <Button
        size="icon"
        className={cn(
          "relative h-[68px] w-[68px] rounded-full",
          state === "listening"
            ? "bg-secondary text-secondary-foreground shadow-[0_0_0_8px_hsl(var(--secondary)/0.14)]"
            : "bg-primary text-primary-foreground shadow-[0_0_0_8px_hsl(var(--primary)/0.12)]"
        )}
        onClick={onToggle}
        aria-label={state === "listening" ? "낭독 중지" : "낭독 시작"}
        aria-pressed={state === "listening"}
      >
        {state === "listening" ? <Square className="h-5 w-5" /> : <Mic className="h-6 w-6" />}
        {state === "listening" ? (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-secondary/40 animate-mic-pulse" aria-hidden="true" />
        ) : null}
      </Button>
      <div className="text-center text-sm font-medium text-muted-foreground" aria-live="polite">
        {state === "listening" ? "듣고 있어요. 천천히 읽어주세요." : helperText ?? "마이크를 눌러 낭독을 시작하세요."}
      </div>
    </div>
  );
}

export function MicMutedIcon(): React.JSX.Element {
  return <MicOff className="h-5 w-5" aria-hidden="true" />;
}
