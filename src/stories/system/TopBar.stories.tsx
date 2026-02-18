import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, PencilLine } from "lucide-react";

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
    title: "Home",
    subtitle: "날짜별 분량을 선택하고 바로 읽기",
    leftAction: (
      <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground">
        <Menu className="h-4 w-4" />
      </Button>
    ),
    rightAction: (
      <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground">
        <PencilLine className="h-4 w-4" />
      </Button>
    ),
  },
};

export const Section: Story = {
  args: {
    variant: "section",
    title: "신명기 24장",
    subtitle: "3/26절 완료",
    onBack: () => undefined,
    rightAction: (
      <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground">
        <PencilLine className="h-4 w-4" />
      </Button>
    ),
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

export const LongContext: Story = {
  args: {
    variant: "page",
    title: "장 읽기",
    subtitle: "책과 장을 선택한 뒤 읽기를 시작하면 읽은 구절이 순서대로 강조됩니다.",
    showSubtitle: true,
    rightAction: (
      <Button variant="ghost" size="icon" className="tap-target h-10 w-10 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground">
        <PencilLine className="h-4 w-4" />
      </Button>
    ),
  },
};
