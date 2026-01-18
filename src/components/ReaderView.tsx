import { useState, useEffect, useRef, useCallback } from "react";
import { bibleBookMap } from "@/constants/bible.ts";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition.ts";
import { calculateScore, type MatchResult } from "@/utils/textMatcher.ts";

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
}: ReaderViewProps) {
  // --- State ---
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(-1);
  const [completedVerses, setCompletedVerses] = useState<boolean[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentMatchResult, setCurrentMatchResult] = useState<MatchResult | null>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  const scrollRef = useRef<HTMLDivElement>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Effects ---

  const advanceToNextVerse = useCallback(() => {
    if (activeVerseIndex >= verses.length) return;

    // Mark current as complete
    setCompletedVerses((prev) => {
      const newCompleted = [...prev];
      if (activeVerseIndex >= 0) {
        newCompleted[activeVerseIndex] = true;
      }
      return newCompleted;
    });

    setCurrentMatchResult(null);
    resetTranscript();

    const nextIndex = activeVerseIndex + 1;

    if (nextIndex >= verses.length) {
      setActiveVerseIndex(-1);
      stopListening();
      setShowCompletionModal(true);
    } else {
      setActiveVerseIndex(nextIndex);
      // Ensure UI update before scrolling? Usually fine in React
      setTimeout(() => {
        const element = document.getElementById(`verse-${nextIndex}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [activeVerseIndex, verses.length, resetTranscript, stopListening]);

  // Matching Logic
  useEffect(() => {
    // Clear silence timer on transcript change
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (activeVerseIndex === -1 || activeVerseIndex >= verses.length || !isListening || !transcript) {
      if (!transcript) setCurrentMatchResult(null);
      return;
    }

    const currentVerse = verses[activeVerseIndex];
    if (!currentVerse) return;

    const matchResult = calculateScore(currentVerse.text, transcript);
    setCurrentMatchResult(matchResult);

    // 1. Strict Match: 100% (or very high)
    if (matchResult.score >= 1.0) {
      advanceToNextVerse();
      return;
    }

    // 2. High Match >= 70% + Silence (End of sentence detection)
    if (matchResult.score >= 0.7) {
      silenceTimerRef.current = setTimeout(() => {
        advanceToNextVerse();
      }, 1000); // 1s silence confirmation
    }
  }, [transcript, activeVerseIndex, verses, isListening, advanceToNextVerse]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  // --- Handlers ---

  const handleStartReading = () => {
    if (verses.length === 0) return;
    setActiveVerseIndex(0);
    setShowCompletionModal(false);
    startListening();
    // resetTranscript is handled by startListening in our new hook, but explicitly calling it doesn't hurt
    resetTranscript();
  };

  const handleStopReading = () => {
    setActiveVerseIndex(-1);
    stopListening();
    setCurrentMatchResult(null);
  };

  const bookName = bibleBookMap[bookKey as keyof typeof bibleBookMap]?.kor || bookKey;

  // --- Render ---

  return (
    <div
      className="animate-fade-in"
      style={{ padding: "var(--spacing-lg)", paddingBottom: "100px", position: "relative" }}
    >
      {/* Header */}
      <header style={{ marginBottom: "var(--spacing-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          ←
        </button>
        <h1 className="text-gradient" style={{ fontSize: "var(--text-xl)", fontWeight: 700, margin: 0, flex: 1 }}>
          {bookName} {chapter}장
        </h1>
      </header>

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div
            className="animate-spin"
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid var(--color-border)",
              borderTopColor: "var(--color-primary)",
              borderRadius: "50%",
              margin: "0 auto 1rem",
            }}
          />
          <p>Loading Chapter...</p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#ef4444" }}>
          <p>{error}</p>
          <button onClick={onBack} style={{ marginTop: "1rem", padding: "8px 16px", borderRadius: "20px" }}>
            Go Back
          </button>
        </div>
      )}

      {/* Verses List */}
      {!isLoading && !error && (
        <div
          className="glass-card"
          style={{ padding: "var(--spacing-lg)", borderRadius: "var(--radius-lg)" }}
          ref={scrollRef}
        >
          {verses.map((verse, index) => {
            const isActive = index === activeVerseIndex;
            const isCompleted = completedVerses[index];

            return (
              <div
                key={index}
                id={`verse-${index}`}
                style={{
                  marginBottom: "1.5rem",
                  transition: "all 0.3s ease",
                  opacity: activeVerseIndex !== -1 && !isActive && !isCompleted ? 0.4 : 1,
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: isActive ? "var(--color-primary)" : "var(--color-text-tertiary)",
                      fontWeight: "bold",
                      fontSize: "0.8em",
                      marginTop: "0.4em",
                    }}
                  >
                    {verse.index + 1}
                  </span>
                  <p
                    style={{
                      lineHeight: "1.8",
                      fontSize: "var(--text-lg)",
                      fontFamily: "var(--font-serif)",
                      color: isCompleted ? "var(--color-primary)" : "var(--color-text-primary)",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {isActive && currentMatchResult?.matchedIndices
                      ? verse.text.split(/\s+/).map((word, wIndex) => (
                          <span
                            key={wIndex}
                            style={{
                              display: "inline-block",
                              marginRight: "0.25em",
                              color: currentMatchResult.matchedIndices![wIndex]
                                ? "var(--color-primary)"
                                : "var(--color-text-primary)",
                              textShadow: currentMatchResult.matchedIndices![wIndex]
                                ? "0 0 10px var(--color-primary-glow)"
                                : "none",
                              opacity: currentMatchResult.matchedIndices![wIndex] ? 1 : 0.8,
                            }}
                          >
                            {word}
                          </span>
                        ))
                      : verse.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Controls */}
      {!isLoading && !error && (
        <div style={{ position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
          {!isListening ? (
            <button
              onClick={handleStartReading}
              className="glass-card"
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                boxShadow: "0 4px 20px var(--color-primary-glow)",
              }}
            >
              Start Reading
            </button>
          ) : (
            <button
              onClick={handleStopReading}
              className="glass-card"
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                background: "#ef4444",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
              }}
            >
              Stop Reading
            </button>
          )}
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
          }}
        >
          <div
            className="glass-card animate-slide-up"
            style={{
              background: "var(--color-bg-base)",
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              maxWidth: "80%",
              border: "1px solid var(--color-primary)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h2 className="text-gradient" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Chapter Complete!
            </h2>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
              You have successfully read {bookName} {chapter}장.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={onBack}
                style={{
                  padding: "10px 30px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-bg-elevated)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                  fontWeight: 600,
                }}
              >
                Back
              </button>
              {onNextChapter && (
                <button
                  onClick={onNextChapter}
                  style={{
                    padding: "10px 30px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  Next Chapter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
