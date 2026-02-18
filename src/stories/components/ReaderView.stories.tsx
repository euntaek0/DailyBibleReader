import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReaderView, type ChapterVerse } from "../../components/ReaderView.tsx";

const verses: ChapterVerse[] = [
  { index: 0, text: "태초에 하나님이 천지를 창조하시니라" },
  { index: 1, text: "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고" },
  { index: 2, text: "하나님의 영은 수면 위에 운행하시니라" },
];

const meta = {
  title: "Components/ReaderView",
  component: ReaderView,
  tags: ["autodocs"],
  parameters: {
    frame: "mobile",
  },
  args: {
    bookKey: "ge",
    chapter: 1,
    verses,
    onBack: () => undefined,
    onNextChapter: () => undefined,
  },
} satisfies Meta<typeof ReaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: "본문을 불러오지 못했어요.",
  },
};
