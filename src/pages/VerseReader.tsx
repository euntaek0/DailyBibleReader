import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useSpeechRecognition } from "../hooks/useSpeechRecognition.ts";
import { calculateScore, type MatchResult } from "../utils/textMatcher.ts";
import { fetchDailyVerse, type DailyVerse } from "../utils/api.ts";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
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

  useEffect(() => {
    document.documentElement.dataset.listening = String(isListening);
    return () => {
      document.documentElement.dataset.listening = "false";
    };
  }, [isListening]);

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
        <TopBar title="오늘의 말씀" subtitle="불러오는 중" variant="page" appearance="translucent" />
        <PageContainer withBottomInset>
          <div className="reader-column flex min-h-[52vh] items-center justify-center text-sm text-muted-foreground">
            오늘의 구절을 불러오고 있어요…
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <TopBar
        title="오늘의 말씀"
        subtitle={verse.reference}
        compact={isListening}
        variant="page"
        appearance="translucent"
      />

      <PageContainer withBottomInset withMicDockInset className={cn(isListening ? "pt-2" : "pt-3")}>
        <div className="reader-column flex min-h-full flex-col items-center justify-center pb-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-500/90">Daily Verse</p>
          <h2
            className={cn(
              "mt-2 font-semibold tracking-[-0.02em] text-foreground",
              isListening ? "text-[1.35rem]" : "text-[1.55rem]"
            )}
          >
            {verse.reference}
          </h2>

          <ReaderText
            text={verse.text}
            matchedIndices={matchResult.matchedIndices}
            dimUnmatched={isListening}
            className={cn(
              "mx-auto mt-5 max-w-[20rem] text-center",
              isListening
                ? "text-[clamp(1.06rem,4.2vw,1.28rem)] leading-[1.48]"
                : "text-[clamp(1.12rem,4.4vw,1.36rem)] leading-[1.5]"
            )}
          />

          <div className="mt-4 flex items-center justify-center">
            <StatusBadge status={matchResult.status} />
          </div>

          <p className="mt-4 max-w-[20rem] text-sm leading-[1.4] text-muted-foreground">
            {isListening ? "읽는 중에는 일치한 어절이 바로 강조됩니다." : "낭독을 시작하면 읽은 어절이 색으로 표시됩니다."}
          </p>
        </div>
      </PageContainer>

      <div className="mic-dock pointer-events-none absolute inset-x-0 z-30 px-4">
        <div className="pointer-events-auto reader-column">
          <MicControl
            size="compact"
            state={micState}
            onToggle={toggleRecording}
            onOpenSettingsGuide={() => toast.info("브라우저 주소창 왼쪽의 사이트 권한에서 마이크를 허용해 주세요.")}
            helperText={helperText}
            className="mx-auto w-full max-w-[18rem]"
          />
        </div>
      </div>
    </div>
  );
}
