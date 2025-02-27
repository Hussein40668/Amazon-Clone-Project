import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../../Components/DataProvider/DataProvider";
import { Type } from "../../../Utility/actionType.js";

const ProductCard = ({ product, flex, renderDescription, renderAdd }) => {
  const {
    image,
    title,
    id,
    rating = { rate: 0, count: 0 },
    price,
    description,
  } = product;
  // console.log(product);

  // const truncateText = (text, maxLength) => {
  //   return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  // };

  const [state, dispatch] = useContext(DataContext);
  //console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <section
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      {/* image */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        {/* title */}
        <h3>{title}</h3>

        {/* description */}
        {renderDescription && (
          <div className={styles.description}>{description}</div>
        )}

        {/* rating */}
        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} />

          <small>{rating.count}</small>
        </div>

        {/* price */}
        <div className={styles.price}>
          <h5>
            <CurrencyFormat amount={price} />
          </h5>
        </div>

        {/* add to cart */}
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
