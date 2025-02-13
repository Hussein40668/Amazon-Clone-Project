import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css"

const Product = ({ product }) => {
  const { image, title, id, rating, price } = product;
  return (
    <section className={styles.card_container}>
      <a href="#">
        <img src={image} alt={title} />
      </a>
      <div>
        <h3>{title}</h3>

        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} />
          
          <small>{rating.count}</small>
        </div>
        <div>
          
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>add to cart</button>
      </div>
    </section>
  );
};

export default Product;
