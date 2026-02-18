import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppShell } from "../../components/system/AppShell.tsx";

function AppShellDemo(): React.JSX.Element {
  return (
    <AppShell>
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">AppShell 내부 콘텐츠</div>
    </AppShell>
  );
}

const meta = {
  title: "System/AppShell",
  component: AppShellDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof AppShellDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
