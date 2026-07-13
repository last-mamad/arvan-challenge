import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PageNumberItem = number | "ellipsis-start" | "ellipsis-end";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageNumbers(currentPage: number, totalPages: number): PageNumberItem[] {
  if (totalPages <= 7) return range(1, totalPages);

  if (currentPage <= 3) return [...range(1, 5), "ellipsis-end", totalPages];

  if (currentPage >= totalPages - 2) return [1, "ellipsis-start", ...range(totalPages - 4, totalPages)];

  return [1, "ellipsis-start", ...range(currentPage - 1, currentPage + 1), "ellipsis-end", totalPages];
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
