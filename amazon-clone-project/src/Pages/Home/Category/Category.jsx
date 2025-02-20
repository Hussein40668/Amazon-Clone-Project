import React from "react";
import { categoryInfos } from "./categoryInfos"; 
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css" 

const Category = () => {
  return (
    <section className={styles.category_container}>
      {categoryInfos?.map((infos) => (
        <CategoryCard key={infos.key} data={infos} /> 
      ))}
    </section>
  );
};

export default Category; 
