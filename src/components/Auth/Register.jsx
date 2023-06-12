import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { TfiMobile } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user.js";
import { useNavigate } from "react-router-dom";

const Register = ({ ispopup, setClicked }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [mobile, setMobile] = useState({ value: "", error: "" });
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validateMobile();
    validatePassword();
    if (email.error || password.error || mobile.error) return;
    console.log("submitting", email, password, mobile, name);
    await dispatch(
      register({
        name,
        email: email.value,
        password: password.value,
        mobile: mobile.value,
      })
    );
    navigate("/");
  };

  const validateEmail = (e) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value.match(mailFormat)) {
      setEmail({ ...email, error: "Please enter a valid email" });
    } else {
      setEmail({ ...email, error: "" });
    }
    // console.log(email);
  };

  const validatePassword = (e) => {
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.value.match(passwordFormat)) {
      setPassword({ ...password, error: "Password must contain at least 8 characters and one alphabet and one number, no special characters" });
    } else {
      setPassword({ ...password, error: "" });
    }
    // console.log(password);
  };

  const validateMobile = (e) => {
    const mobileFormat = /^[6-9]\d{9}$/;
    if (!mobile.value.match(mobileFormat)) {
      setMobile({ ...mobile, error: "Please enter a valid mobile number" });
    } else {
      setMobile({ ...mobile, error: "" });
    }
    // console.log(mobile);
  };

  return (
    <div style={{ width: ispopup ? "100%" : "auto" }} className={styles.login}>
      <h1 style={{ display: ispopup ? "none" : "block" }}>Feedback</h1>
      <p style={{ display: ispopup ? "none" : "block" }}>
        Add your Products and give us your valuable feedback
      </p>
      <form onSubmit={handleSubmit} style={{ padding: ispopup ? 0 : "" }}>
        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <BsFillPersonFill />
            <input
              type="name"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <AiOutlineMail />
            <input
              type="email"
              id="email"
              value={email.value}
              placeholder="Email"
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
              onBlur={validateEmail}
            />
          </div>
          <p>{email.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <TfiMobile />
            <input
              type="mobile"
              id="monile"
              value={mobile.value}
              placeholder="Mobile"
              onChange={(e) => setMobile({ ...email, value: e.target.value })}
              onBlur={validateMobile}
            />
          </div>
          <p>{mobile.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <RiLockPasswordFill />
            <input
              type="password"
              id="password"
              value={password.value}
              placeholder="Password"
              onChange={(e) =>
                setPassword({ ...password, value: e.target.value })
              }
              onBlur={validatePassword}
            />
          </div>
          <p>{password.error}</p>
        </div>

        <p>
          Already have an account?{" "}
          {!ispopup ? (
            <Link to="/login">
              <span>Sign In</span>
            </Link>
          ) : (
            <span onClick={() => setClicked(true)}>Sign In</span>
          )}
        </p>

        <div className={styles.button_wrapper}>
          <button
          disabled={loading}
            style={{ left: ispopup ? "0px" : "auto" }}
            className={styles.button}
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
