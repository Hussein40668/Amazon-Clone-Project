import React from "react";
import styles from "./UpperHeader.module.css";
import AmazonLogo from "../../assets/image/amazon_PNG11.png";
import FlagLogo from "../../assets/image/flags_PNG14655.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.logo_container}>
          <a href="#">
            <img src={AmazonLogo} alt="Amazon Logo" />
          </a>
          <div className={styles.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliverd to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* search bar */}
        <div className={styles.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" id="" placeholder="search product" />
          <BsSearch size={25} />
        </div>

        {/* right side link */}
        <div className={styles.order_container}>
          <a href="" className={styles.language}>
            <img src={FlagLogo} alt="flag logo" />

            <select name="" id="">
              <option value="">EN</option>
            </select>
          </a>

          <a href="/">
            <p>Hello, Sign In</p>
            <span>Account & Lists</span>
          </a>

          <a href="">
            <p>Returns</p>
            <span>& Orders</span>
          </a>

          <a href="" className={styles.cart}>
            <BiCart size={35} />
            <span>0</span>
          </a>
        </div>
      </div>

      <LowerHeader />
    </>
  );
};

export default Header;
