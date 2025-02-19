import React from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import PruductDetail from "./Pages/ProductDetail/ProductDetail";
import Four04 from "./Pages/Four04/Four04";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51QtteMLq7orhGa2s3pZHEnuojIXTFke8TwmWiJHOv0Eg08RHwMxSl03Y3D4lRHegodk0vMewn9qkgun56rXPAWMA007iijVYGV"
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<PruductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Four04 />} />
      </Route>
      <Route path="/auth" element={<Auth />} />{" "}
    </Routes>
  );
};

export default Routing;
