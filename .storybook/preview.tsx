import type { Preview } from "@storybook/react-vite";

import "../src/styles/globals.css";

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
        { name: "app", value: "hsl(210 33% 98%)" },
        { name: "dark", value: "hsl(224 39% 10%)" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isFoundationStory = context.title?.startsWith("Foundation/");
      const isWideUiStory = context.title === "UI/Button" || context.title === "UI/Badge" || context.title === "UI/Board Row";
      const isWideStory = isFoundationStory || isWideUiStory;
      const maxWidth = isWideStory ? "1320px" : "480px";

      return (
        <div
          style={{
            minHeight: "100vh",
            padding: "16px",
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
              border: "1px solid hsl(var(--border))",
              borderRadius: "16px",
              overflowX: isWideStory ? "auto" : "hidden",
              overflowY: "auto",
              maxHeight: "calc(100dvh - 32px)",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              background: "hsl(var(--background))",
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
