import React from "react";
import styles from "./styles.module.css";
import Login from "../../components/Login/Login.jsx";

const LoginWrapper = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default LoginWrapper;
