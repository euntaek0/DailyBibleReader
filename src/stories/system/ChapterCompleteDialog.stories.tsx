import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChapterCompleteDialog } from "../../components/system/ChapterCompleteDialog.tsx";

const meta = {
  title: "System/ChapterCompleteDialog",
  component: ChapterCompleteDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => undefined,
    title: "이번 장을 모두 읽었어요",
    description: "신명기 24장 낭독을 마쳤습니다.",
    onBack: () => undefined,
    onNextChapter: () => undefined,
  },
} satisfies Meta<typeof ChapterCompleteDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
