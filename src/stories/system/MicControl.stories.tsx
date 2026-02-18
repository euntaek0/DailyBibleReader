import type { Meta, StoryObj } from "@storybook/react-vite";

import { MicControl } from "../../components/system/MicControl.tsx";

const meta = {
  title: "System/MicControl",
  component: MicControl,
  tags: ["autodocs"],
  parameters: {
    frame: "mobile",
  },
  args: {
    state: "idle",
    helperText: "마이크를 눌러 낭독을 시작하세요.",
    size: "compact",
  },
} satisfies Meta<typeof MicControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    state: "idle",
  },
};

export const Listening: Story = {
  args: {
    state: "listening",
  },
};

export const RegularSize: Story = {
  args: {
    size: "regular",
    state: "idle",
  },
};

export const Denied: Story = {
  args: {
    state: "denied",
  },
};

export const Unsupported: Story = {
  args: {
    state: "unsupported",
  },
};
