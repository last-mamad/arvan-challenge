import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Fixed total slot count (numbers + ellipses combined) — matches Arvan's own
// pagination convention: the control is always exactly this long, at every
// page, instead of growing/shrinking as the current page moves around.
const MAX_VISIBLE_ITEMS = 7;
// Single-ellipsis case (near the first/last page): how many consecutive
// numbers fill the run on the open side, e.g. "1 2 3 4 5 … 9".
const EDGE_CLUSTER_SIZE = MAX_VISIBLE_ITEMS - 2;
// Double-ellipsis case (current page away from both edges): how many
// consecutive numbers surround the current page, e.g. "1 … 4 5 6 … 9".
const SIBLING_COUNT = (MAX_VISIBLE_ITEMS - 5) / 2;

type PageNumberItem = number | "ellipsis-start" | "ellipsis-end";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageNumbers(currentPage: number, totalPages: number): PageNumberItem[] {
  if (totalPages <= MAX_VISIBLE_ITEMS) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, Math.max(EDGE_CLUSTER_SIZE, rightSibling)), "ellipsis-end", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightStart = Math.min(totalPages - EDGE_CLUSTER_SIZE + 1, leftSibling);
    return [1, "ellipsis-start", ...range(rightStart, totalPages)];
  }

  return [1, "ellipsis-start", ...range(leftSibling, rightSibling), "ellipsis-end", totalPages];
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>

        {pageNumbers.map((page) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <PaginationLink isActive={currentPage === page} onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export { Pagination };
