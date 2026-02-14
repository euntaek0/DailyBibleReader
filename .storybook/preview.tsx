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
    (Story) => (
      <div style={{ minHeight: "100vh", padding: "16px", display: "flex", justifyContent: "center", background: "hsl(var(--background))" }}>
        <div style={{ width: "100%", maxWidth: "480px", border: "1px solid hsl(var(--border))", borderRadius: "16px", overflow: "hidden" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
