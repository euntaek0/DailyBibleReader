import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { bibleBookMap } from "../constants/bible.ts";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.ts";
import { calculateScore, type MatchResult } from "../utils/textMatcher.ts";
import { Button } from "./ui/button.tsx";
import { TopBar } from "./system/TopBar.tsx";
import { PageContainer } from "./system/PageContainer.tsx";
import { ReaderText } from "./system/ReaderText.tsx";
import { MicControl, type MicControlState } from "./system/MicControl.tsx";
import { ChapterCompleteDialog } from "./system/ChapterCompleteDialog.tsx";
import { StatusBadge } from "./system/StatusBadge.tsx";
import { Progress } from "./ui/progress.tsx";
import { cn } from "../lib/utils.ts";

export interface ChapterVerse {
  index: number;
  text: string;
}

interface ReaderViewProps {
  bookKey: string;
  chapter: number;
  verses: ChapterVerse[];
  isLoading?: boolean;
  error?: string | null;
  onBack: () => void;
  onNextChapter?: () => void;
}

export function ReaderView({
  bookKey,
  chapter,
  verses,
  isLoading = false,
  error = null,
  onBack,
  onNextChapter,
}: ReaderViewProps): React.JSX.Element {
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(-1);
  const [completedVerses, setCompletedVerses] = useState<boolean[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported, permissionState } =
    useSpeechRecognition();

  const scrollRef = useRef<HTMLDivElement>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bookName = bibleBookMap[bookKey as keyof typeof bibleBookMap]?.kor ?? bookKey;

  const micState: MicControlState = useMemo(() => {
    if (!isSupported) {
      return "unsupported";
    }

    if (permissionState === "denied") {
      return "denied";
    }

    return isListening ? "listening" : "idle";
  }, [isListening, isSupported, permissionState]);

  const currentMatchResult: MatchResult | null = useMemo(() => {
    if (!isListening || !transcript || activeVerseIndex < 0 || activeVerseIndex >= verses.length) {
      return null;
    }

    const currentVerse = verses[activeVerseIndex];
    if (!currentVerse) {
      return null;
    }

    return calculateScore(currentVerse.text, transcript);
  }, [activeVerseIndex, isListening, transcript, verses]);

  const completedCount = useMemo(() => completedVerses.filter(Boolean).length, [completedVerses]);
  const progressValue = verses.length > 0 ? Math.round((completedCount / verses.length) * 100) : 0;

  const scrollToVerse = useCallback((index: number) => {
    if (!scrollRef.current) {
      return;
    }

    const element = scrollRef.current.querySelector<HTMLElement>(`#verse-${index}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const advanceToNextVerse = useCallback(() => {
    if (activeVerseIndex >= verses.length) {
      return;
    }

    setCompletedVerses((previous) => {
      const next = [...previous];
      if (activeVerseIndex >= 0 && activeVerseIndex < verses.length) {
        next[activeVerseIndex] = true;
      }
      return next;
    });

    resetTranscript();

    const nextIndex = activeVerseIndex + 1;
    if (nextIndex >= verses.length) {
      setActiveVerseIndex(-1);
      stopListening();
      setShowCompletionModal(true);
      return;
    }

    setActiveVerseIndex(nextIndex);
    window.setTimeout(() => scrollToVerse(nextIndex), 80);
  }, [activeVerseIndex, resetTranscript, scrollToVerse, stopListening, verses.length]);

  useEffect(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (!currentMatchResult || !isListening || !transcript || activeVerseIndex < 0 || activeVerseIndex >= verses.length) {
      return;
    }

    if (currentMatchResult.score >= 1) {
      silenceTimerRef.current = setTimeout(() => {
        advanceToNextVerse();
      }, 0);
      return;
    }

    if (currentMatchResult.score >= 0.7) {
      silenceTimerRef.current = setTimeout(() => {
        advanceToNextVerse();
      }, 900);
    }
  }, [activeVerseIndex, advanceToNextVerse, currentMatchResult, isListening, transcript, verses.length]);

  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.listening = String(isListening);
    return () => {
      document.documentElement.dataset.listening = "false";
    };
  }, [isListening]);

  const handleStartReading = (): void => {
    if (verses.length === 0) {
      return;
    }

    setShowCompletionModal(false);
    setActiveVerseIndex(0);
    setCompletedVerses(new Array(verses.length).fill(false));
    startListening();
    resetTranscript();
    window.setTimeout(() => scrollToVerse(0), 80);
  };

  const handleStopReading = (): void => {
    setActiveVerseIndex(-1);
    stopListening();
  };

  const handleToggleMic = (): void => {
    if (isListening) {
      handleStopReading();
      return;
    }

    handleStartReading();
  };

  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title={`${bookName} ${chapter}장`} onBack={onBack} subtitle="본문을 불러오는 중" variant="section" appearance="translucent" />
        <PageContainer withBottomInset>
          <div className="reader-column flex min-h-[52vh] items-center justify-center rounded-xl border border-border/75 bg-card text-sm text-muted-foreground">
            본문을 불러오고 있어요…
          </div>
        </PageContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title={`${bookName} ${chapter}장`} onBack={onBack} subtitle="불러오기 실패" variant="section" appearance="translucent" />
        <PageContainer withBottomInset>
          <div className="reader-column space-y-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <p className="text-sm text-foreground">{error}</p>
            <Button variant="outline" onClick={onBack}>
              선택 화면으로 돌아가기
            </Button>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <TopBar
        title={`${bookName} ${chapter}장`}
        subtitle={`${completedCount}/${verses.length}절 완료`}
        onBack={onBack}
        compact={isListening}
        variant="section"
        appearance="translucent"
        rightAction={
          onNextChapter ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNextChapter}
              className="tap-target h-11 w-11 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              aria-label="다음 장"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          ) : null
        }
      />

      <PageContainer withBottomInset withMicDockInset className={cn(isListening ? "pt-2" : "pt-3")}>
        <div ref={scrollRef} className="reader-column space-y-4">
          <section className="space-y-3 rounded-2xl border border-border/75 bg-card p-4" aria-label="장 진행률">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">장 진행률</p>
              {currentMatchResult ? <StatusBadge status={currentMatchResult.status} score={currentMatchResult.score} /> : null}
            </div>
            <Progress value={progressValue} />
            {isListening && transcript ? (
              <p className="line-clamp-1 text-sm leading-[1.4] text-muted-foreground" aria-live="polite">
                인식: “{transcript}”
              </p>
            ) : null}
          </section>

          <section className="space-y-3" aria-label="성경 본문">
            {verses.map((verse, index) => {
              const isActive = index === activeVerseIndex;
              const isCompleted = Boolean(completedVerses[index]);

              return (
                <article
                  key={verse.index}
                  id={`verse-${index}`}
                  className={cn(
                    "rounded-2xl border p-4 transition-all duration-base ease-standard",
                    isActive && "border-primary/45 bg-brand-100/45 shadow-1",
                    isCompleted && "border-status-read/30 bg-status-read/8",
                    !isActive && !isCompleted && "border-border/75 bg-card",
                    isListening && !isActive && !isCompleted && "opacity-70"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn("pt-1 text-sm font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>{verse.index + 1}</span>
                    <ReaderText
                      text={verse.text}
                      matchedIndices={isActive ? currentMatchResult?.matchedIndices : undefined}
                      dimUnmatched={isActive}
                      className={cn(isCompleted && "text-status-read")}
                    />
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </PageContainer>

      <div className="mic-dock pointer-events-none absolute inset-x-0 z-30 px-4">
        <div className="pointer-events-auto reader-column">
          <MicControl
            size="compact"
            state={micState}
            onToggle={handleToggleMic}
            helperText={
              micState === "idle"
                ? "마이크를 눌러 이 장 읽기를 시작하세요."
                : micState === "denied"
                  ? "브라우저 권한 설정에서 마이크를 허용해 주세요."
                  : undefined
            }
            className="mx-auto w-full max-w-[18rem]"
          />
        </div>
      </div>

      <ChapterCompleteDialog
        open={showCompletionModal}
        onOpenChange={setShowCompletionModal}
        title="이번 장을 모두 읽었어요"
        description={`${bookName} ${chapter}장 낭독을 마쳤습니다.`}
        onBack={onBack}
        onNextChapter={onNextChapter}
      />
    </div>
  );
}
