import React from "react";
import styles from "./Category.module.css"
const CategoryCard = ({ data }) => {
  return (
    <div className={styles.category}>
      <a href="#">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </a>
    </div>
  );
};

export default CategoryCard;
