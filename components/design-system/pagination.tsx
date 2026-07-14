"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/useIsMobile";

type PageNumberItem = number | "ellipsis-start" | "ellipsis-end";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// `siblingCount` = pages shown either side of the current one. 1 → up to 7 items
// (desktop), 0 → up to 5 (mobile, fewer items to fit a narrow screen).
function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageNumberItem[] {
  const totalToShow = siblingCount * 2 + 5;
  if (totalPages <= totalToShow) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;
  const edgeCount = 3 + siblingCount * 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, edgeCount), "ellipsis-end", totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis-start", ...range(totalPages - edgeCount + 1, totalPages)];
  }
  return [1, "ellipsis-start", ...range(leftSibling, rightSibling), "ellipsis-end", totalPages];
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  disabled?: boolean;
  /** Pages shown either side of the current one. Defaults to responsive (0 on mobile, 1 on desktop). */
  siblingCount?: number;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  disabled = false,
  siblingCount,
}: PaginationProps) {
  const isMobile = useIsMobile();
  const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount ?? (isMobile ? 0 : 1));

  return (
    <PaginationRoot className={className}>
      <PaginationContent className={disabled ? "border-neutral-st2-disable" : undefined}>
        <PaginationItem>
          <PaginationPrevious
            disabled={disabled || currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>

        {pageNumbers.map((page) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                disabled={disabled}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationEllipsis disabled={disabled} />
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            disabled={disabled || currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export { Pagination };
