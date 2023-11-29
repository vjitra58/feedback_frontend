import React from "react";
import styles from "./styles.module.css";
import Register from "../../components/Register/Register.jsx";

const RegisterWrapper = () => {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
};

export default RegisterWrapper;
