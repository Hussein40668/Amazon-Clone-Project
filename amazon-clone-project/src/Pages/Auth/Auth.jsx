import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/actionType"; 

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);

  const authBundler = async (e) => {
    e.preventDefault(); // Prevent default form submission

   // console.log(e.target.name);

    try {
      if (e.target.name === "signin") {

        //  Fix incorrect string comparison
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      } else {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message); // ✅ Show error to the user
    }
  };

  return (
    <section className={styles.login}>
      {/* Logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      {/* Form */}
      <div className={styles.login_container}>
        <h1>Sign In</h1>

        {/*  Display error message */}
        {error && <p className={styles.error_message}>{error}</p>}{" "}
        <form>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              required
            />
          </div>

          {/* Sign-in button */}
          <button
            type="submit"
            name="signin"
            onClick={authBundler}
            className={styles.signin_button}
          >
            Sign In
          </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale. Please see our privacy Notice, our Cookies notice and our
          Interest-Based Ads Notice.
        </p>
        {/* Create account button */}
        <button
          type="submit"
          name="signup"
          onClick={authBundler}
          className={styles.register_button}
        >
          Create Your Amazon Account
        </button>
      </div>
    </section>
  );
};

export default Auth;
