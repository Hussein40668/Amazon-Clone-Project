import React, { useContext } from 'react'
import styles from "./Cart.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Pages/Home/Product/ProductCard'
import CurrencyFormat from '../Home/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext)

  const total = basket.reduce((amount, item) => {
   return  item.price + amount
  }, 0)
  
  return (
    <section className={styles.container}>
      <div className={styles.cart}>
        <h2>Hello </h2>
        <h3>This is your shopping basket </h3>
        <hr />

        {basket?.length == 0 ? (
          <p>Opps ! No items in your cart</p>
        ) : (
          basket?.map((item, id) => {
            return (
              <ProductCard
                key={id}
                product={item}
                renderDescription={true}
                flex={true}
                renderAdd={false}
              />
            );
          })
        )}
      </div>

      {basket?.length !== 0 && (
        <div className={styles.subtotal}>
          <div>
            <p>Subtotal ({basket?.length} items )</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order conatins a gift</small>
          </span>
          <Link to="/payments">Continue to checkout</Link>
        </div>
      )}
    </section>
  );
}

export default Cart
