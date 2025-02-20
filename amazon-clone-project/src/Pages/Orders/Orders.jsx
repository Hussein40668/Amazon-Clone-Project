import React, { useContext, useState, useEffect } from "react";
import styles from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../Home/Product/ProductCard";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      const userOrdersRef = collection(db, "users", user.uid, "orders");
      const q = query(userOrdersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot);
        setOrders(
          snapshot.docs?.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <section className={styles.container}>
      <div className={styles.order_container}>
        <h2>Your Orders</h2>

        {
          orders?.length === 0 &&
          <div style={{padding: "20px", fontSize:"20px"}}>You don't have orders yet</div>
        }
        {/* ordered items */}
        <div>
          {orders?.map((eachOrder, i) => {
            return (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard  flex={true} product={order} key={order.id} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Orders;
