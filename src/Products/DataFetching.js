import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "./Products";
import ProductsPagination from "./ProductsPagination";

import classes from "./DataFetching.module.css";

const PRODUCTS_PER_PAGE = 5;

const DataFetching = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const idParam = search ? `&id=${search}` : "";
        const res = await axios.get(
          `https://reqres.in/api/products?per_page=${PRODUCTS_PER_PAGE}&page=${currentPage}${idParam}`
        );

        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setProducts([res.data.data]);
        }

        setLoading(false);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [currentPage, search]);

  //page change

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <h1>COLOR TABLE</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={searchHandler}
          className={classes.searchTerm}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>

      <Products products={products} loading={loading} />
      <ProductsPagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default DataFetching;
