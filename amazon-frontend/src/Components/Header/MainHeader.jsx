import React, { useContext } from "react";
import styles from "./Header.module.css";
import AmazonLogo from "../../assets/image/amazon_PNG11.png";
import FlagLogo from "../../assets/image/flags_PNG14655.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase'

const Header = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // console.log(basket.length);
  
  const totalItem = basket?.reduce((amount, item) => {
   return item.amount + amount
  }, 0)

  return (
    <>
      <section className={styles.fixed}>
        <div className={styles.header_container}>

          {/* amazon logo */}
          <div className={styles.logo_container}>
            <Link to="/">
              <img src={AmazonLogo} alt="Amazon Logo" />
            </Link>
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
            <BsSearch size={38} />
          </div>

          {/* right side link */}
          <div className={styles.order_container}>
            <Link to="#" className={styles.language}>
              <img src={FlagLogo} alt="flag logo" />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]} </p>

                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
