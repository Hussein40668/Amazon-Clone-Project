import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
const Product = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.products_container}>
        {products?.map((singleProduct) => (
          <ProductCard product={singleProduct} key={singleProduct.id} />
        ))}
      </div>
    </>
  );
};

export default Product;
