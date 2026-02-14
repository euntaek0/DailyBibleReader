import type { Meta, StoryObj } from "@storybook/react-vite";

import { TopBar } from "../../components/system/TopBar.tsx";
import { Button } from "../../components/ui/button.tsx";

const meta = {
  title: "System/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  args: {
    title: "연간 통독",
    subtitle: "날짜별 분량을 선택하고 바로 읽기",
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    variant: "page",
  },
};

export const Section: Story = {
  args: {
    variant: "section",
    title: "신명기 24장",
    subtitle: "3/26절 완료",
    onBack: () => undefined,
    rightAction: <Button variant="ghost" size="sm">다음 장</Button>,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
    variant: "section",
    title: "오늘의 말씀",
    subtitle: "신명기 24:1",
  },
};
