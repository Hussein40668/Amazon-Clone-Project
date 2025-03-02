import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
import Loader from "../../../Components/Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
     setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {
        isLoading ? (
        <Loader />
      ) : (
        <section className={styles.products_container}>
          {products?.map((singleProduct, id) => (
            <ProductCard
              cartAdd={true}
              product={singleProduct}
              key={id} />
          ))}
        </section>
        )
      }
    </>
  );
};

export default Product;
