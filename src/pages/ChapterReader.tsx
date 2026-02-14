import { useEffect, useMemo, useState } from "react";
import { BookOpenText, ChevronRight } from "lucide-react";

import { fetchChapter } from "../utils/api.ts";
import { bibleBookMap, bibleStructure } from "../constants/bible.ts";
import { ReaderView, type ChapterVerse } from "../components/ReaderView.tsx";
import { TopBar } from "../components/system/TopBar.tsx";
import { PageContainer } from "../components/system/PageContainer.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../components/ui/sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";

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
        <div className="reader-column space-y-4">
          <Card className="rounded-xl border-border/80 shadow-1">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-lg tracking-[-0.01em]">
                <BookOpenText className="h-5 w-5 text-primary" />
                읽을 본문 선택
              </CardTitle>
              <CardDescription>
                현재 선택: {selectedBook?.kor} {selectedChapter}장
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="h-11 w-full justify-between" onClick={() => setPickerOpen(true)}>
                책/장 선택 열기
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="h-11 w-full text-base" onClick={() => setMode("reading")}>
                {selectedBook?.kor} {selectedChapter}장 읽기 시작
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border/70 bg-muted/30">
            <CardContent className="space-y-2 p-4">
              <p className="text-sm font-medium text-foreground">읽기 흐름</p>
              <p className="text-sm text-muted-foreground">낭독 중에는 불필요한 탐색 요소를 최소화하고, 읽은 어절만 실시간으로 강조합니다.</p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>

      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
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
              <label htmlFor="book-select" className="mb-2 block text-sm font-medium text-foreground">
                성경 책
              </label>
              <select
                id="book-select"
                value={selectedBookKey}
                onChange={(event) => {
                  setSelectedBookKey(event.target.value);
                  setSelectedChapter(1);
                }}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {Object.keys(bibleBookMap).map((key) => {
                  const book = bibleBookMap[key as keyof typeof bibleBookMap];
                  return (
                    <option key={key} value={key}>
                      {book.kor} ({book.niv})
                    </option>
                  );
                })}
              </select>
            </TabsContent>

            <TabsContent value="chapter" className="mt-3">
              <p className="mb-2 text-sm font-medium text-foreground">장 번호</p>
              <div className="grid grid-cols-6 gap-2">
                {chapterOptions.map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setSelectedChapter(number)}
                    className={`h-10 rounded-md border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      number === selectedChapter
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {number}
                  </button>
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
