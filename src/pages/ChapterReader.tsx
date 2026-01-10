import { useState, useEffect } from "react";
// import { fetchChapter } from "../utils/api";

export function ChapterReader() {
  const [mockText, setMockText] = useState("");

  useEffect(() => {
    // Simulating fetching a chapter
    const text = `
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
    setMockText(text);
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: "var(--spacing-lg)", paddingBottom: "var(--spacing-2xl)" }}>
      <header style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}>
        <h1 className="text-gradient" style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>
          창세기 1장
        </h1>
      </header>

      <div className="glass-card" style={{ padding: "var(--spacing-lg)", borderRadius: "var(--radius-lg)" }}>
        {mockText.split("\n").map((line, index) => (
          <p
            key={index}
            style={{
              marginBottom: "1em",
              lineHeight: "1.8",
              fontSize: "var(--text-lg)",
              fontFamily: "var(--font-serif)",
              color: "var(--color-text-primary)",
            }}
          >
            {line.trim()}
          </p>
        ))}
      </div>
    </div>
  );
}
