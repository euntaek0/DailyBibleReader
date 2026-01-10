import { useState } from "react";

export function VerseReader() {
  const [isRecording, setIsRecording] = useState(false);

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
          onClick={() => setIsRecording(!isRecording)}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: isRecording ? "#ef4444" : "var(--color-primary)",
            boxShadow: `0 0 20px ${isRecording ? "rgba(239, 68, 68, 0.4)" : "var(--color-primary-glow)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: isRecording ? "scale(1.1)" : "scale(1)",
          }}
          aria-label={isRecording ? "녹음 중지" : "녹음 시작"}
        >
          {/* Microphone Icon / Stop Icon */}
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: isRecording ? "4px" : "50%", // Square when recording, Circleish when not (simplistic icon)
              transition: "border-radius 0.3s",
            }}
          />
        </button>
      </footer>
    </div>
  );
}
