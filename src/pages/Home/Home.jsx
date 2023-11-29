import React, { useState } from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import poster from "../../assets/images/poster.png";
import Content from "../../components/Content/Content.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero_section}>
          <div className={styles.poster_container}>
            <img src={poster} />
          </div>
          <div className={styles.poster_heading}>
            <h1>Add your products and give your valuable feedback</h1>
            <p>
              Easily give your feedback in a matter of minutes. Access your
              audience on all platforms. Observe result manually in real time
            </p>
          </div>
        </div>
        <Content />
      </div>
    </>
  );
};

export default Home;
