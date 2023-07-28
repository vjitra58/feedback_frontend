import React, { useState, useRef, useEffect } from "react";
import styles from "./Content.module.css";
import ProductCard from "../ProductCard/ProductCard";
import AddProductModal from "../Modals/AddProductModal.jsx";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import Loader from "../Loader/Loader.jsx";
import nothingImg from "../../assets/images/nothing.avif";

import { useSelector, useDispatch } from "react-redux";
import { getAllProduct, getFilterData } from "../../redux/actions/product.js";


const Content = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [clicked, setClicked] = useState(false); //for login and signup modal change
  // const [openEdit, SetOpenEdit] = useState(false); 
  const [filter, setFilter] = useState("All"); //for filter options
  const [sortMethod, setSortMethod] = useState(""); //for sort options
  const filterRef = useRef();
  const dispatch = useDispatch();
  const { products,loading, filterData } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(()=>{
    //seaarch with filter, ans sortMethod
    dispatch(getAllProduct(filter, sortMethod));
  }, [dispatch, filter, sortMethod]);

  useEffect(() => {
    dispatch(getFilterData());
  }, [products]);

  const handleChange = (e) => {
    filterRef.current.classList.remove(styles.active);
    //add the filterRef.current.text to the usestate;
    setFilter(e.target.innerText);
    console.log(filter);
    e.target.classList.add(styles.active);
    filterRef.current = e.target;
  };

  const handleSortChange = (e) => {
    //sort the products according to the e.target.value
    setSortMethod(e.target.value);
    console.log(e.target.value);
  }

 
  return (
    <div className={styles.content}>
      <div className={styles.filter_section}>
        <div className={styles.filter_heading}>
          <h1>Feedback</h1>
          <p>Apply Filter</p>
        </div>
        <p>Filter :</p>
        <div className={styles.filter_options}>
          <div
            onClick={handleChange}
            ref={filterRef}
            className={styles.option + " " + styles.active}
          >
            All
          </div>
          {filterData?.map((data) => (
            <div key={data} onClick={handleChange} className={styles.option}>
              {data}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.main_section}>
        <div className={styles.main_section_sort}>
          <div className={styles.main_section_sort_left}>
            <p>{products && products?.length} Suggestions</p>
            <div className={styles.sort_options}>
              <p>Sort by: </p>
              <select onClick={handleSortChange}>
                <option value="upvote">Upvotes</option>
                <option value="comment">comments</option>
              </select>
            </div>
          </div>
          <div className={styles.main_section_sort_right}>
            <button
              onClick={() => setOpenAddProduct(true)}
              className={styles.btn}
            >
              +Add Product
            </button>
          </div>
        </div>
        <div className={styles.main_section_posts}>
          {loading ? (
            <Loader />
          ) : (
            products && products?.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))
          )}

          {!loading && products?.length == 0 && (
            <div className={styles.no_product}>
              <img src={nothingImg} />
            </div>
          )}
        </div>
      </div>
      {isAuthenticated ? (
        <AddProductModal
          open={openAddProduct}
          setOpen={setOpenAddProduct}
          setClicked={setClicked}
        />
      ) : (
        <>
          {clicked ? (
            <LoginModal
              setClicked={setClicked}
              open={openAddProduct}
              setOpen={setOpenAddProduct}
            />
          ) : (
            <RegisterModal
              setClicked={setClicked}
              open={openAddProduct}
              setOpen={setOpenAddProduct}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Content;
