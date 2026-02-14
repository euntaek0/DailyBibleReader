import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "../../components/ui/progress.tsx";

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    label: "오늘 분량 진행률",
    value: 45,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mid: Story = {};

export const Complete: Story = {
  args: {
    value: 100,
  },
};
