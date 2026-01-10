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
    if (!verse) return { score: 0, matchCount: 0, totalCount: 0, isMatch: false, status: "NOT_READ" };
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
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "var(--spacing-xl)",
      }}
    >
      {/* Header Area */}
      <header
        style={{
          textAlign: "center",
          paddingTop: "var(--spacing-lg)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-secondary)",
            fontWeight: 500,
          }}
        >
          오늘의 말씀
        </h1>
      </header>

      {/* Verse Display Area */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "var(--spacing-md)",
          padding: "0 var(--spacing-sm)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-primary)",
          }}
        >
          {verse.reference}
        </h2>
        <p
          style={{
            fontSize: "var(--text-2xl)",
            lineHeight: "1.6",
            textAlign: "center",
            wordBreak: "keep-all",
            fontWeight: 600,
          }}
        >
          {verse.text}
        </p>

        {/* Live Transcript Display (for debugging/feedback) */}
        <div
          style={{
            marginTop: "var(--spacing-md)",
            padding: "var(--spacing-sm)",
            width: "100%",
            minHeight: "60px",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-primary)",
          }}
        >
          <p style={{ opacity: 0.7, fontSize: "var(--text-xs)", marginBottom: "4px" }}>인식된 텍스트:</p>
          {transcript || (isListening ? "듣고 있습니다..." : "마이크 버튼을 눌러 시작하세요")}
        </div>

        {/* Status Display */}
        <div
          style={{
            marginTop: "var(--spacing-sm)",
            textAlign: "center",
            opacity: transcript ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: "bold",
              color:
                matchResult.status === "READ" ? "#4ade80" : matchResult.status === "PARTIAL" ? "#fbbf24" : "#ef4444",
            }}
          >
            {matchResult.status === "READ"
              ? "완료! 잘 읽으셨습니다."
              : matchResult.status === "PARTIAL"
              ? "조금 더 정확하게 읽어주세요."
              : "Verse를 읽어주세요."}
          </p>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
            정확도: {Math.round(matchResult.score * 100)}%
          </p>
        </div>

        {error && (
          <p style={{ color: "#ef4444", fontSize: "var(--text-sm)", marginTop: "var(--spacing-sm)" }}>{error}</p>
        )}
      </section>

      {/* Controls Area */}
      <footer
        style={{
          paddingBottom: "var(--spacing-xl)", // Extra padding for mobile bottom safe area
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={toggleRecording}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: isListening ? "#ef4444" : "var(--color-primary)",
            boxShadow: `0 0 20px ${isListening ? "rgba(239, 68, 68, 0.4)" : "var(--color-primary-glow)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: isListening ? "scale(1.1)" : "scale(1)",
          }}
          aria-label={isListening ? "녹음 중지" : "녹음 시작"}
        >
          {/* Microphone Icon / Stop Icon */}
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: isListening ? "4px" : "50%", // Square when recording, Circleish when not (simplistic icon)
              transition: "border-radius 0.3s",
            }}
          />
        </button>
      </footer>
    </div>
  );
}
