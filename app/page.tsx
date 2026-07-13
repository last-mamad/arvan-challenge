"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/design-system/pagination";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

const TOTAL_PAGES = 3;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className="flex flex-col gap-8 p-8">
      <DropdownMenu
        items={[
          { onClick: () => alert("hi"), title: "hi" },
          { onClick: () => {}, isLoading: true, title: "hi" },
        ]}
        trigger={<Button>Open Menu</Button>}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
