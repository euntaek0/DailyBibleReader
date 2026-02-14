import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";

import { Button } from "../../components/ui/button.tsx";
import { Toaster } from "../../components/ui/toaster.tsx";

function ToasterDemo(): React.JSX.Element {
  return (
    <div className="space-y-3">
      <Toaster />
      <Button onClick={() => toast.success("저장되었어요")}>성공 토스트</Button>
      <Button variant="secondary" onClick={() => toast.info("다음 절로 이동했어요")}>정보 토스트</Button>
    </div>
  );
}

const meta = {
  title: "UI/Toaster",
  component: ToasterDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof ToasterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
