import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  rowOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  rowOptions,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="pagination mt-6 flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page{" "}
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const page = Math.max(
                1,
                Math.min(totalPages, Number(e.target.value))
              );
              onPageChange(page);
            }}
            className="w-12 text-center border border-gray-300 rounded-lg"
          />{" "}
          of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="rows-per-page" className="text-gray-600">
          Rows per page:
        </label>
        <select
          id="rows-per-page"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg cursor-pointer"
        >
          {rowOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
