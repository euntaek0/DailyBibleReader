import { useState, useEffect } from "react";
import { getPlanForDate, type PlanDay } from "../constants/yearPlan";
import { bibleBookMap } from "../constants/bible";
import { fetchChapter } from "../utils/api";
import { ReaderView, type ChapterVerse } from "../components/ReaderView";

export function YearPlanPage() {
  console.log("YearPlanPage");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todaysPlan, setTodaysPlan] = useState<PlanDay | null>(null);

  // Reading Mode State
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Index within todaysPlan.chapters
  const [verses, setVerses] = useState<ChapterVerse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const plan = getPlanForDate(selectedDate);
    setTodaysPlan(plan);
  }, [selectedDate]);

  // Load Chapter Content
  useEffect(() => {
    if (isReadingMode && todaysPlan) {
      const chapterInfo = todaysPlan.chapters[currentChapterIndex];
      const loadContent = async () => {
        setIsLoading(true);
        setFetchError(null);

        try {
          const fetchedVerses = await fetchChapter(chapterInfo.book, chapterInfo.chapter);
          if (fetchedVerses.length === 0) throw new Error("No verses found");

          const parsed = fetchedVerses.map((text, i) => ({ index: i, text }));
          setVerses(parsed);
        } catch (e) {
          console.error(e);
          setFetchError("Failed to load chapter.");
          setVerses([]);
        } finally {
          setIsLoading(false);
        }
      };
      loadContent();
    }
  }, [isReadingMode, currentChapterIndex, todaysPlan]);

  const handleNextChapter = () => {
    if (todaysPlan && currentChapterIndex < todaysPlan.chapters.length - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
      // setIsReadingMode(true); // Already true
    } else {
      // Finished all chapters for today!
      setIsReadingMode(false);
      alert("오늘의 읽기를 완료했습니다! 🎉");
    }
  };

  const handleBack = () => {
    setIsReadingMode(false);
  };

  if (isReadingMode && todaysPlan) {
    const currentChapter = todaysPlan.chapters[currentChapterIndex];

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

  // Plan View
  return (
    <div className="animate-fade-in" style={{ padding: "var(--spacing-lg)", paddingBottom: "100px" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 className="text-gradient" style={{ fontSize: "2rem", fontWeight: 700 }}>
          Year Plan 📅
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>1년 1독 도전하기</p>
      </header>

      <div className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <button
            onClick={() => {
              const prev = new Date(selectedDate);
              prev.setDate(prev.getDate() - 1);
              setSelectedDate(prev);
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--color-text-primary)",
            }}
          >
            ‹
          </button>

          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: 0, fontSize: "1.2rem", marginBottom: "4px" }}>Day {todaysPlan?.day}</h3>
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedDate(new Date(e.target.value));
                }
              }}
              style={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                borderRadius: "4px",
                padding: "4px 8px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            onClick={() => {
              const next = new Date(selectedDate);
              next.setDate(next.getDate() + 1);
              setSelectedDate(next);
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--color-text-primary)",
            }}
          >
            ›
          </button>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem", color: "var(--color-text-secondary)" }}>Today's Chapters</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {todaysPlan?.chapters.map((ch, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  background: "var(--color-bg-elevated)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {bibleBookMap[ch.book as keyof typeof bibleBookMap]?.kor} {ch.chapter}장
                </span>
                <button
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setIsReadingMode(true);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "15px",
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Read
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
