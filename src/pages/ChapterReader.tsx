import { useState, useEffect, useRef, useCallback } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { calculateScore } from "../utils/textMatcher";
import type { MatchResult } from "../utils/textMatcher";

interface ChapterVerse {
  index: number;
  text: string;
}

const mockChapterText = `
1 태초에 하나님이 천지를 창조하시니라
2 땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라
3 하나님이 이르시되 빛이 있으라 하시니 빛이 있었고
4 빛이 하나님이 보시기에 좋았더라 하나님이 빛과 어둠을 나누사
5 하나님이 빛을 낮이라 부르시고 어둠을 밤이라 부르시니라 저녁이 되고 아침이 되니 이는 첫째 날이니라
6 하나님이 이르시되 물 가운데에 궁창이 있어 물과 물로 나뉘라 하시고
7 하나님이 궁창을 만드사 궁창 아래의 물과 궁창 위의 물로 나뉘게 하시니 그대로 되니라
8 하나님이 궁창을 하늘이라 부르시니라 저녁이 되고 아침이 되니 이는 둘째 날이니라
9 하나님이 이르시되 천하의 물이 한 곳으로 모이고 뭍이 드러나라 하시니 그대로 되니라
10 하나님이 뭍을 땅이라 부르시고 모인 물을 바다라 부르시니 하나님이 보시기에 좋았더라
`.trim();

export function ChapterReader() {
  const [verses, setVerses] = useState<ChapterVerse[]>([]);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(-1);
  const [completedVerses, setCompletedVerses] = useState<boolean[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // New state for current match result (for highlighting)
  const [currentMatchResult, setCurrentMatchResult] = useState<MatchResult | null>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const scrollRef = useRef<HTMLDivElement>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse mock text
  useEffect(() => {
    const parsed = mockChapterText.split("\n").map((line, i) => {
      const text = line.replace(/^\d+\s*/, "").trim();
      return { index: i, text };
    });
    setVerses(parsed);
    setCompletedVerses(new Array(parsed.length).fill(false));
  }, []);

  const advanceToNextVerse = useCallback(() => {
    if (activeVerseIndex >= verses.length) return;

    // Mark current as complete
    setCompletedVerses((prev) => {
      const newCompleted = [...prev];
      newCompleted[activeVerseIndex] = true;
      return newCompleted;
    });

    // Clear match result for transition
    setCurrentMatchResult(null);

    const nextIndex = activeVerseIndex + 1;
    resetTranscript();

    if (nextIndex >= verses.length) {
      setActiveVerseIndex(-1);
      stopListening();
      setShowCompletionModal(true);
    } else {
      setActiveVerseIndex(nextIndex);
      // Scroll handling
      const element = document.getElementById(`verse-${nextIndex}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeVerseIndex, verses, resetTranscript, stopListening]);

  // Matching Logic Effect
  useEffect(() => {
    // Clear any pending silence timer when transcript changes
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (activeVerseIndex === -1 || activeVerseIndex >= verses.length || !isListening || !transcript) {
      // If we reset, also clear the match result visualization
      if (!transcript) setCurrentMatchResult(null);
      return;
    }

    const currentVerse = verses[activeVerseIndex];
    const matchResult = calculateScore(currentVerse.text, transcript);
    setCurrentMatchResult(matchResult);

    // 1. Strict Match: 100% Score
    if (matchResult.score >= 1.0) {
      advanceToNextVerse();
      return;
    }

    // 2. High Match (>=70%) + Silence
    if (matchResult.score >= 0.7) {
      silenceTimerRef.current = setTimeout(() => {
        advanceToNextVerse();
      }, 1000); // 1s silence
    }
  }, [transcript, activeVerseIndex, verses, isListening, advanceToNextVerse]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  const handleStartReading = () => {
    setActiveVerseIndex(0);
    setCompletedVerses(new Array(verses.length).fill(false));
    setShowCompletionModal(false);
    setCurrentMatchResult(null);
    startListening();
    resetTranscript();
  };

  const handleStopReading = () => {
    setActiveVerseIndex(-1);
    stopListening();
    setCurrentMatchResult(null);
  };

  return (
    <div
      className="animate-fade-in"
      style={{ padding: "var(--spacing-lg)", paddingBottom: "100px", position: "relative" }}
    >
      <header style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}>
        <h1 className="text-gradient" style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>
          창세기 1장 (Refined)
        </h1>
      </header>

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
                    marginTop: "0.4em", // optically align with line height
                  }}
                >
                  {index + 1}
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
                    ? // Render Active Verse with Word Highlighting
                      verse.text.split(/\s+/).map((word, wIndex) => (
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
                            transition: "color 0.2s ease, text-shadow 0.2s ease",
                            opacity: currentMatchResult.matchedIndices![wIndex] ? 1 : 0.8,
                          }}
                        >
                          {word}
                        </span>
                      ))
                    : // Render Inactive/Completed Verse
                      verse.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Control Button */}
      {/* ... keeping controls the same ... */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
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
              boxShadow: "0 4px 20px var(--color-primary-glow)",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
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
              boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Stop Reading
          </button>
        )}
      </div>

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
              You have successfully read Genesis Chapter 1.
            </p>
            <button
              onClick={() => setShowCompletionModal(false)}
              style={{
                padding: "10px 30px",
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                fontWeight: 600,
              }}
            >
              Awesome
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
