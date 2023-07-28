import React from "react";
import styles from "./Navbar.module.css";
import profilePic from "../../assets/images/profilePic.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user.js";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    if (!isAuthenticated) navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <p>Feedback</p>
        </div>
        <div className={styles.button_group}>
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className={styles.btn}>
                Log out
              </button>
              <p>Hello!</p>
              <img src={profilePic} />
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.btn}>Log in</button>
              </Link>
              <Link to="/signup">
                <button
                  className={styles.btn}
                  style={{ border: "1px solid white" }}
                >
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
