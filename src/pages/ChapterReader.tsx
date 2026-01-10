import { useState, useEffect } from "react";
import { fetchChapter } from "../utils/api";
import { bibleBookMap, bibleStructure } from "../constants/bible";
import { ReaderView, type ChapterVerse } from "../components/ReaderView";

export function ChapterReader() {
  console.log("ChapterReader");

  // Navigation State
  const [mode, setMode] = useState<"selection" | "reading">("selection");
  const [selectedBookKey, setSelectedBookKey] = useState<string>("ge");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Reading Data
  const [verses, setVerses] = useState<ChapterVerse[]>([]);

  // Fetch Chapter when entering reading mode
  useEffect(() => {
    if (mode === "reading") {
      const loadChapter = async () => {
        setIsLoading(true);
        setFetchError(null);

        try {
          const fetchedVerses = await fetchChapter(selectedBookKey, selectedChapter);

          if (fetchedVerses.length === 0) {
            throw new Error("No verses found.");
          }

          const parsed = fetchedVerses.map((text, i) => ({ index: i, text }));
          setVerses(parsed);
        } catch (err) {
          console.error(err);
          setFetchError("Failed to load bible text. Please try again.");
          setVerses([]);
        } finally {
          setIsLoading(false);
        }
      };

      loadChapter();
    }
  }, [mode, selectedBookKey, selectedChapter]);

  const handleBackToSelection = () => {
    setMode("selection");
  };

  const handleNextChapter = () => {
    // Simple next chapter logic
    // TODO: Handle book transition
    const currentStructure = bibleStructure[selectedBookKey as keyof typeof bibleStructure];
    const maxChapter = currentStructure ? currentStructure.chapters : 0;

    if (selectedChapter < maxChapter) {
      setSelectedChapter((prev) => prev + 1);
      // Effect will trigger reload
    } else {
      setMode("selection");
    }
  };

  // --- Render Selection Screen ---
  if (mode === "selection") {
    const bookKeys = Object.keys(bibleBookMap);
    const currentStructure = bibleStructure[selectedBookKey as keyof typeof bibleStructure];
    const chapterCount = currentStructure ? currentStructure.chapters : 0;

    return (
      <div className="animate-fade-in" style={{ padding: "var(--spacing-lg)", paddingBottom: "100px" }}>
        <header style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}>
          <h1 className="text-gradient" style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>
            Select Chapter
          </h1>
        </header>

        <div className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
          {/* Book Dropdown */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>
              Book
            </label>
            <select
              value={selectedBookKey}
              onChange={(e) => {
                setSelectedBookKey(e.target.value);
                setSelectedChapter(1); // Reset chapter when book changes
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-elevated)",
                color: "var(--color-text-primary)",
                fontSize: "1rem",
              }}
            >
              {bookKeys.map((key) => (
                <option key={key} value={key}>
                  {bibleBookMap[key as keyof typeof bibleBookMap].kor} (
                  {bibleBookMap[key as keyof typeof bibleBookMap].niv})
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Grid */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>
              Chapter
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
                gap: "8px",
                maxHeight: "300px",
                overflowY: "auto",
                padding: "4px", // for focus outline
              }}
            >
              {Array.from({ length: chapterCount }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedChapter(num)}
                  style={{
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    border:
                      num === selectedChapter ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    background: num === selectedChapter ? "var(--color-primary-glow)" : "var(--color-bg-elevated)",
                    color: num === selectedChapter ? "var(--color-primary)" : "var(--color-text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            onClick={() => setMode("reading")}
            className="glass-card"
            style={{
              padding: "12px 32px",
              borderRadius: "var(--radius-full)",
              background: "var(--color-primary)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              border: "none",
              boxShadow: "0 4px 20px var(--color-primary-glow)",
              cursor: "pointer",
            }}
          >
            Read {bibleBookMap[selectedBookKey as keyof typeof bibleBookMap].kor} {selectedChapter}장
          </button>
        </div>
      </div>
    );
  }

  // --- Render Reading Screen ---
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
