import type { Meta, StoryObj } from "@storybook/react-vite";

import { Layout } from "../../components/Layout.tsx";

function LayoutDemo(): React.JSX.Element {
  return (
    <Layout>
      <div className="rounded-md border p-3 text-sm text-muted-foreground">레거시 Layout 컴포넌트 미리보기</div>
    </Layout>
  );
}

const meta = {
  title: "Components/Layout (Legacy)",
  component: LayoutDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof LayoutDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
