import React, {useEffect} from "react";
import Modal from "react-modal";
import Login from "../Auth/Login.jsx";
import AddProduct from "../AddProduct/AddProduct.jsx";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/product.js";

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

const EditProductModal = ({ open, setOpen, id }) => {
  const dispatch = useDispatch();

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
      }}
      style={customStyles}
      ariaHideApp={false}
      onAfterOpen={handleAfterOpen}
    >
      <div className={styles.left}>
        <h1>Edit Your Product</h1>
        <AddProduct id={id} ispopup={true} setOpen={setOpen} />
      </div>
      <div className={styles.right}>
        <h1>Feedback</h1>
        <p>Add your product and rate other items.....</p>
      </div>
    </Modal>
  );
};

export default EditProductModal;
