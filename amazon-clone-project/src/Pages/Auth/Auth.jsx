import { ClipLoader } from "react-spinners";
import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user);

  const navigate = useNavigate()
  const navStateData = useLocation()
  // console.log(navStateData);
  

  const authHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.name);

    if (e.target.name === "sign in") {
      // Set loading for sign-in
      setLoading({ ...loading, signIn: true });

      // Firebase sign-in
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {

          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          // Stop loading after successful sign-in
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect ||"/")
        })
        .catch((err) => {
          // Set error message
          setError(err.message);

          // Stop loading if sign-in fails
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // Set loading for sign-up
      setLoading({ ...loading, signUp: true });

      // Firebase sign-up (registration)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          // Stop loading after successful sign-up
          setLoading({ ...loading, signUp: false });
           navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // Stop loading if sign-up fails
          setLoading((prev) => ({ ...prev, signUp: false }));
          
          // Handle different error cases
          if (err.code === "auth/email-already-in-use") {
            setError(
              "This email is already registered. Please sign in instead."
            );
          } else if (err.code === "auth/invalid-email") {
            setError("Invalid email format. Please enter a valid email.");
          } else if (err.code === "auth/weak-password") {
            setError("Password must be at least 6 characters.");
          } else {
            setError(err.message); // Show any other Firebase error
          }
        });
    }
  };

  return (
    <section className={styles.login}>
      {/* Logo */}
      <Link to ="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      {/* Form */}
      <div className={styles.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
            <small
          style= {{
          padding: "5px",
          textAlign: "center",
          color: "red",
          fontWeight:"bold"
          }}> 
        {navStateData?.state?.msg} 
        </small>
        )}
        
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
            {/* controlled input -> input gain using set useState */}
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
            name="sign in"
            onClick={authHandler}
            className={styles.signin_button}
            disabled={loading.signIn} // Prevent multiple clicks
          >
            {loading.signIn ? (
              <ClipLoader color="#0d1306" size={15} />
            ) : (
              "Sign In"
            )}
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
          name="sign up"
          onClick={authHandler}
          className={styles.register_button}
        >
          {loading.signUp ? (
            <ClipLoader color="#0d1306" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>

        {/*  Display error message */}
        {error && <p className={styles.error_message}>{error}</p>}{" "}
      </div>
    </section>
  );
};

export default Auth;
