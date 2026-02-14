import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../components/ui/button.tsx";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet.tsx";

function SheetDemo(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>책/장 선택 열기</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[75vh]">
          <SheetHeader>
            <SheetTitle>책/장 선택</SheetTitle>
            <SheetDescription>원하는 본문을 선택하세요.</SheetDescription>
          </SheetHeader>
          <div className="mt-3 rounded-md border p-3 text-sm text-muted-foreground">선택 UI 컨텐츠 자리</div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setOpen(false)}>적용</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

const meta = {
  title: "UI/Sheet",
  component: SheetDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof SheetDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
