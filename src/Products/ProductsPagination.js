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
        <a href="!#" className={classes.page_numbers} onClick={prevPage}>
          prev
        </a>

        {Array(totalPages)
          .fill()
          .map((_, id) => (
            <a
              key={`pagination_${id + 1}`}
              onClick={() => paginate(id + 1)}
              href="!#"
              className={`${classes.page_numbers} ${
                currentPage === id + 1 ? classes.active : ""
              }`}
            >
              {id + 1}
            </a>
          ))}

        <a href="!#" className={classes.page_numbers} onClick={nextPage}>
          next
        </a>
      </div>
    </div>
  );
};

export default ProductsPagination;
