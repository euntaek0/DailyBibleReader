import { useState, useMemo, useEffect } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { calculateScore, type MatchResult } from "../utils/textMatcher";
import { fetchDailyVerse, type DailyVerse } from "../utils/api";

export function VerseReader() {
  const { isListening, transcript, error, startListening, stopListening } = useSpeechRecognition();
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVerse = async () => {
      setIsLoading(true);
      const data = await fetchDailyVerse();
      setVerse(data);
      setIsLoading(false);
    };
    loadVerse();
  }, []);

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const matchResult: MatchResult = useMemo(() => {
    if (!verse)
      return { score: 0, matchCount: 0, totalCount: 0, isMatch: false, status: "NOT_READ", matchedIndices: [] };
    return calculateScore(verse.text, transcript);
  }, [verse, transcript]);

  if (isLoading || !verse) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "var(--color-text-secondary)",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "var(--spacing-lg)",
        gap: "var(--spacing-lg)",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {/* Header Area */}
      <header className="animate-fade-in" style={{ textAlign: "center", marginTop: "var(--spacing-xl)" }}>
        <h1
          className="text-gradient"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "var(--spacing-xs)",
          }}
        >
          Daily Bread
        </h1>
        <div
          style={{
            width: "40px",
            height: "4px",
            background: "var(--color-primary)",
            margin: "0 auto",
            borderRadius: "2px",
            opacity: 0.5,
          }}
        ></div>
      </header>

      {/* Verse Card */}
      <section
        className="glass-card animate-slide-up"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "var(--spacing-xl)",
          borderRadius: "var(--radius-xl)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "150px",
            height: "150px",
            background: "var(--color-primary)",
            filter: "blur(80px)",
            opacity: 0.2,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-primary)",
              marginBottom: "var(--spacing-lg)",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
            }}
          >
            {verse.reference}
          </h2>
          <p
            style={{
              fontSize: "var(--text-2xl)", // Larger for emphasis
              lineHeight: "1.8",
              textAlign: "center",
              wordBreak: "keep-all",
              fontWeight: 400,
              fontFamily: "var(--font-serif)",
              color: "var(--color-text-primary)",
              marginBottom: "var(--spacing-xl)",
            }}
          >
            {matchResult.matchedIndices &&
              verse.text.split(/\s+/).map((word, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                    color: matchResult.matchedIndices[index] ? "var(--color-primary)" : "var(--color-text-primary)",
                    textShadow: matchResult.matchedIndices[index] ? "0 0 10px var(--color-primary-glow)" : "none",
                    transition: "all 0.3s ease",
                    opacity: matchResult.matchedIndices[index] ? 1 : 0.6,
                  }}
                >
                  {word}
                </span>
              ))}
            {!matchResult.matchedIndices && verse.text}
          </p>

          {/* Dynamic Status / Feedback Area */}
          <div
            style={{
              minHeight: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "var(--spacing-md)",
            }}
          >
            {transcript ? (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "4px",
                    fontStyle: "italic",
                  }}
                >
                  "{transcript}"
                </p>
                {matchResult.status !== "NOT_READ" && (
                  <div
                    className="animate-fade-in"
                    style={{
                      marginTop: "var(--spacing-sm)",
                      background: matchResult.status === "READ" ? "rgba(74, 222, 128, 0.1)" : "rgba(251, 191, 36, 0.1)",
                      border: `1px solid ${matchResult.status === "READ" ? "#4ade80" : "#fbbf24"}`,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: matchResult.status === "READ" ? "#4ade80" : "#fbbf24",
                      }}
                    >
                      {matchResult.status === "READ" ? "Perfect Match" : "Keep Going"}
                      {matchResult.score > 0 && ` (${Math.round(matchResult.score * 100)}%)`}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", opacity: 0.7 }}>
                {isListening ? "Listening..." : "Tap microphone to read"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Controls Area */}
      <footer
        className="animate-slide-up"
        style={{
          paddingBottom: "var(--spacing-xl)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <button
          onClick={toggleRecording}
          style={{
            position: "relative",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: isListening ? "var(--color-accent)" : "var(--color-primary)",
            boxShadow: isListening ? "0 0 30px rgba(244, 114, 182, 0.6)" : "0 0 20px var(--color-primary-glow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: isListening ? "scale(1.1)" : "scale(1)",
          }}
          aria-label={isListening ? "Stop Recording" : "Start Recording"}
        >
          {isListening && (
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)",
                animation: "pulse-ring 2s infinite",
              }}
            />
          )}

          {/* Icon */}
          {isListening ? (
            <div style={{ width: "24px", height: "24px", background: "white", borderRadius: "6px" }} />
          ) : (
            // Simple Microphone Icon SVG
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>
      </footer>
    </div>
  );
}
