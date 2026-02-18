import { useEffect, useMemo, useState } from "react";
import { BookOpenText, ChevronRight } from "lucide-react";

import { fetchChapter } from "../utils/api.ts";
import { bibleBookMap, bibleStructure } from "../constants/bible.ts";
import { ReaderView, type ChapterVerse } from "../components/ReaderView.tsx";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { BoardRow } from "../components/ui/board-row.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../components/ui/sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { cn } from "../lib/utils.ts";

export function ChapterReader(): React.JSX.Element {
  const [mode, setMode] = useState<"selection" | "reading">("selection");
  const [selectedBookKey, setSelectedBookKey] = useState<string>("ge");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [verses, setVerses] = useState<ChapterVerse[]>([]);

  useEffect(() => {
    if (mode !== "reading") {
      return;
    }

    const loadChapter = async (): Promise<void> => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const fetchedVerses = await fetchChapter(selectedBookKey, selectedChapter);

        if (fetchedVerses.length === 0) {
          throw new Error("No verses found");
        }

        const parsed = fetchedVerses.map((text, index) => ({ index, text }));
        setVerses(parsed);
      } catch (error) {
        console.error(error);
        setFetchError("본문을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
        setVerses([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadChapter();
  }, [mode, selectedBookKey, selectedChapter]);

  const currentStructure = bibleStructure[selectedBookKey as keyof typeof bibleStructure];
  const chapterCount = currentStructure ? currentStructure.chapters : 0;
  const selectedBook = bibleBookMap[selectedBookKey as keyof typeof bibleBookMap];

  const chapterOptions = useMemo(() => Array.from({ length: chapterCount }, (_, index) => index + 1), [chapterCount]);

  const handleBackToSelection = (): void => {
    setMode("selection");
  };

  const handleNextChapter = (): void => {
    if (selectedChapter < chapterCount) {
      setSelectedChapter((previous) => previous + 1);
      return;
    }

    setMode("selection");
  };

  if (mode === "reading") {
    return (
      <ReaderView
        key={`${selectedBookKey}-${selectedChapter}`}
        bookKey={selectedBookKey}
        chapter={selectedChapter}
        verses={verses}
        isLoading={isLoading}
        error={fetchError}
        onBack={handleBackToSelection}
        onNextChapter={handleNextChapter}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title="장 읽기" subtitle="책과 장을 고른 뒤 바로 낭독하세요" variant="page" />

      <PageContainer>
        <div className="reader-column space-y-6">
          <Card className="border-border/80 bg-card">
            <CardHeader className="space-y-3 pb-2">
              <CardTitle className="flex items-center gap-2 text-[1.4rem] leading-[1.15] tracking-[-0.018em]">
                <BookOpenText className="h-5 w-5 text-primary" />
                읽을 본문 선택
              </CardTitle>
              <CardDescription>
                현재 선택: {selectedBook?.kor} {selectedChapter}장
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <Button variant="outline" className="w-full justify-between" onClick={() => setPickerOpen(true)}>
                책/장 선택 열기
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full" onClick={() => setMode("reading")}>
                {selectedBook?.kor} {selectedChapter}장 읽기 시작
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-muted/35">
            <CardContent className="space-y-2 p-6">
              <p className="text-sm font-semibold text-foreground">읽기 흐름</p>
              <p className="text-sm leading-6 text-muted-foreground">
                낭독 중에는 불필요한 탐색 요소를 최소화하고, 읽은 어절만 실시간으로 강조합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>

      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-[20px] border-border/80">
          <SheetHeader>
            <SheetTitle>책/장 선택</SheetTitle>
            <SheetDescription>원하는 책과 장을 선택해 주세요.</SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="book" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="book">책 선택</TabsTrigger>
              <TabsTrigger value="chapter">장 선택</TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="mt-3">
              <p className="mb-2 text-sm font-medium text-foreground">성경 책</p>
              <div className="max-h-[44vh] space-y-2 overflow-y-auto px-1">
                {Object.keys(bibleBookMap).map((key) => {
                  const book = bibleBookMap[key as keyof typeof bibleBookMap];
                  const isSelected = key === selectedBookKey;

                  return (
                    <BoardRow
                      key={key}
                      surface="subtle"
                      title={`${book.kor} (${book.niv})`}
                      titleClassName={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-foreground")}
                      className={cn(isSelected ? "border-primary/45 bg-primary/5" : undefined)}
                      trailing={
                        <Button
                          type="button"
                          size="sm"
                          variant={isSelected ? "primary" : "secondaryWeak"}
                          onClick={() => {
                            setSelectedBookKey(key);
                            setSelectedChapter(1);
                          }}
                        >
                          {isSelected ? "선택됨" : "선택"}
                        </Button>
                      }
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="chapter" className="mt-3">
              <p className="mb-2 text-sm font-medium text-foreground">장 번호</p>
              <div className="max-h-[44vh] space-y-2 overflow-y-auto px-1">
                {chapterOptions.map((number) => (
                  <BoardRow
                    key={number}
                    surface="subtle"
                    title={`${number}장`}
                    titleClassName={cn("text-sm font-semibold", number === selectedChapter ? "text-primary" : "text-foreground")}
                    className={cn(number === selectedChapter ? "border-primary/45 bg-primary/5" : undefined)}
                    trailing={
                      <Button
                        type="button"
                        size="sm"
                        variant={number === selectedChapter ? "primary" : "secondaryWeak"}
                        onClick={() => setSelectedChapter(number)}
                      >
                        {number === selectedChapter ? "선택됨" : "선택"}
                      </Button>
                    }
                  >
                    {/* empty on purpose: content handled by title/trailing */}
                  </BoardRow>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <SheetFooter>
            <Button variant="outline" onClick={() => setPickerOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setPickerOpen(false)}>선택 완료</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
