import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusBadge } from "../../components/system/StatusBadge.tsx";

const meta = {
  title: "System/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  args: {
    status: "READ",
    score: 0.93,
  },
};

export const Partial: Story = {
  args: {
    status: "PARTIAL",
    score: 0.45,
  },
};

export const NotRead: Story = {
  args: {
    status: "NOT_READ",
  },
};
