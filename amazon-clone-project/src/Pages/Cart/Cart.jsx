import React, { useContext } from 'react'
import styles from "./Cart.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Pages/Home/Product/ProductCard'
import CurrencyFormat from '../Home/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import { Type } from '../../Utility/actionType'
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  //console.log(basket); // show data as an arry
  //console.log(total); // total amount

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

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
              <section className={styles.cart_product}>
                <ProductCard
                  key={id}
                  product={item}
                  renderDescription={true}
                  flex={true}
                  renderAdd={false}
                />

                <div className={styles.btn_container}>
                  <button onClick={() => increment(item)}>
                    <MdOutlineKeyboardArrowUp size={20} />
                  </button>

                  <span>{item.amount}</span>

                  <button onClick={() => decrement(item.id)}>
                    <MdKeyboardArrowDown size={20} />
                  </button>
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Cart page part one => total sum price*/}
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
