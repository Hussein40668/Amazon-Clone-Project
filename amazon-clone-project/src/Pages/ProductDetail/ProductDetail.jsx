import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from "../../Pages/Home/Product/ProductCard"
import Loader from '../../Components/Loader/Loader'

const ProductDetail = () => {
  const { productId } = useParams()
  //console.log(productId);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        // console.log(res.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
        setIsLoading(false);
      });
    
  }, []);

  return (
<>
      {isLoading ? (<Loader />) : (<ProductCard product={product}
        flex={true}
        renderDescription={true}
        renderAdd={true}

      />)}
</>
   
  )
}

export default ProductDetail
