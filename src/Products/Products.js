import React from "react";
import classes from "./Products.module.css";

const Products = ({ products, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <table className={classes.table_fill}>
        <thead>
          <tr>
            <th className={classes.text_left}>ID</th>
            <th className={classes.text_left}>NAME</th>
            <th className={classes.text_left}>YEAR</th>
          </tr>
        </thead>
        <tbody className={classes.table_hover}>
          {products.map((product) => {
            return (
              <tr key={product.id} style={{ backgroundColor: product.color }}>
                <td className={classes.text_left}>{product.id}</td>
                <td className={classes.text_left}>{product.name}</td>
                <td className={classes.text_left}>{product.year}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
