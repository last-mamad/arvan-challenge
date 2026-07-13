import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckCircleIcon } from "lucide-react";
import { userEvent, within } from "storybook/test";

import { Button } from "@/components/ui/button";

const meta = {
  title: "ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "button",
    variant: "default",
    size: "default",
  },
};

// No pseudo-states addon is installed, so hover/press are demonstrated by
// actually dispatching events rather than a parameters.pseudo flag.
const hoverPlay: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.hover(canvas.getByRole("button"));
};
const pressPlay: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
};

// Primary (variant="default"), Text layout
export const PrimaryDefault: Story = {
  args: { children: "button", variant: "default" },
};
export const PrimaryHover: Story = {
  args: { children: "button", variant: "default" },
  play: hoverPlay,
};
export const PrimaryPress: Story = {
  args: { children: "button", variant: "default" },
  play: pressPlay,
};
export const PrimaryLoading: Story = {
  args: { children: "button", variant: "default", loading: true },
};
export const PrimaryDisable: Story = {
  args: { children: "button", variant: "default", disabled: true },
};

// Primary, Icon layout
export const PrimaryIconDefault: Story = {
  args: { variant: "default", size: "icon", children: <CheckCircleIcon /> },
};
export const PrimaryIconLoading: Story = {
  args: { variant: "default", size: "icon", loading: true },
};
export const PrimaryIconDisable: Story = {
  args: { variant: "default", size: "icon", disabled: true, children: <CheckCircleIcon /> },
};

// Secondary, Text layout
export const SecondaryDefault: Story = {
  args: { children: "button", variant: "secondary" },
};
export const SecondaryHover: Story = {
  args: { children: "button", variant: "secondary" },
  play: hoverPlay,
};
export const SecondaryPress: Story = {
  args: { children: "button", variant: "secondary" },
  play: pressPlay,
};
export const SecondaryLoading: Story = {
  args: { children: "button", variant: "secondary", loading: true },
};
export const SecondaryDisable: Story = {
  args: { children: "button", variant: "secondary", disabled: true },
};

// Secondary, Icon layout
export const SecondaryIconDefault: Story = {
  args: { variant: "secondary", size: "icon", children: <CheckCircleIcon /> },
};
export const SecondaryIconLoading: Story = {
  args: { variant: "secondary", size: "icon", loading: true },
};
export const SecondaryIconDisable: Story = {
  args: { variant: "secondary", size: "icon", disabled: true, children: <CheckCircleIcon /> },
};

// Primary Danger (variant="destructive"), Text layout
export const DangerDefault: Story = {
  args: { children: "button", variant: "destructive" },
};
export const DangerHover: Story = {
  args: { children: "button", variant: "destructive" },
  play: hoverPlay,
};
export const DangerPress: Story = {
  args: { children: "button", variant: "destructive" },
  play: pressPlay,
};
export const DangerLoading: Story = {
  args: { children: "button", variant: "destructive", loading: true },
};
export const DangerDisable: Story = {
  args: { children: "button", variant: "destructive", disabled: true },
};

// Primary Danger, Icon layout
export const DangerIconDefault: Story = {
  args: { variant: "destructive", size: "icon", children: <CheckCircleIcon /> },
};
export const DangerIconLoading: Story = {
  args: { variant: "destructive", size: "icon", loading: true },
};
export const DangerIconDisable: Story = {
  args: { variant: "destructive", size: "icon", disabled: true, children: <CheckCircleIcon /> },
};

// Link button (separate Figma component — see components/ui/button.tsx variant="link")
export const LinkDefault: Story = {
  args: {
    children: "button",
    variant: "link",
  },
};

export const LinkHover: Story = {
  args: {
    children: "button",
    variant: "link",
  },
  play: hoverPlay,
};

export const LinkPress: Story = {
  args: {
    children: "button",
    variant: "link",
  },
  play: pressPlay,
};

export const LinkDisable: Story = {
  args: {
    children: "button",
    variant: "link",
    disabled: true,
  },
};
