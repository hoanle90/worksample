import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const generateLinkProps = (
    page: number
  ): React.AnchorHTMLAttributes<HTMLAnchorElement> => {
    const isDisabled = page < 1 || page > totalPages || page === currentPage;
    return {
      href: isDisabled ? "#" : `/?page=${page}`,
      className: `px-4 py-2 rounded ${
        isDisabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
      }`,
    };
  };

  return (
    <div className="mt-8 flex justify-center gap-3">
      <a {...generateLinkProps(1)}>First</a>

      <a {...generateLinkProps(currentPage - 1)}>Prev</a>

      <span className="px-4 py-2 text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <a {...generateLinkProps(currentPage + 1)}>Next</a>

      <a {...generateLinkProps(totalPages)}>Last</a>
    </div>
  );
}
