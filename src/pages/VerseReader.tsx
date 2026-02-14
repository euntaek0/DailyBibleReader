import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useSpeechRecognition } from "../hooks/useSpeechRecognition.ts";
import { calculateScore, type MatchResult } from "../utils/textMatcher.ts";
import { fetchDailyVerse, type DailyVerse } from "../utils/api.ts";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { ReaderText } from "../components/system/ReaderText.tsx";
import { MicControl, type MicControlState } from "../components/system/MicControl.tsx";
import { StatusBadge } from "../components/system/StatusBadge.tsx";
import { cn } from "../lib/utils.ts";

export function VerseReader(): React.JSX.Element {
  const { isListening, transcript, startListening, stopListening, isSupported, permissionState, error } =
    useSpeechRecognition();
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVerse = async (): Promise<void> => {
      setIsLoading(true);
      const data = await fetchDailyVerse();
      setVerse(data);
      setIsLoading(false);
    };

    void loadVerse();
  }, []);

  const toggleRecording = (): void => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  };

  const matchResult: MatchResult = useMemo(() => {
    if (!verse) {
      return { score: 0, matchCount: 0, totalCount: 0, isMatch: false, status: "NOT_READ", matchedIndices: [] };
    }

    return calculateScore(verse.text, transcript);
  }, [transcript, verse]);

  const micState: MicControlState = useMemo(() => {
    if (!isSupported) {
      return "unsupported";
    }

    if (permissionState === "denied") {
      return "denied";
    }

    return isListening ? "listening" : "idle";
  }, [isListening, isSupported, permissionState]);

  const helperText = useMemo(() => {
    if (micState === "denied") {
      return "브라우저 설정에서 이 사이트의 마이크 권한을 허용해 주세요.";
    }

    if (error) {
      return error;
    }

    if (!transcript && !isListening) {
      return "마이크를 눌러 오늘의 말씀을 읽어보세요.";
    }

    if (isListening && !transcript) {
      return "듣고 있어요. 천천히 읽어주세요.";
    }

    if (matchResult.status === "READ") {
      return "좋아요. 잘 읽혔어요.";
    }

    if (matchResult.status === "PARTIAL") {
      return "일부 어절이 빠졌어요. 해당 부분만 다시 읽어보세요.";
    }

    return "계속 읽어주세요.";
  }, [error, isListening, matchResult.status, micState, transcript]);

  if (isLoading || !verse) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title="오늘의 말씀" subtitle="불러오는 중" variant="page" />
        <PageContainer withBottomInset>
          <div className="reader-column flex min-h-[52vh] items-center justify-center rounded-xl border border-border/70 bg-card text-sm text-muted-foreground">
            오늘의 구절을 불러오고 있어요…
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title="오늘의 말씀" subtitle={verse.reference} compact={isListening} variant="page" />

      <PageContainer className={cn(isListening ? "pt-3" : "pt-4")}>
        <div className="reader-column space-y-4">
          <Card className={cn("reader-surface", isListening ? "shadow-2" : "shadow-1")}>
            <CardHeader className="space-y-2 pb-1">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Daily Verse</p>
              <CardTitle className={cn("tracking-[-0.01em]", isListening ? "text-base" : "text-lg")}>{verse.reference}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <ReaderText text={verse.text} matchedIndices={matchResult.matchedIndices} dimUnmatched={isListening} />

              <div className="flex items-center justify-between gap-3">
                <StatusBadge status={matchResult.status} score={matchResult.score} />
                <span className="text-xs font-medium text-muted-foreground">정확도 {Math.round(matchResult.score * 100)}%</span>
              </div>

              {transcript ? (
                <div className="rounded-md border border-border/70 bg-background/85 px-3 py-2 text-sm text-muted-foreground" aria-live="polite">
                  인식: “{transcript}”
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{isListening ? "읽는 중에는 일치한 어절이 바로 강조됩니다." : "낭독을 시작하면 읽은 어절이 색으로 표시됩니다."}</p>
              )}
            </CardContent>
          </Card>

          <div className="sticky bottom-4 z-10 rounded-xl border border-border/75 bg-background/92 p-3 shadow-2 backdrop-blur">
            <MicControl
              state={micState}
              onToggle={toggleRecording}
              onOpenSettingsGuide={() => toast.info("브라우저 주소창 왼쪽의 사이트 권한에서 마이크를 허용해 주세요.")}
              helperText={helperText}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
