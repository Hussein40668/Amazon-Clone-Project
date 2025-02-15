import React from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Auth/SignIn";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import PruductDetail from "./Pages/ProductDetail/ProductDetail";
import Four04 from "./Pages/Four04/Four04";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<PruductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Four04 />} />
      </Route>
    </Routes>
  );
};

export default Routing;
