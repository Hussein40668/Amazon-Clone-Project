import { useState, useEffect } from "react";
 import styles from "./Results.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from "../../Pages/Home/Product/ProductCard"
import Loader from "../../Components/Loader/Loader";

const Results = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const { categoryName } = useParams();
  // console.log(categoryName);

  useEffect(() => {
     setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((response) => {
        // console.log(response);
        setResults(response.data);
        // console.log(response.data);
         setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
         setIsLoading(false);
      })
    
  }, [])

  
  return (
    <>
      <section>
        <h1 className={styles.result}>Results Page</h1>
        <p style={{ padding: "30px" }}>Category /{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id}
                product={product}
                renderDescription={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Results
