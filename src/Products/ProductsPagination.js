import React from "react";
import classes from "./ProductsPagination.module.css";

const ProductsPagination = ({
  totalPages,
  paginate,
  prevPage,
  nextPage,
  currentPage,
}) => {
  return (
    <div className={classes.pagination_wrapper}>
      <div className={classes.pagination}>
        <button
          className={`${classes.page_numbers} ${
            currentPage === 1 && classes.inactive
          }`}
          onClick={prevPage}
        >
          prev
        </button>

        {Array(totalPages)
          .fill()
          .map((_, id) => {
            const page = id + 1;
            return (
              <button
                key={`pagination-${page}`}
                onClick={() => paginate(page)}
                className={`${classes.page_numbers} ${
                  currentPage === page && classes.active
                }`}
              >
                {page}
              </button>
            );
          })}

        <button
          className={`${classes.page_numbers} ${
            currentPage === totalPages && classes.inactive
          }`}
          onClick={nextPage}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;
