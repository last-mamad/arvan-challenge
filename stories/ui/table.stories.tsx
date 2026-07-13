import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const meta = {
  title: "ui/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { id: 1, title: "Getting started", author: "@ada", created: "Jan 4, 2026" },
          { id: 2, title: "Design tokens 101", author: "@grace", created: "Feb 12, 2026" },
          { id: 3, title: "Shipping faster", author: "@linus", created: "Mar 1, 2026" },
        ].map((row) => (
          <TableRow key={row.id}>
            <TableCell className="text-center text-caption1-strong">{row.id}</TableCell>
            <TableCell className="text-body1">{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
