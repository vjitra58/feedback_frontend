import React from "react";
import styles from "./Login.module.css";
import Login from "./Login.jsx";

const LoginWrapper = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default LoginWrapper;
