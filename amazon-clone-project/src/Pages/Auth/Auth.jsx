import React from 'react'
import styles from "./Auth.module.css"
import {Link} from 'react-router-dom'
const Auth = () => {
  return (
    <section className={styles.login}>
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      {/* form */}
      <div className={styles.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          {/* sign in button */}
          <button className={styles.signin_button}>Sign In</button>
        </form>

        {/* agremment */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale. Please see our privacy Notice, our Cookies notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account button */}
        <button className={styles.register_button}>Create Your Amazon Account</button>
      </div>
    </section>
  );
}

export default Auth
