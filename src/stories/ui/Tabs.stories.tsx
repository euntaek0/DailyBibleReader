import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs.tsx";

function TabsDemo(): React.JSX.Element {
  return (
    <Tabs defaultValue="book" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="book">책 선택</TabsTrigger>
        <TabsTrigger value="chapter">장 선택</TabsTrigger>
      </TabsList>
      <TabsContent value="book" className="rounded-md border p-3 text-sm text-muted-foreground">
        책 목록이 노출되는 영역
      </TabsContent>
      <TabsContent value="chapter" className="rounded-md border p-3 text-sm text-muted-foreground">
        장 번호 그리드 영역
      </TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "UI/Tabs",
  component: TabsDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof TabsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
