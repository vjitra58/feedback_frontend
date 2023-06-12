import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAllProduct,
  EditProduct,
  getProductById,
  deleteProductById,
} from "../../redux/actions/product.js";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../redux/store.js";

const AddProduct = ({ ispopup, setOpen, id }) => {
  const { message, error, productDetail, loading, Editloading, deleteloading } =
    useSelector((state) => state.product);

  const [title, setTitle] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({
    value: id ? productDetail?.description : "",
    error: "",
  });

  const [category, setCategory] = useState({ value: "", error: "" });
  const [logo, setLogo] = useState({ value: "", error: "" });
  const [link, setLink] = useState({ value: "", error: "" });
  const dispatch = useDispatch();

  const checkforEmptyField = (field, setField) => {
    if (field.value.replace(/\s+/, "") == "") {
      setField((state) => ({
        value: state.value,
        error: "This field is required",
      }));
    } else {
      setField((state) => ({
        value: state.value,
        error: "",
      }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteProductById(id));
    dispatch(getAllProduct("All", ""));
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkforEmptyField(title, setTitle);
    checkforEmptyField(description, setDescription);
    checkforEmptyField(category, setCategory);
    checkforEmptyField(logo, setLogo);
    checkforEmptyField(link, setLink);

    console.log("submitting", title, description, category, logo, link);
    if (
      title.value == "" ||
      description.value == "" ||
      category.value == "" ||
      logo.value == "" ||
      link.value == ""
    ) {
      return;
    }

    const formdata = {
      title: title.value,
      description: description.value,
      category: category.value.trim(),
      logo: logo.value,
      link: link.value,
    };

    if (id) {
      await dispatch(EditProduct(id, formdata));
    } else {
      await dispatch(addProduct(formdata));
    }
    dispatch(getAllProduct("All", ""));
    setOpen(false);
  };

  useEffect(() => {
    const func = async () => {
      // dispatch(getProductById(id));
      const { data } = await axios.get(`${server}/product/${id}`, {
        headers: {
          "Content-type": "application/json",
        },
        //  withCredentials: true,
      });
      setTitle({ ...title, value: data?.product.title });
      setDescription({ ...description, value: data?.product.description });
      setCategory({ ...category, value: data?.product.category });
      setLogo({ ...logo, value: data?.product.logo });
      setLink({ ...link, value: data?.product.link });
      console.log("data", data);
    };

    if (id) {
      func();
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [message, error, dispatch]);

  return (
    <div className={styles.container}>
      <form style={{ padding: ispopup ? 0 : "" }}>
        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <input
              type="text"
              id="title"
              value={title.value}
              placeholder="Name of the company"
              onChange={(e) => setTitle({ ...title, value: e.target.value })}
              onBlur={() => checkforEmptyField(title, setTitle)}
            />
          </div>
          <p>{title.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <input
              type="text"
              id="category"
              value={category.value}
              placeholder="Category"
              onChange={(e) =>
                setCategory({ ...category, value: e.target.value })
              }
              onBlur={() => checkforEmptyField(category, setCategory)}
            />
          </div>
          <p>{category.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <input
              type="text"
              id="logo"
              value={logo.value}
              placeholder="Add logo Url"
              onChange={(e) => setLogo({ ...logo, value: e.target.value })}
              onBlur={() => checkforEmptyField(logo, setLogo)}
            />
          </div>
          <p>{logo.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <input
              type="text"
              id="link"
              value={link.value}
              placeholder="Link of the product"
              onChange={(e) => setLink({ ...link, value: e.target.value })}
              onBlur={() => checkforEmptyField(link, setLink)}
            />
          </div>
          <p>{link.error}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.textGroup}>
            <input
              type="text"
              id="description"
              value={description.value}
              placeholder="Add description"
              onChange={(e) =>
                setDescription({ ...description, value: e.target.value })
              }
              onBlur={() => checkforEmptyField(description, setDescription)}
            />
          </div>
          <p>{description.error}</p>
        </div>

        <div className={styles.button_wrapper}>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={styles.button}
            type="submit"
          >
            {id ? "Edit" : "+Add"}
          </button>

          {id && (
            <button
              disabled={deleteloading}
              style={{ backgroundColor: "red", cursor: "pointer" }}
              className={styles.button}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
