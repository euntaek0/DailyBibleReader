import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../components/ui/button.tsx";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "읽기 시작",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "다음 장",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "닫기",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "불러오는 중",
  },
};
