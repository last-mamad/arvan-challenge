import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const meta = {
  title: "ui/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const Disable: Story = {
  render: () => (
    <Pagination>
      <PaginationContent className="border-neutral-st2-disable">
        <PaginationItem>
          <PaginationPrevious disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink disabled>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink disabled>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive disabled>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink disabled>6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink disabled>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
