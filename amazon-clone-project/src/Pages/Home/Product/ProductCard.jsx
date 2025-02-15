import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import {Link} from 'react-router-dom'

const Product = ({ product, flex, renderDescription }) => {
  const { image, title, id, rating = { rate: 0, count: 0 }, price, description } = product;

  // console.log(product);
  return (
    <section
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDescription && <div className={styles.description}>{description }</div>}
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


