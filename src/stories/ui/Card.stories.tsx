import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.tsx";
import { Button } from "../../components/ui/button.tsx";

const CardDemo = (): React.JSX.Element => (
  <div className="grid gap-4">
    <Card>
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Today</p>
        <CardTitle>오늘 분량</CardTitle>
        <CardDescription>신명기 24장부터 27장까지</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[0.95rem] leading-7 text-foreground">
          카드 상단은 맥락 라벨, 제목, 설명 순으로 정보를 배치하고 본문에서는 실행 가능한 액션을 제공합니다.
        </p>
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-3 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">진행률</span>
          <span className="text-sm font-semibold text-foreground">3 / 4 장</span>
        </div>
        <Button className="w-full">지금 읽기</Button>
      </CardContent>
    </Card>

    <Card className="bg-muted/35">
      <CardContent className="space-y-2 p-6">
        <p className="text-sm font-semibold text-foreground">도움말</p>
        <p className="text-sm leading-6 text-muted-foreground">보조 카드에서도 제목과 설명의 대비를 유지해 안정적인 위계를 제공합니다.</p>
      </CardContent>
    </Card>
  </div>
);

const meta = {
  title: "UI/Card",
  component: CardDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof CardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
