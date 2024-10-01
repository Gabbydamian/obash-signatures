// src/app/listings/Pagination.jsx
import { Button } from "@chakra-ui/react";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // No need to show pagination if there's only one page

  return (
    <div className="flex justify-center mt-8 gap-2">
      <Button
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      {[...Array(totalPages)].map((_, page) => (
        <Button
          key={page + 1}
          variant={currentPage === page + 1 ? "solid" : "outline"}
          onClick={() => setCurrentPage(page + 1)}
        >
          {page + 1}
        </Button>
      ))}
      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
