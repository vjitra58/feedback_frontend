import React from "react";
import styles from "./Login.module.css";
import Register from "./Register.jsx";

const RegisterWrapper = () => {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
};

export default RegisterWrapper;
