import React, { useState, useEffect } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Products from "./Products";
import ProductsPagination from "./ProductsPagination";

import classes from "./DataFetching.module.css";

const PRODUCTS_PER_PAGE = 5;
const API_URL = "https://reqres.in/api";

const DataFetching = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const idParam = search ? `&id=${search}` : "";
        const res = await axios.get(
          `${API_URL}/products?per_page=${PRODUCTS_PER_PAGE}&page=${currentPage}${idParam}`
        );
        const products = res.data.data;
        setProducts(Array.isArray(products) ? products : [products]);

        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, search]);

  //page change

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

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <h1>COLOR TABLE</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchParams(createSearchParams({ id: e.target.value }));
            setSearch(e.target.value);
          }}
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
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default DataFetching;
