import React from 'react'
import { FadeLoader } from "react-spinners"
import styles from "./Loader.module.css"

const Loader = () => {
  return (
      <div className={styles.loader}>
      <FadeLoader color='#36d7b7' />
    </div>
  );
}

export default Loader
