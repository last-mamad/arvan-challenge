import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Pagination } from "@/components/design-system/pagination";

const meta = {
  title: "design-system/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    totalPages: { control: "number" },
    currentPage: { control: "number" },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 9,
    onPageChange: () => {},
  },
  render: (args) => {
    function Stateful() {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />;
    }
    return <Stateful />;
  },
};

export const FewPages: Story = {
  args: {
    ...Default.args,
    currentPage: 2,
    totalPages: 5,
  },
  render: Default.render,
};

export const NearStart: Story = {
  args: {
    ...Default.args,
    currentPage: 1,
    totalPages: 9,
  },
  render: Default.render,
};

export const NearEnd: Story = {
  args: {
    ...Default.args,
    currentPage: 9,
    totalPages: 9,
  },
  render: Default.render,
};
