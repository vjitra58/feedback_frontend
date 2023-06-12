import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user.js";
import toast from "react-hot-toast";

const Login = ({ ispopup }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const validateEmail = () => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value.match(mailFormat)) {
      setEmail({ ...email, error: "Please enter a valid email" });
    } else {
      setEmail({ ...email, error: "" });
    }
    // console.log(email);
  };

  const validatePassword = () => {
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.value.match(passwordFormat)) {
      setPassword({
        ...password,
        error:
          "Password must be at least 8 characters long and must contain at least one number and one character , no special characters",
      });
    } else {
      setPassword({ ...password, error: "" });
    }
    // console.log(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (password.error || email.error) return;
    console.log("submitting", email, password);
    await dispatch(login(email.value, password.value));
    navigate("/");
  };

  //  useEffect(() => {
  //    if (error) {
  //      toast.error(error);
  //      dispatch({ type: "clearError" });
  //    }
  //    if (message) {
  //      toast.success(message);
  //      dispatch({ type: "clearMessage" });
  //    }
  //  }, [error, message, dispatch]);

  return (
    <div style={{ width: ispopup ? "100%" : "auto" }} className={styles.login}>
      <h1 style={{ display: ispopup ? "none" : "block" }}>Feedback</h1>
      <p style={{ display: ispopup ? "none" : "block" }}>
        Add your Products and give us your valuable feedback
      </p>
      <form onSubmit={handleSubmit} style={{ padding: ispopup ? 0 : "" }}>
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

        <p style={{ display: ispopup ? "none" : "inline" }}>
          Don't Have an account?{" "}
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </p>

        <div className={styles.button_wrapper}>
          <button
            disabled={loading}
            style={{ left: ispopup ? "0px" : "auto" }}
            className={styles.button}
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
