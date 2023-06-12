import React from "react";
import Modal from "react-modal";
import Login from "../Auth/Login.jsx";
import styles from "./styles.module.css";


const isSmallScreen = () => {
  return window.innerWidth < 768;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: "50vw",
    display: "flex",
    minHeight: "400px",
    padding: "0",
  },
};

const LoginModal = ({ open, setOpen, setClicked }) => {

  const handleAfterOpen = () => {
    if (isSmallScreen()) {
      customStyles.content.width = "90vw";
       customStyles.content.maxHeight = "80vh";
      // show = false;
    } else {
      // show = true;
      customStyles.content.width = "50vw";
       customStyles.content.maxHeight = "100vh";
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        setOpen(false);
        setClicked(false);
      }}
      style={customStyles}
      ariaHideApp={false}
      onAfterOpen={handleAfterOpen}
    >
      <div className={styles.left}>
        <h1>Log in to continue</h1>
        <Login ispopup={true} />
      </div>
      <div className={styles.right}>
        <h1>Feedback</h1>
        <p>Add your product and rate other items.....</p>
      </div>
    </Modal>
  );
};

export default LoginModal;
