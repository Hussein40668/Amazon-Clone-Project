import React from "react";
import Header from "../Header/UpperHeader";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default SharedLayout;
