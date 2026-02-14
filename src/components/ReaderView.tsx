import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { bibleBookMap } from "../constants/bible.ts";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.ts";
import { calculateScore, type MatchResult } from "../utils/textMatcher.ts";
import { Button } from "./ui/button.tsx";
import { Card, CardContent } from "./ui/card.tsx";
import { Progress } from "./ui/progress.tsx";
import { TopBar } from "./system/TopBar.tsx";
import { PageContainer } from "./system/PageContainer.tsx";
import { ReaderText } from "./system/ReaderText.tsx";
import { MicControl, type MicControlState } from "./system/MicControl.tsx";
import { ChapterCompleteDialog } from "./system/ChapterCompleteDialog.tsx";
import { StatusBadge } from "./system/StatusBadge.tsx";
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
        <TopBar title={`${bookName} ${chapter}장`} onBack={onBack} subtitle="본문을 불러오는 중" variant="section" />
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
        <TopBar title={`${bookName} ${chapter}장`} onBack={onBack} subtitle="불러오기 실패" variant="section" />
        <PageContainer withBottomInset>
          <div className="reader-column">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="space-y-4 p-5">
                <p className="text-sm text-foreground">{error}</p>
                <Button variant="outline" onClick={onBack}>
                  선택 화면으로 돌아가기
                </Button>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title={`${bookName} ${chapter}장`}
        subtitle={`${completedCount}/${verses.length}절 완료`}
        onBack={onBack}
        compact={isListening}
        variant="section"
        rightAction={
          onNextChapter ? (
            <Button variant="ghost" size="sm" onClick={onNextChapter} className="hidden sm:inline-flex">
              다음 장
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null
        }
      />

      <PageContainer className={cn(isListening ? "pt-3" : "pt-6")}>
        <div ref={scrollRef} className="reader-column space-y-6">
          <Card className={cn("border-border/80 bg-card/96", isListening ? "shadow-2" : "shadow-1")}>
            <CardContent className={cn("space-y-4", isListening ? "p-4" : "p-5")}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">장 진행률</p>
                {currentMatchResult ? <StatusBadge status={currentMatchResult.status} score={currentMatchResult.score} /> : null}
              </div>
              <Progress value={progressValue} />
              {isListening && transcript ? (
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
                  인식: “{transcript}”
                </p>
              ) : null}
            </CardContent>
          </Card>

          <section className="space-y-4" aria-label="성경 본문">
            {verses.map((verse, index) => {
              const isActive = index === activeVerseIndex;
              const isCompleted = Boolean(completedVerses[index]);

              return (
                <article
                  key={verse.index}
                  id={`verse-${index}`}
                  className={cn(
                    "rounded-xl border p-5 transition-all duration-base ease-standard",
                    isActive && "reader-surface shadow-2",
                    isCompleted && "border-status-read/30 bg-status-read/5",
                    !isActive && !isCompleted && "border-border/80 bg-card",
                    isListening && !isActive && !isCompleted && "opacity-70"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn("pt-1 text-sm font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>{verse.index + 1}</span>
                    <ReaderText
                      text={verse.text}
                      matchedIndices={isActive ? currentMatchResult?.matchedIndices : undefined}
                      dimUnmatched={isActive}
                      className={cn("text-[clamp(1.25rem,5.1vw,1.75rem)]", isCompleted && "text-status-read")}
                    />
                  </div>
                </article>
              );
            })}
          </section>

          <div className="sticky bottom-3 z-10 rounded-xl border border-border/80 bg-background/92 p-4 shadow-2 backdrop-blur">
            <MicControl
              state={micState}
              onToggle={handleToggleMic}
              helperText={
                micState === "idle"
                  ? "마이크를 눌러 이 장 읽기를 시작하세요."
                  : micState === "denied"
                    ? "브라우저 권한 설정에서 마이크를 허용해 주세요."
                    : undefined
              }
            />
          </div>
        </div>
      </PageContainer>

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
