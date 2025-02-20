import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../Home/Product/ProductCard";
import { Type } from "../../Utility/actionType";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../Home/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";



const Payment = () => {
  const [{ user, basket}, dispatch] = useContext(DataContext);
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
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe not initialized.");
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      // Step 1: Create payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Client secret not found.");
      }

      // Step 2: Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        throw new Error("Payment not successful.");
      }

      // Step 3: Save order to Firestore
      if (!user || !user.uid) {
        throw new Error("User not authenticated.");
      }

      // Firebase v9+ syntax
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // console.log("Order saved successfully!");
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });

      // Step 4: Clear the basket  
 dispatch({ type: Type.CLEAR_BASKET});
      // Step 5: Show success message
      //alert("Payment successful! Your order has been placed.");
    } catch (error) {
      console.error("Error during payment process:", error);
      setCardError("An error occurred while processing your payment.");
      setProcessing(false);
    }
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

              <form onSubmit={handlePayment}>
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
                  <button type="submit">
                    {
                      processing ? (
                        <div className={styles.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please Wait ...</p>
                      </div>
                        
                      ): "Pay Now"
                    }
                    
                  
                  </button>
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