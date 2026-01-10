import { useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

export function VerseReader() {
  const { isListening, transcript, error, startListening, stopListening } = useSpeechRecognition();

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Mock verse for initial layout
  const verse = {
    citation: "창세기 1:1",
    text: "태초에 하나님이 천지를 창조하시니라",
  };

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
          {verse.citation}
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
