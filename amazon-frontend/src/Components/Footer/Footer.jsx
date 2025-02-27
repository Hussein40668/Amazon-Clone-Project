import React from "react";
import styles from "./Footer.module.css";
import{Link} from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>See personalized recommendations</h2>
        <button className={styles.button}>sign in</button>
        <h6>
          New Customer? <Link to="#">Start here</Link>
        </h6>
      </div>
      <p className={styles.back}>Back to top </p>
      <section className={styles.outer_footer}>
        <div className={styles.inner_footer}>
          <div>
            <ul>
              <h4>Get to Know Us</h4>
              <li>Careers</li>
              <li>Blog</li>
              <li>About Amazon</li>
              <li>Investor Relations</li>
              <li>Amazon Devices</li>
              <li>Amazon Science</li>
            </ul>
          </div>

          <div>
            <ul>
              <h4>Make Money with Us</h4>
              <li>Sell products on Amazon</li>
              <li>Sell on Amazon Business</li>
              <li>Sell apps on Amazon</li>
              <li>Become an Affiliate</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish with Us</li>
              <li>Host an Amazon Hub</li>
              <li>›See More Make Money with Us</li>
            </ul>
          </div>

          <div>
            <ul>
              <h4>Amazon Payment Products</h4>
              <li>Amazon Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
              <li>Amazon Currency Converter</li>
            </ul>
          </div>

          <div>
            <ul>
              <h4>Let Us Help You</h4>
              <li>
                Amazon and COVID- <br />
                19
              </li>
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Shipping Rates & Policies</li>
              <li>Returns & Replacements</li>
              <li>Manage Your Content and Devices</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
