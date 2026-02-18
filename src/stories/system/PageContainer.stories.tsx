import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageContainer } from "../../components/system/PageContainer.tsx";

function PageContainerDemo(): React.JSX.Element {
  return (
    <div className="h-[600px] border">
      <PageContainer>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="rounded-md border p-3 text-sm text-muted-foreground">
              컨텐츠 블록 {index + 1}
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}

const meta = {
  title: "System/PageContainer",
  component: PageContainerDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof PageContainerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
