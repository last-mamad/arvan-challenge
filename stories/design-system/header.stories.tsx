import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "@/components/design-system/header";

const meta = {
  title: "design-system/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    userName: { control: "text" },
    title: { control: "text" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "<user>",
    title: "Arvancloud Challenge",
    onLogout: () => alert("logout"),
  },
};
