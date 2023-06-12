import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
// import { FaMessage } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RxCaretUp } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
// import {FaMessage} from "react-icons/fa";
import messageIcon from "../../assets/messageIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { commentOnProduct, likeOnProduct } from "../../redux/actions/product";
import EditProductModal from "../Modals/EditProductModal";
import AddProductModal from "../Modals/AddProductModal";
import toast from "react-hot-toast";

// const data = {
//   id: 1,
//   title: "Amazon",
//   logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/CRED_%28FinTech_company%29_logo.png",
//   desciption:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//   category: "Fintech, B2B, SaaS",
//   comments: [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   ],
// };

const ProductCard = ({ data}) => {
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");
  const [comments, setComments] = useState(data?.comments);
  const [likeCount, setLikeCount] = useState(data?.likes);
  const [openEdit, SetOpenEdit] = useState(false);
  const {user} = useSelector((state) => state.user);
  const showEdit = String(user?._id) == String(data?.author);
  const dispatch = useDispatch();

  const {message, error} = useSelector((state) => state.product);



  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([{ comment: text }, ...comments]);
    //also call the api to add the comment
    dispatch(commentOnProduct(data._id, text));
    setText("");
  };
  const handleLikeChange = (e) => {
    e.preventDefault();
    setLikeCount(likeCount + 1);
    //call api to increase the like count
    dispatch(likeOnProduct(data._id));
  };

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   //call api to edit the product
  // };

   useEffect(() => {
     if (error) {
      //  toast.error(error);
       dispatch({ type: "clearError" });
     }
     if (message) {
      //  toast.success(message);
       dispatch({ type: "clearMessage" });
     }
   }, [error, message]);


  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={data?.logo} />
        </div>
        <div className={styles.content}>
          <a href={data?.link} target="_blank">
            <h1>{data?.title}</h1>
          </a>
          <p>{data?.description}</p>
          <div className={styles.category}>
            <div className={styles.category_options}>
              {data?.category.split(" ").map((item, index) => (
                <div className={styles.category_item} key={index}>
                  {item}
                </div>
              ))}
            </div>
            <div
              id={styles.secondlast}
              onClick={() => setShowComments(!showComments)}
            >
              <BiMessageRoundedDetail style={{ fontSize: "20px" }} />
              <p>Comment</p>
            </div>

            {showEdit && (
              <button
                onClick={() => SetOpenEdit(true)}
                className={styles.category_item}
                id={styles.editbtn}
                style={{ backgroundColor: "var(--blue-color)", color: "white" }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className={styles.icons}>
          <div onClick={handleLikeChange} className={styles.likes}>
            <RxCaretUp style={{ fontSize: "20px" }} />
            <p>{likeCount}</p>
          </div>
          <div className={styles.comments}>
              <img src={messageIcon} />
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
      {showComments && (
        <div className={styles.messages}>
          <div className={styles.input}>
            <input
              value={text}
              onChange={handleTextChange}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              type="text"
              placeholder="Add a comment"
            />
            <IoMdSend onClick={handleSubmit} className={styles.sendIcon} />
          </div>
          <ul>
            {comments.map((item, index) => (
              <li key={index}>{item.comment}</li>
            ))}
          </ul>
        </div>
      )}
      <EditProductModal open={openEdit} setOpen={SetOpenEdit} id={data._id} />
    </div>
  );
};

export default ProductCard;
