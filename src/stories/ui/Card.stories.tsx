import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.tsx";

const CardDemo = (): React.JSX.Element => (
  <Card>
    <CardHeader>
      <CardTitle>오늘 분량</CardTitle>
      <CardDescription>신명기 24장부터 27장까지</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">탐색 화면과 리더 화면 모두 동일한 surface 스타일을 사용합니다.</p>
    </CardContent>
  </Card>
);

const meta = {
  title: "UI/Card",
  component: CardDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof CardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
