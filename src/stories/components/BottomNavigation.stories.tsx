import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { BottomNavigation } from "../../components/BottomNavigation.tsx";

function BottomNavigationDemo(): React.JSX.Element {
  const [current, setCurrent] = useState<"daily" | "chapter" | "yearPlan" | "settings">("daily");

  return (
    <div className="relative h-[280px] border border-border/70 bg-background">
      <div className="p-4 text-sm text-muted-foreground">현재 탭: {current}</div>
      <BottomNavigation currentView={current} onNavigate={setCurrent} />
    </div>
  );
}

const meta = {
  title: "Components/BottomNavigation",
  component: BottomNavigationDemo,
  tags: ["autodocs"],
  parameters: {
    frame: "mobile",
  },
} satisfies Meta<typeof BottomNavigationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
