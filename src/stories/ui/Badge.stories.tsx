import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../../components/ui/badge.tsx";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  args: {
    variant: "read",
    children: "읽음 87%",
  },
};

export const Partial: Story = {
  args: {
    variant: "partial",
    children: "부분 일치 43%",
  },
};

export const NotRead: Story = {
  args: {
    variant: "notread",
    children: "읽기 전",
  },
};
