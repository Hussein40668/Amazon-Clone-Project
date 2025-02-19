import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../Home/Product/ProductCard";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../Home/CurrencyFormat/CurrencyFormat";


const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);
  // console.log(user);

  // Total Items
  const totalItem = basket?.reduce((amount, item) => {
    return (item.amount || 0) + amount;
  }, 0);

  // Total Price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  return (
    <>
      {/* Payment Header */}
      <div className={styles.payment_header}>CheckOut ({totalItem}) items</div>

      {/* Payment method */}
      <section className={styles.payment}>
        {/* Address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Addis Ababa</div>
          </div>
        </div>
        <hr />

        {/* Product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form action="">
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{display:"flex", gap:"10px"}}>                  
                      <p>Total Order  =</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;