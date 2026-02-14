import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import type { PlanDay } from "../constants/yearPlan.ts";
import { bibleBookMap } from "../constants/bible.ts";
import { fetchChapter, fetchYearPlanDay } from "../utils/api.ts";
import { ReaderView, type ChapterVerse } from "../components/ReaderView.tsx";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { Button } from "../components/ui/button.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Progress } from "../components/ui/progress.tsx";
import { cn } from "../lib/utils.ts";

function formatDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateInput(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function YearPlanPage(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todayPlan, setTodayPlan] = useState<PlanDay | null>(null);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  const [isReadingMode, setIsReadingMode] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [verses, setVerses] = useState<ChapterVerse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadPlan = async (): Promise<void> => {
      setIsPlanLoading(true);
      try {
        const plan = await fetchYearPlanDay(selectedDate);
        if (!isActive) {
          return;
        }

        setTodayPlan(plan);
        setCurrentChapterIndex(0);
      } catch (error) {
        console.error(error);
        if (!isActive) {
          return;
        }

        setTodayPlan(null);
        toast.error("통독 계획을 불러오지 못했어요.");
      } finally {
        if (isActive) {
          setIsPlanLoading(false);
        }
      }
    };

    void loadPlan();

    return () => {
      isActive = false;
    };
  }, [selectedDate]);

  useEffect(() => {
    if (!isReadingMode || !todayPlan) {
      return;
    }

    const chapterInfo = todayPlan.chapters[currentChapterIndex];
    if (!chapterInfo) {
      return;
    }

    const loadContent = async (): Promise<void> => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const fetchedVerses = await fetchChapter(chapterInfo.book, chapterInfo.chapter);
        if (fetchedVerses.length === 0) {
          throw new Error("No verses found");
        }

        const parsed = fetchedVerses.map((text, index) => ({ index, text }));
        setVerses(parsed);
      } catch (error) {
        console.error(error);
        setFetchError("본문을 불러오지 못했어요.");
        setVerses([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadContent();
  }, [currentChapterIndex, isReadingMode, todayPlan]);

  const completedPlanRatio = useMemo(() => {
    if (!todayPlan || todayPlan.chapters.length === 0) {
      return 0;
    }

    return Math.round((currentChapterIndex / todayPlan.chapters.length) * 100);
  }, [currentChapterIndex, todayPlan]);

  const handleNextChapter = (): void => {
    if (!todayPlan) {
      return;
    }

    if (currentChapterIndex < todayPlan.chapters.length - 1) {
      setCurrentChapterIndex((previous) => previous + 1);
      return;
    }

    setIsReadingMode(false);
    toast.success("오늘 분량을 모두 읽었어요.");
  };

  const handleBack = (): void => {
    setIsReadingMode(false);
  };

  if (isReadingMode && todayPlan) {
    const currentChapter = todayPlan.chapters[currentChapterIndex];

    return (
      <ReaderView
        key={`${currentChapter.book}-${currentChapter.chapter}`}
        bookKey={currentChapter.book}
        chapter={currentChapter.chapter}
        verses={verses}
        isLoading={isLoading}
        error={fetchError}
        onBack={handleBack}
        onNextChapter={handleNextChapter}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title="연간 통독" subtitle="날짜별 분량을 선택하고 바로 읽기" variant="page" />

      <PageContainer>
        <div className="reader-column space-y-6">
          <Card className="border-border/80 bg-card shadow-1">
            <CardHeader className="space-y-3 pb-2">
              <CardTitle className="text-[clamp(1.8rem,8vw,2.3rem)] leading-[1.05] tracking-[-0.02em]">Day {todayPlan?.day ?? "-"}</CardTitle>
              <CardDescription>날짜를 선택하면 해당 분량으로 이동합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="이전 날짜"
                  onClick={() => {
                    const previous = new Date(selectedDate);
                    previous.setDate(previous.getDate() - 1);
                    setSelectedDate(previous);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <input
                  type="date"
                  value={formatDateInput(selectedDate)}
                  onChange={(event) => {
                    if (event.target.value) {
                      setSelectedDate(parseDateInput(event.target.value));
                    }
                  }}
                  className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm font-medium tracking-[-0.01em] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="날짜 선택"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="다음 날짜"
                  onClick={() => {
                    const next = new Date(selectedDate);
                    next.setDate(next.getDate() + 1);
                    setSelectedDate(next);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Progress value={completedPlanRatio} label="오늘 분량 진행률" />
            </CardContent>
          </Card>

          <section className="space-y-4" aria-label="오늘 읽을 장 목록">
            {isPlanLoading ? (
              <Card className="border-border/80 bg-card">
                <CardContent className="p-5 text-sm text-muted-foreground">통독 계획을 불러오는 중이에요…</CardContent>
              </Card>
            ) : null}

            {!isPlanLoading && todayPlan?.chapters.map((chapterInfo, index) => {
              const book = bibleBookMap[chapterInfo.book as keyof typeof bibleBookMap];
              const isCompleted = index < currentChapterIndex;
              const isCurrent = index === currentChapterIndex;

              return (
                <Card
                  key={`${chapterInfo.book}-${chapterInfo.chapter}`}
                  className={cn("bg-card transition-colors", isCurrent ? "border-primary/45 shadow-1" : "border-border/80")}
                >
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div className="space-y-2">
                      <p className="text-[1.4rem] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                        {book?.kor} {chapterInfo.chapter}장
                      </p>
                      {isCurrent ? <Badge variant="default">현재 읽을 순서</Badge> : null}
                      {isCompleted ? <Badge variant="read">완료</Badge> : null}
                      {!isCurrent && !isCompleted ? <Badge variant="notread">대기</Badge> : null}
                    </div>
                    <Button
                      size="md"
                      variant={isCurrent ? "primary" : "secondary"}
                      onClick={() => {
                        setCurrentChapterIndex(index);
                        setIsReadingMode(true);
                      }}
                    >
                      읽기
                    </Button>
                  </CardContent>
                </Card>
              );
            })}

            {!isPlanLoading && todayPlan && todayPlan.chapters.length === 0 ? (
              <Card className="border-border/80 bg-card">
                <CardContent className="p-5 text-sm text-muted-foreground">해당 날짜의 통독 분량이 없습니다.</CardContent>
              </Card>
            ) : null}
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
