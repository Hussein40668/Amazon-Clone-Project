import React from 'react'
import styles from "./ProductDetail.module.css"
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from "../../Pages/Home/Product/ProductCard"

const ProductDetail = () => {
  const { productId } = useParams()
  //console.log(productId);

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
    
  }, []);

  return (
    <div>
      <ProductCard
      product= {product}
      />
    </div>
  )
}

export default ProductDetail
