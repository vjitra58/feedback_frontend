import { server } from "../store";
import axios from "axios";

export const getAllProduct =
  (filter, sortMethod) => async (dispatch) => {
    try {
      dispatch({ type: "getAllProductRequest" });

      const { data } = await axios.get(
        `${server}/product/getall?filter=${filter}&sort=${sortMethod}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          // withCredentials: true,
        }
      );

      dispatch({ type: "getAllProductSuccess", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "getAllProductFail",
        payload: error.response.data.message,
      });
    }
  };


  export const addProduct = (formdata) => async (dispatch) => {
    try {
      dispatch({ type: "addProductRequest" });
        
         const token = localStorage.getItem("token");

      const { data } = await axios.post(`${server}/product/add`, formdata, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });
  
      dispatch({ type: "addProductSuccess", payload: data.message });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "addProductFail",
        payload: error.response.data.message,
      });
    }
  }


export const commentOnProduct = (id, comment) => async (dispatch) => {
    try {
        dispatch({ type: "commentOnProductRequest" });
    
        const { data } = await axios.put(
        `${server}/product/comment/${id}`,
        { comment },
        {
            headers: {
            "Content-type": "application/json",
            },
            // withCredentials: true,
        }
        );
    
        dispatch({ type: "commentOnProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "commentOnProductFail",
        payload: error.response.data.message,
        });
    }
};

export const likeOnProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "likeOnProductRequest" });

        const { data } = await axios.put(
        `${server}/product/like/${id}`,
        {},
        {
            headers: {
            "Content-type": "application/json",
            },
            // withCredentials: true,
        }
        );
    
        dispatch({ type: "likeOnProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "likeOnProductFail",
        payload: error.response.data.message,
        });
    }
}


export const getFilterData = () => async (dispatch) => {
    try {
        dispatch({ type: "getFilterDataRequest" });
    
        const { data } = await axios.get(`${server}/product/filterdata`, {
        headers: {
            "Content-type": "application/json",
        },
        // withCredentials: true,
        });
    
        dispatch({ type: "getFilterDataSuccess", payload: data.result });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "getFilterDataFail",
        payload: error.response.data.message,
        });
    }
}

export const EditProduct = (id, formdata) => async (dispatch) => {
    try {
        dispatch({ type: "EditProductRequest" });
        const token = localStorage.getItem("token");
        const { data } = await axios.put(
          `${server}/product/edit/${id}`,
          formdata,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            // withCredentials: true,
          }
        );
    
        dispatch({ type: "EditProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "EditProductFail",
        payload: error.response.data.message,
        });
    }
}


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productRequest" });

    const { data } = await axios.get(`${server}/product/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
      //  withCredentials: true,
    });

    dispatch({ type: "productSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "productFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${server}/product/delete/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
    });

    dispatch({ type: "deleteProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error?.response?.data?.message,
    });
  }
}


export const searchProduct = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: "SearchRequest" });

    const { data } = await axios.get(
      `${server}/product/allproducts?keyword=${keyword}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        // withCredentials: true,
      }
    );

    dispatch({ type: "SearchSuccess", payload: data.products });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SearchFail",
      payload: error.response.data.message,
    });
  }
};
