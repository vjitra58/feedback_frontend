import React from "react";
import Modal from "react-modal";
import Login from "../Login/Login.jsx";
import AddProduct from "../AddProduct/AddProduct.jsx";
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
    maxHeight: "80vh",
    padding: "0",
  },
};

const AddProductModal = ({ open, setOpen, setClicked }) => {

  // let show = true;

  const handleAfterOpen = () => {
    if (isSmallScreen()) {
      customStyles.content.width = "90vw";
      customStyles.content.maxHeight =  "80vh";
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
        <h1>Add Your Product</h1>
        <AddProduct ispopup={true} setOpen={setOpen} />
      </div>
      
      <div className={styles.right}>
        <h1>Feedback</h1>
        <p>Add your product and rate other items.....</p>
      </div>
    </Modal>
  );
};

export default AddProductModal;
