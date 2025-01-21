"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
}
const PaginationBar = ({ totalPages, currentPage }: PaginationBarProps) => {
  const searchParams = useSearchParams();

  function getLink(page: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getLink(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none text-muted-foreground",
            )}
          />
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isEdgePage = page === 1 || page === totalPages; // first or last page
            const isNearCurrentPage = Math.abs(page - currentPage) <= 2; // 2 pages away from current page

            if (!isNearCurrentPage && !isEdgePage) {
              if (i === 1 || i === totalPages - 2) {
                return (
                  <PaginationItem key={page} className="hidden md:block">
                    <PaginationEllipsis className="text-muted-foreground" />
                  </PaginationItem>
                );
              }
              return null;
            }

            return (
              <PaginationItem key={page} className="hidden md:block">
                <PaginationLink
                  isActive={page === currentPage}
                  href={getLink(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationNext
            href={getLink(currentPage + 1)}
            className={cn(
              currentPage >= totalPages &&
                "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
