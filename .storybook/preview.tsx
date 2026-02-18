import type { Preview } from "@storybook/react-vite";

import "../src/styles/globals.css";

type StoryFrame = "mobile" | "wide" | "full";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "hsl(220 20% 98%)" },
        { name: "dark", value: "hsl(220 20% 9%)" },
      ],
    },
    frame: "mobile",
  },
  decorators: [
    (Story, context) => {
      const explicitFrame = context.parameters.frame as StoryFrame | undefined;
      const isFoundationStory = context.title?.startsWith("Foundation/");
      const isWideUiStory = context.title === "UI/Button" || context.title === "UI/Badge" || context.title === "UI/Board Row";
      const frame: StoryFrame = explicitFrame ?? (isFoundationStory || isWideUiStory ? "wide" : "mobile");

      const maxWidth = frame === "wide" ? "1400px" : frame === "full" ? "100%" : "460px";
      const outerPadding = frame === "wide" ? "24px" : "16px";

      return (
        <div
          style={{
            minHeight: "100vh",
            padding: outerPadding,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "hsl(var(--background))",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth,
              border: frame === "mobile" ? "1px solid hsl(var(--border))" : "none",
              borderRadius: frame === "mobile" ? "20px" : "0px",
              overflowX: frame === "wide" ? "auto" : "hidden",
              overflowY: "auto",
              maxHeight: "calc(100dvh - 32px)",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              background: "hsl(var(--background))",
              boxShadow: frame === "mobile" ? "0 10px 24px rgba(15, 23, 42, 0.1)" : "none",
            }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
