import { useState, useEffect } from "react";
 import styles from "./Results.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from "../../Pages/Home/Product/ProductCard"

const Results = () => {
  const[results, setResults] = useState([])
  const { categoryName } = useParams();
  // console.log(categoryName);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((response) => {
        // console.log(response);
        setResults(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, [])

  
  return (
    <>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category /{categoryName}</p>
        <hr />
        <div className={styles.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id}  
            product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Results
