import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReaderText } from "../../components/system/ReaderText.tsx";

const verse = "태초에 하나님이 천지를 창조하시니라";

const meta = {
  title: "System/ReaderText",
  component: ReaderText,
  tags: ["autodocs"],
  args: {
    text: verse,
  },
} satisfies Meta<typeof ReaderText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Matched: Story = {
  args: {
    matchedIndices: [true, true, true, false],
    dimUnmatched: true,
  },
};

export const Focused: Story = {
  args: {
    matchedIndices: [true, false, false, false],
    focusIndices: [1],
  },
};
